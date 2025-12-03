import type { UseFormSetValue } from 'react-hook-form';

import type { EnrollmentFormSchema } from '@/types/enrollment';

// if any field is "no", clear related fields
const validateAndFixFormConsistency = (
  data: EnrollmentFormSchema,
  setValue: UseFormSetValue<EnrollmentFormSchema>
) => {
  const fixedData = { ...data };
  if (fixedData?.rendererFieldsOnly?.studentHealth?.hasDisability === false) {
    fixedData.studentHealth.hasPhysicalDisability = false;
    setValue('studentHealth.hasPhysicalDisability', false);
    fixedData.studentHealth.hasHearingDisability = false;
    setValue('studentHealth.hasHearingDisability', false);
    fixedData.studentHealth.otherDisabilities = '';
    setValue('studentHealth.otherDisabilities', '');
  }

  if (fixedData?.rendererFieldsOnly?.studentHealth?.hasDisorders === false) {
    fixedData.studentHealth.hasAutism = false;
    setValue('studentHealth.hasAutism', false);
    fixedData.studentHealth.hasDownSyndrome = false;
    setValue('studentHealth.hasDownSyndrome', false);
    fixedData.studentHealth.hasBehavioralDisorders = false;
    setValue('studentHealth.hasBehavioralDisorders', false);
    fixedData.studentHealth.hasLanguageDisorders = false;
    setValue('studentHealth.hasLanguageDisorders', false);
    fixedData.studentHealth.hasHyperactivity = false;
    setValue('studentHealth.hasHyperactivity', false);
    fixedData.studentHealth.hasAttentionDisorders = false;
    setValue('studentHealth.hasAttentionDisorders', false);
    fixedData.studentHealth.hasAnxiety = false;
    setValue('studentHealth.hasAnxiety', false);
    fixedData.studentHealth.otherDisorders = '';
    setValue('studentHealth.otherDisorders', '');
  }

  if (fixedData?.rendererFieldsOnly?.studentHealth?.hasTherapy === false) {
    fixedData.studentHealth.therapies = '';
    setValue('studentHealth.therapies', '');
  }

  if (fixedData?.rendererFieldsOnly?.studentHealth?.hasAllergy === false) {
    fixedData.studentHealth.allergies = '';
    setValue('studentHealth.allergies', '');
  }

  if (fixedData?.enrollment?.isOldStudent === true) {
    fixedData.enrollment.previousSchoolName =
      'Jardín Infantil Mi Mundo Creativo';
    setValue(
      'enrollment.previousSchoolName',
      'Jardín Infantil Mi Mundo Creativo'
    );
    fixedData.enrollment.isFirstTime = false;
    setValue('enrollment.isFirstTime', false);
  }

  if (fixedData?.enrollment?.isFirstTime === true) {
    fixedData.enrollment.previousSchoolName = '';
    setValue('enrollment.previousSchoolName', '');
  }

  if (fixedData.rendererFieldsOnly.studentHealth.hasDisabilityOther === false) {
    fixedData.studentHealth.otherDisabilities = '';
    setValue('studentHealth.otherDisabilities', '');
  }

  if (fixedData.rendererFieldsOnly.studentHealth.hasDisorderOther === false) {
    fixedData.studentHealth.otherDisorders = '';
    setValue('studentHealth.otherDisorders', '');
  }

  return fixedData;
};

export { validateAndFixFormConsistency };
