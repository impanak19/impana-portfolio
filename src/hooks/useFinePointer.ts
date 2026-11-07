import { useEffect, useState } from 'react';

const QUERY = '(hover: hover) and (pointer: fine)';

export function useFinePointer() {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const update = () => setIsFine(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isFine;
}
