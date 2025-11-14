"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { DatePicker } from '@/components/ui/date-picker'
import { AppSelect } from '@/components/ui/app-select'
import { Separator } from "@/components/ui/separator"
import { PictureFileInput } from '@/components/matricular-estudiante/picture-file-input'
import { PDFFileInput } from '@/components/matricular-estudiante/pdf-file-input'
import Image from "next/image"
import { useForm, SubmitHandler, Controller, useFieldArray, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Zod validation schema
const educationLevelOptions = [
  { value: "primary school", label: "Primaria" },
  { value: "secondary school", label: "Secundaria" },
  { value: "technical", label: "Técnica" },
  { value: "university", label: "Universitario" }
];

const parentsRelationshipOptions = [
  { value: "married", label: "Casados" },
  { value: "common law marriage", label: "Unión libre" },
  { value: "single mother", label: "Madre soltera" },
  { value: "separated", label: "Separados" }
];

const gradeOptions = [
  { value: "walkers", label: "Caminadores" },
  { value: "toddlers", label: "Párvulos" },
  { value: "preschool", label: "Pre jardín" },
  { value: "kindergarten", label: "Jardín" },
  { value: "transition", label: "Transición" },
  { value: "first grade", label: "Primero" }
];

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
  isOldStudent: z.boolean().optional(),
  isFirstTime: z.boolean().optional(),
  previousSchoolName: z.string().optional(),
  entryGrade: z.enum(["walkers", "toddlers", "preschool", "kindergarten", "transition", "first grade"], {
    message: "El grado al que ingresa es requerido"
  }).optional(),
});

const rendererFieldsOnlySchema = z.object({
  studentHealth: z.object({
    hasDisability: z.boolean('Indique si el estudiante presenta alguna discapacidad'),
    hasDisabilityOther: z.boolean().optional(),
    hasDisorders: z.boolean('Indique si el estudiante presenta algun trastorno'),
    hasDisorderOther: z.boolean().optional(),
    hasTherapy: z.boolean('Indique si el estudiante asiste a terapia(s)'),
    hasAllergy: z.boolean('Indique si el estudiante tiene alergias'),
  }),
});

