import { useCallback, useSyncExternalStore } from "react";
import { frenchSpeech, type SpeechState } from "@/lib/frenchSpeech";

function subscribe(onStoreChange: () => void) {
  return frenchSpeech.subscribe(() => {
    onStoreChange();
  });
}

function getSnapshot(): SpeechState {
  return frenchSpeech.getState();
}

const serverSnapshot: SpeechState = {
  speaking: false,
  error: null,
  engine: null,
  lineIndex: -1,
};

function getServerSnapshot(): SpeechState {
  return serverSnapshot;
}

/** Estado do player sincronizado com o singleton (evita botão Play/Parar dessincronizado). */
export function useFrenchSpeech() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleDay = useCallback((lines: Parameters<typeof frenchSpeech.toggleDay>[0]) => {
    frenchSpeech.toggleDay(lines);
  }, []);

  const playDay = useCallback((lines: Parameters<typeof frenchSpeech.playDay>[0]) => {
    void frenchSpeech.playDay(lines);
  }, []);

  const stop = useCallback(() => {
    frenchSpeech.stop();
  }, []);

  return {
    supported: typeof window !== "undefined" ? frenchSpeech.isSupported() : false,
    speaking: state.speaking,
    error: state.error,
    engine: state.engine,
    lineIndex: state.lineIndex,
    toggleDay,
    playDay,
    stop,
  };
}
