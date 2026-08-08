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
        size: 12 + Math.random() * 18,
        duration: 7 + Math.random() * 6,
        drift: (Math.random() - 0.5) * 80,
        emoji: ["💗", "💕", "💖", "🩷", "✨"][Math.floor(Math.random() * 5)],
      };
      setHearts((prev) => [...prev, heart]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, heart.duration * 1000);
    };
    const interval = setInterval(spawn, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hearts-layer">
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
            opacity: 0.8,
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
    { id: 9, angle: 126, distance: 136, size: 20, emoji: "🩷", delay: 0.1 },
    { id: 10, angle: 140, distance: 185, size: 18, emoji: "✨", delay: 0.11 },
    { id: 11, angle: 154, distance: 126, size: 24, emoji: "⭐", delay: 0.12 },
    { id: 12, angle: 168, distance: 170, size: 17, emoji: "💖", delay: 0.13 },
    { id: 13, angle: 182, distance: 128, size: 16, emoji: "💕", delay: 0.14 },
    { id: 14, angle: 196, distance: 188, size: 20, emoji: "💗", delay: 0.15 },
    { id: 15, angle: 210, distance: 134, size: 18, emoji: "🩷", delay: 0.16 },
    { id: 16, angle: 224, distance: 176, size: 22, emoji: "✨", delay: 0.17 },
    { id: 17, angle: 238, distance: 121, size: 18, emoji: "⭐", delay: 0.18 },
    { id: 18, angle: 252, distance: 150, size: 23, emoji: "💖", delay: 0.19 },
    { id: 19, angle: 266, distance: 173, size: 17, emoji: "💕", delay: 0.2 },
    { id: 20, angle: 280, distance: 142, size: 21, emoji: "💗", delay: 0.21 },
    { id: 21, angle: 294, distance: 190, size: 15, emoji: "🩷", delay: 0.22 },
    { id: 22, angle: 308, distance: 133, size: 20, emoji: "✨", delay: 0.23 },
    { id: 23, angle: 322, distance: 160, size: 19, emoji: "⭐", delay: 0.24 },
    { id: 24, angle: 336, distance: 118, size: 24, emoji: "💖", delay: 0.25 },
    { id: 25, angle: 350, distance: 174, size: 16, emoji: "💕", delay: 0.26 },
  ];

  if (!trigger) return null;

  return (
    <div className="burst-layer">
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
    <div className="page page-center">
      <span className="big-emoji heartbeat">💔</span>
      <h1 className="heading pop-in">I'm sorry, Bubu 💗</h1>
      <p className="body-text fade-up d1">
        You said we'll talk before sleeping, and I didn't. That was
        careless of me, and you had every right to be upset. 🥺
      </p>
      <p className="hint fade-up d2">tap the arrow, let's fix this together →</p>
    </div>
  );
}

