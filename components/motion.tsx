"use client";

import { Pause, Play } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.div initial={false} animate={reduced ? undefined : { opacity: [0.88, 1] }} transition={{ duration: 0.28 }}>{children}</motion.div>;
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} initial={false}
      whileInView={reduced ? undefined : { opacity: [0.8, 1], y: [11, 0] }}
      viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.52 }}>
      {children}
    </motion.div>
  );
}

const motionPreference = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(update: () => void) {
  const media = window.matchMedia(motionPreference);
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
}

function motionIsReduced() {
  return window.matchMedia(motionPreference).matches;
}

function serverMotionPreference() {
  return true;
}

export function HeroMedia({ children, video, poster }: { children: ReactNode; video: string; poster: string }) {
  const reduced = useSyncExternalStore(subscribeToMotionPreference, motionIsReduced, serverMotionPreference);
  const container = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { scrollY } = useScroll();
  const displacement = useTransform(scrollY, [0, 850], [0, 75], { clamp: true });
  const showVideo = Boolean(video) && !reduced && !failed;

  useEffect(() => {
    const element = player.current;
    const region = container.current;
    if (!element || !region) return;

    const syncPlayback = () => {
      if (inView.current && !document.hidden && !paused) void element.play().catch(() => {});
      else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(region);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [showVideo, paused]);

  return <>
    <div className="hero-media" ref={container}>
      <motion.div className="hero-media-inner" style={reduced ? undefined : { y: displacement }}>
        {children}
        {showVideo && <video ref={player} src={video} poster={poster} muted loop playsInline preload="none"
          tabIndex={-1} aria-hidden="true" className={ready ? "is-ready" : undefined}
          onPlaying={() => setReady(true)} onError={() => setFailed(true)} />}
      </motion.div>
    </div>
    {showVideo && ready && <button className="hero-video-toggle" type="button" onClick={() => setPaused((previous) => !previous)}>
      {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      <span className="sr-only">{paused ? "Play background video" : "Pause background video"}</span>
    </button>}
  </>;
}
