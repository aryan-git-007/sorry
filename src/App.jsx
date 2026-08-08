import { useState, useEffect, useRef } from "react";
import { Heart, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

// ---------- Floating background hearts ----------
function FloatingHearts() {
  const [hearts, setHearts] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const spawn = () => {
      idRef.current += 1;
      const id = idRef.current;
      const heart = {
        id,
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        duration: 6 + Math.random() * 6,
        drift: (Math.random() - 0.5) * 80,
        emoji: ["💗", "💕", "💖", "🩷", "✨"][Math.floor(Math.random() * 5)],
      };
      setHearts((prev) => [...prev, heart]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, heart.duration * 1000);
    };
    const interval = setInterval(spawn, 550);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            left: `${h.left}%`,
            bottom: "-10%",
            fontSize: h.size,
            animation: `floatUp ${h.duration}s ease-in forwards`,
            "--drift": `${h.drift}px`,
            opacity: 0.85,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

// ---------- Heart burst on forgive ----------
function HeartBurst({ trigger }) {
  const pieces = [
    { id: 0, angle: 0, distance: 110, size: 16, emoji: "💖", delay: 0.01 },
    { id: 1, angle: 14, distance: 146, size: 20, emoji: "💕", delay: 0.02 },
    { id: 2, angle: 28, distance: 165, size: 18, emoji: "💗", delay: 0.03 },
    { id: 3, angle: 42, distance: 129, size: 23, emoji: "🩷", delay: 0.04 },
    { id: 4, angle: 56, distance: 182, size: 15, emoji: "⭐", delay: 0.05 },
    { id: 5, angle: 70, distance: 147, size: 21, emoji: "✨", delay: 0.06 },
    { id: 6, angle: 84, distance: 112, size: 19, emoji: "💖", delay: 0.07 },
    { id: 7, angle: 98, distance: 145, size: 23, emoji: "💕", delay: 0.08 },
    { id: 8, angle: 112, distance: 184, size: 16, emoji: "💗", delay: 0.09 },
    { id: 9, angle: 126, distance: 136, size: 20, emoji: "🩷", delay: 0.10 },
    { id: 10, angle: 140, distance: 185, size: 18, emoji: "✨", delay: 0.11 },
    { id: 11, angle: 154, distance: 126, size: 24, emoji: "⭐", delay: 0.12 },
    { id: 12, angle: 168, distance: 170, size: 17, emoji: "💖", delay: 0.13 },
    { id: 13, angle: 182, distance: 128, size: 16, emoji: "💕", delay: 0.14 },
    { id: 14, angle: 196, distance: 188, size: 20, emoji: "💗", delay: 0.15 },
    { id: 15, angle: 210, distance: 134, size: 18, emoji: "🩷", delay: 0.16 },
    { id: 16, angle: 224, distance: 176, size: 22, emoji: "✨", delay: 0.17 },
    { id: 17, angle: 238, distance: 121, size: 18, emoji: "⭐", delay: 0.18 },
    { id: 18, angle: 252, distance: 150, size: 23, emoji: "💖", delay: 0.19 },
    { id: 19, angle: 266, distance: 173, size: 17, emoji: "💕", delay: 0.20 },
    { id: 20, angle: 280, distance: 142, size: 21, emoji: "💗", delay: 0.21 },
    { id: 21, angle: 294, distance: 190, size: 15, emoji: "🩷", delay: 0.22 },
    { id: 22, angle: 308, distance: 133, size: 20, emoji: "✨", delay: 0.23 },
    { id: 23, angle: 322, distance: 160, size: 19, emoji: "⭐", delay: 0.24 },
    { id: 24, angle: 336, distance: 118, size: 24, emoji: "💖", delay: 0.25 },
    { id: 25, angle: 350, distance: 174, size: 16, emoji: "💕", delay: 0.26 },
  ];

  if (!trigger) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {pieces.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = Math.cos(rad) * p.distance;
        const y = Math.sin(rad) * p.distance;
        return (
          <span
            key={p.id}
            style={{
              position: "absolute",
              fontSize: p.size,
              animation: `burst 1.1s ease-out ${p.delay}s forwards`,
              "--tx": `${x}px`,
              "--ty": `${y}px`,
              opacity: 0,
            }}
          >
            {p.emoji}
          </span>
        );
      })}
    </div>
  );
}

