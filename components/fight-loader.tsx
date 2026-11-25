"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Point = [number, number];
type Pose = {
  hip: Point;
  chest: Point;
  head: Point;
  backElbow: Point;
  backGlove: Point;
  frontElbow: Point;
  frontGlove: Point;
};

const cycleLength = 920;
const impactAt = 465;
const revealLength = 340;
const maximumWait = 3600;
const motionPreference = "(prefers-reduced-motion: reduce)";

const guard: Pose = {
  hip: [0, 0], chest: [8, -112], head: [27, -164],
  backElbow: [-36, -61], backGlove: [31, -122],
  frontElbow: [42, -58], frontGlove: [77, -113],
};
const windup: Pose = {
  hip: [-8, 2], chest: [-16, -110], head: [3, -159],
  backElbow: [-58, -72], backGlove: [-19, -124],
  frontElbow: [28, -62], frontGlove: [67, -116],
};
const strike: Pose = {
  hip: [29, -4], chest: [61, -115], head: [79, -164],
  backElbow: [112, -126], backGlove: [178, -139],
  frontElbow: [65, -63], frontGlove: [83, -117],
};
const block: Pose = {
  hip: [0, 3], chest: [-10, -109], head: [9, -160],
  backElbow: [-25, -66], backGlove: [25, -126],
  frontElbow: [37, -72], frontGlove: [51, -139],
};

function blend(from: Pose, to: Pose, amount: number): Pose {
  const mix = ([x, y]: Point, [nextX, nextY]: Point): Point => [x + (nextX - x) * amount, y + (nextY - y) * amount];
  return {
    hip: mix(from.hip, to.hip), chest: mix(from.chest, to.chest), head: mix(from.head, to.head),
    backElbow: mix(from.backElbow, to.backElbow), backGlove: mix(from.backGlove, to.backGlove),
    frontElbow: mix(from.frontElbow, to.frontElbow), frontGlove: mix(from.frontGlove, to.frontGlove),
  };
}

function ease(progress: number) {
  const t = Math.min(1, Math.max(0, progress));
  return t * t * (3 - 2 * t);
}

