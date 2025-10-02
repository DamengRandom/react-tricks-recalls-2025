export default function debounce<T>(cb: (...args: T[]) => void, delay: number) {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: T[]) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  }
}
