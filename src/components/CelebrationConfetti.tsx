import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { Level, CustomCourse } from "../types";

interface CelebrationConfettiProps {
  activeCelebrateId: string | null;
  celebratedLevel: Level | CustomCourse | null;
  onDismiss: (id: string | number) => void;
}

interface Particle {
  id: number;
  x: number; // percentage
  y: number; // start height
  size: number;
  color: string;
  shape: "circle" | "square" | "triangle" | "star";
  rotation: number;
  duration: number;
  delay: number;
}

export default function CelebrationConfetti({
  activeCelebrateId,
  celebratedLevel,
  onDismiss
}: CelebrationConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Synthesize a clean, pleasant harmonic arpeggio when a milestone is completed!
  useEffect(() => {
    if (!activeCelebrateId) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const playTone = (freq: number, startTime: number, duration: number, type: OscillatorType = "sine") => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);
        
        // Custom gain envelope to match a classical harp/bell chime
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
      };

      // Play a beautiful, heartwarming major chord cascade (C-E-G-C)
      const now = ctx.currentTime;
      playTone(523.25, now + 0.0, 1.2, "sine"); // C5
      playTone(659.25, now + 0.15, 1.0, "triangle"); // E5
      playTone(783.99, now + 0.3, 0.9, "sine"); // G5
      playTone(1046.50, now + 0.45, 1.4, "sine"); // C6
    } catch (e) {
      console.warn("Audio Context could not start:", e);
    }
  }, [activeCelebrateId]);

  // Generate confetti coordinates
  useEffect(() => {
    if (!activeCelebrateId) {
      setParticles([]);
      return;
    }

    const colors = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#EC4899", "#FB7185", "#34D399"];
    const shapes: Array<"circle" | "square" | "triangle" | "star"> = ["circle", "square", "triangle", "star"];
    
    const count = 75;
    const generated: Particle[] = Array.from({ length: count }).map((_, i) => {
      const x = Math.random() * 100;
      const size = 6 + Math.random() * 12;
      const color = colors[i % colors.length];
      const shape = shapes[i % shapes.length];
      const rotation = Math.random() * 360;
      const duration = 3.5 + Math.random() * 3.5;
      const delay = Math.random() * 1.5;

      return {
        id: i,
        x,
        y: -10,
        size,
        color,
        shape,
        rotation,
        duration,
        delay
      };
    });

    setParticles(generated);
  }, [activeCelebrateId]);

  if (!activeCelebrateId || !celebratedLevel) return null;

  const isLevel = "category" in celebratedLevel;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[120] bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        id="celebrate-badge-modal-container"
      >
        {/* Floating Confetti Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => {
            const shapeStyle: React.CSSProperties = {
              backgroundColor: p.shape === "triangle" ? "transparent" : p.color,
              width: p.size,
              height: p.size,
              borderRadius: p.shape === "circle" ? "50%" : p.shape === "triangle" ? "0" : "4px"
            };

            // Custom SVG for triangles/stars for cleaner aesthetics
            return (
              <motion.div
                key={p.id}
                initial={{ y: "-15vh", x: `${p.x}vw`, rotate: 0, opacity: 1 }}
                animate={{
                  y: "115vh",
                  x: `${p.x + (Math.random() * 26 - 13)}vw`,
                  rotate: p.rotation + 720,
                  opacity: [1, 1, 0.9, 0]
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute"
                style={{ zIndex: 121 }}
              >
                {p.shape === "triangle" ? (
                  <svg 
                    width={p.size} 
                    height={p.size} 
                    viewBox="0 0 24 24" 
                    fill={p.color}
                  >
                    <polygon points="12,2 2,22 22,22" />
                  </svg>
                ) : p.shape === "star" ? (
                  <svg 
                    width={p.size} 
                    height={p.size} 
                    viewBox="0 0 24 24" 
                    fill={p.color}
                  >
                    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                  </svg>
                ) : (
                  <div style={shapeStyle} />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Celebratory Banner Modal */}
        <motion.div
          initial={{ scale: 0.9, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: -10, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center relative overflow-hidden shadow-2xl border-2 border-amber-400 z-[122]"
        >
          {/* Radial Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

          <div className="space-y-6">
            {/* Pulsing Trophy Shield */}
            <div className="inline-flex relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full scale-125 animate-ping"></div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.06, 1], rotate: [0, -4, 4, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-neutral-800/90 p-5 rounded-2xl border border-amber-400/40 text-amber-400 shadow-md shadow-amber-500/10 relative"
              >
                <Trophy size={48} className="animate-pulse" />
              </motion.div>
              <div className="absolute -top-1 -right-1 text-2xl animate-bounce">✨</div>
              <div className="absolute -bottom-1 -left-1 text-2xl animate-bounce delay-150">🎉</div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 font-extrabold uppercase bg-amber-500/15 border border-amber-400/30 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 justify-center">
                <Sparkles size={11} className="text-amber-400" />
                <span>NEW ACHIEVEMENT UNLOCKED!</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-white leading-normal">
                {celebratedLevel.id ? `Module ${celebratedLevel.id} Mastered!` : "Custom Module Mastered!"}
              </h3>
              <p className="text-amber-300 font-sans font-bold text-sm sm:text-base">
                {celebratedLevel.title}
              </p>
            </div>

            {/* Curriculum Competency Summary Card */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">UNLOCKED COMPETENCY</span>
                <span className="text-[10px] font-mono font-bold text-emerald-450 flex items-center gap-1">
                  <CheckCircle2 size={10} /> Verified Complete
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans font-medium">
                {celebratedLevel.description}
              </p>
              {isLevel && (celebratedLevel as Level).businessImpact && (
                <div className="pt-2 border-t border-white/5 text-[11px] text-emerald-400 font-medium">
                  🎯 Business Impact: {(celebratedLevel as Level).businessImpact}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-neutral-400 text-xs font-mono">
                You successfully verified 100% of the checklist items in this path. Your digital credentials are now printed and ready.
              </p>
              
              <button
                type="button"
                onClick={() => onDismiss(activeCelebrateId)}
                className="w-full py-4 bg-gradient-to-r from-amber-400 hover:from-amber-350 to-yellow-500 hover:to-yellow-450 text-neutral-950 font-sans font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-[1.01]"
              >
                Claim Mastery Certificate &amp; Badge
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
