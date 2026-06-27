import { useEffect, useState } from "react";

export function useCountUp(target: number, isActive: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let startTime: number | null = null;
    let frameId: number;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out-quart for a snappy-then-settle feel
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isActive, target, duration]);

  return value;
}
