"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export function EnrollmentForm() {
  const [formData, setFormData] = useState({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <>
      <Card>
        <CardHeader className="space-y-6 pb-8">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-center text-xs text-muted-foreground">Logo</div>
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-primary">Jardín Infantil</h2>
                <h1 className="text-2xl font-bold text-primary">MI MUNDO CREATIVO</h1>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  &ldquo;Educación con VALORES y manejo de las EMOCIONES para la vida&rdquo;
                </p>
                <p className="text-xs text-muted-foreground">Licencia de Funcionamiento 000028 del 24 de enero 2024</p>
                <p className="text-xs text-muted-foreground">
                  Código DANE <span className="font-semibold">32000180049</span>
                </p>
              </div>
            </div>
            <div className="w-32 h-40 border-2 border-dashed border-border rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="text-center">
                <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Foto</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-primary">LIBRO DE MATRICULA</h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Date and Registration Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="day">FECHA: Día</Label>
                <Input id="day" type="number" placeholder="__" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="month">Mes</Label>
                <Input id="month" type="number" placeholder="__" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Año</Label>
                <Input id="year" type="number" placeholder="____" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration">N°</Label>
                <Input id="registration" placeholder="________" />
              </div>
            </div>

            {/* First Time / Returning Student */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label>Primera vez asiste a un jardín SI</Label>
                <Checkbox />
                <Label>NO</Label>
                <Checkbox />
              </div>
              <div className="space-y-2">
                <Label htmlFor="previous-school">Entidad escolar a la que asistido:</Label>
                <Input id="previous-school" className="w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-student">Estudiante Nuevo:</Label>
                  <Input id="new-student" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returning">Antiguo:</Label>
                  <Input id="returning" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grado:</Label>
                  <Input id="grade" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Edad:</Label>
                  <Input id="age" type="number" />
                </div>
              </div>
            </div>

            {/* Student Information */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-bold text-primary">Estudiante Nombre y Apellidos:</h3>
              <Input className="w-full" />

              <div className="space-y-2">
                <Label htmlFor="civil-registry">N° Registro Civil:</Label>
                <Input id="civil-registry" className="w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birth-day">Fecha de nacimiento día:</Label>
                  <Input id="birth-day" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth-month">Mes:</Label>
                  <Input id="birth-month" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth-year">Año:</Label>
                  <Input id="birth-year" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth-city">Ciudad:</Label>
                  <Input id="birth-city" />
                </div>
              </div>

              {/* Disability Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Label>Presenta una discapacidad: Si o No:</Label>
                  <div className="flex items-center gap-2">
                    <Label>Físicas</Label>
                    <Checkbox />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Auditiva</Label>
                    <Checkbox />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="other-disability">¿Otros Cuál?</Label>
                    <Input id="other-disability" />
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Label>Posee algún trastorno si o No: Autismo</Label>
                    <Checkbox />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Síndrome de Down</Label>
                    <Checkbox />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Conductuales</Label>
                    <Checkbox />
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Label>¿Lenguaje</Label>
                    <Checkbox />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Hiperactividad</Label>
                    <Checkbox />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Atención</Label>
                    <Checkbox />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Ansiedad</Label>
                    <Checkbox />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="other-disorder">¿Otros Cuál?</Label>
                    <Input id="other-disorder" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Label>Asiste a terapias Si</Label>
                  <Checkbox />
                  <Label>No</Label>
                  <Checkbox />
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="therapy-type">¿Cuál?</Label>
                    <Input id="therapy-type" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eps">E.P.S.</Label>
                    <Input id="eps" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label>SISBEN: Si o No</Label>
                    <Checkbox />
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="rh">R.H.</Label>
                      <Input id="rh" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Tiene alergias ha:</Label>
                  <Input id="allergies" className="w-full" />
                </div>

                <div className="flex items-center gap-4">
                  <Label>Controla esfínteres</Label>
                  <div className="flex items-center gap-2">
                    <Label>Enuresis</Label>
                    <Checkbox />
                  </div>
                  <Label>Si o No</Label>
                  <div className="flex items-center gap-2">
                    <Label>Encopresis</Label>
                    <Checkbox />
                  </div>
                  <Label>Si o No</Label>
                </div>
              </div>
            </div>

            {/* Mother Information */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-bold text-primary">Nombre de la Madre:</h3>
              <Input className="w-full" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mother-birth-day">Fecha de nacimiento día:</Label>
                  <Input id="mother-birth-day" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mother-birth-month">Mes:</Label>
                  <Input id="mother-birth-month" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mother-birth-year">Año:</Label>
                  <Input id="mother-birth-year" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mother-age">Edad:</Label>
                  <Input id="mother-age" type="number" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mother-address">Dirección:</Label>
                  <Input id="mother-address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mother-neighborhood">Barrio:</Label>
                  <Input id="mother-neighborhood" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mother-phone">Celular:</Label>
                  <Input id="mother-phone" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mother-telephone">Teléfono:</Label>
                  <Input id="mother-telephone" type="tel" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mother-occupation">Ocupación o Profesión:</Label>
                <Input id="mother-occupation" className="w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mother-primary">Nivel educativo: Primaria:</Label>
                  <Input id="mother-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mother-secondary">Secundaria:</Label>
                  <Input id="mother-secondary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mother-technical">Técnica:</Label>
                  <Input id="mother-technical" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mother-university">Universitario:</Label>
                  <Input id="mother-university" />
                </div>
              </div>
            </div>

            {/* Father Information */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-bold text-primary">Nombre de la Padre:</h3>
              <Input className="w-full" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="father-birth-day">Fecha de nacimiento día:</Label>
                  <Input id="father-birth-day" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="father-birth-month">Mes:</Label>
                  <Input id="father-birth-month" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="father-birth-year">Año:</Label>
                  <Input id="father-birth-year" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="father-age">Edad:</Label>
                  <Input id="father-age" type="number" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="father-address">Dirección:</Label>
                  <Input id="father-address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="father-neighborhood">Barrio:</Label>
                  <Input id="father-neighborhood" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="father-phone">Celular:</Label>
                  <Input id="father-phone" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="father-telephone">Teléfono:</Label>
                  <Input id="father-telephone" type="tel" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="father-occupation">Ocupación o Profesión:</Label>
                <Input id="father-occupation" className="w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="father-primary">Nivel educativo: Primaria:</Label>
                  <Input id="father-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="father-secondary">Secundaria:</Label>
                  <Input id="father-secondary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="father-technical">Técnica:</Label>
                  <Input id="father-technical" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="father-university">Universitario:</Label>
                  <Input id="father-university" />
                </div>
              </div>
            </div>

            {/* Living Situation */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center gap-4 flex-wrap">
                <Label className="font-bold">Vivo con:</Label>
                <div className="flex items-center gap-2">
                  <Label>Padres</Label>
                  <Checkbox />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Hermanos</Label>
                  <Checkbox />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Abuelos</Label>
                  <Checkbox />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Tíos</Label>
                  <Checkbox />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Padrastro</Label>
                  <Checkbox />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Madrasta</Label>
                  <Checkbox />
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <Label className="font-bold">Mis padres son:</Label>
                <div className="flex items-center gap-2">
                  <Label>Casados:</Label>
                  <Checkbox />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Unión Libre:</Label>
                  <Checkbox />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Madre Soltera:</Label>
                  <Checkbox />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Separados:</Label>
                  <Checkbox />
                </div>
              </div>
            </div>

            {/* Authorized Persons */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-bold text-primary">
                Personas que usted autoriza para recoger diariamente a su hijo o hija.
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="authorized-1">Nombre completo:</Label>
                  <Input id="authorized-1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorized-1-id">Cel.</Label>
                  <Input id="authorized-1-id" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="authorized-2">Nombre completo:</Label>
                  <Input id="authorized-2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorized-2-id">Cel.</Label>
                  <Input id="authorized-2-id" />
                </div>
              </div>
            </div>

            {/* Agreement and Signatures */}
            <div className="space-y-6 border-t pt-6">
              <div className="text-center">
                <p className="font-bold text-primary text-lg">
                  ACEPTAMOS LAS NORMAS DEL JARDIN Y NOS COMPROMETEMOS A CUMPLIR
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="font-bold text-center block">FIRMA DE LOS ACUDIENTES</Label>
                  <div className="border-2 border-border rounded-lg h-32"></div>
                </div>
                <div className="space-y-4">
                  <Label className="font-bold text-center block">DIRECTORA</Label>
                  <div className="border-2 border-border rounded-lg h-32"></div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center space-y-2 border-t pt-6">
              <p className="font-semibold text-sm">MANZANA A CASA 18 MARIA CAMILA SUR</p>
              <p className="text-sm text-primary underline">jardinmimundocreativo2020@gmail.com</p>
              <p className="text-sm">TELEFONO 5884200 CEL. 3118816946</p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Enviar Formulario
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
