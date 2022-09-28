/**
==========================================
 Title:  Custom debounce
 Author: Edward
 Date:   27 September 2022
==========================================
 */

// External Dependencies
import { useEffect, useRef } from "react";

const useDebounce = (callback, delay) => {
  const latestCallback = useRef();
  const latestTimeout = useRef();

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  return () => {
    if (latestTimeout.current) {
      clearTimeout(latestTimeout.current);
    }

    latestTimeout.current = setTimeout(() => {
      latestCallback.current();
    }, delay);
  };
};

export default useDebounce;
