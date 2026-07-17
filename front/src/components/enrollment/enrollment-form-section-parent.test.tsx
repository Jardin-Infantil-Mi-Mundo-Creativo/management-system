import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { EnrollmentFormSectionParent } from '@/components/enrollment/enrollment-form-section-parent';
import { useEnrollmentForm } from '@/hooks/enrollment/use-enrollment-form';
import { render, screen, within } from '@/test/render';

function ParentForm() {
  const form = useEnrollmentForm();

  return (
    <form onSubmit={form.handleSubmit(() => undefined)}>
      <EnrollmentFormSectionParent {...form} parent="mother" />
      <EnrollmentFormSectionParent {...form} parent="father" />
      <button
        type="button"
        onClick={() =>
          form.setError('mother.birthDate', {
            message: 'La fecha de nacimiento es requerida',
          })
        }
      >
        Crear error
      </button>
      <button type="submit">Enviar</button>
      <output data-testid="form-values">
        {JSON.stringify(form.getValues())}
      </output>
    </form>
  );
}

describe('EnrollmentFormSectionParent', () => {
  it('starts with both sections enabled and their omission checkboxes unchecked', () => {
    render(<ParentForm />);

    const motherOmission = screen.getByRole('checkbox', {
      name: 'Omitir información de la madre',
    });
    const fatherOmission = screen.getByRole('checkbox', {
      name: 'Omitir información del padre',
    });

    expect(motherOmission).not.toBeChecked();
    expect(fatherOmission).not.toBeChecked();
    const motherSection = screen.getByRole('heading', {
      name: 'Información de la madre',
    }).parentElement!;
    expect(
      within(motherSection).getByRole('textbox', { name: 'Nombre completo:' })
    ).toBeEnabled();
  });

  it('resets, identifies, disables, and re-enables an omitted section', async () => {
    const user = userEvent.setup();
    render(<ParentForm />);

    const motherHeading = screen.getByRole('heading', {
      name: 'Información de la madre',
    });
    const motherSection = motherHeading.parentElement!;
    const motherName = within(motherSection).getByRole('textbox', {
      name: 'Nombre completo:',
    });

    await user.type(motherName, 'Ana Pérez');
    await user.click(screen.getByRole('button', { name: 'Crear error' }));
    expect(
      await within(motherSection).findByText(
        'La fecha de nacimiento es requerida'
      )
    ).toBeVisible();

    await user.click(
      within(motherSection).getByRole('checkbox', {
        name: 'Omitir información de la madre',
      })
    );

    expect(screen.getByTestId('form-values')).toHaveTextContent(
      '"omitMother":true'
    );

    expect(motherName).toHaveValue('');
    expect(motherName).toBeDisabled();
    expect(
      within(motherSection).getByRole('button', {
        name: 'Fecha de nacimiento:',
      })
    ).toBeDisabled();
    expect(
      within(motherSection).getByRole('combobox', { name: 'Nivel educativo:' })
    ).toBeDisabled();
    expect(
      within(motherSection).queryByText('La fecha de nacimiento es requerida')
    ).not.toBeInTheDocument();
    expect(
      within(motherSection).getByText('Esta información no será registrada.')
    ).toBeVisible();

    await user.click(
      within(motherSection).getByRole('checkbox', {
        name: 'Omitir información de la madre',
      })
    );
    expect(motherName).toBeEnabled();
    expect(motherName).toHaveValue('');
  });

  it('shows only the at-least-one-parent error when both sections are omitted', async () => {
    const user = userEvent.setup();
    render(<ParentForm />);

    await user.click(
      screen.getByRole('checkbox', {
        name: 'Omitir información de la madre',
      })
    );
    await user.click(
      screen.getByRole('checkbox', {
        name: 'Omitir información del padre',
      })
    );
    await user.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(
      await screen.findByText(
        'Registre la información de al menos uno de los padres'
      )
    ).toBeVisible();
    expect(
      screen.queryByText('La fecha de nacimiento es requerida')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('El nombre es requerido')).not.toBeInTheDocument();
  });
});
