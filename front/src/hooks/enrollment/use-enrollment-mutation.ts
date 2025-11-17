import { useMutation } from '@tanstack/react-query';

interface EnrollmentData {
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
    hasRhPositiveBloodType: boolean;
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
  };
  familyRelationship: {
    livesWithParents: boolean;
    livesWithSiblings: boolean;
    livesWithGrandparents: boolean;
    livesWithUncles: boolean;
    livesWithStepfather: boolean;
    livesWithStepmother: boolean;
    parentsRelationship?:
      | 'married'
      | 'common law marriage'
      | 'single mother'
      | 'separated';
  };
  enrollment: {
    identificationNumber: string;
    date: string;
    isOldStudent?: boolean;
    isFirstTime?: boolean;
    previousSchoolName?: string;
    entryGrade?:
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
  studentPhoto: File | undefined;
  documentsFile: File | undefined;
}

async function createEnrollment(data: EnrollmentData) {
  const formData = new FormData();
  const dataWithNoFiles = { ...data };
  delete dataWithNoFiles.studentPhoto;
  delete dataWithNoFiles.documentsFile;
  formData.append('data', JSON.stringify(dataWithNoFiles));
  formData.append('studentPhoto', data.studentPhoto || '');
  formData.append('documentsFile', data.documentsFile || '');

  const response = await fetch('http://localhost:3001/enrollments/', {
    method: 'POST',
    body: formData,
  });

  return response.json();
}

export function useEnrollmentMutation() {
  return useMutation({
    mutationFn: createEnrollment,
  });
}
