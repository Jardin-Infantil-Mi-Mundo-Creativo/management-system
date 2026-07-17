import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';

describe('EnrollmentController', () => {
  let controller: EnrollmentController;
  const enrollmentService = {
    withdrawEnrollment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollmentController],
      providers: [{ provide: EnrollmentService, useValue: enrollmentService }],
    }).compile();

    controller = module.get<EnrollmentController>(EnrollmentController);
    jest.clearAllMocks();
  });

  it('delegates withdrawal with the route id and request body date', async () => {
    enrollmentService.withdrawEnrollment.mockResolvedValue({
      id: 'enrollment-id',
    });

    await expect(
      controller.withdrawEnrollment('enrollment-id', '12/07/2026'),
    ).resolves.toEqual({ id: 'enrollment-id' });
    expect(enrollmentService.withdrawEnrollment).toHaveBeenCalledWith(
      'enrollment-id',
      '12/07/2026',
    );
  });
});
