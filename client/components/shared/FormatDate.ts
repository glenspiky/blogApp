// Changing the parameter type to allow Date, string, or undefined
export const formatDate = (dateValue: Date | string | undefined) => {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
