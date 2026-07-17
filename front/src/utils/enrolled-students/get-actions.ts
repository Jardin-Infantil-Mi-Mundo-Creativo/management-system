import type { AdditionalBackendFields } from '@/types/shared';

function getEnrollmentActions(state: AdditionalBackendFields['state']) {
  return state === 'completed'
    ? ['Ver', 'Retirar', 'Eliminar']
    : ['Ver', 'Eliminar'];
}

export { getEnrollmentActions };
