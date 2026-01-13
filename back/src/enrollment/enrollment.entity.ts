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
    sisben:
      | 'N/A'
      | 'A1'
      | 'A2'
      | 'A3'
      | 'A4'
      | 'A5'
      | 'B1'
      | 'B2'
      | 'B3'
      | 'B4'
      | 'B5'
      | 'B6'
      | 'B7'
      | 'C1'
      | 'C2'
      | 'C3'
      | 'C4'
      | 'C5'
      | 'C6'
      | 'C7'
      | 'C8'
      | 'C9'
      | 'C10'
      | 'C11'
      | 'C12'
      | 'C13'
      | 'C14'
      | 'C15'
      | 'C16'
      | 'C17'
      | 'C18'
      | 'D1'
      | 'D2'
      | 'D3'
      | 'D4'
      | 'D5'
      | 'D6'
      | 'D7'
      | 'D8'
      | 'D9'
      | 'D10'
      | 'D11'
      | 'D12'
      | 'D13'
      | 'D14'
      | 'D15'
      | 'D16'
      | 'D17'
      | 'D18'
      | 'D19'
      | 'D20'
      | 'D21';
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

  studentPhoto: Express.Multer.File[];
  documentsFile: Express.Multer.File[];
}

export type EnrollmentWithNoFiles = Omit<
  Enrollment,
  'studentPhoto' | 'documentsFile'
>;

export type EnrollmentFiles = Pick<
  Enrollment,
  'studentPhoto' | 'documentsFile'
>;
