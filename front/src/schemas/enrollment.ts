import { z } from "zod"

const personalStudentInfoSchema = z.object({
  fullName: z.string().min(1, "El nombre es requerido"),
  birthDate: z.string('La fecha de nacimiento es requerida'),
  ageYears: z.number(),
  ageMonths: z.number(),
  birthCity: z.string().min(1, "La ciudad de nacimiento es requerida"),
  civilRegistrationNumber: z.string()
    .min(1, "El N° Registro Civil es requerido")
    .regex(/^\d+$/, "El N° Registro Civil solo debe contener números"),
});

const studentHealthSchema = z.object({
  hasPhysicalDisability: z.boolean(),
  hasHearingDisability: z.boolean(),
  otherDisabilities: z.string().optional(),
  hasAutism: z.boolean(),
  hasDownSyndrome: z.boolean(),
  hasBehavioralDisorders: z.boolean(),
  hasLanguageDisorders: z.boolean(),
  hasHyperactivity: z.boolean(),
  hasAttentionDisorders: z.boolean(),
  hasAnxiety: z.boolean(),
  otherDisorders: z.string().optional(),
  therapies: z.string().optional(),
  hasSisben: z.boolean('Indique si el estudiante tiene SISBEN'),
  eps: z.string().min(1, "La E.P.S es requerida"),
  hasRhPositiveBloodType: z.boolean('Seleccione el tipo de R.H'),
  allergies: z.string().optional(),
  hasEnuresis: z.boolean('Indique si el estudiante presenta enuresis'),
  hasEncopresis: z.boolean('Indique si el estudiante presenta encopresis'),
});

const familyMemberSchema = z.object({
  fullName: z.string().min(1, "El nombre es requerido"),
  birthDate: z.string('La fecha de nacimiento es requerida'),
  ageYears: z.number(),
  address: z.string().min(1, "La dirección es requerida"),
  neighborhood: z.string().min(1, "El barrio es requerido"),
  cellPhoneNumber: z.string().min(1, "El número de celular es requerido"),
  telephoneNumber: z.string().min(1, "El número de teléfono es requerido"),
  occupation: z.string().min(1, "La ocupación es requerida"),
  educationLevel: z.enum(["primary school", "secondary school", "technical", "university"], {
    message: "El nivel educativo es requerido"
  }),
});

const familyRelationshipSchema = z.object({
  livesWithParents: z.boolean(),
  livesWithSiblings: z.boolean(),
  livesWithGrandparents: z.boolean(),
  livesWithUncles: z.boolean(),
  livesWithStepfather: z.boolean(),
  livesWithStepmother: z.boolean(),
  parentsRelationship: z.enum(["married", "common law marriage", "single mother", "separated"], {
    message: "La relación de los padres es requerida"
  }).optional(),
});

const authorizedPersonSchema = z.object({
  fullName: z.string().min(1, "El nombre es requerido"),
  cellPhoneNumber: z.string().min(1, "El número de celular es requerido"),
});

const enrollmentSchema = z.object({
  identificationNumber: z.string(),
  date: z.string(),
  isOldStudent: z.boolean('Indique si el estudiante es antiguo'),
  isFirstTime: z.boolean().optional(),
  previousSchoolName: z.string().optional(),
  entryGrade: z.enum(["walkers", "toddlers", "preschool", "kindergarten", "transition", "first grade"], {
    message: "El grado al que ingresa es requerido"
  }),
});

const rendererFieldsOnlySchema = z.object({
  studentHealth: z.object({
    hasDisability: z.boolean('Indique si el estudiante presenta alguna discapacidad'),
    hasDisabilityOther: z.boolean().optional(),
    hasDisorders: z.boolean('Indique si el estudiante presenta algún trastorno'),
    hasDisorderOther: z.boolean().optional(),
    hasTherapy: z.boolean('Indique si el estudiante asiste a terapia(s)'),
    hasAllergy: z.boolean('Indique si el estudiante tiene alergias'),
  }),
});

