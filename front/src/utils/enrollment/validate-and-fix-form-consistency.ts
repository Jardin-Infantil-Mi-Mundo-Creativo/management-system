import type { EnrollmentFormSchema } from '@/types/enrollment';

// if any field is "no", clear related fields
  const validateAndFixFormConsistency = (data: EnrollmentFormSchema) => {
    const fixedData = { ...data };
    if (fixedData?.rendererFieldsOnly?.studentHealth?.hasDisability === false) {
      fixedData.studentHealth.hasPhysicalDisability = false;
      fixedData.studentHealth.hasHearingDisability = false;
      fixedData.studentHealth.otherDisabilities = "";
    }

    if (fixedData?.rendererFieldsOnly?.studentHealth?.hasDisorders === false) {
      fixedData.studentHealth.hasAutism = false;
      fixedData.studentHealth.hasDownSyndrome = false;
      fixedData.studentHealth.hasBehavioralDisorders = false;
      fixedData.studentHealth.hasLanguageDisorders = false;
      fixedData.studentHealth.hasHyperactivity = false;
      fixedData.studentHealth.hasAttentionDisorders = false;
      fixedData.studentHealth.hasAnxiety = false;
      fixedData.studentHealth.otherDisorders = "";
    }

    if (fixedData?.rendererFieldsOnly?.studentHealth?.hasTherapy === false) {
      fixedData.studentHealth.therapies = "";
    }

    if (fixedData?.rendererFieldsOnly?.studentHealth?.hasAllergy === false) {
      fixedData.studentHealth.allergies = "";
    }

    if (fixedData?.enrollment?.isOldStudent === true) {
      fixedData.enrollment.previousSchoolName = "Jardín Infantil Mi Mundo Creativo";
      fixedData.enrollment.isFirstTime = false;
    }

    if (fixedData?.enrollment?.isFirstTime === true) {
      fixedData.enrollment.previousSchoolName = "";
    }

    if (fixedData.rendererFieldsOnly.studentHealth.hasDisabilityOther === false) {
      fixedData.studentHealth.otherDisabilities = "";
    }

    if (fixedData.rendererFieldsOnly.studentHealth.hasDisorderOther === false) {
      fixedData.studentHealth.otherDisorders = "";
    }

    return fixedData
  }

export { validateAndFixFormConsistency };
