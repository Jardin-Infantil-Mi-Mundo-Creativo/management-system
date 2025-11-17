'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import { ScrollArea } from '@/components/ui/shadcn/scroll-area';
import { useMemo } from 'react';
import {
  EDUCATION_LEVEL_OPTIONS,
  PARENTS_RELATIONSHIP_OPTIONS,
  GRADE_OPTIONS,
} from '@/consts/enrollment';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';
import { Separator } from '@/components/ui/shadcn/separator';
import { Button } from '../ui/shadcn/button';

export default function EnrolledStudentDetail({
  data,
}: {
  data?: EnrollmentFormSchemaWithDocumentId;
}) {
  // --- MAPS PARA TRADUCIR LABELS ---
  const educationLevelMap = useMemo(
    () =>
      EDUCATION_LEVEL_OPTIONS.reduce(
        (acc, curr) => {
          acc[curr.value] = curr.label;
          return acc;
        },
        {} as Record<string, string>
      ),
    []
  );

  const parentsRelationshipMap = useMemo(
    () =>
      PARENTS_RELATIONSHIP_OPTIONS.reduce(
        (acc, curr) => {
          acc[curr.value] = curr.label;
          return acc;
        },
        {} as Record<string, string>
      ),
    []
  );

  const gradeOptionsMap = useMemo(
    () =>
      GRADE_OPTIONS.reduce(
        (acc, curr) => {
          acc[curr.value] = curr.label;
          return acc;
        },
        {} as Record<string, string>
      ),
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const val = (value: any) =>
    value === null || value === undefined || value === ''
      ? 'No registrado'
      : value;

  const boolLabel = (value: boolean) => (value ? 'Sí' : 'No');

  if (!data) {
    return null;
  }

  return (
    <ScrollArea className="w-full h-full">
      {/* ENCABEZADO */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Información de matricula</h1>
          <p className="text-sm opacity-70 mt-1">
            Información completa del estudiante y su matricula
          </p>
        </div>

        {/* FOTO DEL ESTUDIANTE */}
        <Link
          href={data.studentPhoto}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={data.studentPhoto}
            alt="Foto del estudiante"
            width={300}
            height={300}
            className="rounded-lg object-cover cursor-pointer border"
          />
        </Link>
      </div>

      <Separator className="my-4" />

      {/* INFORMACIÓN PERSONAL DEL ESTUDIANTE */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Información personal del estudiante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Nombre completo:</strong>{' '}
            {val(data.personalStudentInfo.fullName)}
          </p>
          <p>
            <strong>Fecha de nacimiento:</strong>{' '}
            {val(data.personalStudentInfo.birthDate)}
          </p>
          <p>
            <strong>Ciudad de nacimiento:</strong>{' '}
            {val(data.personalStudentInfo.birthCity)}
          </p>
          <p>
            <strong>N° registro civil:</strong>{' '}
            {val(data.personalStudentInfo.civilRegistrationNumber)}
          </p>
          <p>
            <strong>Edad:</strong> {data.personalStudentInfo.ageYears} años,{' '}
            {data.personalStudentInfo.ageMonths} meses
          </p>
        </CardContent>
      </Card>

      {/* SALUD DEL ESTUDIANTE */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Salud del estudiante</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>EPS:</strong> {val(data.studentHealth.eps)}
          </p>
          <p>
            <strong>Alérgias:</strong> {val(data.studentHealth.allergies)}
          </p>

          {/* Booleanos */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Hiperactividad:</strong>{' '}
              {boolLabel(data.studentHealth.hasHyperactivity)}
            </p>
            <p>
              <strong>Autismo:</strong>{' '}
              {boolLabel(data.studentHealth.hasAutism)}
            </p>
            <p>
              <strong>Ansiedad:</strong>{' '}
              {boolLabel(data.studentHealth.hasAnxiety)}
            </p>
            <p>
              <strong>Trastornos de lenguaje:</strong>{' '}
              {boolLabel(data.studentHealth.hasLanguageDisorders)}
            </p>
            <p>
              <strong>Trastornos de atención:</strong>{' '}
              {boolLabel(data.studentHealth.hasAttentionDisorders)}
            </p>
            <p>
              <strong>Discapacidad auditiva:</strong>{' '}
              {boolLabel(data.studentHealth.hasHearingDisability)}
            </p>
            <p>
              <strong>Discapacidad física:</strong>{' '}
              {boolLabel(data.studentHealth.hasPhysicalDisability)}
            </p>
            <p>
              <strong>Trastornos del comportamiento:</strong>{' '}
              {boolLabel(data.studentHealth.hasBehavioralDisorders)}
            </p>
            <p>
              <strong>Síndrome de Down:</strong>{' '}
              {boolLabel(data.studentHealth.hasDownSyndrome)}
            </p>
            <p>
              <strong>Encopresis:</strong>{' '}
              {boolLabel(data.studentHealth.hasEncopresis)}
            </p>
            <p>
              <strong>Enuresis:</strong>{' '}
              {boolLabel(data.studentHealth.hasEnuresis)}
            </p>
            <p>
              <strong>Tipo de sangre RH+:</strong>{' '}
              {boolLabel(data.studentHealth.hasRhPositiveBloodType)}
            </p>
            <p>
              <strong>Sisbén:</strong> {boolLabel(data.studentHealth.hasSisben)}
            </p>
          </div>

          <p>
            <strong>Otras discapacidades:</strong>{' '}
            {val(data.studentHealth.otherDisabilities)}
          </p>
          <p>
            <strong>Otros trastornos:</strong>{' '}
            {val(data.studentHealth.otherDisorders)}
          </p>
          <p>
            <strong>Terapias:</strong> {val(data.studentHealth.therapies)}
          </p>
        </CardContent>
      </Card>

      {/* INFORMACIÓN DE LA MADRE */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Información de la madre</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>Nombre:</strong> {val(data.mother.fullName)}
          </p>
          <p>
            <strong>Fecha de nacimiento:</strong> {val(data.mother.birthDate)}
          </p>
          <p>
            <strong>Edad:</strong> {val(data.mother.ageYears)}
          </p>
          <p>
            <strong>Dirección:</strong> {val(data.mother.address)}
          </p>
          <p>
            <strong>Barrio:</strong> {val(data.mother.neighborhood)}
          </p>
          <p>
            <strong>Celular:</strong> {val(data.mother.cellPhoneNumber)}
          </p>
          <p>
            <strong>Teléfono:</strong> {val(data.mother.telephoneNumber)}
          </p>
          <p>
            <strong>Ocupación:</strong> {val(data.mother.occupation)}
          </p>
          <p>
            <strong>Nivel educativo:</strong>{' '}
            {educationLevelMap[data.mother.educationLevel] ?? 'No registrado'}
          </p>
        </CardContent>
      </Card>

      {/* INFORMACIÓN DEL PADRE */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Información del padre</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>Nombre:</strong> {val(data.father.fullName)}
          </p>
          <p>
            <strong>Fecha de nacimiento:</strong> {val(data.father.birthDate)}
          </p>
          <p>
            <strong>Edad:</strong> {val(data.father.ageYears)}
          </p>
          <p>
            <strong>Dirección:</strong> {val(data.father.address)}
          </p>
          <p>
            <strong>Barrio:</strong> {val(data.father.neighborhood)}
          </p>
          <p>
            <strong>Celular:</strong> {val(data.father.cellPhoneNumber)}
          </p>
          <p>
            <strong>Teléfono:</strong> {val(data.father.telephoneNumber)}
          </p>
          <p>
            <strong>Ocupación:</strong> {val(data.father.occupation)}
          </p>
          <p>
            <strong>Nivel educativo:</strong>{' '}
            {educationLevelMap[data.father.educationLevel] ?? 'No registrado'}
          </p>
        </CardContent>
      </Card>

      {/* RELACIÓN FAMILIAR */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Relación familiar</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>Relación entre los padres:</strong>{' '}
            {parentsRelationshipMap[
              data.familyRelationship.parentsRelationship ?? ''
            ] ?? 'No registrado'}
          </p>

          <div className="gap-2">
            <p className="mb-2">
              <strong>Vive con</strong>
            </p>
            <ul>
              {data.familyRelationship.livesWithParents && (
                <li>&emsp;-Padres</li>
              )}
              {data.familyRelationship.livesWithSiblings && (
                <li>&emsp;-Hermanos</li>
              )}
              {data.familyRelationship.livesWithGrandparents && (
                <li>&emsp;-Abuelos</li>
              )}
              {data.familyRelationship.livesWithUncles && <li>&emsp;-Tíos</li>}
              {data.familyRelationship.livesWithStepfather && (
                <li>&emsp;-Padrastro</li>
              )}
              {data.familyRelationship.livesWithStepmother && (
                <li>&emsp;-Madrastra</li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* INFORMACIÓN DE MATRÍCULA */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Matrícula</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>N° identificación:</strong>{' '}
            {val(data.enrollment.identificationNumber)}
          </p>
          <p>
            <strong>Fecha de matrícula:</strong> {val(data.enrollment.date)}
          </p>
          <p>
            <strong>Grado al que ingresa:</strong>{' '}
            {gradeOptionsMap[data.enrollment.entryGrade] ?? 'No registrado'}
          </p>
          <p>
            <strong>Estudiante antiguo:</strong>{' '}
            {boolLabel(data.enrollment.isOldStudent)}
          </p>
          <p>
            <strong>Primera vez en un jardín:</strong>{' '}
            {boolLabel(!!data.enrollment.isFirstTime)}
          </p>
          <p>
            <strong>Institución anterior:</strong>{' '}
            {val(data.enrollment.previousSchoolName)}
          </p>
        </CardContent>
      </Card>

      {/* DOCUMENTOS */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Link
            href={data.documentsFile}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Abrir documento PDF</Button>
          </Link>
        </CardContent>
      </Card>

      {/* PERSONAS AUTORIZADAS */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Personas autorizadas para recoger al estudiante</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          {data.authorizedPersons.length === 0 ? (
            <p>Los padres son las únicas personas autorizadas.</p>
          ) : (
            data.authorizedPersons.map((p, i) => (
              <div key={i} className="border p-3 rounded-lg">
                <p>
                  <strong>Nombre:</strong> {val(p.fullName)}
                </p>
                <p>
                  <strong>Celular:</strong> {val(p.cellPhoneNumber)}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
