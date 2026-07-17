import { describe, expect, it } from 'vitest';

import { EnrolledStudentDialogContentInfoAuthorizedPersons } from '@/components/enrolled-students/enrolled-student-dialog-content-info-authorized-persons';
import { render, screen } from '@/test/render';

describe('EnrolledStudentDialogContentInfoAuthorizedPersons', () => {
  it.each([
    [true, true, 'Los padres son las únicas personas autorizadas.'],
    [true, false, 'Solo la madre puede recoger al estudiante.'],
    [false, true, 'Solo el padre puede recoger al estudiante.'],
  ])(
    'describes the registered parents when no additional person exists',
    (isMotherAuthorized, isFatherAuthorized, message) => {
      render(
        <EnrolledStudentDialogContentInfoAuthorizedPersons
          authorizedPersons={[]}
          dataTestId="authorized"
          isMotherAuthorized={isMotherAuthorized}
          isFatherAuthorized={isFatherAuthorized}
        />
      );
      expect(screen.getByText(message)).toBeVisible();
    }
  );

  it('shows additional authorized people instead of a parent-only message', () => {
    render(
      <EnrolledStudentDialogContentInfoAuthorizedPersons
        authorizedPersons={[
          { cellPhoneNumber: '3001234567', fullName: 'Carla' },
        ]}
        dataTestId="authorized"
        isMotherAuthorized
        isFatherAuthorized={false}
      />
    );
    expect(screen.getByText('Carla')).toBeVisible();
    expect(
      screen.queryByText('Solo la madre puede recoger al estudiante.')
    ).not.toBeInTheDocument();
  });
});