function fighter(ctx: CanvasRenderingContext2D, x: number, direction: number, pose: Pose, accent: string, step: number, attacking: boolean) {
  const { hip, chest, head, backElbow, backGlove, frontElbow, frontGlove } = pose;
  const shoulder: Point = [chest[0] + 12, chest[1] + 5];
  const rearShoulder: Point = [chest[0] - 15, chest[1] + 13];
  const rearFoot: Point = [-83 - step, 139];
  const leadFoot: Point = [87 + step, 139];

  ctx.save();
  ctx.translate(x, 317);
  ctx.scale(direction, 1);

  function stroke(points: Point[], width: number, color: string) {
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    for (const point of points.slice(1)) ctx.lineTo(...point);
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function ellipse([cx, cy]: Point, rx: number, ry: number, rotation: number, color: string) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, rotation, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function arm(origin: Point, elbow: Point, glove: Point, light: string) {
    stroke([origin, elbow, glove], 32, "#0b0a0c");
    stroke([origin, elbow, glove], 23, light);
    stroke([elbow, glove], 16, light);
    const angle = Math.atan2(glove[1] - elbow[1], glove[0] - elbow[0]);
    ellipse(glove, 23, 19, angle, "#090809");
    ellipse(glove, 20, 16, angle, accent);
    ellipse([glove[0] + 3, glove[1] - 5], 10, 4, angle, "#fff4");
  }

  ellipse([0, 145], 117, 12, 0, "#0009");
  stroke([hip, [-47, 59], rearFoot], 34, "#0b0a0c");
  stroke([hip, [-47, 59], rearFoot], 24, "#4b464c");
  stroke([rearFoot, [rearFoot[0] + 18, 141]], 16, "#999198");

  if (!attacking) arm(rearShoulder, backElbow, backGlove, "#66616a");

  stroke([hip, [64, 59], leadFoot], 37, "#0b0a0c");
  stroke([hip, [64, 59], leadFoot], 27, "#8a8388");
  stroke([[64, 59], leadFoot], 14, "#a09a9d");
  stroke([leadFoot, [leadFoot[0] + 24, 141]], 17, "#a9a1a4");

  const torso = ctx.createLinearGradient(chest[0] - 28, chest[1], chest[0] + 41, hip[1]);
  torso.addColorStop(0, "#b8afb3");
  torso.addColorStop(0.52, "#504950");
  torso.addColorStop(1, "#1f1b20");
  ctx.beginPath();
  ctx.moveTo(chest[0] - 33, chest[1] + 12);
  ctx.quadraticCurveTo(chest[0] - 23, chest[1] - 14, chest[0] + 15, chest[1] - 12);
  ctx.quadraticCurveTo(chest[0] + 41, chest[1] - 8, chest[0] + 42, chest[1] + 23);
  ctx.lineTo(hip[0] + 33, hip[1] + 24);
  ctx.quadraticCurveTo(hip[0] + 8, hip[1] + 42, hip[0] - 35, hip[1] + 17);
  ctx.closePath();
  ctx.fillStyle = torso;
  ctx.fill();
  ctx.strokeStyle = "#0b0a0c";
  ctx.lineWidth = 5;
  ctx.stroke();
  stroke([[hip[0] - 27, hip[1] - 6], [hip[0] + 25, hip[1] - 4]], 6, accent);

  stroke([[chest[0] + 7, chest[1] + 4], [head[0] - 4, head[1] + 23]], 23, "#82797c");
  ellipse(head, 25, 33, -0.14, "#100e11");
  ellipse([head[0] + 4, head[1] + 1], 21, 29, -0.14, "#a49a9e");
  ellipse([head[0] - 6, head[1] - 10], 19, 22, -0.35, "#19161b");
  stroke([[head[0] + 17, head[1] + 3], [head[0] + 25, head[1] + 10], [head[0] + 15, head[1] + 13]], 5, "#b6aaae");

  arm(shoulder, frontElbow, frontGlove, "#b3a9aa");
  if (attacking) arm(rearShoulder, backElbow, backGlove, "#b3a9aa");
  ctx.restore();
}

function render(ctx: CanvasRenderingContext2D, elapsed: number) {
  ctx.clearRect(0, 0, 1000, 500);
  const arrival = ease(elapsed / 295);
  const attack = elapsed < 295 ? blend(guard, windup, arrival) :
    elapsed < impactAt ? blend(windup, strike, ease((elapsed - 295) / (impactAt - 295))) :
    blend(strike, guard, ease((elapsed - impactAt) / 340));
  const hit = ease((elapsed - 343) / 122) * (1 - ease((elapsed - impactAt) / 260));
  const defense = blend(guard, block, hit);

  ctx.save();
  ctx.globalAlpha = ease(elapsed / 140);
  ctx.strokeStyle = "#f5d7d328";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(115, 462);
  ctx.lineTo(885, 462);
  ctx.stroke();
  fighter(ctx, 274 + 66 * arrival, 1, attack, "#b62227", (1 - arrival) * 19, true);
  fighter(ctx, 736 - 151 * arrival + 17 * ease((elapsed - impactAt) / 105), -1, defense, "#ad9fa0", (1 - arrival) * 19, false);
  ctx.restore();

  if (elapsed < impactAt || elapsed > impactAt + 260) return;
  const burst = (elapsed - impactAt) / 260;
  ctx.save();
  ctx.translate(528, 178);
  ctx.globalAlpha = (1 - burst) ** 2;
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = "#f24b4e";
  ctx.beginPath();
  ctx.arc(0, 0, 23 + 95 * burst, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 13; i++) {
    const angle = (i * Math.PI * 2) / 13;
    const inner = 15 + 86 * burst;
    const outer = inner + 11 + (i % 3) * 8;
    ctx.strokeStyle = i % 3 === 0 ? "#ffd3cc" : "#ed3c40";
    ctx.beginPath();
    ctx.moveTo(inner * Math.cos(angle), inner * Math.sin(angle));
    ctx.lineTo(outer * Math.cos(angle), outer * Math.sin(angle));
    ctx.stroke();
  }
  ctx.restore();
}

export function FightLoader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">(() => isHome ? "loading" : "done");
  const canvas = useRef<HTMLCanvasElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const active = isHome && phase !== "done";

  useEffect(() => {
    if (!active) return;

    const preference = window.matchMedia(motionPreference);
    const context = canvas.current?.getContext("2d");
    const finish = () => setPhase("done");
    if (!context || preference.matches) {
      finish();
      return;
    }

    const poster = document.getElementById("home-hero-poster");
    let posterReady = !(poster instanceof HTMLImageElement);
    if (poster instanceof HTMLImageElement) {
      void poster.decode().then(
        () => { posterReady = true; },
        () => { posterReady = true; },
      );
    }

    context.setTransform(1.5, 0, 0, 1.5, 0, 0);
    const start = performance.now();
    let revealedAt: number | undefined;
    let strikeAt = impactAt;
    let frame: number;

    const draw = (time: number) => {
      const elapsed = time - start;
      if (revealedAt !== undefined && elapsed >= revealedAt + revealLength) {
        finish();
        return;
      }

      if (revealedAt === undefined && elapsed >= strikeAt) {
        if (posterReady || elapsed >= maximumWait) {
          revealedAt = elapsed;
          setPhase("reveal");
        } else {
          strikeAt += cycleLength;
        }
      }

      const poseTime = revealedAt === undefined
        ? elapsed % cycleLength
        : impactAt + elapsed - revealedAt;
      render(context, poseTime);
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    const deadline = window.setTimeout(finish, maximumWait + cycleLength);
    const skipOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    const skipOnOutsideFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !loader.current?.contains(event.target)) finish();
    };
    const preventScroll = (event: WheelEvent) => event.preventDefault();

    preference.addEventListener("change", finish);
    window.addEventListener("keydown", skipOnEscape);
    window.addEventListener("focusin", skipOnOutsideFocus);
    window.addEventListener("wheel", preventScroll, { passive: false });

    return () => {
      window.clearTimeout(deadline);
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", finish);
      window.removeEventListener("keydown", skipOnEscape);
      window.removeEventListener("focusin", skipOnOutsideFocus);
      window.removeEventListener("wheel", preventScroll);
    };
  }, [active]);

  if (!active) return null;
  return <>
    <noscript><style>{".fight-loader{display:none}"}</style></noscript>
    <div className="fight-loader" ref={loader} data-phase={phase}>
      <div className="fight-loader-brand" aria-hidden="true">
        <span className="brand-mark"><i /><i /><i /></span>
        <span><strong>FERA</strong><small>FITNESS</small></span>
      </div>
      <canvas ref={canvas} width={1500} height={750} aria-hidden="true" />
      <div className="fight-loader-controls">
        <span role="status">{phase === "loading" ? "Loading FERA Fitness" : "FERA Fitness ready"}</span>
        <button type="button" onClick={() => setPhase("done")}>Skip intro</button>
      </div>
    </div>
  </>;
}
