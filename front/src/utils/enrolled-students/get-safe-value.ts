export const getSafeValue = (value?: string | number) =>
  value === null || value === undefined || value === '' ? 'No registra' : value;
