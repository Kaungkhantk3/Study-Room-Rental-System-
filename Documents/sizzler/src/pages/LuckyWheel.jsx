import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo.png";

// Configuration
const SPIN_COST = 4;
const PRIZES = [
  { label: "20% Discount", bg: "#A02A2A", fg: "#FFFFFF" },
  { label: "100 THB Off", bg: "#F3E4C7", fg: "#3A2D1D" },
  { label: "10% Discount", bg: "#A02A2A", fg: "#FFFFFF" },
  { label: "50 THB Off", bg: "#F3E4C7", fg: "#3A2D1D" },
  { label: "Free Beer", bg: "#A02A2A", fg: "#FFFFFF" },
  { label: "Free Snack", bg: "#F3E4C7", fg: "#3A2D1D" },
  { label: "30 THB Off", bg: "#A02A2A", fg: "#FFFFFF" },
  { label: "Sorry", bg: "#F3E4C7", fg: "#3A2D1D" },
];

export default function LuckyWheelPage() {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState(102);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const rotationRef = useRef(0);
  const targetRotationRef = useRef(0);

  // Helper functions
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const pickPrizeIndex = () => Math.floor(Math.random() * PRIZES.length);

  const drawWrappedText = (ctx, text, maxWidth, lineHeight) => {
    const words = String(text).split(" ");
    const lines = [];
    let line = "";

    for (let i = 0; i < words.length; i++) {
      const test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = words[i];
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);

    const finalLines = lines.slice(0, 2);
    if (lines.length > 2) {
      finalLines[1] = finalLines[1].replace(/.{0,3}$/, "") + "…";
    }

    const totalH = finalLines.length * lineHeight;
    let y = -totalH / 2 + lineHeight / 2;

    for (const l of finalLines) {
      ctx.fillText(l, 0, y);
      y += lineHeight;
    }
  };

  const drawWheel = (rotRad) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const size = canvas.getBoundingClientRect().width;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 6;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotRad);

    const n = PRIZES.length;
    const slice = (Math.PI * 2) / n;

    for (let i = 0; i < n; i++) {
      const start = i * slice;
      const end = start + slice;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, start, end);
      ctx.closePath();
      ctx.fillStyle = PRIZES[i].bg;
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.rotate(start + slice / 2);

      const label = PRIZES[i].label;
      let fontSize = 16;
      if (label.length > 12) fontSize = 14;
      if (label.length > 18) fontSize = 12;

      ctx.font = `800 ${fontSize}px system-ui, -apple-system, Segoe UI, Roboto`;
      ctx.fillStyle = PRIZES[i].fg;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textRadius = r * 0.68;
      ctx.translate(textRadius, 0);
      ctx.rotate(Math.PI / 2);

      drawWrappedText(ctx, label, r * 0.34, fontSize + 3);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fill();

    ctx.restore();
  };

  const rotationForIndex = (index) => {
    const n = PRIZES.length;
    const slice = (Math.PI * 2) / n;
    const sliceCenter = index * slice + slice / 2;
    return -Math.PI / 2 - sliceCenter;
  };

  const spinToIndex = (prizeIndex) => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const extraTurns = 6 + Math.floor(Math.random() * 2);
    const base = rotationForIndex(prizeIndex);

    targetRotationRef.current =
      rotationRef.current +
      extraTurns * Math.PI * 2 +
      (base - (rotationRef.current % (Math.PI * 2)));

    const start = rotationRef.current;
    const change = targetRotationRef.current - start;
    const duration = 3800;
    const t0 = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      rotationRef.current = start + change * easeOutCubic(t);
      drawWheel(rotationRef.current);

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setSpinning(false);
        setResult(`You got: ${PRIZES[prizeIndex].label}`);
      }
    };
    requestAnimationFrame(tick);
  };

  const handleSpin = () => {
    if (spinning || points < SPIN_COST) return;
    setPoints(points - SPIN_COST);
    const prizeIndex = pickPrizeIndex();
    spinToIndex(prizeIndex);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.width * dpr);
    canvas.style.height = rect.width + "px";

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawWheel(rotationRef.current);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600"></div>

      <main className="mx-auto max-w-md px-4 py-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="rounded-2xl bg-white/80 px-4 py-4 shadow-md">
            <img src={logo} alt="Sizzler" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-center text-4xl font-extrabold text-white drop-shadow-lg">
          Taste the Challenge
        </h1>
        <p className="mt-2 text-center text-lg font-semibold text-white/90">
          Spin the wheel to win rewards
        </p>

        {/* Wheel */}
        <section className="mt-8">
          <div className="relative mx-auto w-full max-w-[380px]">
            {/* Pointer */}
            <div className="absolute left-1/2 top-[-6px] z-20 -translate-x-1/2">
              <div className="h-0 w-0 border-l-[18px] border-r-[18px] border-t-[26px] border-l-transparent border-r-transparent border-t-[#E1B23A] drop-shadow"></div>
            </div>

            {/* Outer ring */}
            <div className="rounded-full bg-white/70 p-4 shadow-xl">
              <div className="rounded-full bg-white p-3">
                <div className="relative overflow-hidden rounded-full bg-white">
                  {/* Canvas Wheel */}
                  <canvas
                    ref={canvasRef}
                    onClick={handleSpin}
                    className="w-full rounded-full cursor-pointer"
                  />

                  {/* Center badge */}
                  <div className="pointer-events-none absolute inset-0 grid place-items-center">
                    <div className="rounded-2xl bg-white/95 px-6 py-3 text-center shadow">
                      <div className="text-base font-extrabold text-slate-600">
                        Spin & Win!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tap hint */}
            <div className="mt-3 text-center text-sm font-semibold text-white/90 drop-shadow">
              Tap the wheel or press the button
            </div>
          </div>
        </section>

        {/* Points */}
        <section className="mt-7">
          <div className="flex items-center justify-between rounded-2xl bg-white/85 px-6 py-4 shadow">
            <div className="text-lg font-semibold text-slate-600">
              Remaining Points
            </div>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-200 text-lg">
                ★
              </div>
              <div className="text-3xl font-extrabold text-slate-800">
                {points}
              </div>
            </div>
          </div>
        </section>

        {/* Spin Button */}
        <section className="mt-4">
          <button
            onClick={handleSpin}
            disabled={spinning || points < SPIN_COST}
            className="w-full rounded-2xl bg-[#A5302A] px-6 py-5 text-xl font-extrabold text-white shadow-lg active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Use{" "}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
              <span className="text-xl">★</span>
              <span>{SPIN_COST}</span>
            </span>{" "}
            points to spin
          </button>
        </section>

        {/* Bottom buttons */}
        <section className="mt-4 grid grid-cols-2 gap-3">
          <button className="rounded-xl bg-white/90 px-4 py-3 text-base font-semibold text-slate-700 shadow">
            Terms & Conditions
          </button>
          <button className="rounded-xl bg-white/90 px-4 py-3 text-base font-semibold text-slate-700 shadow">
            All Rewards
          </button>
        </section>

        {/* Result */}
        {result && (
          <div className="mt-5 rounded-2xl bg-white/90 p-4 shadow animate-in fade-in slide-in-from-bottom-4">
            <div className="text-sm text-slate-600">Result</div>
            <div className="mt-1 text-xl font-extrabold text-emerald-700">
              {result}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
