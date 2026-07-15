import { z } from 'zod';

import { parseDate } from '@/utils/shared/date';

function createWithdrawalSchema(enrollmentDate: string, today = new Date()) {
  const normalizedToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return z.object({
    withdrawalDate: z
      .string()
      .refine((value) => !!parseDate(value), 'La fecha de retiro no es válida.')
      .refine((value) => {
        const withdrawal = parseDate(value);
        const enrollment = parseDate(enrollmentDate);
        return !!withdrawal && !!enrollment && withdrawal >= enrollment;
      }, 'La fecha de retiro no puede ser anterior a la fecha de matrícula.')
      .refine((value) => {
        const withdrawal = parseDate(value);
        return !!withdrawal && withdrawal <= normalizedToday;
      }, 'La fecha de retiro no puede ser posterior a la fecha actual.'),
  });
}

export { createWithdrawalSchema };
