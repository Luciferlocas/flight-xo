"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * A custom hook that returns a debounced version of the provided callback function
 *
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds
 * @param dependencies - Dependencies for the useCallback hook
 * @returns The debounced callback function
 */
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay = 300,
  dependencies: React.DependencyList = []
): (...args: Parameters<T>) => void {
  // Use useRef to store the timeout ID
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear the timeout when component unmounts or dependencies change
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dependencies]);

  // Create a memoized version of the debounced callback
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay, ...dependencies]
  );

  return debouncedCallback;
}
