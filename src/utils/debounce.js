/**
 * A custom debounce function to limit how often a function is executed.
 * @param {Function} func - The function to execute
 * @param {number} delay - The time to wait in milliseconds
 * @returns {Function} - A new function that delays the execution
 */
export function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}