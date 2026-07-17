import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { EnrolledStudentWithdrawDialog } from '@/components/enrolled-students/enrolled-student-withdraw-dialog';
import { render, screen } from '@/test/render';
import { formatDate } from '@/utils/shared/date';

const mutation = vi.hoisted(() => ({
  isError: false,
  isPending: false,
  mutate: vi.fn(),
  reset: vi.fn(),
}));

vi.mock(
  '@/mutations/enrolled-students/use-withdraw-enrollment-mutation',
  () => ({
    useWithdrawEnrollmentMutation: () => mutation,
  })
);

describe('EnrolledStudentWithdrawDialog', () => {
  beforeEach(() => {
    mutation.isError = false;
    mutation.isPending = false;
    mutation.mutate.mockReset();
    mutation.reset.mockReset();
  });

  function openDialog() {
    render(
      <EnrolledStudentWithdrawDialog
        enrollmentDate="10/07/2026"
        enrollmentId="student-id"
        studentName="John Doe"
      />
    );

    return userEvent.setup();
  }

  async function selectDate(
    user: ReturnType<typeof userEvent.setup>,
    day: number
  ) {
    await user.click(screen.getByRole('button', { name: 'Fecha de retiro:' }));
    await user.click(
      await screen.findByRole('button', {
        name: new RegExp(`July ${day}(th)?, 2026`, 'i'),
      })
    );
  }

  it('defaults to today and submits a changed valid date', async () => {
    const user = openDialog();
    await user.click(screen.getByRole('button', { name: 'Retirar' }));

    expect(
      screen.getByRole('button', { name: 'Fecha de retiro:' })
    ).toHaveTextContent(formatDate(new Date()));
    await selectDate(user, 12);
    await user.click(screen.getByRole('button', { name: 'Retirar' }));

    expect(mutation.mutate).toHaveBeenCalledWith(
      { withdrawalDate: '12/07/2026' },
      expect.objectContaining({ onSuccess: expect.any(Function) })
    );
  });

  it('shows the enrollment-date error and does not mutate', async () => {
    const user = openDialog();
    await user.click(screen.getByRole('button', { name: 'Retirar' }));
    await selectDate(user, 9);
    await user.click(screen.getByRole('button', { name: 'Retirar' }));

    expect(
      await screen.findByText(
        'La fecha de retiro no puede ser anterior a la fecha de matrícula.'
      )
    ).toBeVisible();
    expect(mutation.mutate).not.toHaveBeenCalled();
  });

  it('shows the future-date error and does not mutate', async () => {
    const user = openDialog();
    await user.click(screen.getByRole('button', { name: 'Retirar' }));
    await selectDate(user, 20);
    await user.click(screen.getByRole('button', { name: 'Retirar' }));

    expect(
      await screen.findByText(
        'La fecha de retiro no puede ser posterior a la fecha actual.'
      )
    ).toBeVisible();
    expect(mutation.mutate).not.toHaveBeenCalled();
  });

  it('cancels without sending a withdrawal request', async () => {
    const user = openDialog();
    await user.click(screen.getByRole('button', { name: 'Retirar' }));
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(mutation.mutate).not.toHaveBeenCalled();
  });

  it('disables confirmation while pending and exposes mutation errors', async () => {
    mutation.isPending = true;
    mutation.isError = true;
    const user = openDialog();
    await user.click(screen.getByRole('button', { name: 'Retirar' }));

    expect(screen.getByRole('button', { name: 'Retirar' })).toBeDisabled();
    expect(screen.getByRole('alert')).toBeVisible();
  });
});
