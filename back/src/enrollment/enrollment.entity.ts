interface Enrollment {
  personalStudentInfo: {
    fullName: string;
    birthDate: string;
    ageYears: number;
    ageMonths: number;
    birthCity: string;
    civilRegistrationNumber: string;
  };

  studentHealth: {
    hasPhysicalDisability: boolean;
    hasHearingDisability: boolean;
    otherDisabilities?: string;
    hasAutism: boolean;
    hasDownSyndrome: boolean;
    hasBehavioralDisorders: boolean;
    hasLanguageDisorders: boolean;
    hasHyperactivity: boolean;
    hasAttentionDisorders: boolean;
    hasAnxiety: boolean;
    otherDisorders?: string;
    therapies?: string;
    hasSisben: boolean;
    eps: string;
    bloodType: string;
    allergies?: string;
    hasEnuresis: boolean;
    hasEncopresis: boolean;
  };

  mother: {
    fullName: string;
    birthDate: string;
    ageYears: number;
    address: string;
    neighborhood: string;
    cellPhoneNumber: string;
    telephoneNumber: string;
    occupation: string;
    educationLevel:
      | 'primary school'
      | 'secondary school'
      | 'technical'
      | 'university';
    email: string;
    identificationNumber: string;
    stratum: '1' | '2' | '3' | '4' | '5' | '6';
  };

  father: {
    fullName: string;
    birthDate: string;
    ageYears: number;
    address: string;
    neighborhood: string;
    cellPhoneNumber: string;
    telephoneNumber: string;
    occupation: string;
    educationLevel:
      | 'primary school'
      | 'secondary school'
      | 'technical'
      | 'university';
    email: string;
    identificationNumber: string;
    stratum: '1' | '2' | '3' | '4' | '5' | '6';
  };

  familyRelationship: {
    livesWithParents: boolean;
    livesWithSiblings: boolean;
    livesWithGrandparents: boolean;
    livesWithUncles: boolean;
    livesWithStepfather: boolean;
    livesWithStepmother: boolean;
    parentsRelationship:
      | 'married'
      | 'common law marriage'
      | 'single mother'
      | 'separated';
  };

  enrollment: {
    date: string;
    isOldStudent: boolean;
    isFirstTime: boolean;
    previousSchoolName?: string;
    entryGrade:
      | 'walkers'
      | 'toddlers'
      | 'preschool'
      | 'kindergarten'
      | 'transition'
      | 'first grade';
  };

  authorizedPersons: Array<{
    fullName: string;
    cellPhoneNumber: string;
  }>;

  files: {
    studentPhoto: Express.Multer.File[];
    documentsFile: Express.Multer.File[];
  };
}

export type EnrollmentWithNoFiles = Omit<Enrollment, 'files'>;

export type EnrollmentFiles = Enrollment['files'];
