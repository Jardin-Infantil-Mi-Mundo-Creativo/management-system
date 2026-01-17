import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { enrollmentFormSchema } from '@/schemas/enrollment';
import type { EnrollmentFormSchema } from '@/types/enrollment';

function useEnrollmentForm() {
  const formDefaultValuesStudentHealth = {
    hasAnxiety: false,
    hasAttentionDisorders: false,
    hasAutism: false,
    hasBehavioralDisorders: false,
    hasDownSyndrome: false,
    hasHearingDisability: false,
    hasHyperactivity: false,
    hasLanguageDisorders: false,
    hasPhysicalDisability: false,
    otherDisabilities: '',
    otherDisorders: '',
    therapies: '',
  };

  const formDefaultValuesFamilyRelationship = {
    livesWithFather: false,
    livesWithGrandparents: false,
    livesWithMother: false,
    livesWithSiblings: false,
    livesWithStepfather: false,
    livesWithStepmother: false,
    livesWithUncles: false,
  };

  const formDefaultValuesEnrollment = {
    date: (() => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    })(),
  };

  const formDefaultValues = {
    documentsFile: null,
    enrollment: formDefaultValuesEnrollment,
    familyRelationship: formDefaultValuesFamilyRelationship,
    father: {
      telephoneNumber: '',
    },
    mother: {
      telephoneNumber: '',
    },
    studentHealth: formDefaultValuesStudentHealth,
    studentPhoto: null,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<EnrollmentFormSchema>({
    defaultValues: formDefaultValues,
    mode: 'onChange',
    resolver: zodResolver(enrollmentFormSchema),
    reValidateMode: 'onChange',
  });

  return {
    control,
    errors,
    handleSubmit,
    register,
    setValue,
  };
}

export { useEnrollmentForm };
