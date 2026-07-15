import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseService } from '../firebase/firebase.service';
import { EnrollmentService } from './enrollment.service';

const activeEnrollment = {
  documentsFile: 'https://example.com/documents.pdf',
  enrollment: {
    date: '10/07/2026',
    entryGrade: 'walkers',
    isFirstTime: true,
    isOldStudent: false,
  },
  personalStudentInfo: {
    civilRegistrationNumber: '123',
    fullName: 'John Doe',
  },
  studentPhoto: 'https://example.com/photo.jpg',
};

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let collection: {
    add: jest.Mock;
    doc: jest.Mock;
    get: jest.Mock;
  };

  beforeEach(async () => {
    collection = {
      add: jest.fn(),
      doc: jest.fn(),
      get: jest.fn(),
    };
    const firebaseService = {
      getFirestore: () => ({ collection: () => collection }),
      getLogger: () => jest.fn(),
      getStorage: () => ({ name: 'bucket' }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentService,
        { provide: FirebaseService, useValue: firebaseService },
      ],
    }).compile();

    service = module.get<EnrollmentService>(EnrollmentService);
  });

  it('derives draft, completed, and retired states while normalizing historical data', async () => {
    collection.get.mockResolvedValue({
      docs: [
        {
          data: () => ({ ...activeEnrollment, documentsFile: null }),
          id: 'draft',
        },
        { data: () => activeEnrollment, id: 'completed' },
        {
          data: () => ({
            ...activeEnrollment,
            enrollment: {
              ...activeEnrollment.enrollment,
              withdrawalDate: '12/07/2026',
            },
          }),
          id: 'retired',
        },
        {
          data: () => ({
            ...activeEnrollment,
            documentsFile: null,
            enrollment: {
              ...activeEnrollment.enrollment,
              withdrawalDate: '12/07/2026',
            },
          }),
          id: 'inconsistent-draft',
        },
      ],
    });

    const enrollments = await service.getEnrollments();

    expect(enrollments.map(({ id, state }) => ({ id, state }))).toEqual([
      { id: 'draft', state: 'draft' },
      { id: 'completed', state: 'completed' },
      { id: 'retired', state: 'retired' },
      { id: 'inconsistent-draft', state: 'draft' },
    ]);
    expect(enrollments[1].enrollment.withdrawalDate).toBeNull();
  });

  it('withdraws an active enrollment with a partial nested update', async () => {
    const update = jest.fn();
    collection.doc.mockReturnValue({
      get: jest
        .fn()
        .mockResolvedValue({ data: () => activeEnrollment, exists: true }),
      update,
    });

    const result = await service.withdrawEnrollment('active-id', '12/07/2026');

    expect(update).toHaveBeenCalledWith({
      'enrollment.withdrawalDate': '12/07/2026',
    });
    expect(result).toMatchObject({
      ...activeEnrollment,
      id: 'active-id',
      state: 'retired',
      enrollment: {
        ...activeEnrollment.enrollment,
        withdrawalDate: '12/07/2026',
      },
    });
  });
});