// ---------- Page 2: Mend the heart (interactive) ----------
function PageTwo() {
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
    <div className="page page-center">
      <h2 className="heading heading-sm pop-in">Help me fix this?</h2>

      {!allFixed ? (
        <>
          <p className="body-text small">
            Tap each piece to put my heart back together 🧩
          </p>
          <div className="puzzle-wrap">
            {pieces.map((p, i) => (
              <button
                key={i}
                onClick={() => tapPiece(i)}
                disabled={fixed[i]}
                className="puzzle-piece"
                style={{
                  transform: fixed[i]
                    ? "translate(0px, 0px) rotate(0deg) scale(1.05)"
                    : `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`,
                  filter: fixed[i] ? "none" : "grayscale(0.15)",
                  cursor: fixed[i] ? "default" : "pointer",
                }}
              >
                🩷
              </button>
            ))}
          </div>
          <p className="progress-label">
            {fixed.filter(Boolean).length}/4 pieces back in place
          </p>
        </>
      ) : (
        <>
          <span className="big-emoji pop-in">❤️</span>
          <p className="body-text fade-up d1">
            i'm so sorry for this my cutieee pieeeee, my kuchruuu, my gunnu
            and i promise you it will never happen again 💞
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
    <div className="page page-center page-relative">
      <HeartBurst trigger={forgiven} />

      {!forgiven ? (
        <>
          <span className="big-emoji wiggle">🥹</span>
          <h2 className="heading heading-sm">Will you forgive me?</h2>
          <p className="body-text">
            I promise that we'll talk every night, and please don't stay
            angry because I loveeeeee youuu soo much bubu 🤙💕
          </p>
          <button onClick={() => setForgiven(true)} className="forgive-btn">
            <Heart size={17} fill="currentColor" /> Forgive me
          </button>
        </>
      ) : (
        <>
          <span className="big-emoji pop-in">🥰</span>
          <h2 className="heading heading-sm pop-in d1">
            Thank you for forgiving me
          </h2>
          <p className="body-text fade-up d2">
            I'm here now, and I'm listening. Tell me anything, I want to
            hear all of it. 💕
          </p>
          <div className="tagline fade-up d3">
            <Sparkles size={16} />
            <span>I'm all yours right now</span>
            <Sparkles size={16} />
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
    <div className="sorry-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Outfit:wght@400;500;600;700&display=swap');

        .sorry-screen {
          --cream: #fffaf6;
          --paper: #fff3ee;
          --blush-100: #ffe4e9;
          --blush-200: #ffd0da;
          --rose-400: #ef7c95;
          --rose-500: #e35c7c;
          --rose-600: #d1436a;
          --wine-700: #7a2540;
          --wine-800: #5c1c30;
          --gold-400: #e8b978;
          --gold-500: #d9a25c;

          position: relative;
          width: 100%;
          min-height: 660px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 30px;
          padding: 36px 18px;
          box-sizing: border-box;
          font-family: 'Outfit', sans-serif;
          background:
            radial-gradient(circle at 12% 8%, rgba(255,255,255,0.55), transparent 40%),
            radial-gradient(circle at 90% 90%, rgba(255,214,225,0.6), transparent 45%),
            linear-gradient(160deg, #fff3ee 0%, #ffe1e8 45%, #ffc9d6 100%);
        }

        .sorry-screen::before,
        .sorry-screen::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          filter: blur(50px);
          pointer-events: none;
        }
        .sorry-screen::before {
          width: 260px;
          height: 260px;
          top: -80px;
          left: -80px;
          background: radial-gradient(circle, rgba(232,185,120,0.35), transparent 70%);
        }
        .sorry-screen::after {
          width: 320px;
          height: 320px;
          bottom: -110px;
          right: -90px;
          background: radial-gradient(circle, rgba(211,67,106,0.22), transparent 70%);
        }

        .hearts-layer,
        .burst-layer {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        /* ---------- Card ---------- */
        .screen-inner {
          position: relative;
          width: 100%;
          max-width: 420px;
          height: 590px;
          background: var(--cream);
          border-radius: 26px;
          border: 1px solid rgba(122, 37, 64, 0.08);
          box-shadow:
            0 1px 2px rgba(122, 37, 64, 0.06),
            0 18px 40px -12px rgba(122, 37, 64, 0.28),
            0 0 0 6px rgba(255, 255, 255, 0.5);
          display: flex;
          flex-direction: column;
          z-index: 1;
          background-image: radial-gradient(rgba(122,37,64,0.035) 1px, transparent 1px);
          background-size: 14px 14px;
        }

        .seal {
          position: absolute;
          top: -22px;
          left: 50%;
          transform: translateX(-50%);
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(150deg, var(--rose-500), var(--wine-700));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 18px -6px rgba(122, 37, 64, 0.55), 0 0 0 4px var(--cream);
          z-index: 3;
        }
        .seal svg { color: #fff5f0; }

        .eyebrow {
          text-align: center;
          padding: 30px 20px 4px;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-500);
          font-weight: 600;
        }

        .page-content {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          display: flex;
        }

        .page {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 22px;
          padding: 10px 30px 20px;
        }
        .page-relative { position: relative; }

        .big-emoji { font-size: 66px; line-height: 1; display: inline-block; }

        .heading {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 34px;
          line-height: 1.15;
          color: var(--wine-700);
          margin: 0;
        }
        .heading-sm { font-size: 27px; }

        .body-text {
          font-size: 16px;
          line-height: 1.6;
          color: #6b3346;
          opacity: 0.88;
          max-width: 300px;
          margin: 0;
        }
        .body-text.small { font-size: 14px; max-width: 260px; }

        .hint {
          font-size: 13px;
          font-weight: 600;
          color: var(--rose-600);
          margin: 0;
        }

        .progress-label {
          font-size: 12px;
          color: var(--rose-500);
          font-weight: 600;
          margin: 0;
        }

        .puzzle-wrap {
          position: relative;
          width: 180px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .puzzle-piece {
          position: absolute;
          font-size: 38px;
          background: none;
          border: none;
          padding: 0;
          user-select: none;
          transition: transform 0.5s cubic-bezier(.34,1.56,.64,1), filter 0.3s ease;
        }

        .forgive-btn {
          margin-top: 4px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 30px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, var(--rose-500), var(--wine-700));
          color: #fff5f0;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 10px 24px -8px rgba(122, 37, 64, 0.55);
          animation: pulseBtn 2.2s ease-in-out infinite;
          transition: transform 0.15s ease;
        }
        .forgive-btn:hover { transform: translateY(-2px); }
        .forgive-btn:active { transform: scale(0.96); }

        .tagline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--rose-500);
          font-size: 13px;
          font-weight: 600;
        }

        /* ---------- Nav ---------- */
        .nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 26px 26px;
        }

        .nav-button {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1.5px solid var(--blush-200);
          background: var(--cream);
          color: var(--wine-700);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px -4px rgba(122, 37, 64, 0.18);
          transition: all 0.2s ease;
        }
        .nav-button:hover:not(:disabled) {
          background: var(--blush-100);
          transform: translateY(-2px);
          box-shadow: 0 8px 18px -6px rgba(122, 37, 64, 0.3);
        }
        .nav-button:disabled { opacity: 0; pointer-events: none; }

        .dot-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--blush-200);
          transition: all 0.35s ease;
        }
        .active-dot {
          width: 24px;
          height: 8px;
          background: linear-gradient(90deg, var(--rose-500), var(--gold-400));
        }

        /* ---------- Animations ---------- */
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.85; }
          100% { transform: translateY(-620px) translateX(var(--drift)) rotate(20deg); opacity: 0; }
        }
        @keyframes burst {
          0% { transform: translate(0,0) scale(0.3); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1.1); opacity: 0; }
        }
        @keyframes heartbeatKf {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.25); }
          30% { transform: scale(0.95); }
          45% { transform: scale(1.15); }
          60% { transform: scale(1); }
        }
        .heartbeat { animation: heartbeatKf 1.5s ease-in-out infinite; }

        @keyframes popInKf {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .pop-in { animation: popInKf 0.6s ease-out both; }

        @keyframes fadeUpKf {
          0% { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .fade-up { animation: fadeUpKf 0.8s ease-out both; }
        .d1 { animation-delay: 0.15s; }
        .d2 { animation-delay: 0.35s; }
        .d3 { animation-delay: 0.55s; }

        @keyframes wiggleKf {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        .wiggle { animation: wiggleKf 1.8s ease-in-out infinite; display: inline-block; }

        @keyframes pulseBtn {
          0%, 100% { box-shadow: 0 10px 24px -8px rgba(122,37,64,0.55), 0 0 0 0 rgba(211,67,106,0.4); }
          50% { box-shadow: 0 10px 24px -8px rgba(122,37,64,0.55), 0 0 0 12px rgba(211,67,106,0); }
        }
      `}</style>

      <FloatingHearts />

      <div className="screen-inner">
        <div className="seal">
          <Heart size={19} fill="currentColor" strokeWidth={0} />
        </div>
        <p className="eyebrow">a little letter for you</p>

        <div className="page-content">
          <div
            key={page}
            style={{ flex: 1, display: "flex", animation: "fadeUpKf 0.4s ease-out" }}
          >
            {pages[page]}
          </div>
        </div>

        <div className="nav-row">
          <button onClick={prev} disabled={page === 0} className="nav-button">
            <ArrowLeft size={19} />
          </button>

          <div className="dot-row">
            {pages.map((_, i) => (
              <span key={i} className={i === page ? "dot active-dot" : "dot"} />
            ))}
          </div>

          <button
            onClick={next}
            disabled={page === pages.length - 1}
            className="nav-button"
          >
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}