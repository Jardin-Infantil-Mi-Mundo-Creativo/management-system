//TODO: validaciones de campos obligatorios antes de enviar el formulario y mostrar errores
"use client"

import { FormEvent } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { DatePicker } from '@/components/ui/date-picker'
import { AppSelect } from '@/components/ui/app-select'
import { Separator } from "@/components/ui/separator"
import { FileInput } from '@/components/ui/file-input'
import Image from "next/image"
import { useForm, SubmitHandler, Controller, useFieldArray, useWatch } from "react-hook-form"

interface PersonalStudentInfo {
  fullName: string;
  birthDate: string;
  ageYears: number;
  ageMonths: number;
  birthCity: string;
  civilRegistrationNumber: string;
};

interface StudentHealth {
  hasDisability: string;
  hasPhysicalDisability: boolean;
  hasHearingDisability: boolean;
  otherDisabilities: string;
  hasAutism: boolean;
  hasDownSyndrome: boolean;
  hasBehavioralDisorders: boolean;
  hasLanguageDisorders: boolean;
  hasHyperactivity: boolean;
  hasAttentionDisorders: boolean;
  hasAnxiety: boolean;
  otherDisorders: string;
  therapies: string;
  hasSisben: boolean;
  eps: string;
  hasRhPositiveBloodType: boolean;
  allergies: string;
  hasEnuresis: boolean;
  hasEncopresis: boolean;
};

const educationLevelOptions = [{ value: "primary school", label: "Primaria" }, { value: "secondary school", label: "Secundaria" }, { value: "technical", label: "Técnica" }, { value: "university", label: "Universitario" }];
interface FamilyMember {
  fullName: string;
  birthDate: string;
  ageYears: number;
  address: string;
  neighborhood: string;
  cellPhoneNumber: string;
  telephoneNumber: string;
  occupation: string;
  educationLevel: typeof educationLevelOptions[number]['value'];
};

const parentsRelationshipOptions = [{ value: "married", label: "Casados" }, { value: "common law marriage", label: "Unión libre" }, { value: "single mother", label: "Madre soltera" }, { value: "separated", label: "Separados" }];
interface FamilyRelationship {
  livesWithParents: boolean;
  livesWithSiblings: boolean;
  livesWithGrandparents: boolean;
  livesWithUncles: boolean;
  livesWithStepfather: boolean;
  livesWithStepmother: boolean;
  parentsRelationship: typeof parentsRelationshipOptions[number]['value'];
};

const gradeOptions = [{ value: "walkers", label: "Caminadores" }, { value: "toddlers", label: "Párvulos" }, { value: "preschool", label: "Pre jardín" }, { value: "kindergarten", label: "Jardín" }, { value: "transition", label: "Transición" }, { value: "first grade", label: "Primero" }];

interface AuthorizedPerson {
  fullName: string;
  cellPhoneNumber: string;
};

interface Enrollment {
  date: string;
  isOldStudent: boolean;
  isFirstTime: boolean | undefined;
  previousSchoolName: string;
  entryGrade: typeof gradeOptions[number]['value'];
};

interface RendererFieldsOnly {
  studentHealth: {
    hasDisability: boolean;
    hasDisabilityOther: boolean;
    hasDisorders: boolean;
    hasDisorderOther: boolean;
    hasTherapy: boolean;
    hasAllergy: boolean;
  };
};

interface FormInput {
  personalStudentInfo: PersonalStudentInfo;
  studentHealth: StudentHealth;
  mother: FamilyMember;
  father: FamilyMember;
  familyRelationship: FamilyRelationship;
  enrollment: Enrollment;
  authorizedPersons: AuthorizedPerson[];
  rendererFieldsOnly: RendererFieldsOnly;
};

