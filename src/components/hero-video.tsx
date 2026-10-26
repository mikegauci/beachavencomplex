"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function HeroVideo({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      if (preference.matches) video.current?.pause();
      else void video.current?.play().catch(() => {});
    };
    updatePlayback();
    preference.addEventListener("change", updatePlayback);
    return () => preference.removeEventListener("change", updatePlayback);
  }, []);

  return (
    <>
      <video
        ref={video}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label="Beachaven promotional video"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        className="hero-video-toggle"
        aria-label={playing ? "Pause hero video" : "Play hero video"}
        onClick={() => {
          if (video.current?.paused) void video.current.play().catch(() => {});
          else video.current?.pause();
        }}
      >
        {playing ? <Pause size={17} /> : <Play size={17} />}
      </button>
    </>
  );
}
