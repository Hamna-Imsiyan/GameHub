import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  BrainCircuit,
  ChevronUp,
  Gamepad2,
  Grid3X3,
  Hand,
  Sparkles,
  Stars,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { PointerEvent, WheelEvent, KeyboardEvent } from "react";
import { HandwritingSvg } from "@/components/ui/handwriting-svg";

type WelcomeScreenProps = {
  entered: boolean;
  onEnter: () => void;
};

export function WelcomeScreen({ entered, onEnter }: WelcomeScreenProps) {
  const startY = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    if (!entered) panelRef.current?.focus();
  }, [entered]);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    startY.current = event.clientY;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (startY.current !== null && startY.current - event.clientY > 65) {
      onEnter();
    }
    startY.current = null;
  }

  function onWheel(event: WheelEvent<HTMLDivElement>) {
    // A downward scroll-wheel movement is the desktop equivalent of swiping up.
    if (event.deltaY > 24) onEnter();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (["ArrowDown", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      onEnter();
    }
  }

  return (
    <motion.div
      ref={panelRef}
      tabIndex={-1}
      aria-label="Welcome to Game Hub. Swipe up to enter, or use the Explore Games button."
      className="welcome-screen"
      initial={{ y: "0%" }}
      animate={{ y: entered ? "-105%" : "0%" }}
      transition={{ duration: reducedMotion ? 0.01 : 0.92, ease: [0.22, 1, 0.36, 1] }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { startY.current = null; }}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      style={{ pointerEvents: entered ? "none" : "auto" }}
    >
      <div className="gradient-orb gradient-orb-a" aria-hidden="true" />
      <div className="gradient-orb gradient-orb-b" aria-hidden="true" />
      <div className="gradient-orb gradient-orb-c" aria-hidden="true" />
      <div className="floating-tile float-left-top" aria-hidden="true">
        <Grid3X3 className="h-11 w-11 text-[#8d73d9]" strokeWidth={1.8} />
      </div>
      <div className="floating-tile float-left-bottom" aria-hidden="true">
        <Hand className="h-11 w-11 text-[#eb78b4]" strokeWidth={1.8} />
      </div>
      <div className="floating-tile float-right-top" aria-hidden="true">
        <BrainCircuit className="h-11 w-11 text-[#e17eae]" strokeWidth={1.8} />
      </div>
      <div className="floating-tile float-right-bottom" aria-hidden="true">
        <Stars className="h-11 w-11 text-[#9a7de4]" strokeWidth={1.8} />
      </div>
      <Sparkles className="deco-star deco-star-left" aria-hidden="true" />
      <Sparkles className="deco-star deco-star-right" aria-hidden="true" />

      <div className="welcome-content">
        
        <h1 className="sr-only">Welcome to Game Hub</h1>
        <div className="welcome-lettering" aria-hidden="true">
          <HandwritingSvg
            text="Welcome to"
            width={670}
            height={150}
            fontSize={118}
            strokeWidth={1.35}
            duration={reducedMotion ? 0.01 : 2.6}
            delay={0.4}
            className="handwriting-line handwriting-first text-[#7654b7]"
          />
          <HandwritingSvg
            text="Game Hub"
            width={650}
            height={160}
            fontSize={145}
            strokeWidth={1.5}
            duration={reducedMotion ? 0.01 : 2.9}
            delay={reducedMotion ? 0 : 1.2}
            className="handwriting-line handwriting-second text-[#d76bab]"
          />
        </div>
        <p className="welcome-tagline">Play a little. Smile a lot.</p>

        <button type="button" className="swipe-action" onClick={onEnter}>
          <motion.span
            className="swipe-chevrons"
            animate={reducedMotion ? undefined : { y: [5, -5, 5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <ChevronUp size={25} />
            <ChevronUp size={25} />
          </motion.span>
          <span>Swipe up to explore</span>
      
        </button>
      </div>
      <div className="welcome-bottom-wave" aria-hidden="true" />
    </motion.div>
  );
}
