
export const addToGoogleCalendar = (
  name: string,
  description: string,
  startDate: string,
  startTime: string,
  location: string
) => {
  const DEFAULT_DURATION = 1;
  const eventTime = new Date(startDate);
  const startDateTime = formatDateTime(startDate, startTime);

  const [hours, minutes] = startTime.split(":").map(Number);
  eventTime.setHours(hours);
  eventTime.setMinutes(minutes);
  const endDateTime = addHours(eventTime, DEFAULT_DURATION);
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    name
  )}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(location)}`;
  console.log({
    startDateTime,
    eventTime,
    endDateTime,
  });
  window.open(googleCalendarUrl, "_blank");
};

const formatDateTime = (isoDate: string, timeString: string): string => {
  // Parse the ISO date
  const date = new Date(isoDate);
  const [hours, minutes] = timeString.split(":").map(Number);

  // Set the time components
  date.setHours(hours + 1);
  date.setMinutes(minutes);

  // Format to YYYYMMDDTHHMMSS
  return date
    .toISOString()
    .replace(/[-:.]/g, "") // Remove dashes, colons, and period
    .slice(0, 15); // Take only YYYYMMDDTHHMMSS part
};

const addHours = (date: Date, hours: number): string => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours + 1);
  return newDate.toISOString().replace(/[-:.]/g, "").slice(0, 15);
};
