import { useEffect, useRef, useState, type ReactNode } from "react";
import { useProgress } from "@react-three/drei";
import { BrainLoadingScreen } from "./BrainLoadingScreen";

// The actual model loads in well under a second on a fast connection — but
// the fill animation is the point of the loading screen, so it's given a
// guaranteed minimum runway regardless of how fast loading actually finishes.
// displayFraction is capped at min(timeFraction, realFraction): never faster
// than the minimum-duration pace, but also never ahead of real progress if
// the network is genuinely slower than that.
const MIN_LOADING_SECONDS = 2.4;
const HOLD_AT_FULL_SECONDS = 0.4;
// Matches the CSS transition duration on .loading-screen--exiting.
const EXIT_DURATION_SECONDS = 0.3;

type Phase = "filling" | "holding" | "exiting" | "ready";

interface AppLoadGateProps {
  children: ReactNode;
}

export function AppLoadGate({ children }: AppLoadGateProps) {
  const { progress, active } = useProgress();
  const progressRef = useRef(progress);
  const activeRef = useRef(active);
  progressRef.current = progress;
  activeRef.current = active;

  const [phase, setPhase] = useState<Phase>("filling");
  const [displayFraction, setDisplayFraction] = useState(0);

  // Drives the visual fill only while actually filling; stops touching
  // anything once the phase moves on.
  useEffect(() => {
    if (phase !== "filling") return undefined;

    let animationFrameId: number;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsedSeconds = (now - startTime) / 1000;
      const timeFraction = Math.min(1, elapsedSeconds / MIN_LOADING_SECONDS);
      const realFraction = progressRef.current / 100;
      setDisplayFraction(Math.min(timeFraction, realFraction));

      const loadFinished = !activeRef.current && progressRef.current >= 100;
      if (timeFraction >= 1 && loadFinished) {
        setPhase("holding");
        return;
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [phase]);

  // Fixed-duration phases are plain timeouts — far easier to get right than
  // tracking multiple time deltas by hand inside one continuous rAF loop,
  // which is what caused an earlier version of this to stall mid-fade.
  useEffect(() => {
    if (phase !== "holding") return undefined;
    const timeoutId = window.setTimeout(() => setPhase("exiting"), HOLD_AT_FULL_SECONDS * 1000);
    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return undefined;
    const timeoutId = window.setTimeout(() => setPhase("ready"), EXIT_DURATION_SECONDS * 1000);
    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  if (phase === "ready") return <>{children}</>;

  return <BrainLoadingScreen fraction={displayFraction} isExiting={phase === "exiting"} />;
}
