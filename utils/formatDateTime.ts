export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    year: "numeric",
    day:"numeric"
  };
  return date.toLocaleDateString("en-US", options);
}

export function formatTime(time24: string): string {

    const [hourString, minute] = time24.split(":");
    let hour = parseInt(hourString);

    const suffix = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; 
  
    return `${hour}:${minute} ${suffix}`;
  }
  