const formSchema = z.object({
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
  // Validación: Si hasDisability es true, debe seleccionar al menos una opción
  .refine((data) => {
    const hasDisability = data.rendererFieldsOnly.studentHealth.hasDisability;
    const hasPhysical = data.studentHealth.hasPhysicalDisability;
    const hasHearing = data.studentHealth.hasHearingDisability;
    const hasOther = data.rendererFieldsOnly.studentHealth.hasDisabilityOther;

    console.log(hasDisability + " " + hasPhysical + " " + hasHearing + " " + hasOther);

    if (hasDisability === true && !hasPhysical && !hasHearing && !hasOther) {
      return false;
    }
    return true;
  }, {
    message: "Seleccione al menos un tipo de discapacidad",
    path: ["rendererFieldsOnly", "studentHealth", "hasDisability"]
  })
  // Validación: Si hasDisabilityOther es true, debe especificar cuáles
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
  // Validación: hasDisorders debe estar seleccionado
  .refine((data) => {
    const hasDisorders = data.rendererFieldsOnly.studentHealth.hasDisorders;
    return hasDisorders !== null && hasDisorders !== undefined;
  }, {
    message: "Indique si el estudiante presenta algún trastorno",
    path: ["rendererFieldsOnly", "studentHealth", "hasDisorders"]
  })
  // Validación: Si hasDisorders es true, debe seleccionar al menos una opción
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
  // Validación: Si hasDisorderOther es true, debe especificar cuáles
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
  // Validación: hasTherapy debe estar seleccionado
  .refine((data) => {
    const hasTherapy = data.rendererFieldsOnly.studentHealth.hasTherapy;
    return hasTherapy !== null && hasTherapy !== undefined;
  }, {
    message: "Indique si el estudiante asiste a terapia(s)",
    path: ["rendererFieldsOnly", "studentHealth", "hasTherapy"]
  })
  // Validación: Si hasTherapy es true, debe especificar cuáles
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
  // Validación: hasSisben debe estar seleccionado
  .refine((data) => {
    const hasSisben = data.studentHealth.hasSisben;
    return hasSisben !== null && hasSisben !== undefined;
  }, {
    message: "Indique si el estudiante tiene SISBEN",
    path: ["studentHealth", "hasSisben"]
  })
  // Validación: hasRhPositiveBloodType debe estar seleccionado
  .refine((data) => {
    const hasRhPositiveBloodType = data.studentHealth.hasRhPositiveBloodType;
    return hasRhPositiveBloodType !== null && hasRhPositiveBloodType !== undefined;
  }, {
    message: "Seleccione el tipo de R.H",
    path: ["studentHealth", "hasRhPositiveBloodType"]
  })
  // Validación: hasAllergy debe estar seleccionado
  .refine((data) => {
    const hasAllergy = data.rendererFieldsOnly.studentHealth.hasAllergy;
    return hasAllergy !== null && hasAllergy !== undefined;
  }, {
    message: "Indique si el estudiante tiene alergias",
    path: ["rendererFieldsOnly", "studentHealth", "hasAllergy"]
  })
  // Validación: Si hasAllergy es true, debe especificar cuáles
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
  // Validación: hasEnuresis debe estar seleccionado
  .refine((data) => {
    const hasEnuresis = data.studentHealth.hasEnuresis;
    return hasEnuresis !== null && hasEnuresis !== undefined;
  }, {
    message: "Indique si el estudiante tiene enuresis",
    path: ["studentHealth", "hasEnuresis"]
  })
  // Validación: hasEncopresis debe estar seleccionado
  .refine((data) => {
    const hasEncopresis = data.studentHealth.hasEncopresis;
    return hasEncopresis !== null && hasEncopresis !== undefined;
  }, {
    message: "Indique si el estudiante tiene encopresis",
    path: ["studentHealth", "hasEncopresis"]
  })
  // Validación: Debe vivir con al menos una persona
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
  // Validación: parentsRelationship debe estar seleccionado
  .refine((data) => {
    const parentsRelationship = data.familyRelationship.parentsRelationship;
    return parentsRelationship !== null && parentsRelationship !== undefined;
  }, {
    message: "Indique la relación de los padres",
    path: ["familyRelationship", "parentsRelationship"]
  })
  // Validación: isOldStudent debe estar seleccionado
  .refine((data) => {
    const isOldStudent = data.enrollment.isOldStudent;
    return isOldStudent !== null && isOldStudent !== undefined;
  }, {
    message: "Indique si es estudiante antiguo",
    path: ["enrollment", "isOldStudent"]
  })
  // Validación: Si no es estudiante antiguo, isFirstTime es obligatorio
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
  // Validación: Si no es estudiante antiguo y no es primera vez, debe especificar el jardín anterior
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
  // Validación: entryGrade debe estar seleccionado
  .refine((data) => {
    const entryGrade = data.enrollment.entryGrade;
    return entryGrade !== null && entryGrade !== undefined;
  }, {
    message: "Seleccione el grado al que ingresa",
    path: ["enrollment", "entryGrade"]
  })
  // Validación: Personas autorizadas deben tener ambos campos llenos si se agrega alguno
  .refine((data) => {
    const authorizedPersons = data.authorizedPersons;
    for (let i = 0; i < authorizedPersons.length; i++) {
      const person = authorizedPersons[i];
      const hasName = person.fullName && person.fullName.trim() !== "";
      const hasPhone = person.cellPhoneNumber && person.cellPhoneNumber.trim() !== "";

      // Si alguno de los campos tiene contenido, ambos deben estar llenos
      if ((hasName || hasPhone) && (!hasName || !hasPhone)) {
        return false;
      }
    }
    return true;
  }, {
    message: "Complete el nombre y celular de todas las personas autorizadas",
    path: ["authorizedPersons"]
  });

type FormInput = z.infer<typeof formSchema>;

export function EnrollmentForm() {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      studentHealth: {
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
      },
      familyRelationship: {
        livesWithParents: false,
        livesWithSiblings: false,
        livesWithGrandparents: false,
        livesWithUncles: false,
        livesWithStepfather: false,
        livesWithStepmother: false,
        parentsRelationship: undefined,
      },
      enrollment: {
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
      },
      rendererFieldsOnly: {
        studentHealth: {
          hasDisability: undefined,
          hasDisabilityOther: false,
          hasDisorders: undefined,
          hasDisorderOther: false,
          hasTherapy: undefined,
          hasAllergy: undefined,
        }
      },
      studentPhoto: null,
      documentsFile: null,
    },
  })

  const watchedValues = useWatch({ control })

  const validateAndFixFormConsistency = () => {
    // if any field is "no", clear related fields
    if (watchedValues.rendererFieldsOnly?.studentHealth?.hasDisability === false) {
      setValue("studentHealth.hasPhysicalDisability", false);
      setValue("studentHealth.hasHearingDisability", false);
      setValue("studentHealth.otherDisabilities", "");
      setValue("rendererFieldsOnly.studentHealth.hasDisabilityOther", false);
    }

    if (watchedValues.rendererFieldsOnly?.studentHealth?.hasDisorders === false) {
      setValue("studentHealth.hasAutism", false);
      setValue("studentHealth.hasDownSyndrome", false);
      setValue("studentHealth.hasBehavioralDisorders", false);
      setValue("studentHealth.hasLanguageDisorders", false);
      setValue("studentHealth.hasHyperactivity", false);
      setValue("studentHealth.hasAttentionDisorders", false);
      setValue("studentHealth.hasAnxiety", false);
      setValue("studentHealth.otherDisorders", "");
      setValue("rendererFieldsOnly.studentHealth.hasDisorderOther", false);
    }

    if (watchedValues.rendererFieldsOnly?.studentHealth?.hasTherapy === false) {
      setValue("studentHealth.therapies", "");
    }

    if (watchedValues.rendererFieldsOnly?.studentHealth?.hasAllergy === false) {
      setValue("studentHealth.allergies", "");
    }

    if (watchedValues?.enrollment?.isFirstTime === true) {
      setValue("enrollment.previousSchoolName", "");
    }

    if (watchedValues?.enrollment?.isOldStudent === true) {
      setValue("enrollment.previousSchoolName", "Jardín Infantil Mi Mundo Creativo");
      setValue("enrollment.isFirstTime", false);
    }

    if (watchedValues?.enrollment?.isOldStudent === false && watchedValues?.enrollment?.isFirstTime === undefined) {
      // Trigger validation for isFirstTime
    }
  }

  const submitForm: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  }

  const onFormSubmit = (data: FormInput, event?: React.BaseSyntheticEvent) => {
    validateAndFixFormConsistency();
    submitForm(data, event);
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const {
    fields: authorizedPersonsFields,
    append: appendAuthorizedPerson,
    remove: removeAuthorizedPerson
  } = useFieldArray({
    control,
    name: "authorizedPersons"
  })

  const calculateAgeYears = (d: Date) => {
    const today = new Date()
    let years = today.getFullYear() - d.getFullYear()
    const monthDiff = today.getMonth() - d.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < d.getDate())) {
      years--
    }
    return years
  }

  const calculateAgeMonths = (d: Date) => {
    const today = new Date()
    let months = (today.getFullYear() - d.getFullYear()) * 12
    months += today.getMonth() - d.getMonth()
    if (today.getDate() < d.getDate()) {
      months--
    }
    return months % 12
  }

  console.log(watchedValues);
  console.log(errors);
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <Image width="40" height="40" src="/logo.svg" alt="Logo Jardín Infantil" className="size-40 my-auto object-contain" />
            <div className="font-semibold text-center my-auto">
              <h2 className="text-sm font-semibold text-primary">Jardín Infantil</h2>
              <h1 className="text-2xl font-bold text-primary">MI MUNDO CREATIVO</h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                &ldquo;Educación con VALORES y manejo de las EMOCIONES para la vida&rdquo;
              </p>
              <p className="text-xs text-muted-foreground">Licencia de Funcionamiento 000028 del 24 de enero 2024</p>
              <p className="text-xs text-muted-foreground">
                Código DANE N° 32000180049
              </p>
            </div>
            <Controller
              name="studentPhoto"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2 items-center">
                  <PictureFileInput 
                    onFileSelect={(file) => {
                      field.onChange(file);
                    }}
                  />
                  {errors.studentPhoto && (
                    <span className="text-sm text-red-600 text-center">
                      {String(errors.studentPhoto?.message)}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-primary">LIBRO DE MATRICULA</h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col">
            <div className='flex flex-col gap-4'>
              <h3 className="text-lg font-bold text-primary">
                Información personal del estudiante
              </h3>

              <div className='flex flex-col gap-4 w-full'>
                <Label htmlFor="personalStudentInfo.fullName">Nombre completo:</Label>
                <Input id="personalStudentInfo.fullName" {...register("personalStudentInfo.fullName")} />
                {errors.personalStudentInfo?.fullName && (<span className="text-sm text-red-600 -mt-2">{errors.personalStudentInfo?.fullName?.message}</span>)}
              </div>

              <div className='flex gap-4 flex-wrap'>
                <div className='flex flex-col gap-2'>
                  <Controller
                    name="personalStudentInfo.birthDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label='Fecha de nacimiento:'
                        onChange={(d) => {
                          field.onChange(formatDate(d))
                          const calculatedAgeYears = calculateAgeYears(d)
                          setValue("personalStudentInfo.ageYears", calculatedAgeYears)
                          const calculatedAgeMonths = calculateAgeMonths(d)
                          setValue("personalStudentInfo.ageMonths", calculatedAgeMonths)
                        }}
                        value={field.value ? new Date(field.value.split('/').reverse().join('-')) : null}
                        id="personalStudentInfo.birthDate"
                      />
                    )}
                  />
                  {errors.personalStudentInfo?.birthDate && (<span className="text-sm text-red-600">{errors.personalStudentInfo?.birthDate?.message}</span>)}
                </div>

                <div className="flex flex-col gap-4 w-16">
                  <Label htmlFor="personalStudentInfo.ageYears">Años:</Label>
                  <Input
                    id="personalStudentInfo.ageYears"
                    type="number"
                    disabled={true}
                    readOnly
                    {...register("personalStudentInfo.ageYears")}
                  />
                </div>

                <div className="flex flex-col gap-4 w-16">
                  <Label htmlFor="personalStudentInfo.ageMonths">Meses:</Label>
                  <Input
                    id="personalStudentInfo.ageMonths"
                    type="number"
                    disabled={true}
                    readOnly
                    {...register("personalStudentInfo.ageMonths")}
                  />
                </div>

                <div className='flex flex-col gap-4 min-w-48'>
                  <Label htmlFor="personalStudentInfo.birthCity">Ciudad de nacimiento:</Label>
                  <Input id="personalStudentInfo.birthCity" {...register("personalStudentInfo.birthCity")} />
                  {errors.personalStudentInfo?.birthCity && (<span className="text-sm text-red-600 -mt-2">{errors.personalStudentInfo?.birthCity?.message}</span>)}
                </div>

                <div className='flex flex-col gap-4 min-w-48'>
                  <Label htmlFor="personalStudentInfo.civilRegistrationNumber">N° Registro Civil:</Label>
                  <Input id="personalStudentInfo.civilRegistrationNumber" {...register("personalStudentInfo.civilRegistrationNumber")} />
                  {errors.personalStudentInfo?.civilRegistrationNumber && (<span className="text-sm text-red-600 -mt-2">{errors.personalStudentInfo?.civilRegistrationNumber?.message}</span>)}
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <div className='flex flex-col gap-4'>
              <h3 className="text-lg font-bold text-primary">
                Salud del estudiante
              </h3>
              <div className="flex items-end gap-4 flex-wrap">
                <div className="flex flex-col gap-4">
                  <Label htmlFor='health.hasDisability'>Presenta alguna discapacidad:</Label>

                  <Controller
                    name='rendererFieldsOnly.studentHealth.hasDisability'
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        id='rendererFieldsOnly.studentHealth.hasDisability'
                        options={[
                          { value: "yes", label: "Sí" },
                          { value: "no", label: "No" }
                        ]}
                        className='w-52'
                        placeholder='Seleccione una opción'
                        value={field.value === true ? "yes" : field.value === false ? "no" : ""}
                        onValueChange={(v) => {
                          const boolValue = v === "yes";
                          field.onChange(boolValue);
                          setValue('rendererFieldsOnly.studentHealth.hasDisability', boolValue);
                        }}
                      />
                    )}
                  />

                  {errors.rendererFieldsOnly?.studentHealth?.hasDisability && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.rendererFieldsOnly?.studentHealth?.hasDisability?.message}
                    </span>
                  )}
                </div>

                {watchedValues.rendererFieldsOnly?.studentHealth?.hasDisability && (
                  <>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasPhysicalDisability"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id='studentHealth.hasPhysicalDisability'
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor='studentHealth.hasPhysicalDisability'>Física</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasHearingDisability"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id='studentHealth.hasHearingDisability'
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                          />
                        )}
                      />
                      <Label htmlFor='studentHealth.hasHearingDisability'>Auditiva</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name='rendererFieldsOnly.studentHealth.hasDisabilityOther'
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id='rendererFieldsOnly.studentHealth.hasDisabilityOther'
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                          />
                        )}
                      />
                      <Label htmlFor='rendererFieldsOnly.studentHealth.hasDisabilityOther'>Otra(s)</Label>
                    </div>

                    {watchedValues.rendererFieldsOnly?.studentHealth?.hasDisabilityOther && (
                      <div className="flex flex-col gap-4 min-w-96 flex-1">
                        <Label htmlFor="studentHealth.otherDisabilities">¿Cuál(es)?</Label>
                        <Input id='studentHealth.otherDisabilities' {...register("studentHealth.otherDisabilities")} />
                        {errors.studentHealth?.otherDisabilities && (
                          <span className="text-sm text-red-600 -mt-2">
                            {errors.studentHealth?.otherDisabilities?.message}
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-end gap-4 flex-wrap">
                <div className="flex flex-col gap-4">
                  <Label htmlFor='health.hasDisorder'>Presenta algún trastorno:</Label>

                  <Controller
                    name='rendererFieldsOnly.studentHealth.hasDisorders'
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        id='rendererFieldsOnly.studentHealth.hasDisorders'
                        options={[
                          { value: 'yes', label: 'Sí' },
                          { value: 'no', label: 'No' },
                        ]}
                        className='w-52'
                        placeholder='Seleccione una opción'
                        value={
                          field.value === true
                            ? 'yes'
                            : field.value === false
                              ? 'no'
                              : ''
                        }
                        onValueChange={(v) => {
                          const boolValue = v === 'yes';
                          field.onChange(boolValue);
                          setValue('rendererFieldsOnly.studentHealth.hasDisorders', boolValue);
                        }}
                      />
                    )}
                  />

                  {errors.rendererFieldsOnly?.studentHealth?.hasDisorders && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.rendererFieldsOnly?.studentHealth?.hasDisorders?.message}
                    </span>
                  )}
                </div>

                {/* Campos condicionales */}
                {watchedValues.rendererFieldsOnly?.studentHealth?.hasDisorders === true && (
                  <div className="flex items-end gap-4 flex-wrap">
                    {/* Checkbox: Autismo */}
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasAutism"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="studentHealth.hasAutism"
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                          />
                        )}
                      />
                      <Label htmlFor="studentHealth.hasAutism">Autismo</Label>
                    </div>

                    {/* Checkbox: Síndrome de Down */}
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasDownSyndrome"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="studentHealth.hasDownSyndrome"
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                          />
                        )}
                      />
                      <Label htmlFor="studentHealth.hasDownSyndrome">Síndrome de Down</Label>
                    </div>

                    {/* Checkbox: Conductual */}
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasBehavioralDisorders"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="studentHealth.hasBehavioralDisorders"
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                          />
                        )}
                      />
                      <Label htmlFor="studentHealth.hasBehavioralDisorders">Conductual</Label>
                    </div>

                    {/* Checkbox: Lenguaje */}
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasLanguageDisorders"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="studentHealth.hasLanguageDisorders"
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                          />
                        )}
                      />
                      <Label htmlFor="studentHealth.hasLanguageDisorders">Lenguaje</Label>
                    </div>

                    {/* Checkbox: Hiperactividad */}
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasHyperactivity"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="studentHealth.hasHyperactivity"
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                          />
                        )}
                      />
                      <Label htmlFor="studentHealth.hasHyperactivity">Hiperactividad</Label>
                    </div>

                    {/* Checkbox: Atención */}
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasAttentionDisorders"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="studentHealth.hasAttentionDisorders"
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                          />
                        )}
                      />
                      <Label htmlFor="studentHealth.hasAttentionDisorders">Atención</Label>
                    </div>

                    {/* Checkbox: Ansiedad */}
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasAnxiety"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="studentHealth.hasAnxiety"
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                          />
                        )}
                      />
                      <Label htmlFor="studentHealth.hasAnxiety">Ansiedad</Label>
                    </div>

                    {/* Checkbox: Otro(s) */}
                    <div className="flex items-center gap-2">
                      <Controller
                        name="rendererFieldsOnly.studentHealth.hasDisorderOther"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="rendererFieldsOnly.studentHealth.hasDisorderOther"
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                          />
                        )}
                      />
                      <Label htmlFor="rendererFieldsOnly.studentHealth.hasDisorderOther">Otro(s)</Label>
                    </div>

                    {/* Campo "¿Cuál(es)?" */}
                    {watchedValues.rendererFieldsOnly?.studentHealth?.hasDisorderOther && (
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="studentHealth.otherDisorders">¿Cuál(es)?</Label>
                        <Input {...register('studentHealth.otherDisorders')} id="studentHealth.otherDisorders" />
                        {errors.studentHealth?.otherDisorders && (
                          <span className="text-sm text-red-600 -mt-2">
                            {errors.studentHealth?.otherDisorders?.message}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="studentHealth.hasTherapy">Asiste a terapia(s):</Label>
                  <Controller
                    name='rendererFieldsOnly.studentHealth.hasTherapy'
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        id='rendererFieldsOnly.studentHealth.hasTherapy'
                        options={[
                          { value: "yes", label: "Sí" },
                          { value: "no", label: "No" }
                        ]}
                        className='w-52'
                        placeholder='Seleccione una opción'
                        value={field.value === true ? "yes" : field.value === false ? "no" : ""}
                        onValueChange={(v) => { field.onChange(v === "yes") }}
                      />
                    )}
                  />
                  {errors.rendererFieldsOnly?.studentHealth?.hasTherapy && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.rendererFieldsOnly?.studentHealth?.hasTherapy.message}
                    </span>
                  )}
                </div>

                {watchedValues.rendererFieldsOnly?.studentHealth?.hasTherapy && (
                  <div className="flex flex-col gap-4 w-full">
                    <Label htmlFor="studentHealth.therapies">¿Cuál(es)?</Label>
                    <Input {...register("studentHealth.therapies")} id="studentHealth.therapies" />
                    {errors.studentHealth?.therapies && (
                      <span className="text-sm text-red-600 -mt-2">
                        {errors.studentHealth?.therapies.message}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Label htmlFor='studentHealth.hasSisben'>Tiene SISBEN:</Label>
                  <Controller
                    name={'studentHealth.hasSisben'}
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        id='studentHealth.hasSisben'
                        options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]}
                        className='w-52'
                        placeholder='Seleccione una opción'
                        value={field.value === true ? "yes" : field.value === false ? "no" : ""}
                        onValueChange={(v) => field.onChange(v === "yes")}
                      />
                    )}
                  />
                  {errors.studentHealth?.hasSisben && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.studentHealth?.hasSisben.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <Label htmlFor="studentHealth.eps">E.P.S:</Label>
                  <Input id="studentHealth.eps" {...register("studentHealth.eps")} />
                  {errors.studentHealth?.eps && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.studentHealth?.eps.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <Label htmlFor="studentHealth.hasRhPositiveBloodType">R.H:</Label>
                  <Controller
                    name={'studentHealth.hasRhPositiveBloodType'}
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        id='studentHealth.hasRhPositiveBloodType'
                        options={[{ value: "positive", label: "Positivo" }, { value: "negative", label: "Negativo" }]}
                        className='w-52'
                        placeholder='Seleccione una opción'
                        value={field.value === true ? "positive" : field.value === false ? "negative" : ""}
                        onValueChange={(v) => field.onChange(v === "positive")}
                      />
                    )}
                  />
                  {errors.studentHealth?.hasRhPositiveBloodType && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.studentHealth?.hasRhPositiveBloodType.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Alergias */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="studentHealth.hasAllergy">Tiene alergias:</Label>
                  <Controller
                    name='rendererFieldsOnly.studentHealth.hasAllergy'
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        id='rendererFieldsOnly.studentHealth.hasAllergy'
                        options={[
                          { value: "yes", label: "Sí" },
                          { value: "no", label: "No" }
                        ]}
                        className='w-52'
                        placeholder='Seleccione una opción'
                        value={field.value === true ? "yes" : field.value === false ? "no" : ""}
                        onValueChange={(v) => { field.onChange(v === "yes") }}
                      />
                    )}
                  />
                  {errors.rendererFieldsOnly?.studentHealth?.hasAllergy && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.rendererFieldsOnly?.studentHealth?.hasAllergy.message}
                    </span>
                  )}
                </div>

                {watchedValues.rendererFieldsOnly?.studentHealth?.hasAllergy && (
                  <div className="flex flex-col gap-4 w-full">
                    <Label htmlFor="studentHealth.allergies">¿Cuál(es)?</Label>
                    <Input id='studentHealth.allergies' {...register("studentHealth.allergies")} />
                    {errors.studentHealth?.allergies && (
                      <span className="text-sm text-red-600 -mt-2">
                        {errors.studentHealth?.allergies.message}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Label htmlFor='studentHealth.hasEnuresis'>Tiene enuresis:</Label>
                  <Controller
                    name={'studentHealth.hasEnuresis'}
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        id='studentHealth.hasEnuresis'
                        options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]}
                        className='w-52'
                        placeholder='Seleccione una opción'
                        value={field.value === true ? "yes" : field.value === false ? "no" : ""}
                        onValueChange={(v) => field.onChange(v === "yes")}
                      />
                    )}
                  />
                  {errors.studentHealth?.hasEnuresis && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.studentHealth?.hasEnuresis.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <Label htmlFor='studentHealth.hasEncopresis'>Tiene encopresis:</Label>
                  <Controller
                    name={'studentHealth.hasEncopresis'}
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        id='studentHealth.hasEncopresis'
                        options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]}
                        className='w-52'
                        placeholder='Seleccione una opción'
                        value={field.value === true ? "yes" : field.value === false ? "no" : ""}
                        onValueChange={(v) => field.onChange(v === "yes")}
                      />
                    )}
                  />
                  {errors.studentHealth?.hasEncopresis && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.studentHealth?.hasEncopresis.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <div key="section-for-mother">
              <div className='flex flex-col gap-4'>
                <h3 className="text-lg font-bold text-primary">
                  Información de la madre
                </h3>
                <div className='flex flex-col gap-4 w-full'>
                  <Label htmlFor="mother.fullName">Nombre completo:</Label>
                  <Input id="mother.fullName"  {...register("mother.fullName")} />
                  {errors.mother?.fullName && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.mother?.fullName.message}
                    </span>
                  )}
                </div>

                <div className='flex gap-4'>
                  <div className='flex flex-col gap-2'>
                    <Controller
                      name="mother.birthDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          id="mother.birthDate"
                          label='Fecha de nacimiento:'
                          onChange={(d) => {
                            field.onChange(formatDate(d))
                            setValue("mother.ageYears", calculateAgeYears(d))
                          }}
                          value={field.value ? new Date(field.value.split('/').reverse().join('-')) : null}
                        />
                      )}
                    />
                    {errors.mother?.birthDate && (
                      <span className="text-sm text-red-600">
                        {errors.mother?.birthDate.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 w-16">
                    <Label htmlFor="mother.ageYears">Años:</Label>
                    <Input id="mother.ageYears" type="number" disabled={true} readOnly {...register("mother.ageYears")} />
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex flex-col gap-4 w-full'>
                    <Label htmlFor="mother.address">Dirección:</Label>
                    <Input {...register("mother.address")} id="mother.address" />
                    {errors.mother?.address && (
                      <span className="text-sm text-red-600 -mt-2">
                        {errors.mother?.address.message}
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col gap-4 w-full'>
                    <Label htmlFor="mother.neighborhood">Barrio:</Label>
                    <Input {...register("mother.neighborhood")} id="mother.neighborhood" />
                    {errors.mother?.neighborhood && (
                      <span className="text-sm text-red-600 -mt-2">
                        {errors.mother?.neighborhood.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex flex-col gap-4 w-full'>
                    <Label htmlFor="mother.cellPhoneNumber">Celular:</Label>
                    <Input {...register("mother.cellPhoneNumber")} id="mother.cellPhoneNumber" type="tel" aria-label="Número de celular del la madre" />
                    {errors.mother?.cellPhoneNumber && (
                      <span className="text-sm text-red-600 -mt-2">
                        {errors.mother?.cellPhoneNumber.message}
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col gap-4 w-full'>
                    <Label htmlFor="mother.telephoneNumber">Teléfono:</Label>
                    <Input {...register("mother.telephoneNumber")} id="mother.telephoneNumber" type="tel" aria-label="Número de teléfono del la madre" />
                    {errors.mother?.telephoneNumber && (
                      <span className="text-sm text-red-600 -mt-2">
                        {errors.mother?.telephoneNumber.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className='flex flex-col gap-4'>
                  <Label htmlFor="mother.occupation">Ocupación o profesión:</Label>
                  <Input {...register("mother.occupation")} id="mother.occupation" className="w-full" />
                  {errors.mother?.occupation && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.mother?.occupation.message}
                    </span>
                  )}
                </div>

                <div className='flex flex-col gap-4'>
                  <Label htmlFor="mother.educationLevel">Nivel educativo:</Label>
                  <Controller
                    name="mother.educationLevel"
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        id="mother.educationLevel"
                        options={educationLevelOptions}
                        className='w-52'
                        placeholder='Seleccione una opción'
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    )}
                  />
                  {errors.mother?.educationLevel ? (
                    <span key={`mother-education-error-${errors.mother?.educationLevel.message}`} className="text-sm text-red-600 -mt-2">
                      {errors.mother?.educationLevel.message}
                    </span>
                  ) : null}
                </div>
              </div>
              <Separator className="my-8" />
            </div>

            <div key="section-for-father">
              <div className='flex flex-col gap-4'>
                <h3 className="text-lg font-bold text-primary">
                  Información del padre
                </h3>
                <div className='flex flex-col gap-4 w-full'>
                  <Label htmlFor="father.fullName">Nombre completo:</Label>
                  <Input id="father.fullName"  {...register("father.fullName")} />
                  {errors.father?.fullName && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.father?.fullName.message}
                    </span>
                  )}
                </div>

                <div className='flex gap-4'>
                  <div className='flex flex-col gap-2'>
                    <Controller
                      name="father.birthDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          id="father.birthDate"
                          label='Fecha de nacimiento:'
                          onChange={(d) => {
                            field.onChange(formatDate(d))
                            setValue("father.ageYears", calculateAgeYears(d))
                          }}
                          value={field.value ? new Date(field.value.split('/').reverse().join('-')) : null}
                        />
                      )}
                    />
                    {errors.father?.birthDate && (
                      <span className="text-sm text-red-600">
                        {errors.father?.birthDate.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 w-16">
                    <Label htmlFor="father.ageYears">Años:</Label>
                    <Input id="father.ageYears" type="number" disabled={true} readOnly {...register("father.ageYears")} />
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex flex-col gap-4 w-full'>
                    <Label htmlFor="father.address">Dirección:</Label>
                    <Input {...register("father.address")} id="father.address" />
                    {errors.father?.address && (
                      <span className="text-sm text-red-600 -mt-2">
                        {errors.father?.address.message}
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col gap-4 w-full'>
                    <Label htmlFor="father.neighborhood">Barrio:</Label>
                    <Input {...register("father.neighborhood")} id="father.neighborhood" />
                    {errors.father?.neighborhood && (
                      <span className="text-sm text-red-600 -mt-2">
                        {errors.father?.neighborhood.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex flex-col gap-4 w-full'>
                    <Label htmlFor="father.cellPhoneNumber">Celular:</Label>
                    <Input {...register("father.cellPhoneNumber")} id="father.cellPhoneNumber" type="tel" aria-label="Número de celular del padre" />
                    {errors.father?.cellPhoneNumber && (
                      <span className="text-sm text-red-600 -mt-2">
                        {errors.father?.cellPhoneNumber.message}
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col gap-4 w-full'>
                    <Label htmlFor="father.telephoneNumber">Teléfono:</Label>
                    <Input {...register("father.telephoneNumber")} id="father.telephoneNumber" type="tel" aria-label="Número de teléfono del padre" />
                    {errors.father?.telephoneNumber && (
                      <span className="text-sm text-red-600 -mt-2">
                        {errors.father?.telephoneNumber.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className='flex flex-col gap-4'>
                  <Label htmlFor="father.occupation">Ocupación o profesión:</Label>
                  <Input {...register("father.occupation")} id="father.occupation" className="w-full" />
                  {errors.father?.occupation && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.father?.occupation.message}
                    </span>
                  )}
                </div>

                <div className='flex flex-col gap-4'>
                  <Label htmlFor="father.educationLevel">Nivel educativo:</Label>
                  <Controller
                    name="father.educationLevel"
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        id="father.educationLevel"
                        options={educationLevelOptions}
                        className='w-52'
                        placeholder='Seleccione una opción'
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    )}
                  />
                  {errors.father?.educationLevel ? (
                    <span key={`father-education-error-${errors.father?.educationLevel.message}`} className="text-sm text-red-600 -mt-2">
                      {errors.father?.educationLevel.message}
                    </span>
                  ) : null}
                </div>
              </div>
              <Separator className="my-8" />
            </div>

            <div className='flex flex-col gap-4'>
              <h3 className="text-lg font-bold text-primary">
                Relación familiar
              </h3>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4 flex-wrap'>
                  <Label>Vive con:</Label>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="familyRelationship.livesWithParents"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id='familyRelationship.livesWithParents'
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                          }}
                        />
                      )}
                    />
                    <Label htmlFor='familyRelationship.livesWithParents'>Padres</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="familyRelationship.livesWithSiblings"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id='familyRelationship.livesWithSiblings'
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                          }}
                        />
                      )}
                    />
                    <Label htmlFor='familyRelationship.livesWithSiblings'>Hermanos</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="familyRelationship.livesWithGrandparents"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id='familyRelationship.livesWithGrandparents'
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                          }}
                        />
                      )}
                    />
                    <Label htmlFor='familyRelationship.livesWithGrandparents'>Abuelos</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="familyRelationship.livesWithUncles"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id='familyRelationship.livesWithUncles'
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                          }}
                        />
                      )}
                    />
                    <Label htmlFor='familyRelationship.livesWithUncles'>Tíos</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="familyRelationship.livesWithStepfather"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id='familyRelationship.livesWithStepfather'
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                          }}
                        />
                      )}
                    />
                    <Label htmlFor='familyRelationship.livesWithStepfather'>Padrastro</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="familyRelationship.livesWithStepmother"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id='familyRelationship.livesWithStepmother'
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                          }}
                        />
                      )}
                    />
                    <Label htmlFor='familyRelationship.livesWithStepmother'>Madrastra</Label>
                  </div>
                </div>

                {errors.familyRelationship?.livesWithParents && (
                  <span className="text-sm text-red-600 -mt-2">
                    {errors.familyRelationship?.livesWithParents?.message}
                  </span>
                )}

                <div className='flex items-center gap-4 flex-wrap'>
                  <div className='flex flex-col gap-4'>
                    <Label htmlFor='familyRelationship.parentsRelationship'>Los padres son:</Label>
                    <Controller
                      name={'familyRelationship.parentsRelationship'}
                      control={control}
                      render={({ field }) => (
                        <AppSelect
                          id='familyRelationship.parentsRelationship'
                          options={parentsRelationshipOptions}
                          className='w-52'
                          placeholder='Seleccione una opción'
                          value={field.value || ""}
                          onValueChange={field.onChange}
                        />
                      )}
                    />
                    {errors.familyRelationship?.parentsRelationship && (
                      <span className="text-sm text-red-600 -mt-2">
                        {errors.familyRelationship?.parentsRelationship?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <div className='flex flex-col gap-4'>
              <h3 className="text-lg font-bold text-primary">
                Matricula
              </h3>

              <div className='flex flex-col gap-4'>
                <Label htmlFor='enrollment.identificationNumber'>N°:</Label>
                <Input className='w-52' id='enrollment.identificationNumber' type="number" disabled={true} readOnly {...register('enrollment.identificationNumber')} />
              </div>

              <div className='flex flex-col gap-4'>
                <Label htmlFor='enrollment.date'>Fecha de matricula:</Label>
                <Input className='w-52' id='enrollment.date' disabled={true} readOnly {...register('enrollment.date')} />
              </div>

              <div className='flex gap-4'>
                <div className='flex flex-col gap-4'>
                  <Label htmlFor='enrollment.isOldStudent'>Es estudiante antiguo:</Label>
                  <Controller
                    name='enrollment.isOldStudent'
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        id='enrollment.isOldStudent'
                        options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]}
                        className='w-52'
                        placeholder='Seleccione una opción'
                        value={field.value === true ? "yes" : field.value === false ? "no" : ""}
                        onValueChange={(v) => {
                          if (v === "no") {
                            setValue("enrollment.previousSchoolName", "");
                            setValue("enrollment.isFirstTime", undefined);
                          } else {
                            setValue("enrollment.previousSchoolName", "Jardín Infantil Mi Mundo Creativo");
                            setValue("enrollment.isFirstTime", false);
                          }
                          field.onChange(v === "yes");
                        }}
                      />
                    )}
                  />
                  {errors.enrollment?.isOldStudent && (
                    <span className="text-sm text-red-600 -mt-2">
                      {errors.enrollment?.isOldStudent?.message}
                    </span>
                  )}
                </div>
              </div>

              {watchedValues?.enrollment?.isOldStudent === false && (
                <div className='flex gap-4'>
                  <div className='flex flex-col gap-4'>
                    <Label htmlFor='enrollment.isFirstTime'>Primera vez que asiste a un jardín:</Label>
                    <Controller
                      name='enrollment.isFirstTime'
                      control={control}
                      render={({ field }) => (
                        <AppSelect
                          id='enrollment.isFirstTime'
                          options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]}
                          className='w-52'
                          placeholder='Seleccione una opción'
                          value={field.value === true ? "yes" : field.value === false ? "no" : ""}
                          onValueChange={(v) => {
                            field.onChange(v === "yes");
                            setValue('enrollment.isFirstTime', v === 'yes');
                            if (v === "yes") {
                              setValue('enrollment.previousSchoolName', "");
                            }
                          }}
                        />
                      )}
                    />
                    {errors.enrollment?.isFirstTime && (
                      <span className="text-sm text-red-600 -mt-2">
                        {errors.enrollment?.isFirstTime?.message}
                      </span>
                    )}
                  </div>

                  {/* Si no es la primera vez, mostrar entidad escolar */}
                  {watchedValues?.enrollment?.isFirstTime === false && (
                    <div className='flex flex-col gap-4 w-2/3'>
                      <Label htmlFor="enrollment.previousSchoolName">Nombre de la entidad escolar a la que asistió:</Label>
                      <Input {...register("enrollment.previousSchoolName")} id="enrollment.previousSchoolName" className="w-full" />
                      {errors.enrollment?.previousSchoolName && (
                        <span className="text-sm text-red-600 -mt-2">
                          {errors.enrollment?.previousSchoolName?.message}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className='flex flex-col gap-4'>
                <Label htmlFor="enrollment.entryGrade">Grado al que ingresa:</Label>
                <Controller
                  name={'enrollment.entryGrade'}
                  control={control}
                  render={({ field }) => (
                    <AppSelect
                      id='enrollment.entryGrade'
                      options={gradeOptions}
                      className='w-52'
                      placeholder='Seleccione una opción'
                      value={field.value || ""}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                {errors.enrollment?.entryGrade && (
                  <span className="text-sm text-red-600 -mt-2">
                    {errors.enrollment?.entryGrade?.message}
                  </span>
                )}
              </div>
            </div>

            <Separator className="my-8" />

            <div className='flex flex-col gap-4'>
              <h3 className="text-lg font-bold text-primary">
                Documentos
              </h3>
              <Controller
                name="documentsFile"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <PDFFileInput 
                      onFileSelect={(file) => {
                        field.onChange(file);
                      }}
                      className="w-full max-w-md"
                    />
                    {errors.documentsFile && (
                      <span className="text-sm text-red-600">
                        {String(errors.documentsFile?.message)}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>

            <Separator className="my-8" />

            <div className='flex flex-col gap-4'>
              <div>
                <h3 className="text-lg font-bold text-primary">
                  Personas autorizadas para recoger al estudiante
                </h3>
                <p className='text-sm'>Diferentes a los padres</p>
              </div>

              {authorizedPersonsFields.length ? (
                <div className='flex flex-col gap-4'>
                  {authorizedPersonsFields.map((field, idx) => (
                    <div key={field.id} className='flex gap-4 items-start'>
                      <div className='flex flex-col gap-2 w-3/5'>
                        <Label htmlFor={`authorizedPersons.${idx}.fullName`}>Nombre completo:</Label>
                        <Input
                          id={`authorizedPersons.${idx}.fullName`}
                          {...register(`authorizedPersons.${idx}.fullName` as const)}
                          aria-label={`Nombre completo de la persona autorizada ${idx + 1}`}
                        />
                        {errors.authorizedPersons?.[idx]?.fullName && (
                          <span className="text-sm text-red-600 -mt-1">
                            {errors.authorizedPersons[idx]?.fullName?.message}
                          </span>
                        )}
                      </div>

                      <div className='flex flex-col gap-2 w-1.5/5'>
                        <Label htmlFor={`authorizedPersons.${idx}.cellPhoneNumber`}>Celular:</Label>
                        <Input
                          id={`authorizedPersons.${idx}.cellPhoneNumber`}
                          type="tel"
                          {...register(`authorizedPersons.${idx}.cellPhoneNumber` as const)}
                          aria-label={`Número de celular de la persona autorizada ${idx + 1}`}
                        />
                        {errors.authorizedPersons?.[idx]?.cellPhoneNumber && (
                          <span className="text-sm text-red-600 -mt-1">
                            {errors.authorizedPersons[idx]?.cellPhoneNumber?.message}
                          </span>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="w-0.5/5 h-9 mt-6"
                        onClick={() => removeAuthorizedPerson(idx)}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : null}

              <Button
                type="button"
                className="w-fit"
                onClick={() => appendAuthorizedPerson({ fullName: "", cellPhoneNumber: "" })}
              >
                Agregar persona
              </Button>

              {errors.authorizedPersons && (
                <span className="text-sm text-red-600 -mt-2">
                  {errors.authorizedPersons?.message}
                </span>
              )}
            </div>

            <Separator className="my-8" />

            <p className="font-bold text-primary text-lg text-center">
              ACEPTAMOS LAS NORMAS DEL JARDIN Y NOS COMPROMETEMOS A CUMPLIR
            </p>

            <Separator className="my-8" />

            <div className='flex flex-col items-center text-sm font-semibold'>
              <p className="text-sm">MANZANA A CASA 18 MARIA CAMILA SUR</p>
              <p className="underline">jardinmimundocreativo2020@gmail.com</p>
              <p className="text-sm">Teléfono: 5884200</p>
              <p className="text-sm">Celular: 3118816946</p>
            </div>

            <div className='flex flex-col items-center mt-6 gap-2'>
              {Object.keys(errors).length ? <p className="text-sm text-red-600">Corrija los errores en el formulario antes de continuar</p> : null}
              <Button type="submit" className="w-full" size="lg">
                Matricular estudiante
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
