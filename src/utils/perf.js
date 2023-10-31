import { useRef, useEffect } from "react";

export function useRenderCounter(name) {
  const ref = useRef(0);
  useEffect(() => {
    ref.current += 1;
    console.log(`[Render][${name}]`, ref.current);
  });
}