// ---------- Page 1: Sorry ----------
function PageOne() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 px-6 h-full">
      <div className="relative">
        <span
          className="text-7xl inline-block"
          style={{ animation: "heartbeat 1.4s ease-in-out infinite" }}
        >
          💔
        </span>
      </div>
      <h1
        className="text-4xl sm:text-5xl font-bold text-rose-600"
        style={{ fontFamily: "'Georgia', serif", animation: "popIn 0.7s ease-out" }}
      >
        I'm sorry, Bubu💗
      </h1>
      <p
        className="text-rose-900/80 text-lg leading-relaxed max-w-sm"
        style={{ animation: "fadeUp 0.9s ease-out 0.2s both" }}
      >
        You said we'll talk before sleeping, and I didn't. That was
        careless of me, and you had every right to be upset. 🥺
      </p>
      <p
        className="text-rose-500 text-sm font-medium"
        style={{ animation: "fadeUp 0.9s ease-out 0.5s both" }}
      >
        tap the arrow, let's fix this together →
      </p>
    </div>
  );
}

// ---------- Page 2: Mend the heart (interactive) ----------
function PageTwo() {
  // four quarters of a broken heart, tap each one to snap it back together
  const [fixed, setFixed] = useState([false, false, false, false]);
  const allFixed = fixed.every(Boolean);

  const pieces = [
    { rot: -8, x: -34, y: -22 },
    { rot: 10, x: 30, y: -18 },
    { rot: -12, x: -26, y: 26 },
    { rot: 9, x: 28, y: 24 },
  ];

  const tapPiece = (i) => {
    setFixed((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 gap-6 text-center">
      <h2
        className="text-3xl font-bold text-rose-600"
        style={{ fontFamily: "'Georgia', serif", animation: "popIn 0.6s ease-out" }}
      >
        Help me fix this?
      </h2>

      {!allFixed ? (
        <>
          <p className="text-rose-900/75 text-sm max-w-xs">
            Tap each piece to put my heart back together 🧩
          </p>
          <div className="relative w-44 h-44 flex items-center justify-center">
            {pieces.map((p, i) => (
              <button
                key={i}
                onClick={() => tapPiece(i)}
                disabled={fixed[i]}
                className="absolute text-4xl select-none"
                style={{
                  transform: fixed[i]
                    ? "translate(0px, 0px) rotate(0deg) scale(1.05)"
                    : `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`,
                  transition: "transform 0.5s cubic-bezier(.34,1.56,.64,1)",
                  filter: fixed[i] ? "none" : "grayscale(0.15)",
                  cursor: fixed[i] ? "default" : "pointer",
                }}
              >
                🩷
              </button>
            ))}
          </div>
          <p className="text-rose-400 text-xs">
            {fixed.filter(Boolean).length}/4 pieces back in place
          </p>
        </>
      ) : (
        <>
          <span
            className="text-7xl"
            style={{ animation: "popIn 0.5s ease-out" }}
          >
            ❤️
          </span>
          <p
            className="text-rose-900/85 max-w-xs"
            style={{ animation: "fadeUp 0.7s ease-out 0.15s both" }}
          >
            i'm so sorry for this my cutieee pieeeee , my kuchruuu , my gunnu and i promise to 
            you it will never happen again 💞
          </p>
        </>
      )}
    </div>
  );
}

// ---------- Page 3: Forgive ----------
function PageThree() {
  const [forgiven, setForgiven] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-6 gap-6 text-center">
      <HeartBurst trigger={forgiven} />

      {!forgiven ? (
        <>
          <span
            className="text-6xl"
            style={{ animation: "wiggle 1.8s ease-in-out infinite" }}
          >
            🥹
          </span>
          <h2
            className="text-3xl font-bold text-rose-600"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Will you forgive me?
          </h2>
          <p className="text-rose-900/80 max-w-xs">
            I promise that we'll talk everynight and plss don't get angry bcz i loveeeeee youuu
            soo much bubu 🤙💕
          </p>
          <button
            onClick={() => setForgiven(true)}
            className="mt-2 px-8 py-3 rounded-full bg-rose-500 text-white font-semibold shadow-lg shadow-rose-200 hover:bg-rose-600 active:scale-95 transition-all flex items-center gap-2"
            style={{ animation: "pulseBtn 2s ease-in-out infinite" }}
          >
            <Heart size={18} fill="white" /> Forgive me
          </button>
        </>
      ) : (
        <>
          <span
            className="text-7xl"
            style={{ animation: "popIn 0.6s ease-out" }}
          >
            🥰
          </span>
          <h2
            className="text-3xl font-bold text-rose-600"
            style={{ fontFamily: "'Georgia', serif", animation: "popIn 0.6s ease-out 0.1s both" }}
          >
            Thank you for forgiving me
          </h2>
          <p
            className="text-rose-900/80 max-w-xs"
            style={{ animation: "fadeUp 0.8s ease-out 0.3s both" }}
          >
            I'm here now, and I'm listening. Tell me about anything i want to hear all of it. 💕
          </p>
          <div
            className="flex items-center gap-2 text-rose-500 mt-2"
            style={{ animation: "fadeUp 0.8s ease-out 0.5s both" }}
          >
            <Sparkles size={18} />
            <span className="text-sm font-medium">I'm all yours right now</span>
            <Sparkles size={18} />
          </div>
        </>
      )}
    </div>
  );
}

// ---------- Main App ----------
export default function SorryCard() {
  const [page, setPage] = useState(0);
  const pages = [<PageOne key="1" />, <PageTwo key="2" />, <PageThree key="3" />];

  const next = () => setPage((p) => Math.min(p + 1, pages.length - 1));
  const prev = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <div
      className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden rounded-3xl"
      style={{
        background:
          "linear-gradient(160deg, #fff1f2 0%, #ffe4e9 45%, #fecdd3 100%)",
      }}
    >
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.9; }
          100% { transform: translateY(-620px) translateX(var(--drift)) rotate(20deg); opacity: 0; }
        }
        @keyframes burst {
          0% { transform: translate(0,0) scale(0.3); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1.1); opacity: 0; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.25); }
          30% { transform: scale(0.95); }
          45% { transform: scale(1.15); }
          60% { transform: scale(1); }
        }
        @keyframes popIn {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeUp {
          0% { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideIn {
          0% { transform: translateX(-24px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }

        @keyframes pulseBtn {
          0%, 100% { box-shadow: 0 0 0 0 rgba(244,63,94,0.4); }
          50% { box-shadow: 0 0 0 14px rgba(244,63,94,0); }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
      `}</style>

      <FloatingHearts />

      {/* Card content */}
      <div className="relative z-10 w-full max-w-md h-[560px] flex flex-col">
        <div key={page} className="flex-1" style={{ animation: "fadeUp 0.4s ease-out" }}>
          {pages[page]}
        </div>

        {/* Nav controls */}
        <div className="flex items-center justify-between px-6 pb-6">
          <button
            onClick={prev}
            disabled={page === 0}
            className="p-2 rounded-full bg-white/70 text-rose-500 disabled:opacity-0 hover:bg-white transition"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex gap-2">
            {pages.map((_, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: i === page ? "#f43f5e" : "#fecdd3",
                  animation: i === page ? "dotPulse 1.2s ease-in-out infinite" : "none",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={page === pages.length - 1}
            className="p-2 rounded-full bg-white/70 text-rose-500 disabled:opacity-0 hover:bg-white transition"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}