export function EnrollmentForm() {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<FormInput>({
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
      },
      familyRelationship: {
        livesWithParents: false,
        livesWithSiblings: false,
        livesWithGrandparents: false,
        livesWithUncles: false,
        livesWithStepfather: false,
        livesWithStepmother: false,
      },
      enrollment: {
        date: (() => {
          const today = new Date();
          const dd = String(today.getDate()).padStart(2, '0');
          const mm = String(today.getMonth() + 1).padStart(2, '0');
          const yyyy = today.getFullYear();
          return `${dd}/${mm}/${yyyy}`;
        })(),
      },
    },
  })

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
      setValue("enrollment.previousSchoolName", "");
      setValue("enrollment.isFirstTime", false);
      setValue("enrollment.previousSchoolName", "Jardín Infantil Mi Mundo Creativo");
      setValue("enrollment.isFirstTime", false);
    }
  }

  const submitForm: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  }

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    validateAndFixFormConsistency();
    handleSubmit(submitForm)();
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

  const watchedValues = useWatch({ control })
  console.log(watchedValues.rendererFieldsOnly);

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
            <FileInput />
          </div>

          <h2 className="text-3xl font-bold text-center text-primary">LIBRO DE MATRICULA</h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={onFormSubmit} className="flex flex-col">
            <div className='flex flex-col gap-4'>
              <h3 className="text-lg font-bold text-primary">
                Información personal del estudiante
              </h3>

              <div className='flex flex-col gap-4 w-full'>
                <Label htmlFor="personalStudentInfo.fullName">Nombre completo:</Label>
                <Input id="personalStudentInfo.fullName" {...register("personalStudentInfo.fullName", { required: 'El nombre es requerido' })} />
                {errors.personalStudentInfo?.fullName && (<span className="text-sm text-red-600 -mt-2">{errors.personalStudentInfo?.fullName?.message}</span>)}
              </div>

              <div className='flex gap-4 flex-wrap'>
                <div className='flex flex-col gap-2'>
                  <Controller
                    name="personalStudentInfo.birthDate"
                    control={control}
                    rules={{ required: "La fecha de nacimiento es requerida" }}
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
                  <Input id="personalStudentInfo.birthCity" {...register("personalStudentInfo.birthCity", { required: 'La ciudad de nacimiento es requerida' })} />
                  {errors.personalStudentInfo?.birthCity && (<span className="text-sm text-red-600 -mt-2">{errors.personalStudentInfo?.birthCity?.message}</span>)}
                </div>

                <div className='flex flex-col gap-4 min-w-48'>
                  <Label htmlFor="personalStudentInfo.civilRegistrationNumber">N° Registro Civil:</Label>
                  <Input id="personalStudentInfo.civilRegistrationNumber" {...register("personalStudentInfo.civilRegistrationNumber", { required: 'El N° Registro Civil es requerido' })} />
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
                        onValueChange={(v) => {
                          field.onChange(v === "yes")
                          setValue('rendererFieldsOnly.studentHealth.hasDisability', v === "yes")
                        }}
                      />
                    )}
                  />
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
                            onCheckedChange={(checked) => field.onChange(checked)}
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
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-end gap-4 flex-wrap">
                <div className="flex flex-col gap-4">
                  <Label htmlFor='health.hasDisorder'>Posee algún trastorno:</Label>
                  <Controller
                    name='rendererFieldsOnly.studentHealth.hasDisorders'
                    control={control}
                    render={({ field }) => (
                      <AppSelect
                        id='rendererFieldsOnly.studentHealth.hasDisorders'
                        options={[
                          { value: "yes", label: "Sí" },
                          { value: "no", label: "No" }
                        ]}
                        className='w-52'
                        placeholder='Seleccione una opción'
                        onValueChange={(value) => field.onChange(value === "yes")}
                      />
                    )}
                  />
                </div>
                {watchedValues.rendererFieldsOnly?.studentHealth?.hasDisorders === true && (
                  <>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasAutism"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="studentHealth.hasAutism"
                            checked={field.value}
                            onCheckedChange={checked => field.onChange(checked === true)}
                          />
                        )}
                      />
                      <Label htmlFor="studentHealth.hasAutism">Autismo</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasDownSyndrome"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="studentHealth.hasDownSyndrome"
                            checked={field.value}
                            onCheckedChange={checked => field.onChange(checked === true)}
                          />
                        )}
                      />
                      <Label htmlFor="studentHealth.hasDownSyndrome">Síndrome de Down</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasBehavioralDisorders"
                        control={control}
                        render={({ field }) => (
                          <Checkbox id='studentHealth.hasBehavioralDisorders' checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label htmlFor='studentHealth.hasBehavioralDisorders'>Conductual</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasLanguageDisorders"
                        control={control}
                        render={({ field }) => (
                          <Checkbox id='studentHealth.hasLanguageDisorders' checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label htmlFor='studentHealth.hasLanguageDisorders'>Lenguaje</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasHyperactivity"
                        control={control}
                        render={({ field }) => (
                          <Checkbox id='studentHealth.hasHyperactivity' checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label htmlFor='studentHealth.hasHyperactivity'>Hiperactividad</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasAttentionDisorders"
                        control={control}
                        render={({ field }) => (
                          <Checkbox id='studentHealth.hasAttentionDisorders' checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label htmlFor='studentHealth.hasAttentionDisorders'>Atención</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasAnxiety"
                        control={control}
                        render={({ field }) => (
                          <Checkbox id='studentHealth.hasAnxiety' onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label htmlFor='studentHealth.hasAnxiety'>Ansiedad</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="rendererFieldsOnly.studentHealth.hasDisorderOther"
                        control={control}
                        render={({ field }) => (
                          <Checkbox id='rendererFieldsOnly.studentHealth.hasDisorderOther' onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label htmlFor='rendererFieldsOnly.studentHealth.hasDisorderOther'>Otro(s)</Label>
                    </div>
                    {watchedValues.rendererFieldsOnly?.studentHealth?.hasDisorderOther && (
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="studentHealth.otherDisorders">¿Cuál(es)?</Label>
                        <Input {...register("studentHealth.otherDisorders")} id="studentHealth.otherDisorders" />
                      </div>
                    )}
                  </>
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
                        onValueChange={(v) => { field.onChange(v === "yes") }}
                      />
                    )}
                  />
                </div>

                {watchedValues.rendererFieldsOnly?.studentHealth?.hasTherapy && (
                  <div className="flex flex-col gap-4 w-full">
                    <Label htmlFor="studentHealth.therapies">¿Cuál(es)?</Label>
                    <Input {...register("studentHealth.therapies")} id="studentHealth.therapies" />
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
                      <AppSelect id='studentHealth.hasSisben' options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]} className='w-52' placeholder='Seleccione una opción' value={field.value === true ? "yes" : field.value === false ? "no" : undefined}
                        onValueChange={(v) => field.onChange(v === "yes")} />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <Label htmlFor="studentHealth.eps">E.P.S:</Label>
                  <Input id="studentHealth.eps" {...register("studentHealth.eps")} />
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
                        value={field.value === true ? "positive" : field.value === false ? "negative" : undefined}
                        onValueChange={(v) => field.onChange(v === "positive")}
                      />
                    )}
                  />
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
                        onValueChange={(v) => { field.onChange(v === "yes") }}
                      />
                    )}
                  />
                </div>

                {watchedValues.rendererFieldsOnly?.studentHealth?.hasAllergy && (
                  <div className="flex flex-col gap-4 w-full">
                    <Label htmlFor="studentHealth.allergies">¿Cuál(es)?</Label>
                    <Input id='studentHealth.allergies' {...register("studentHealth.allergies")} />
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
                        value={field.value === true ? "yes" : field.value === false ? "no" : undefined}
                        onValueChange={(v) => field.onChange(v === "yes")}
                      />
                    )}
                  />
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
                        value={field.value === true ? "yes" : field.value === false ? "no" : undefined}
                        onValueChange={(v) => field.onChange(v === "yes")}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {(["mother", "father"] as const).map((parent) => (
              <div key={`section-for-${parent}`}>
                <div className='flex flex-col gap-4'>
                  <h3 className="text-lg font-bold text-primary">
                    Información {parent === "mother" ? "de la madre" : "del padre"}
                  </h3>
                  <div className='flex flex-col gap-4 w-full'>
                    <Label htmlFor={`${parent}.fullName`}>Nombre completo:</Label>
                    <Input id={`${parent}.fullName`}  {...register(`${parent}.fullName`)} />
                  </div>

                  <div className='flex gap-4'>
                    <Controller
                      name={parent === "mother" ? "mother.birthDate" : "father.birthDate"}
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          id={parent === "mother" ? "mother.birthDate" : "father.birthDate"}
                          label='Fecha de nacimiento:'
                          onChange={(d) => {
                            field.onChange(formatDate(d))
                            setValue(`${parent}.ageYears`, calculateAgeYears(d))
                          }}
                          value={field.value ? new Date(field.value.split('/').reverse().join('-')) : null}
                        />
                      )}
                    />

                    <div className="flex flex-col gap-4 w-16">
                      <Label htmlFor={`${parent}.ageYears`}>Años:</Label>
                      <Input id={`${parent}.ageYears`} type="number" disabled={true} readOnly {...register(`${parent}.ageYears`)} />
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className='flex flex-col gap-4 w-full'>
                      <Label htmlFor={`${parent}.address`}>Dirección:</Label>
                      <Input {...register(`${parent}.address`)} id={`${parent}.address`} />
                    </div>
                    <div className='flex flex-col gap-4 w-full'>
                      <Label htmlFor={`${parent}.neighborhood`}>Barrio:</Label>
                      <Input {...register(`${parent}.neighborhood`)} id={`${parent}.neighborhood`} />
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className='flex flex-col gap-4 w-full'>
                      <Label htmlFor={`${parent}.cellPhoneNumber`}>Celular:</Label>
                      <Input {...register(`${parent}.cellPhoneNumber`)} id={`${parent}.cellPhoneNumber`} type="tel" aria-label={`Número de celular del ${parent === 'mother' ? 'la madre' : 'padre'}`} />
                    </div>
                    <div className='flex flex-col gap-4 w-full'>
                      <Label htmlFor={`${parent}.telephoneNumber`}>Teléfono:</Label>
                      <Input {...register(`${parent}.telephoneNumber`)} id={`${parent}.telephoneNumber`} type="tel" aria-label={`Número de teléfono del ${parent === 'mother' ? 'la madre' : 'padre'}`} />
                    </div>
                  </div>

                  <div className='flex flex-col gap-4'>
                    <Label htmlFor={`${parent}.occupation`}>Ocupación o profesión:</Label>
                    <Input {...register(`${parent}.occupation`)} id={`${parent}.occupation`} className="w-full" />
                  </div>

                  <div className='flex flex-col gap-4'>
                    <Label htmlFor={`${parent}.educationLevel`}>Nivel educativo:</Label>
                    <Controller
                      name={`${parent}.educationLevel`}
                      control={control}
                      render={({ field }) => (
                        <AppSelect
                          id={`${parent}.educationLevel`}
                          options={educationLevelOptions}
                          className='w-52'
                          placeholder='Seleccione una opción'
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                <Separator className="my-8" />
              </div>
            ))}

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
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <div className='flex flex-col gap-4'>
              <h3 className="text-lg font-bold text-primary">
                Matricula
              </h3>

              <div className='flex gap-4'>
                <div className='flex flex-col gap-4'>
                  <Label htmlFor='enrollment.isOldStudent'>Es estudiante antiguo:</Label>
                  <Controller
                    name='enrollment.isOldStudent'
                    control={control}
                    render={({ field }) => (
                      <AppSelect id='enrollment.isOldStudent' options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]} className='w-52' placeholder='Seleccione una opción'
                        onValueChange={(v) => {
                          if (v === "no") {
                            setValue("enrollment.previousSchoolName", ""); setValue("enrollment.isFirstTime", undefined); setValue("enrollment.isFirstTime", undefined);
                          }

                          field.onChange(v === "yes");
                        }}
                      />
                    )}
                  />
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
                        <AppSelect id='enrollment.isFirstTime' options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]} className='w-52' placeholder='Seleccione una opción' value={field.value === true ? "yes" : field.value === false ? "no" : undefined}
                          onValueChange={(v) => { field.onChange(v === "yes"); setValue('enrollment.isFirstTime', v === 'yes') }} />
                      )}
                    />
                  </div>

                  {/* Si no es la primera vez, mostrar entidad escolar */}
                  {watchedValues?.enrollment?.isFirstTime === false && (
                    <div className='flex flex-col gap-4 w-2/3'>
                      <Label htmlFor="enrollment.previousSchoolName">Nombre de la entidad escolar a la que asistió:</Label>
                      <Input {...register("enrollment.previousSchoolName")} id="enrollment.previousSchoolName" className="w-full" />
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
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
                />
              </div>
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
                    <div key={field.id} className='flex gap-4 items-end'>
                      <div className='flex flex-col gap-2 w-3/5'>
                        <Label htmlFor={`authorizedPersons.${idx}.fullName`}>Nombre completo:</Label>
                        <Input
                          id={`authorizedPersons.${idx}.fullName`}
                          {...register(`authorizedPersons.${idx}.fullName` as const)}
                          aria-label={`Nombre completo de la persona autorizada ${idx + 1}`}
                        />
                      </div>

                      <div className='flex flex-col gap-2 w-1.5/5'>
                        <Label htmlFor={`authorizedPersons.${idx}.cellPhoneNumber`}>Celular:</Label>
                        <Input
                          id={`authorizedPersons.${idx}.cellPhoneNumber`}
                          type="tel"
                          {...register(`authorizedPersons.${idx}.cellPhoneNumber` as const)}
                          aria-label={`Número de celular de la persona autorizada ${idx + 1}`}
                        />
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="w-0.5/5 h-9"
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

            <Button type="submit" className="w-full mt-6" size="lg">
              Matricular estudiante
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
