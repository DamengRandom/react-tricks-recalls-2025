export default function debounce<T extends unknown[]>(
  func: (...args: T) => void, 
  delay: number
) {
  let timer: NodeJS.Timeout | null = null;

  return (...args: T) => {
    if (timer) {
      clearTimeout(timer); // reset previous timer
    }

    timer = setTimeout(() => {
      func(...args); // run function after delay
    }, delay);
  };
}
