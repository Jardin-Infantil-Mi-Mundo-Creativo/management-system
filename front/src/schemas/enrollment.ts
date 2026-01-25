import { z } from 'zod';

import { useEnrollmentOptions } from '@/consts/enrollment';

function useEnrollmentFormSchema() {
  const {
    BLOOD_TYPE_OPTIONS_VALUES,
    EDUCATION_LEVEL_OPTIONS_VALUES,
    GRADE_OPTIONS_VALUES,
    PARENTS_RELATIONSHIP_OPTIONS_VALUES,
    SISBEN_OPTIONS_VALUES,
    STRATUM_OPTIONS_VALUES,
  } = useEnrollmentOptions();

  const personalStudentInfoSchema = z.object({
    ageMonths: z.number(),
    ageYears: z.number(),
    birthCity: z.string().min(1, 'La ciudad de nacimiento es requerida'),
    birthDate: z.string('La fecha de nacimiento es requerida'),
    civilRegistrationNumber: z
      .string()
      .min(1, 'El N° Registro Civil es requerido')
      .regex(/^\d+$/, 'El N° Registro Civil solo debe contener números'),
    fullName: z.string().min(1, 'El nombre es requerido'),
  });

  const studentHealthSchema = z.object({
    allergies: z.string().optional(),
    bloodType: z.enum(BLOOD_TYPE_OPTIONS_VALUES, {
      message: 'Seleccione el tipo de sangre',
    }),
    eps: z.string().min(1, 'La E.P.S es requerida'),
    hasAnxiety: z.boolean(),
    hasAttentionDisorders: z.boolean(),
    hasAutism: z.boolean(),
    hasBehavioralDisorders: z.boolean(),
    hasDownSyndrome: z.boolean(),
    hasEncopresis: z.boolean('Indique si el estudiante presenta encopresis'),
    hasEnuresis: z.boolean('Indique si el estudiante presenta enuresis'),
    hasHearingDisability: z.boolean(),
    hasHyperactivity: z.boolean(),
    hasLanguageDisorders: z.boolean(),
    hasPhysicalDisability: z.boolean(),
    otherDisabilities: z.string().optional(),
    otherDisorders: z.string().optional(),
    sisben: z.enum(SISBEN_OPTIONS_VALUES, {
      message: 'Indique si el estudiante tiene SISBEN',
    }),
    therapies: z.string().optional(),
  });

  const familyMemberSchema = z.object({
    address: z.string().min(1, 'La dirección es requerida'),
    ageYears: z.number(),
    birthDate: z.string('La fecha de nacimiento es requerida'),
    cellPhoneNumber: z
      .string()
      .min(1, 'El número de celular es requerido')
      .regex(/^\d+$/, 'El número de celular solo debe contener números'),
    educationLevel: z.enum(EDUCATION_LEVEL_OPTIONS_VALUES, {
      message: 'El nivel educativo es requerido',
    }),
    email: z.email('El correo electrónico no es válido'),
    fullName: z.string().min(1, 'El nombre es requerido'),
    identificationNumber: z
      .string()
      .min(1, 'El número de cédula es requerido')
      .regex(/^\d+$/, 'El número de cédula solo debe contener números'),
    neighborhood: z.string().min(1, 'El barrio es requerido'),
    occupation: z.string().min(1, 'La ocupación es requerida'),
    stratum: z.enum(STRATUM_OPTIONS_VALUES, {
      message: 'El estrato es requerido',
    }),
    telephoneNumber: z
      .string()
      .refine((val) => val === '' || /^\d+$/.test(val), {
        message: 'El número de teléfono solo debe contener números',
      })
      .optional(),
  });

  const familyRelationshipSchema = z.object({
    livesWithFather: z.boolean().optional(),
    livesWithGrandparents: z.boolean().optional(),
    livesWithMother: z.boolean().optional(),
    livesWithSiblings: z.boolean().optional(),
    livesWithStepfather: z.boolean().optional(),
    livesWithStepmother: z.boolean().optional(),
    livesWithUncles: z.boolean().optional(),
    parentsRelationship: z.enum(PARENTS_RELATIONSHIP_OPTIONS_VALUES, {
      message: 'La relación de los padres es requerida',
    }),
  });

  const authorizedPersonSchema = z.object({
    cellPhoneNumber: z
      .string()
      .min(1, 'El número de celular es requerido')
      .regex(/^\d+$/, 'El número de celular solo debe contener números'),
    fullName: z.string().min(1, 'El nombre es requerido'),
  });

  const enrollmentSchema = z.object({
    date: z.string(),
    entryGrade: z.enum(GRADE_OPTIONS_VALUES, {
      message: 'El grado al que ingresa es requerido',
    }),
    isFirstTime: z.boolean().optional(),
    isOldStudent: z.boolean('Indique si el estudiante es antiguo'),
    previousSchoolName: z.string().optional(),
  });

  const rendererFieldsOnlySchema = z.object({
    studentHealth: z.object({
      hasAllergy: z.boolean('Indique si el estudiante tiene alergias'),
      hasDisability: z.boolean(
        'Indique si el estudiante presenta alguna discapacidad'
      ),
      hasDisabilityOther: z.boolean().optional(),
      hasDisorderOther: z.boolean().optional(),
      hasDisorders: z.boolean(
        'Indique si el estudiante presenta algún trastorno'
      ),
      hasTherapy: z.boolean('Indique si el estudiante asiste a terapia(s)'),
    }),
  });

  const enrollmentFormSchema = z
    .object({
      authorizedPersons: z.array(authorizedPersonSchema),
      documentsFile: z.any().optional(),
      enrollment: enrollmentSchema,
      familyRelationship: familyRelationshipSchema,
      father: familyMemberSchema,
      mother: familyMemberSchema,
      personalStudentInfo: personalStudentInfoSchema,
      rendererFieldsOnly: rendererFieldsOnlySchema,
      studentHealth: studentHealthSchema,
      studentPhoto: z.any().optional(),
    })
    // if was specified that student has disabilities, must specify at least one
    .refine(
      (data) => {
        const hasDisability =
          data.rendererFieldsOnly.studentHealth.hasDisability;
        const hasPhysical = data.studentHealth.hasPhysicalDisability;
        const hasHearing = data.studentHealth.hasHearingDisability;
        const hasOther =
          data.rendererFieldsOnly.studentHealth.hasDisabilityOther;

        if (
          hasDisability === true &&
          !hasPhysical &&
          !hasHearing &&
          !hasOther
        ) {
          return false;
        }
        return true;
      },
      {
        message: 'Seleccione al menos un tipo de discapacidad',
        path: ['rendererFieldsOnly', 'studentHealth', 'hasDisability'],
      }
    )
    // if was specified that student has any disability that was not listed, must specify it
    .refine(
      (data) => {
        const hasDisabilityOther =
          data.rendererFieldsOnly.studentHealth.hasDisabilityOther;
        const otherDisabilities = data.studentHealth.otherDisabilities;
        if (
          hasDisabilityOther === true &&
          (!otherDisabilities || otherDisabilities.trim() === '')
        ) {
          return false;
        }
        return true;
      },
      {
        message: 'Especifique cuáles son las otras discapacidades',
        path: ['studentHealth', 'otherDisabilities'],
      }
    )
    .refine(
      (data) => {
        const hasDisorders = data.rendererFieldsOnly.studentHealth.hasDisorders;
        return hasDisorders !== null && hasDisorders !== undefined;
      },
      {
        message: 'Indique si el estudiante presenta algún trastorno',
        path: ['rendererFieldsOnly', 'studentHealth', 'hasDisorders'],
      }
    )
    // if was specified that student has disorders, must specify at least one
    .refine(
      (data) => {
        const hasDisorders = data.rendererFieldsOnly.studentHealth.hasDisorders;
        const {
          hasAnxiety,
          hasAttentionDisorders,
          hasAutism,
          hasBehavioralDisorders,
          hasDownSyndrome,
          hasHyperactivity,
          hasLanguageDisorders,
        } = data.studentHealth;
        const hasOther = data.rendererFieldsOnly.studentHealth.hasDisorderOther;

        if (
          hasDisorders === true &&
          !(
            hasAutism ||
            hasDownSyndrome ||
            hasBehavioralDisorders ||
            hasLanguageDisorders ||
            hasHyperactivity ||
            hasAttentionDisorders ||
            hasAnxiety ||
            hasOther
          )
        ) {
          return false;
        }
        return true;
      },
      {
        message: 'Seleccione al menos un tipo de trastorno',
        path: ['rendererFieldsOnly', 'studentHealth', 'hasDisorders'],
      }
    )
    // if was specified that student has any disorder that was not listed, must specify it
    .refine(
      (data) => {
        const hasDisorderOther =
          data.rendererFieldsOnly.studentHealth.hasDisorderOther;
        const otherDisorders = data.studentHealth.otherDisorders;
        if (
          hasDisorderOther === true &&
          (!otherDisorders || otherDisorders.trim() === '')
        ) {
          return false;
        }
        return true;
      },
      {
        message: 'Especifique cuáles son los otros trastornos',
        path: ['studentHealth', 'otherDisorders'],
      }
    )
    .refine(
      (data) => {
        const hasTherapy = data.rendererFieldsOnly.studentHealth.hasTherapy;
        return hasTherapy !== null && hasTherapy !== undefined;
      },
      {
        message: 'Indique si el estudiante asiste a terapia(s)',
        path: ['rendererFieldsOnly', 'studentHealth', 'hasTherapy'],
      }
    )
    .refine(
      (data) => {
        const hasTherapy = data.rendererFieldsOnly.studentHealth.hasTherapy;
        const therapies = data.studentHealth.therapies;
        if (hasTherapy === true && (!therapies || therapies.trim() === '')) {
          return false;
        }
        return true;
      },
      {
        message: 'Especifique cuáles son las terapias',
        path: ['studentHealth', 'therapies'],
      }
    )
    .refine(
      (data) => {
        const sisben = data.studentHealth.sisben;
        return sisben !== null && sisben !== undefined;
      },
      {
        message: 'Indique si el estudiante tiene SISBEN',
        path: ['studentHealth', 'sisben'],
      }
    )
    .refine(
      (data) => {
        const bloodType = data.studentHealth.bloodType;
        return bloodType !== null && bloodType !== undefined;
      },
      {
        message: 'Seleccione el tipo de sangre',
        path: ['studentHealth', 'bloodType'],
      }
    )
    .refine(
      (data) => {
        const hasAllergy = data.rendererFieldsOnly.studentHealth.hasAllergy;
        return hasAllergy !== null && hasAllergy !== undefined;
      },
      {
        message: 'Indique si el estudiante tiene alergias',
        path: ['rendererFieldsOnly', 'studentHealth', 'hasAllergy'],
      }
    )
    .refine(
      (data) => {
        const hasAllergy = data.rendererFieldsOnly.studentHealth.hasAllergy;
        const allergies = data.studentHealth.allergies;
        if (hasAllergy === true && (!allergies || allergies.trim() === '')) {
          return false;
        }
        return true;
      },
      {
        message: 'Especifique cuáles son las alergias',
        path: ['studentHealth', 'allergies'],
      }
    )
    .refine(
      (data) => {
        const {
          livesWithFather,
          livesWithGrandparents,
          livesWithMother,
          livesWithSiblings,
          livesWithStepfather,
          livesWithStepmother,
          livesWithUncles,
        } = data.familyRelationship;

        return (
          livesWithFather ||
          livesWithMother ||
          livesWithSiblings ||
          livesWithGrandparents ||
          livesWithUncles ||
          livesWithStepfather ||
          livesWithStepmother
        );
      },
      {
        message:
          'Seleccione al menos una opción de con quién vive el estudiante',
        path: ['familyRelationship', 'livesWithMother'],
      }
    )
    // if is not old student, isFirstTime is required
    .refine(
      (data) => {
        const isOldStudent = data.enrollment.isOldStudent;
        const isFirstTime = data.enrollment.isFirstTime;

        if (
          isOldStudent === false &&
          (isFirstTime === null || isFirstTime === undefined)
        ) {
          return false;
        }
        return true;
      },
      {
        message: 'Indique si es primera vez que asiste a un jardín',
        path: ['enrollment', 'isFirstTime'],
      }
    )
    // if is not old student and is not first time, previousSchoolName is required
    .refine(
      (data) => {
        const isOldStudent = data.enrollment.isOldStudent;
        const isFirstTime = data.enrollment.isFirstTime;
        const previousSchoolName = data.enrollment.previousSchoolName;

        if (
          isOldStudent === false &&
          isFirstTime === false &&
          (!previousSchoolName || previousSchoolName.trim() === '')
        ) {
          return false;
        }
        return true;
      },
      {
        message: 'Indique el nombre de la entidad escolar anterior',
        path: ['enrollment', 'previousSchoolName'],
      }
    );

  return enrollmentFormSchema;
}

export { useEnrollmentFormSchema };
