export function formatPostDate(date: string, locale = "en-US"): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
