"use client"

import type React from "react"
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import Image from "next/image"

export function EnrollmentForm() {
  // Estado único para matrícula
  const [matricula, setMatricula] = useState({
    isAntiguo: "",
    isPrimeraVez: "",
    entidadEscolar: "",
    grado: ""
  })
  type AuthorizedPerson = { name: string; phone: string }
  type FormData = {
    authorizedPersons: AuthorizedPerson[]
    // ...otros campos si es necesario
  }
  const [formData, setFormData] = useState<FormData>({ authorizedPersons: [] })
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

  const parents = ['mother', 'father'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
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
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className='flex flex-col gap-4'>
              <h3 className="text-lg font-bold text-primary">
                Información personal del estudiante
              </h3>

              <div className='flex flex-col gap-4 w-full'>
                <Label htmlFor="registration">Nombre completo:</Label>
                <Input id="registration" />
              </div>

              <div className='flex gap-4 flex-wrap'>
                <DatePicker
                  label='Fecha de nacimiento:'
                  onChange={(d) => {
                    setAge(calculateAge(d))
                  }}
                />

                <div className="flex flex-col gap-4 w-16">
                  <Label htmlFor="age">Edad:</Label>
                  <Input id="age" type="number" disabled={true} value={age === "" ? "" : age} />
                </div>

                <div className='flex flex-col gap-4 min-w-48'>
                  <Label htmlFor="registration">Ciudad de nacimiento:</Label>
                  <Input id="registration" />
                </div>

                <div className='flex flex-col gap-4 min-w-48'>
                  <Label htmlFor="registration">N° Registro Civil:</Label>
                  <Input id="registration" />
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
                  <Select value={health.hasDisability} onValueChange={v => setHealth(h => ({ ...h, hasDisability: v }))}>
                    <SelectTrigger className='w-52'>
                      <SelectValue placeholder='Seleccione una opción' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {health.hasDisability === "yes" && (
                  <>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={health.disabilityPhysical} onCheckedChange={val => setHealth(h => ({ ...h, disabilityPhysical: val === true }))} />
                      <Label>Física</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={health.disabilityAuditory} onCheckedChange={val => setHealth(h => ({ ...h, disabilityAuditory: val === true }))} />
                      <Label>Auditiva</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={health.disabilityOther} onCheckedChange={val => setHealth(h => ({ ...h, disabilityOther: val === true }))} />
                      <Label>Otra(s)</Label>
                    </div>
                  </>
                )}
                {health.hasDisability === "yes" && health.disabilityOther && (
                  <div className="flex flex-col gap-4 min-w-96 flex-1">
                    <Label htmlFor="other-disability">¿Cuál(es)?</Label>
                    <Input id="other-disability" value={health.disabilityOtherText} onChange={e => setHealth(h => ({ ...h, disabilityOtherText: e.target.value }))} />
                  </div>
                )}
              </div>

              <div className="flex items-end gap-4 flex-wrap">
                <div className="flex flex-col gap-4">
                  <Label>Posee algún trastorno:</Label>
                  <Select value={health.hasDisorder} onValueChange={v => setHealth(h => ({ ...h, hasDisorder: v }))}>
                    <SelectTrigger className='w-52'>
                      <SelectValue placeholder='Seleccione una opción' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {health.hasDisorder === "yes" && (
                  <>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={health.disorderAutism} onCheckedChange={val => setHealth(h => ({ ...h, disorderAutism: val === true }))} />
                      <Label>Autismo</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={health.disorderDown} onCheckedChange={val => setHealth(h => ({ ...h, disorderDown: val === true }))} />
                      <Label>Síndrome de Down</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={health.disorderConductual} onCheckedChange={val => setHealth(h => ({ ...h, disorderConductual: val === true }))} />
                      <Label>Conductual</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={health.disorderLanguage} onCheckedChange={val => setHealth(h => ({ ...h, disorderLanguage: val === true }))} />
                      <Label>Lenguaje</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={health.disorderHyperactivity} onCheckedChange={val => setHealth(h => ({ ...h, disorderHyperactivity: val === true }))} />
                      <Label>Hiperactividad</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={health.disorderAttention} onCheckedChange={val => setHealth(h => ({ ...h, disorderAttention: val === true }))} />
                      <Label>Atención</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={health.disorderAnxiety} onCheckedChange={val => setHealth(h => ({ ...h, disorderAnxiety: val === true }))} />
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
                    <Label htmlFor="other-disorder">¿Cuál(es)?</Label>
                    <Input id="other-disorder" value={health.disorderOtherText} onChange={e => setHealth(h => ({ ...h, disorderOtherText: e.target.value }))} />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Label>Asiste a terapia(s):</Label>
                  <Select value={health.hasTherapy} onValueChange={v => setHealth(h => ({ ...h, hasTherapy: v }))}>
                    <SelectTrigger className='w-52'>
                      <SelectValue placeholder='Seleccione una opción' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {health.hasTherapy === "yes" && (
                  <div className="flex flex-col gap-4 w-full">
                    <Label htmlFor="therapy-type">¿Cuál(es)?</Label>
                    <Input id="therapy-type" value={health.therapyType} onChange={e => setHealth(h => ({ ...h, therapyType: e.target.value }))} />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Label>Tiene SISBEN:</Label>
                  <AppSelect options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]} className='w-52' placeholder='Seleccione una opción' />
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <Label htmlFor="eps">E.P.S:</Label>
                  <Input id="eps" />
                </div>

                <div className="flex flex-col gap-4">
                  <Label>R.H:</Label>
                  <AppSelect options={[{ value: "positive", label: "Positivo" }, { value: "negative", label: "Negativo" }]} className='w-52' placeholder='Seleccione una opción' />
                </div>
              </div>

              {/* Alergias */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Label>Tiene alergias:</Label>
                  <Select value={health.hasAllergy} onValueChange={v => setHealth(h => ({ ...h, hasAllergy: v }))}>
                    <SelectTrigger className='w-52'>
                      <SelectValue placeholder='Seleccione una opción' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {health.hasAllergy === "yes" && (
                  <div className="flex flex-col gap-4 w-full">
                    <Label htmlFor="allergies-type">¿Cuál(es)?</Label>
                    <Input id="allergies-type" value={health.allergyType} onChange={e => setHealth(h => ({ ...h, allergyType: e.target.value }))} />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Label>Tiene enuresis:</Label>
                  <AppSelect options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]} className='w-52' placeholder='Seleccione una opción' />
                </div>

                <div className="flex flex-col gap-4">
                  <Label>Tiene encopresis:</Label>
                  <AppSelect options={[{ value: "yes", label: "Sí" }, { value: "no", label: "No" }]} className='w-52' placeholder='Seleccione una opción' />
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {parents.map((parent) => (
              <div key={`section-for-${parent}`}>
                <div className='flex flex-col gap-4'>
                  <h3 className="text-lg font-bold text-primary">
                    Información {parent === "mother" ? "de la madre" : "del padre"}
                  </h3>
                  <div className='flex flex-col gap-4 w-full'>
                    <Label htmlFor="registration">Nombre:</Label>
                    <Input id="registration" />
                  </div>

                  <div className='flex gap-4'>
                    <DatePicker
                      label='Fecha de nacimiento:'
                      onChange={(d) => {
                        setAge(calculateAge(d))
                      }}
                    />

                    <div className="flex flex-col gap-4 w-16">
                      <Label htmlFor="age">Edad:</Label>
                      <Input id="age" type="number" disabled={true} value={age === "" ? "" : age} />
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className='flex flex-col gap-4 w-full'>
                      <Label htmlFor="mother-address">Dirección:</Label>
                      <Input id="mother-address" />
                    </div>
                    <div className='flex flex-col gap-4 w-full'>
                      <Label htmlFor="mother-neighborhood">Barrio:</Label>
                      <Input id="mother-neighborhood" />
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className='flex flex-col gap-4 w-full'>
                      <Label htmlFor="mother-phone">Celular:</Label>
                      <Input id="mother-phone" type="tel" />
                    </div>
                    <div className='flex flex-col gap-4 w-full'>
                      <Label htmlFor="mother-telephone">Teléfono:</Label>
                      <Input id="mother-telephone" type="tel" />
                    </div>
                  </div>

                  <div className='flex flex-col gap-4'>
                    <Label htmlFor="mother-occupation">Ocupación o profesión:</Label>
                    <Input id="mother-occupation" className="w-full" />
                  </div>

                  <div className='flex flex-col gap-4'>
                    <Label>Nivel educativo:</Label>
                    <AppSelect
                      options={[{ value: "primary school", label: "Primaria" }, { value: "secondary school", label: "Secundaria" }, { value: "technical", label: "Técnica" }, { value: "university", label: "Universitario" }]}
                      className='w-52'
                      placeholder='Seleccione una opción'
                    />
                  </div>
                </div>
                <Separator className="my-8" />
              </div>
            ))}

            <div className='flex flex-col gap-4'>
              <h3 className="text-lg font-bold text-primary">
                Situación familiar
              </h3>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4 flex-wrap'>
                  <Label>Vive con:</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <Label>Padres</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <Label>Hermanos</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <Label>Abuelos</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <Label>Tíos</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <Label>Padrastro</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <Label>Madrastra</Label>
                  </div>
                </div>

                <div className='flex items-center gap-4 flex-wrap'>
                  <div className='flex flex-col gap-4'>
                    <Label>Los padres son:</Label>
                    <AppSelect
                      options={[{ value: "married", label: "Casados" }, { value: "common law marriage", label: "Unión libre" }, { value: "single mother", label: "Madre soltera" }, { value: "separated", label: "Separados" }]}
                      className='w-52'
                      placeholder='Seleccione una opción'
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
                  <Select
                    value={matricula.isAntiguo}
                    onValueChange={v => setMatricula(m => ({ ...m, isAntiguo: v }))}
                  >
                    <SelectTrigger className='w-52'>
                      <SelectValue placeholder='Seleccione una opción' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {matricula.isAntiguo === "no" && (
                <div className='flex gap-4'>
                  <div className='flex flex-col gap-4'>
                    <Label>Primera vez que asiste a un jardín:</Label>
                    <Select
                      value={matricula.isPrimeraVez}
                      onValueChange={v => setMatricula(m => ({ ...m, isPrimeraVez: v }))}
                    >
                      <SelectTrigger className='w-52'>
                        <SelectValue placeholder='Seleccione una opción' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Sí</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Si no es la primera vez, mostrar entidad escolar */}
                  {matricula.isPrimeraVez === "no" && (
                    <div className='flex flex-col gap-4 w-2/3'>
                      <Label htmlFor="previous-school">Nombre de la entidad escolar a la que asistió:</Label>
                      <Input id="previous-school" className="w-full" value={matricula.entidadEscolar} onChange={e => setMatricula(m => ({ ...m, entidadEscolar: e.target.value }))} />
                    </div>
                  )}
                </div>
              )}

              <div className='flex flex-col gap-4'>
                <Label htmlFor="grade">Grado al que ingresa:</Label>
                <Input className='w-48' id="grade" value={matricula.grado} onChange={e => setMatricula(m => ({ ...m, grado: e.target.value }))} />
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

              {formData.authorizedPersons.length ? (
                <div className='flex flex-col gap-4'>
                  {formData.authorizedPersons.map((person: { name: string; phone: string }, idx: number) => (
                    <div key={idx} className='flex gap-4 items-end'>
                      <div className='flex flex-col gap-2 w-3/5'>
                        <Label htmlFor={`authorized-name-${idx}`}>Nombre completo:</Label>
                        <Input
                          id={`authorized-name-${idx}`}
                          value={person.name}
                          onChange={e => {
                            const updated = [...formData.authorizedPersons]
                            updated[idx].name = e.target.value
                            setFormData({ ...formData, authorizedPersons: updated })
                          }}
                        />
                      </div>

                      <div className='flex flex-col gap-2 w-1.5/5'>
                        <Label htmlFor={`authorized-phone-${idx}`}>Celular:</Label>
                        <Input
                          id={`authorized-phone-${idx}`}
                          value={person.phone}
                          onChange={e => {
                            const updated = [...formData.authorizedPersons]
                            updated[idx].phone = e.target.value
                            setFormData({ ...formData, authorizedPersons: updated })
                          }}
                        />
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="w-0.5/5 h-9"
                        onClick={() => {
                          const updated = formData.authorizedPersons.filter((_, i) => i !== idx)
                          setFormData({ ...formData, authorizedPersons: updated })
                        }}
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
                onClick={() => {
                  setFormData({
                    ...formData,
                    authorizedPersons: Array.isArray(formData.authorizedPersons)
                      ? [...formData.authorizedPersons, { name: "", phone: "" }]
                      : [{ name: "", phone: "" }]
                  })
                }}
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
