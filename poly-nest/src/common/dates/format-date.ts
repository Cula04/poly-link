export const formatDateToISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const addDays = (date: Date, numberOfDays: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numberOfDays);
  return newDate;
};

export const addHours = (date: Date, numberOfHours: number): Date => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + numberOfHours);
  return newDate;
};
