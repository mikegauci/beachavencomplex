"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
export default function Gallery({
  images,
  label,
}: {
  images: string[];
  label: string;
}) {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const move = (n: number) =>
    setActive((a) => (a + n + images.length) % images.length);
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((a) => (a + 1) % images.length);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((a) => (a - 1 + images.length) % images.length);
      }
    };
    d.addEventListener("keydown", key);
    return () => d.removeEventListener("keydown", key);
  }, [images.length]);
  return (
    <>
      <div className={`gallery gallery-${images.length}`}>
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => {
              setActive(i);
              dialog.current?.showModal();
            }}
            aria-label={`Enlarge ${label} photo ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${label}, photograph ${i + 1}`}
              fill
              sizes="(max-width: 760px) 100vw, 33vw"
            />
            <span>
              <Maximize2 size={18} />
            </span>
          </button>
        ))}
      </div>
      <dialog
        className="lightbox"
        ref={dialog}
        aria-label={`${label} photo gallery`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="lightbox-close"
          aria-label="Close gallery"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        <div className="lightbox-photo">
          <Image
            src={images[active]}
            alt={`${label}, photograph ${active + 1}`}
            fill
            sizes="90vw"
          />
        </div>
        <div className="lightbox-controls">
          <button aria-label="Previous photograph" onClick={() => move(-1)}>
            <ArrowLeft />
          </button>
          <span>
            {active + 1} / {images.length}
          </span>
          <button aria-label="Next photograph" onClick={() => move(1)}>
            <ArrowRight />
          </button>
        </div>
      </dialog>
    </>
  );
}
