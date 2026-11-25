"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/site";
import { Button, Wordmark } from "./primitives";

export function Navigation() {
  const path = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuOpen = openFor === path;
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <header className={`topbar ${scrolled || menuOpen ? "topbar-filled" : ""}`}
    onKeyDown={(event) => {
      if (event.key === "Escape" && menuOpen) {
        setOpenFor(null);
        menuButton.current?.focus();
      }
    }}>
    <div className="container topbar-inner">
      <Wordmark />
      <button ref={menuButton} type="button" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setOpenFor(menuOpen ? null : path)}>
        {menuOpen ? <X /> : <Menu />}
      </button>
      <nav id="site-navigation" className={`main-nav ${menuOpen ? "main-nav-open" : ""}`} aria-label="Main">
        {navigation.map(({ href, label }) => {
          const active = path.replace(/\/$/, "") === href.replace(/\/$/, "");
          return <Link key={href} href={href} aria-current={active ? "page" : undefined} onClick={() => setOpenFor(null)}>{label}</Link>;
        })}
        <div className="mobile-cta" onClick={() => setOpenFor(null)}><Button href="/membership/#inquiry">Start training</Button></div>
      </nav>
      <div className="desktop-cta"><Button href="/membership/#inquiry">Start training</Button></div>
    </div>
  </header>;
}
