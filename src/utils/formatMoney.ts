export const formatMGA = (amount: number): string => {
  return new Intl.NumberFormat('mg-MG', {
    style: 'currency',
    currency: 'MGA',
  }).format(amount);
};

export const formatNumber = (amount: number): string => {
  return new Intl.NumberFormat('mg-MG').format(amount);
};