export function formatSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return 'Invalid input';
  }

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const parts = [];
  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);
  }
  if (seconds > 0) {
    parts.push(`${seconds} sec${seconds > 1 ? 's' : ''}`);
  }

  return parts.join(' ');
}

export function formatSecond2(seconds) {
  if (seconds < 0) {
    return 'Invalid input';
  }

  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const remainingSecondsAfterMinutes = remainingSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSecondsAfterMinutes}s`;
  } else {
    return `${remainingSecondsAfterMinutes}s`;
  }
}

export function formatMinutes(minutes) {
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} hrs`;
  }
}
