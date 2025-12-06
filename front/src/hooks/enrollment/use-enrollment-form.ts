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
    hasEncopresis: undefined,
    hasEnuresis: undefined,
    hasHearingDisability: false,
    hasHyperactivity: false,
    hasLanguageDisorders: false,
    hasPhysicalDisability: false,
    hasSisben: undefined,
  };

  const formDefaultValuesFamilyRelationship = {
    livesWithGrandparents: false,
    livesWithParents: false,
    livesWithSiblings: false,
    livesWithStepfather: false,
    livesWithStepmother: false,
    livesWithUncles: false,
    parentsRelationship: undefined,
  };

  const formDefaultValuesEnrollment = {
    date: (() => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    })(),
    entryGrade: undefined,
    isFirstTime: undefined,
    isOldStudent: undefined,
  };

  const formDefaultValuesRendererFieldsOnly = {
    studentHealth: {
      hasAllergy: undefined,
      hasDisability: undefined,
      hasDisabilityOther: false,
      hasDisorderOther: false,
      hasDisorders: undefined,
      hasTherapy: undefined,
    },
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
    rendererFieldsOnly: formDefaultValuesRendererFieldsOnly,
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
