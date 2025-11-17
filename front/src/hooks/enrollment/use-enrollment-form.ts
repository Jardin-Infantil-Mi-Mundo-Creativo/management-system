import type { EnrollmentFormSchema } from '@/types/enrollment';
import { useForm } from 'react-hook-form';
import { enrollmentFormSchema } from '@/schemas/enrollment'
import { zodResolver } from "@hookform/resolvers/zod"

function useEnrollmentForm() {
  const formDefaultValuesStudentHealth = {
    hasPhysicalDisability: false,
    hasHearingDisability: false,
    hasAutism: false,
    hasDownSyndrome: false,
    hasBehavioralDisorders: false,
    hasLanguageDisorders: false,
    hasHyperactivity: false,
    hasAttentionDisorders: false,
    hasAnxiety: false,
    hasSisben: undefined,
    hasRhPositiveBloodType: undefined,
    hasEnuresis: undefined,
    hasEncopresis: undefined,
  };

  const formDefaultValuesFamilyRelationship = {
    livesWithParents: false,
    livesWithSiblings: false,
    livesWithGrandparents: false,
    livesWithUncles: false,
    livesWithStepfather: false,
    livesWithStepmother: false,
    parentsRelationship: undefined,
  };

  const formDefaultValuesEnrollment = {
    identificationNumber: "1",
    date: (() => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    })(),
    isOldStudent: undefined,
    isFirstTime: undefined,
    entryGrade: undefined,
  };

  const formDefaultValuesRendererFieldsOnly = {
    studentHealth: {
      hasDisability: undefined,
      hasDisabilityOther: false,
      hasDisorders: undefined,
      hasDisorderOther: false,
      hasTherapy: undefined,
      hasAllergy: undefined,
    }
  };

  const formDefaultValues = {
    studentHealth: formDefaultValuesStudentHealth,
    familyRelationship: formDefaultValuesFamilyRelationship,
    enrollment: formDefaultValuesEnrollment,
    rendererFieldsOnly: formDefaultValuesRendererFieldsOnly,
    studentPhoto: null,
    documentsFile: null,
  }
  
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<EnrollmentFormSchema>({
    resolver: zodResolver(enrollmentFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: formDefaultValues,
  })

  return {
    register,
    handleSubmit,
    control,
    setValue,
    errors,
  }
}

export { useEnrollmentForm };
