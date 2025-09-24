# Performance Improvements in React

- List: 
  - `Virtual List (Virtualized List)` - Only render visible items (For large list of rendering)

- Code Splitting
  - `React.lazy` (selectively loading components, reduce bundle file size)
  - `React.Suspense` (fallback handling)
  - `React.Fragment` (grouping elements without adding extra nodes to the DOM)

- Memoization
  - `memo` (prevent unnecessary re-renders)
  - `useMemo` (memoize expensive calculations)
  - `useCallback` (memoize expensive functions)

- Throttling and Debouncing
  - `Throttling`: function repeatedly called after a given interval of time
  - `Debouncing`: function get invoked after a certain period of inactivity

- Image Lazy Loading, eg: placeholder image rendering for large size of image

- Web workers
  - Allow to run JavaScript in the background, without blocking the main thread
  - Performing a complex (long time) computational tasks without blocking main thread

- 