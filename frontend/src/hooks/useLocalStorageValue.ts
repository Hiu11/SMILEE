"use client";

import { useCallback, useSyncExternalStore } from "react";

export const LOCAL_STORAGE_CHANGE_EVENT = "smilee:local-storage-change";

export function notifyLocalStorageChange() {
  window.dispatchEvent(new Event(LOCAL_STORAGE_CHANGE_EVENT));
}

export function useLocalStorageValue(key: string) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener("storage", onStoreChange);
    window.addEventListener(LOCAL_STORAGE_CHANGE_EVENT, onStoreChange);

    return () => {
      window.removeEventListener("storage", onStoreChange);
      window.removeEventListener(LOCAL_STORAGE_CHANGE_EVENT, onStoreChange);
    };
  }, []);

  const getSnapshot = useCallback(() => localStorage.getItem(key), [key]);
  const getServerSnapshot = useCallback(() => null, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
