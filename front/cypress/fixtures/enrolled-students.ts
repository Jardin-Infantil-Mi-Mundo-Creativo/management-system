import { enrollment } from './enrollment';

const otherEnrollment = {
  ...enrollment,
  id: 'jxwi1KU0tT8jXapffsde',
  personalStudentInfo: {
    ...enrollment.personalStudentInfo,
    fullName: 'Jane Doe',
    civilRegistrationNumber: '987654321',
  },
  authorizedPersons: [
    {
      cellPhoneNumber: '3123456789',
      fullName: 'Foo Bar',
    },
  ],
};

const draftEnrollmentValues = {
  state: 'draft',
  documentsFile: null,
  studentPhoto: null,
};

export const getEnrollmentsResponse = [
  enrollment,
  otherEnrollment,
  {
    ...enrollment,
    ...draftEnrollmentValues,
    id: 'jxwi1KU0tT8jXapfN40op',
  },
  {
    ...otherEnrollment,
    ...draftEnrollmentValues,
    id: 'jxwi1KU0tT8j48jf1234',
  },
];

export const updateEnrollmentResponse = { id: 'jxwi1KU0tT8jXapfN40op' };
