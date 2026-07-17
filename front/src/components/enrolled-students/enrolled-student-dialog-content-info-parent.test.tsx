import { describe, expect, it } from 'vitest';

import { EnrolledStudentDialogContentInfoParent } from '@/components/enrolled-students/enrolled-student-dialog-content-info-parent';
import { render, screen } from '@/test/render';
import type { ParentInformation } from '@/types/enrollment';

const parent: ParentInformation = {
  address: 'Calle 1',
  ageYears: 40,
  birthDate: '01/01/1986',
  cellPhoneNumber: '3001234567',
  educationLevel: 'technical',
  email: 'ana@example.com',
  fullName: 'Ana Pérez',
  identificationNumber: '123456789',
  neighborhood: 'Centro',
  occupation: 'Docente',
  stratum: '3',
  telephoneNumber: '',
};

describe('EnrolledStudentDialogContentInfoParent', () => {
  it('shows the available parent fields', () => {
    render(
      <EnrolledStudentDialogContentInfoParent
        dataTestId="mother"
        parentData={parent}
        title="Información de la madre"
      />
    );
    expect(screen.getByText('Ana Pérez')).toBeVisible();
  });

  it('shows the omitted-information state when the parent is null', () => {
    render(
      <EnrolledStudentDialogContentInfoParent
        dataTestId="father"
        parentData={null}
        title="Información del padre"
      />
    );
    expect(screen.getByText('Información no suministrada')).toBeVisible();
  });
});
