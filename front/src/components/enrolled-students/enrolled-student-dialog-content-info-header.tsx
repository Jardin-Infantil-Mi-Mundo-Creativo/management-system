import Image from 'next/image';
import Link from 'next/link';

import { EnrolledStudentDialogContentInfoDataItem } from '@/components/enrolled-students/enrolled-students';
import { PictureInput } from '@/components/ui/picture-input';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogContentInfoHeaderProps {
  dataTestId: string;
  personalStudentInfo: EnrollmentFormSchemaWithDocumentId['personalStudentInfo'];
  studentPhoto: string | null;
}

function EnrolledStudentDialogContentInfoHeader({
  dataTestId,
  personalStudentInfo,
  studentPhoto,
}: EnrolledStudentDialogContentInfoHeaderProps) {
  const items = [
    {
      label: 'Nombre completo',
      value: personalStudentInfo.fullName,
    },
    {
      label: 'Fecha de nacimiento',
      value: personalStudentInfo.birthDate,
    },
    {
      label: 'Edad',
      value: `${personalStudentInfo.ageYears} años, ${personalStudentInfo.ageMonths} meses`,
    },
    {
      label: 'Ciudad de nacimiento',
      value: personalStudentInfo.birthCity,
    },
    {
      label: 'N° registro civil',
      value: personalStudentInfo.civilRegistrationNumber,
    },
  ];

  return (
    <div
      className="flex justify-between items-start gap-4"
      data-testid={dataTestId}
    >
      <div className="flex flex-col gap-4 w-2/3">
        <h1 className="text-2xl font-bold">
          Información personal del estudiante
        </h1>

        <div>
          {items.map((item) => (
            <EnrolledStudentDialogContentInfoDataItem
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </div>

      {studentPhoto ? (
        <Link href={studentPhoto} target="_blank" rel="noopener noreferrer">
          <Image
            src={studentPhoto}
            alt="Foto del estudiante"
            width={200}
            height={200}
            className="rounded-lg object-cover cursor-pointer border"
          />
        </Link>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <PictureInput />
          <p className="text-sm text-center">
            No se subió foto del estudiante,{' '}
            <span className="font-bold"> complete el formulario</span>
          </p>
        </div>
      )}
    </div>
  );
}

export { EnrolledStudentDialogContentInfoHeader };
