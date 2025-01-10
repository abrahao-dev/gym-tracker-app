export const calculateProgress = (value: number, total: number): number => {
  return Number(((value / total) * 100).toFixed(6))
}

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]
}