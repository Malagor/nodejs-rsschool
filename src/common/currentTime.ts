export function currentTime(): string {
  const now = new Date();
  return now.toLocaleString('ru-Ru');
}
