import { useState, useEffect } from 'react';

export function useAppLoadingTimeout(ms?: number) {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, ms ?? 500);
    return () => clearTimeout(timeout);
  }, [isLoaded, ms]);
  return isLoaded;
}
