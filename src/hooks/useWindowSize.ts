import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = document.getElementById('root');
    if (!el) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return size;
};
