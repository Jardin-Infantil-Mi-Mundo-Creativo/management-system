import { enrollment } from './enrollment';

export const getEnrollmentsResponse = [
  enrollment,
  {
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
  },
];
