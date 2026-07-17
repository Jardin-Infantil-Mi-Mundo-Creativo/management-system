import { describe, expect, it } from 'vitest';

import { getEnrollmentActions } from '@/utils/enrolled-students/get-actions';

describe('getEnrollmentActions', () => {
  it('keeps delete available for every state and withdrawal only for active students', () => {
    expect(getEnrollmentActions('draft')).toEqual(['Ver', 'Eliminar']);
    expect(getEnrollmentActions('completed')).toEqual([
      'Ver',
      'Retirar',
      'Eliminar',
    ]);
    expect(getEnrollmentActions('retired')).toEqual(['Ver', 'Eliminar']);
  });
});
