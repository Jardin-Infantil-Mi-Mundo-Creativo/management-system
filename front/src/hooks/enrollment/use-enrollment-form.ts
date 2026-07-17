import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PARENT_INFORMATION_DEFAULTS } from '@/consts/enrollment';
import { useEnrollmentFormSchema } from '@/schemas/enrollment';
import type { EnrollmentFormValues } from '@/types/enrollment';

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
    father: { ...PARENT_INFORMATION_DEFAULTS },
    mother: { ...PARENT_INFORMATION_DEFAULTS },
    omitFather: false,
    omitMother: false,
    studentHealth: formDefaultValuesStudentHealth,
    studentPhoto: null,
  };

  const enrollmentFormSchema = useEnrollmentFormSchema();
  const {
    clearErrors,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    resetField,
    setError,
    setValue,
    trigger,
    watch,
  } = useForm<EnrollmentFormValues>({
    defaultValues: formDefaultValues,
    mode: 'onChange',
    resolver: zodResolver(enrollmentFormSchema),
    reValidateMode: 'onChange',
  });

  return {
    clearErrors,
    control,
    errors,
    getValues,
    handleSubmit,
    register,
    resetField,
    setError,
    setValue,
    trigger,
    watch,
  };
}

export { useEnrollmentForm };
