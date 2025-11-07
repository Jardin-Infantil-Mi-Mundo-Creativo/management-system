//TODO: si el checkbox de otras discapacidades se marcó, se escribió alguna discapacidad, pero luego se desmarco, quiero que en ese caso limpies el valor del campo otherDisabilities y lo restablezcas a "", en resumen, siempre que el checkbox de otras esta desmarcado, el campo de cuales debe estar  limpio, realiza es sincronización para este campo. para todos los demás donde aplique.
"use client"

import { useState } from "react"
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
import { useForm, SubmitHandler, Controller, useFieldArray } from "react-hook-form"

interface PersonalStudentInfo {
  fullName: string;
  birthDate: string;
  age: number;
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
  age: number;
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

const gradeOptions = [{ value: "pre-kindergarten", label: "Pre-jardín" }, { value: "kindergarten", label: "Jardín" }, { value: "transition", label: "Transición" }, { value: "first-grade", label: "Primero" }, { value: "second-grade", label: "Segundo" }, { value: "third-grade", label: "Tercero" }];

interface AuthorizedPerson {
  fullName: string;
  cellPhoneNumber: string;
};

interface Enrollment {
  date: string;
  isNewStudent: boolean;
  isFirstTime: boolean;
  previousSchoolName: string;
  entryGrade: typeof gradeOptions[number]['value'];
};

interface FormInput {
  personalStudentInfo: PersonalStudentInfo;
  studentHealth: StudentHealth;
  mother: FamilyMember;
  father: FamilyMember;
  familyRelationship: FamilyRelationship;
  enrollment: Enrollment;
  authorizedPersons: AuthorizedPerson[];
};

export function EnrollmentForm() {
  const { register, handleSubmit, control, setValue } = useForm<FormInput>({
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
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const [matricula, setMatricula] = useState({
    isAntiguo: "",
    isPrimeraVez: "",
    entidadEscolar: "",
    grado: ""
  })
  const {
    fields: authorizedPersonsFields,
    append: appendAuthorizedPerson,
    remove: removeAuthorizedPerson
  } = useFieldArray({
    control,
    name: "authorizedPersons"
  })
  const [age, setAge] = useState<number | "">("")

  // Estado único para salud del estudiante
  const [health, setHealth] = useState({
    hasDisability: "",
    disabilityPhysical: false,
    disabilityAuditory: false,
    disabilityOther: false,
    disabilityOtherText: "",
    hasDisorder: "",
    disorderAutism: false,
    disorderDown: false,
    disorderConductual: false,
    disorderLanguage: false,
    disorderHyperactivity: false,
    disorderAttention: false,
    disorderAnxiety: false,
    disorderOther: false,
    disorderOtherText: "",
    hasAllergy: "",
    allergyType: "",
    hasTherapy: "",
    therapyType: ""
  })

  const calculateAge = (d: Date) => {
    const today = new Date()
    let years = today.getFullYear() - d.getFullYear()
    const monthDiff = today.getMonth() - d.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < d.getDate())) {
      years--
    }
    return years
  }

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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className='flex flex-col gap-4'>
              <h3 className="text-lg font-bold text-primary">
                Información personal del estudiante
              </h3>

              <div className='flex flex-col gap-4 w-full'>
                <Label htmlFor="registration">Nombre completo:</Label>
                <Input {...register("personalStudentInfo.fullName")} />
              </div>

              <div className='flex gap-4 flex-wrap'>
                <Controller
                  name="personalStudentInfo.birthDate"
                  control={control}
                  rules={{ required: "La fecha de nacimiento es requerida" }}
                  render={({ field }) => (
                    <DatePicker
                      label='Fecha de nacimiento:'
                      onChange={(d) => {
                        field.onChange(formatDate(d))
                        const calculatedAge = calculateAge(d)
                        setAge(calculatedAge)
                        setValue("personalStudentInfo.age", calculatedAge)
                      }}
                      value={field.value ? new Date(field.value.split('/').reverse().join('-')) : null}
                    />
                  )}
                />

                <div className="flex flex-col gap-4 w-16">
                  <Label htmlFor="age">Edad:</Label>
                  <Input type="number" disabled={true} value={age} readOnly {...register("personalStudentInfo.age")} />
                </div>

                <div className='flex flex-col gap-4 min-w-48'>
                  <Label htmlFor="registration">Ciudad de nacimiento:</Label>
                  <Input {...register("personalStudentInfo.birthCity")} />
                </div>

                <div className='flex flex-col gap-4 min-w-48'>
                  <Label htmlFor="registration">N° Registro Civil:</Label>
                  <Input {...register("personalStudentInfo.civilRegistrationNumber")} />
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
                  <Label>Presenta alguna discapacidad:</Label>
                  <AppSelect
                    value={health.hasDisability}
                    options={[
                      { value: "yes", label: "Sí" },
                      { value: "no", label: "No" }
                    ]}
                    className='w-52'
                    placeholder='Seleccione una opción'
                    onValueChange={(v) => {
                      setHealth(h => ({ ...h, hasDisability: v }))
                    }}
                  />
                </div>
                {health.hasDisability === "yes" && (
                  <>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasPhysicalDisability"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked)
                              setHealth(h => ({ ...h, disabilityPhysical: checked === true }))
                            }}
                          />
                        )}
                      />
                      <Label>Física</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasHearingDisability"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked)
                              setHealth(h => ({ ...h, disabilityAuditory: checked === true }))
                            }}
                          />
                        )}
                      />
                      <Label>Auditiva</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        onCheckedChange={(checked) => {
                          setHealth(h => ({ ...h, disabilityOther: checked === true }))
                        }}
                      />
                      <Label>Otra(s)</Label>
                    </div>
                  </>
                )}
                {health.hasDisability === "yes" && health.disabilityOther && (
                  <div className="flex flex-col gap-4 min-w-96 flex-1">
                    <Label htmlFor="other-disability">¿Cuál(es)?</Label>
                    <Input {...register("studentHealth.otherDisabilities")} value={health.disabilityOtherText} onChange={e => setHealth(h => ({ ...h, disabilityOtherText: e.target.value }))} />
                  </div>
                )}
              </div>

              <div className="flex items-end gap-4 flex-wrap">
                <div className="flex flex-col gap-4">
                  <Label>Posee algún trastorno:</Label>
                  <AppSelect
                    value={health.hasDisorder}
                    options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]}
                    className='w-52'
                    placeholder='Seleccione una opción'
                    onValueChange={v => setHealth(h => ({ ...h, hasDisorder: v }))}
                  />
                </div>
                {health.hasDisorder === "yes" && (
                  <>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasAutism"
                        control={control}
                        render={({ field }) => (
                          <Checkbox checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label>Autismo</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasDownSyndrome"
                        control={control}
                        render={({ field }) => (
                          <Checkbox checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label>Síndrome de Down</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasBehavioralDisorders"
                        control={control}
                        render={({ field }) => (
                          <Checkbox checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label>Conductual</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasLanguageDisorders"
                        control={control}
                        render={({ field }) => (
                          <Checkbox checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label>Lenguaje</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasHyperactivity"
                        control={control}
                        render={({ field }) => (
                          <Checkbox checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label>Hiperactividad</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasAttentionDisorders"
                        control={control}
                        render={({ field }) => (
                          <Checkbox checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label>Atención</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Controller
                        name="studentHealth.hasAnxiety"
                        control={control}
                        render={({ field }) => (
                          <Checkbox checked={field.value} onCheckedChange={checked => field.onChange(checked === true)} />
                        )}
                      />
                      <Label>Ansiedad</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={health.disorderOther} onCheckedChange={val => setHealth(h => ({ ...h, disorderOther: val === true }))} />
                      <Label>Otro(s)</Label>
                    </div>
                  </>
                )}
                {health.hasDisorder === "yes" && health.disorderOther && (
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="studentHealth.other-disorder">¿Cuál(es)?</Label>
                    <Input {...register("studentHealth.otherDisorders")} id="other-disorder" value={health.disorderOtherText} onChange={e => setHealth(h => ({ ...h, disorderOtherText: e.target.value }))} />

                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Label>Asiste a terapia(s):</Label>
                  <AppSelect
                    value={health.hasTherapy}
                    options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]}
                    className='w-52'
                    placeholder='Seleccione una opción'
                    onValueChange={v => setHealth(h => ({ ...h, hasTherapy: v }))}
                  />
                </div>

                {health.hasTherapy === "yes" && (
                  <div className="flex flex-col gap-4 w-full">
                    <Label htmlFor="studentHealth.therapy-type">¿Cuál(es)?</Label>
                    <Input {...register("studentHealth.therapies")} id="studentHealth.therapy-type" value={health.therapyType} onChange={e => setHealth(h => ({ ...h, therapyType: e.target.value }))} />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Label>Tiene SISBEN:</Label>
                  <Controller
                    name={'studentHealth.hasSisben'}
                    control={control}
                    render={({ field }) => (
                      <AppSelect options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]} className='w-52' placeholder='Seleccione una opción' value={field.value === true ? "yes" : field.value === false ? "no" : undefined}
                        onValueChange={(v) => field.onChange(v === "yes")} />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <Label htmlFor="eps">E.P.S:</Label>
                  <Input {...register("studentHealth.eps")} />
                </div>

                <div className="flex flex-col gap-4">
                  <Label>R.H:</Label>
                  <Controller
                    name={'studentHealth.hasRhPositiveBloodType'}
                    control={control}
                    render={({ field }) => (
                      <AppSelect
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
                  <Label>Tiene alergias:</Label>
                  <AppSelect
                    value={health.hasAllergy}
                    options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]}
                    className='w-52'
                    placeholder='Seleccione una opción'
                    onValueChange={v => setHealth(h => ({ ...h, hasAllergy: v }))}
                  />
                </div>

                {health.hasAllergy === "yes" && (
                  <div className="flex flex-col gap-4 w-full">
                    <Label htmlFor="studentHealth.allergies-type">¿Cuál(es)?</Label>
                    <Input {...register("studentHealth.allergies")} value={health.allergyType} onChange={e => setHealth(h => ({ ...h, allergyType: e.target.value }))} />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Label>Tiene enuresis:</Label>
                  <Controller
                    name={'studentHealth.hasEnuresis'}
                    control={control}
                    render={({ field }) => (
                      <AppSelect
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
                  <Label>Tiene encopresis:</Label>
                  <Controller
                    name={'studentHealth.hasEncopresis'}
                    control={control}
                    render={({ field }) => (
                      <AppSelect
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
                    <Label htmlFor="registration">Nombre completo:</Label>
                    <Input {...register(`${parent}.fullName`)} />
                  </div>

                  <div className='flex gap-4'>
                    <Controller
                      name={parent === "mother" ? "mother.birthDate" : "father.birthDate"}
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label='Fecha de nacimiento:'
                          onChange={(d) => {
                            field.onChange(formatDate(d))
                            setValue(`${parent}.age`, calculateAge(d))
                          }}
                          value={field.value ? new Date(field.value.split('/').reverse().join('-')) : null}
                        />
                      )}
                    />

                    <div className="flex flex-col gap-4 w-16">
                      <Label htmlFor="age">Edad:</Label>
                      <Input type="number" disabled={true} readOnly {...register(`${parent}.age`)} />
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className='flex flex-col gap-4 w-full'>
                      <Label htmlFor="mother-address">Dirección:</Label>
                      <Input {...register(`${parent}.address`)} id="mother-address" />
                    </div>
                    <div className='flex flex-col gap-4 w-full'>
                      <Label htmlFor="mother-neighborhood">Barrio:</Label>
                      <Input {...register(`${parent}.neighborhood`)} id="mother-neighborhood" />
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className='flex flex-col gap-4 w-full'>
                      <Label htmlFor="mother-phone">Celular:</Label>
                      <Input {...register(`${parent}.cellPhoneNumber`)} id="mother-phone" type="tel" />
                    </div>
                    <div className='flex flex-col gap-4 w-full'>
                      <Label htmlFor="mother-telephone">Teléfono:</Label>
                      <Input {...register(`${parent}.telephoneNumber`)} id="mother-telephone" type="tel" />
                    </div>
                  </div>

                  <div className='flex flex-col gap-4'>
                    <Label htmlFor="mother-occupation">Ocupación o profesión:</Label>
                    <Input {...register(`${parent}.occupation`)} id="mother-occupation" className="w-full" />
                  </div>

                  <div className='flex flex-col gap-4'>
                    <Label>Nivel educativo:</Label>
                    <Controller
                      name={`${parent}.educationLevel`}
                      control={control}
                      render={({ field }) => (
                        <AppSelect
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
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                          }}
                        />
                      )}
                    />
                    <Label>Padres</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="familyRelationship.livesWithSiblings"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                          }}
                        />
                      )}
                    />
                    <Label>Hermanos</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="familyRelationship.livesWithGrandparents"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                          }}
                        />
                      )}
                    />
                    <Label>Abuelos</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="familyRelationship.livesWithUncles"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                          }}
                        />
                      )}
                    />
                    <Label>Tíos</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="familyRelationship.livesWithStepfather"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                          }}
                        />
                      )}
                    />
                    <Label>Padrastro</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Controller
                      name="familyRelationship.livesWithStepmother"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                          }}
                        />
                      )}
                    />
                    <Label>Madrastra</Label>
                  </div>
                </div>

                <div className='flex items-center gap-4 flex-wrap'>
                  <div className='flex flex-col gap-4'>
                    <Label>Los padres son:</Label>
                    <Controller
                      name={'familyRelationship.parentsRelationship'}
                      control={control}
                      render={({ field }) => (
                        <AppSelect
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
                  <Label>Es estudiante antiguo:</Label>
                  <Controller
                    name={`enrollment.isNewStudent`}
                    control={control}
                    render={({ field }) => (
                      <AppSelect options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]} className='w-52' placeholder='Seleccione una opción' value={field.value === true ? "yes" : field.value === false ? "no" : undefined}
                        onValueChange={(v) => { field.onChange(v === "yes"); setMatricula(m => ({ ...m, isAntiguo: v })) }} />
                    )}
                  />
                </div>
              </div>

              {matricula.isAntiguo === "no" && (
                <div className='flex gap-4'>
                  <div className='flex flex-col gap-4'>
                    <Label>Primera vez que asiste a un jardín:</Label>
                    <Controller
                      name={`enrollment.isFirstTime`}
                      control={control}
                      render={({ field }) => (
                        <AppSelect options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]} className='w-52' placeholder='Seleccione una opción' value={field.value === true ? "yes" : field.value === false ? "no" : undefined}
                          onValueChange={(v) => { field.onChange(v === "yes"); setMatricula(m => ({ ...m, isPrimeraVez: v })) }} />
                      )}
                    />
                  </div>

                  {/* Si no es la primera vez, mostrar entidad escolar */}
                  {matricula.isPrimeraVez === "no" && (
                    <div className='flex flex-col gap-4 w-2/3'>
                      <Label htmlFor="previous-school">Nombre de la entidad escolar a la que asistió:</Label>
                      <Input {...register("enrollment.previousSchoolName")} id="previous-school" className="w-full" />
                    </div>
                  )}
                </div>
              )}

              <div className='flex flex-col gap-4'>
                <Label htmlFor="grade">Grado al que ingresa:</Label>
                <Controller
                  name={'enrollment.entryGrade'}
                  control={control}
                  render={({ field }) => (
                    <AppSelect
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
                        <Label htmlFor={`authorized-name-${idx}`}>Nombre completo:</Label>
                        <Input
                          id={`authorized-name-${idx}`}
                          {...register(`authorizedPersons.${idx}.fullName` as const)}
                        />
                      </div>

                      <div className='flex flex-col gap-2 w-1.5/5'>
                        <Label htmlFor={`authorized-phone-${idx}`}>Celular:</Label>
                        <Input
                          id={`authorized-phone-${idx}`}
                          {...register(`authorizedPersons.${idx}.cellPhoneNumber` as const)}
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
