/**
 * Generates a random timestamp within the last 60 days in milliseconds.
 *
 * @returns {number} A random timestamp within the last 60 days in milliseconds.
 */
export function randomDateWithinLast60Days(): number {
  const now = new Date().getTime();
  const sixtyDaysAgo = now - 60 * 24 * 60 * 60 * 1000;
  return Math.floor(Math.random() * (now - sixtyDaysAgo)) + sixtyDaysAgo;
}

/**
 * Adjusts the end timestamp based on the start timestamp and a random duration between 15 minutes and 10 hours in milliseconds.
 * The duration is rounded to the nearest 15 minutes.
 *
 * @param {number} start - The start timestamp in milliseconds.
 * @returns {number} The adjusted end timestamp in milliseconds.
 */
export function adjustEndTimestamp(start: number): number {
  const minDuration = 15 * 60 * 1000;
  const maxDuration = 10 * 60 * 60 * 1000;
  const duration =
    Math.floor(Math.random() * (maxDuration - minDuration)) + minDuration;
  const roundedDuration =
    Math.round(duration / (15 * 60 * 1000)) * 15 * 60 * 1000;
  return start + roundedDuration;
}

/**
 * Generates a random break length between 0 and the given duration, rounded to the nearest minute.
 *
 * @param {number} duration - The duration in milliseconds.
 * @returns {number} A random break length in milliseconds.
 */
export function randomBreakLength(duration: number): number {
  const maxBreakLength = Math.min(duration - 1 * 60 * 1000, 45 * 60 * 1000);
  const breakLength = Math.floor(Math.random() * maxBreakLength);
  return Math.round(breakLength / (60 * 1000)) * 60 * 1000;
}
