"use client";

import { ChevronLeft, ChevronRight, Expand, Play, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Asset } from "@/lib/site";
import { Photo } from "./primitives";

export function Gallery({ assets }: { assets: Asset[] }) {
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();
  const categories = ["All", ...new Set(assets.map((asset) => asset.category))];
  const visible = filter === "All" ? assets : assets.filter((asset) => asset.category === filter);
  const current = visible[index];
  const step = (offset: number) => setIndex((previous) => (previous + offset + visible.length) % visible.length);

  return <>
    <div className="gallery-filters" role="group" aria-label="Filter gallery">
      {categories.map((category) => <button key={category} className="filter" type="button" aria-pressed={filter === category}
        onClick={() => { setFilter(category); setIndex(0); }}>{category}</button>)}
    </div>
    <div className="gallery-grid">
      {visible.map((asset, position) => <button type="button" className={`gallery-tile ${asset.width > asset.height ? "tile-landscape" : ""}`} key={asset.src}
        aria-label={`${asset.video ? "Play" : "Enlarge"} ${asset.label.toLowerCase()}`} onClick={(event) => {
          opener.current = event.currentTarget;
          setIndex(position);
          setIsOpen(true);
          dialog.current?.showModal();
        }}>
        <Photo asset={asset} />
        <span className="gallery-label"><span>{asset.label}</span>{asset.video ? <Play size={19} aria-hidden="true" /> : <Expand size={19} aria-hidden="true" />}</span>
      </button>)}
    </div>
    <dialog ref={dialog} className="lightbox" aria-label="Training media viewer" onClose={() => { setIsOpen(false); opener.current?.focus(); }}
      onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
      onKeyDown={(event) => {
        if (!(event.target instanceof HTMLVideoElement) && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
          event.preventDefault();
          step(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
      <div className="lightbox-inner">
        <button className="lightbox-button lightbox-close" type="button" autoFocus aria-label="Close media viewer" onClick={() => dialog.current?.close()}><X /></button>
        {visible.length > 1 && <button className="lightbox-button lightbox-prev" type="button" aria-label="Previous item" onClick={() => step(-1)}><ChevronLeft /></button>}
        {isOpen && current && <AnimatePresence mode="wait" initial={false}>
          <motion.figure key={current.src} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? undefined : { opacity: 0 }} transition={{ duration: reduced ? 0 : 0.15 }}>
            {current.video
              ? <video controls playsInline preload="none" poster={current.src} src={current.video} aria-label={current.alt} />
              : <Image src={current.src} alt={current.alt} width={current.width} height={current.height} />}
            <figcaption aria-live="polite">{current.label} <span>{index + 1} / {visible.length}</span></figcaption>
          </motion.figure>
        </AnimatePresence>}
        {visible.length > 1 && <button className="lightbox-button lightbox-next" type="button" aria-label="Next item" onClick={() => step(1)}><ChevronRight /></button>}
      </div>
    </dialog>
  </>;
}
