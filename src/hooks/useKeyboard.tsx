import { useEffect } from 'react';

export interface ShortcutKeys {
  key: string;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  meta: boolean;
}

export const useShortcut = (predicate: (keys: ShortcutKeys) => boolean, handler: () => unknown) => {
  useEffect(() => {
    document.addEventListener('keypress', e => {
      if (
        predicate({
          key: e.key,
          ctrl: e.ctrlKey,
          shift: e.shiftKey,
          alt: e.altKey,
          meta: e.metaKey
        })
      ) {
        handler();
      }
    });
    return () => document.removeEventListener('keydown', handler);
  }, [handler]);
};

export const useDocumentEvent = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => {
  useEffect(() => {
    document.addEventListener(type, listener, options);
    return () => document.removeEventListener(type, listener, options);
  }, [type, listener, options]);
};
