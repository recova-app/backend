export function parseCheckinTime(timeStr: string): Date {
  // Expecting format 'HH:mm'
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(timeStr)) {
    throw new Error('Format waktu check-in tidak valid, gunakan format HH:mm');
  }

  const [hoursStr, minutesStr] = timeStr.split(':');
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  const now = new Date();
  const checkinDate = new Date(now);
  checkinDate.setHours(hours, minutes, 0, 0);

  return checkinDate;
}