const enrollmentFormSchema = z.object({
  personalStudentInfo: personalStudentInfoSchema,
  studentHealth: studentHealthSchema,
  mother: familyMemberSchema,
  father: familyMemberSchema,
  familyRelationship: familyRelationshipSchema,
  enrollment: enrollmentSchema,
  authorizedPersons: z.array(authorizedPersonSchema),
  rendererFieldsOnly: rendererFieldsOnlySchema,
  studentPhoto: z.any().refine((file) => file !== null && file !== undefined, {
    message: "La foto del estudiante es obligatoria"
  }),
  documentsFile: z.any().refine((file) => file !== null && file !== undefined, {
    message: "El archivo PDF de documentos es obligatorio"
  }),
})
  // if was specified that student has disabilities, must specify at least one
  .refine((data) => {
    const hasDisability = data.rendererFieldsOnly.studentHealth.hasDisability;
    const hasPhysical = data.studentHealth.hasPhysicalDisability;
    const hasHearing = data.studentHealth.hasHearingDisability;
    const hasOther = data.rendererFieldsOnly.studentHealth.hasDisabilityOther;

    if (hasDisability === true && !hasPhysical && !hasHearing && !hasOther) {
      return false;
    }
    return true;
  }, {
    message: "Seleccione al menos un tipo de discapacidad",
    path: ["rendererFieldsOnly", "studentHealth", "hasDisability"]
  })
  // if was specified that student has any disability that was not listed, must specify it
  .refine((data) => {
    const hasDisabilityOther = data.rendererFieldsOnly.studentHealth.hasDisabilityOther;
    const otherDisabilities = data.studentHealth.otherDisabilities;
    if (hasDisabilityOther === true && (!otherDisabilities || otherDisabilities.trim() === "")) {
      return false;
    }
    return true;
  }, {
    message: "Especifique cuáles son las otras discapacidades",
    path: ["studentHealth", "otherDisabilities"]
  })
  .refine((data) => {
    const hasDisorders = data.rendererFieldsOnly.studentHealth.hasDisorders;
    return hasDisorders !== null && hasDisorders !== undefined;
  }, {
    message: "Indique si el estudiante presenta algún trastorno",
    path: ["rendererFieldsOnly", "studentHealth", "hasDisorders"]
  })
  // if was specified that student has disorders, must specify at least one
  .refine((data) => {
    const hasDisorders = data.rendererFieldsOnly.studentHealth.hasDisorders;
    const {
      hasAutism,
      hasDownSyndrome,
      hasBehavioralDisorders,
      hasLanguageDisorders,
      hasHyperactivity,
      hasAttentionDisorders,
      hasAnxiety,
    } = data.studentHealth;
    const hasOther = data.rendererFieldsOnly.studentHealth.hasDisorderOther;

    if (hasDisorders === true && !(
      hasAutism ||
      hasDownSyndrome ||
      hasBehavioralDisorders ||
      hasLanguageDisorders ||
      hasHyperactivity ||
      hasAttentionDisorders ||
      hasAnxiety ||
      hasOther
    )) {
      return false;
    }
    return true;
  }, {
    message: "Seleccione al menos un tipo de trastorno",
    path: ["rendererFieldsOnly", "studentHealth", "hasDisorders"]
  })
  // if was specified that student has any disorder that was not listed, must specify it
  .refine((data) => {
    const hasDisorderOther = data.rendererFieldsOnly.studentHealth.hasDisorderOther;
    const otherDisorders = data.studentHealth.otherDisorders;
    if (hasDisorderOther === true && (!otherDisorders || otherDisorders.trim() === "")) {
      return false;
    }
    return true;
  }, {
    message: "Especifique cuáles son los otros trastornos",
    path: ["studentHealth", "otherDisorders"]
  })
  .refine((data) => {
    const hasTherapy = data.rendererFieldsOnly.studentHealth.hasTherapy;
    return hasTherapy !== null && hasTherapy !== undefined;
  }, {
    message: "Indique si el estudiante asiste a terapia(s)",
    path: ["rendererFieldsOnly", "studentHealth", "hasTherapy"]
  })
  .refine((data) => {
    const hasTherapy = data.rendererFieldsOnly.studentHealth.hasTherapy;
    const therapies = data.studentHealth.therapies;
    if (hasTherapy === true && (!therapies || therapies.trim() === "")) {
      return false;
    }
    return true;
  }, {
    message: "Especifique cuáles son las terapias",
    path: ["studentHealth", "therapies"]
  })
  .refine((data) => {
    const hasSisben = data.studentHealth.hasSisben;
    return hasSisben !== null && hasSisben !== undefined;
  }, {
    message: "Indique si el estudiante tiene SISBEN",
    path: ["studentHealth", "hasSisben"]
  })
  .refine((data) => {
    const hasRhPositiveBloodType = data.studentHealth.hasRhPositiveBloodType;
    return hasRhPositiveBloodType !== null && hasRhPositiveBloodType !== undefined;
  }, {
    message: "Seleccione el tipo de R.H",
    path: ["studentHealth", "hasRhPositiveBloodType"]
  })
  .refine((data) => {
    const hasAllergy = data.rendererFieldsOnly.studentHealth.hasAllergy;
    return hasAllergy !== null && hasAllergy !== undefined;
  }, {
    message: "Indique si el estudiante tiene alergias",
    path: ["rendererFieldsOnly", "studentHealth", "hasAllergy"]
  })
  .refine((data) => {
    const hasAllergy = data.rendererFieldsOnly.studentHealth.hasAllergy;
    const allergies = data.studentHealth.allergies;
    if (hasAllergy === true && (!allergies || allergies.trim() === "")) {
      return false;
    }
    return true;
  }, {
    message: "Especifique cuáles son las alergias",
    path: ["studentHealth", "allergies"]
  })
  .refine((data) => {
    const hasEnuresis = data.studentHealth.hasEnuresis;
    return hasEnuresis !== null && hasEnuresis !== undefined;
  }, {
    message: "Indique si el estudiante tiene enuresis",
    path: ["studentHealth", "hasEnuresis"]
  })
  .refine((data) => {
    const hasEncopresis = data.studentHealth.hasEncopresis;
    return hasEncopresis !== null && hasEncopresis !== undefined;
  }, {
    message: "Indique si el estudiante tiene encopresis",
    path: ["studentHealth", "hasEncopresis"]
  })
  .refine((data) => {
    const {
      livesWithParents,
      livesWithSiblings,
      livesWithGrandparents,
      livesWithUncles,
      livesWithStepfather,
      livesWithStepmother,
    } = data.familyRelationship;

    return livesWithParents || livesWithSiblings || livesWithGrandparents || livesWithUncles || livesWithStepfather || livesWithStepmother;
  }, {
    message: "Seleccione al menos una opción de con quién vive el estudiante",
    path: ["familyRelationship", "livesWithParents"]
  })
  .refine((data) => {
    const parentsRelationship = data.familyRelationship.parentsRelationship;
    return parentsRelationship !== null && parentsRelationship !== undefined;
  }, {
    message: "Indique la relación de los padres",
    path: ["familyRelationship", "parentsRelationship"]
  })
  .refine((data) => {
    const isOldStudent = data.enrollment.isOldStudent;
    return isOldStudent !== null && isOldStudent !== undefined;
  }, {
    message: "Indique si es estudiante antiguo",
    path: ["enrollment", "isOldStudent"]
  })
  // if is not old student, isFirstTime is required
  .refine((data) => {
    const isOldStudent = data.enrollment.isOldStudent;
    const isFirstTime = data.enrollment.isFirstTime;

    if (isOldStudent === false && (isFirstTime === null || isFirstTime === undefined)) {
      return false;
    }
    return true;
  }, {
    message: "Indique si es primera vez que asiste a un jardín",
    path: ["enrollment", "isFirstTime"]
  })
  // if is not old student and is not first time, previousSchoolName is required
  .refine((data) => {
    const isOldStudent = data.enrollment.isOldStudent;
    const isFirstTime = data.enrollment.isFirstTime;
    const previousSchoolName = data.enrollment.previousSchoolName;

    if (isOldStudent === false && isFirstTime === false && (!previousSchoolName || previousSchoolName.trim() === "")) {
      return false;
    }
    return true;
  }, {
    message: "Indique el nombre de la entidad escolar anterior",
    path: ["enrollment", "previousSchoolName"]
  })
  .refine((data) => {
    const entryGrade = data.enrollment.entryGrade;
    return entryGrade !== null && entryGrade !== undefined;
  }, {
    message: "Seleccione el grado al que ingresa",
    path: ["enrollment", "entryGrade"]
  })
  // if any person is authorized, all of them must have a name and a phone
  .refine((data) => {
    const authorizedPersons = data.authorizedPersons;
    for (let i = 0; i < authorizedPersons.length; i++) {
      const person = authorizedPersons[i];
      const hasName = person.fullName && person.fullName.trim() !== "";
      const hasPhone = person.cellPhoneNumber && person.cellPhoneNumber.trim() !== "";

      if ((hasName || hasPhone) && (!hasName || !hasPhone)) {
        return false;
      }
    }
    return true;
  }, {
    message: "Complete el nombre y celular de todas las personas autorizadas",
    path: ["authorizedPersons"]
  });

export { enrollmentFormSchema };
  