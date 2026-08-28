"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";

const NETWORK_NODES = [
  {
    position: "north-west",
    eyebrow: "Storefront",
    value: "12.8k",
    detail: "live events",
  },
  {
    position: "north-east",
    eyebrow: "Trust",
    value: "4.9",
    detail: "average score",
  },
  {
    position: "south-west",
    eyebrow: "Capture",
    value: "+184",
    detail: "leads this week",
  },
  {
    position: "south-east",
    eyebrow: "Delivery",
    value: "99.98%",
    detail: "signals synced",
  },
] as const;

export function TechNetwork() {
  const frameRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const frame = frameRef.current;

    frame?.style.setProperty("--tn-rotate-x", `${(0.5 - y) * 4}deg`);
    frame?.style.setProperty("--tn-rotate-y", `${(x - 0.5) * 5}deg`);
    frame?.style.setProperty("--tn-light-x", `${x * 100}%`);
    frame?.style.setProperty("--tn-light-y", `${y * 100}%`);
  }

  function resetPointerPosition() {
    const frame = frameRef.current;

    frame?.style.setProperty("--tn-rotate-x", "0deg");
    frame?.style.setProperty("--tn-rotate-y", "0deg");
    frame?.style.setProperty("--tn-light-x", "68%");
    frame?.style.setProperty("--tn-light-y", "20%");
  }

  return (
    <figure className="tn-wrap">
      <figcaption className="sr-only">
        The jsyxi growth network connects storefront activity, reviews, lead capture, and reliable
        delivery in one real-time system.
      </figcaption>

      <div
        ref={frameRef}
        className="tn-frame"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointerPosition}
      >
        <div className="tn-ambient" aria-hidden="true" />
        <div className="tn-grid" aria-hidden="true" />

        <div className="tn-topbar" aria-hidden="true">
          <div className="tn-window-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="tn-address">
            <span className="tn-lock" />
            jsyxi.network
          </div>
          <div className="tn-secure">
            <span />
            Encrypted
          </div>
        </div>

        <div className="tn-canvas">
          <div className="tn-depth" aria-hidden="true">
            <span className="tn-orbit tn-orbit--outer" />
            <span className="tn-orbit tn-orbit--inner" />

            {NETWORK_NODES.map((node) => (
              <div
                key={node.position}
                className={`tn-node tn-node--${node.position}`}
              >
                <div className="tn-node__top">
                  <span className="tn-node__signal">
                    <span />
                  </span>
                  <span>{node.eyebrow}</span>
                </div>
                <strong>{node.value}</strong>
                <small>{node.detail}</small>
                <span className="tn-node__meter">
                  <span />
                </span>
              </div>
            ))}

            <span className="tn-link tn-link--north-west">
              <i />
            </span>
            <span className="tn-link tn-link--north-east">
              <i />
            </span>
            <span className="tn-link tn-link--south-west">
              <i />
            </span>
            <span className="tn-link tn-link--south-east">
              <i />
            </span>

            <div className="tn-core">
              <div className="tn-core__head">
                <span className="tn-monogram">jx</span>
                <span>
                  <small>jsyxi intelligence</small>
                  <strong>Growth layer</strong>
                </span>
                <span className="tn-live">
                  <i />
                  Live
                </span>
              </div>

              <div className="tn-core__body">
                <div>
                  <small>Engagement velocity</small>
                  <strong>2.4x</strong>
                  <span>+18.6% this month</span>
                </div>
                <div className="tn-bars">
                  {[28, 38, 32, 51, 46, 67, 58, 78, 70, 91].map((height) => (
                    <span key={height} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>

              <div className="tn-core__foot">
                <span>Signal routing</span>
                <span className="tn-routing">
                  <i />
                </span>
                <strong>Optimized</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="tn-status" aria-hidden="true">
          <span>
            <i className="tn-status__pulse" />
            All systems operational
          </span>
          <span>48ms response</span>
          <span>24/7 signal sync</span>
        </div>
      </div>

      <style>{`
        .tn-wrap {
          width: 100%;
          margin: 0;
          container-type: inline-size;
        }

        .tn-frame {
          --tn-rotate-x: 0deg;
          --tn-rotate-y: 0deg;
          --tn-light-x: 68%;
          --tn-light-y: 20%;
          position: relative;
          isolation: isolate;
          width: 100%;
          overflow: hidden;
          border: 1px solid rgba(153, 246, 228, 0.18);
          border-radius: 1.75rem;
          background:
            linear-gradient(155deg, rgba(10, 30, 28, 0.98), rgba(3, 14, 13, 0.99)),
            #061311;
          color: #fff;
          box-shadow:
            0 40px 90px -42px rgba(4, 70, 62, 0.9),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          touch-action: pan-y;
        }

        .tn-ambient {
          position: absolute;
          z-index: -1;
          inset: 0;
          background:
            radial-gradient(
              circle at var(--tn-light-x) var(--tn-light-y),
              rgba(45, 212, 191, 0.2),
              transparent 28%
            ),
            radial-gradient(circle at 12% 82%, rgba(16, 185, 129, 0.12), transparent 30%);
          transition: background-position 180ms ease;
          pointer-events: none;
        }

        .tn-grid {
          position: absolute;
          z-index: -1;
          inset: 2.75rem 0 2.75rem;
          opacity: 0.45;
          background-image:
            linear-gradient(rgba(94, 234, 212, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(94, 234, 212, 0.055) 1px, transparent 1px);
          background-size: 2rem 2rem;
          mask-image: linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
          pointer-events: none;
        }

        .tn-topbar,
        .tn-status {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          height: 2.75rem;
          padding-inline: 1rem;
          border-color: rgba(255, 255, 255, 0.07);
          background: rgba(2, 12, 11, 0.62);
          backdrop-filter: blur(16px);
          font-size: 0.64rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .tn-topbar {
          justify-content: space-between;
          border-bottom-width: 1px;
        }

        .tn-window-dots {
          display: flex;
          gap: 0.35rem;
        }

        .tn-window-dots span {
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
        }

        .tn-window-dots span:nth-child(2) {
          background: rgba(94, 234, 212, 0.38);
        }

        .tn-address {
          display: flex;
          align-items: center;
          gap: 0.42rem;
          padding: 0.32rem 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.035);
          letter-spacing: 0.05em;
        }

        .tn-lock {
          position: relative;
          width: 0.52rem;
          height: 0.45rem;
          border-radius: 0.12rem;
          background: #5eead4;
        }

        .tn-lock::before {
          position: absolute;
          left: 0.11rem;
          bottom: 0.31rem;
          width: 0.3rem;
          height: 0.28rem;
          border: 1px solid #5eead4;
          border-bottom: 0;
          border-radius: 999px 999px 0 0;
          content: "";
        }

        .tn-secure,
        .tn-status > span:first-child {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .tn-secure > span,
        .tn-status__pulse {
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 0 0.2rem rgba(52, 211, 153, 0.08);
        }

        .tn-canvas {
          position: relative;
          height: clamp(29rem, 68vw, 34rem);
          min-height: 29rem;
          padding: 1rem;
        }

        .tn-depth {
          position: relative;
          width: 100%;
          height: 100%;
          transform: perspective(1000px) rotateX(var(--tn-rotate-x)) rotateY(var(--tn-rotate-y));
          transform-style: preserve-3d;
          transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: transform;
        }

        .tn-orbit {
          position: absolute;
          z-index: 0;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(94, 234, 212, 0.09);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .tn-orbit--outer {
          width: min(78%, 31rem);
          aspect-ratio: 1;
          animation: tn-spin 34s linear infinite;
        }

        .tn-orbit--outer::before,
        .tn-orbit--inner::after {
          position: absolute;
          width: 0.42rem;
          height: 0.42rem;
          border: 1px solid rgba(153, 246, 228, 0.52);
          border-radius: 50%;
          background: #0d2b27;
          box-shadow: 0 0 1rem rgba(45, 212, 191, 0.65);
          content: "";
        }

        .tn-orbit--outer::before {
          left: 10%;
          top: 18%;
        }

        .tn-orbit--inner {
          width: min(48%, 19rem);
          aspect-ratio: 1;
          border-style: dashed;
          animation: tn-spin 26s linear infinite reverse;
        }

        .tn-orbit--inner::after {
          right: -0.24rem;
          top: 50%;
        }

        .tn-node {
          position: absolute;
          z-index: 3;
          width: clamp(7.25rem, 22%, 9.5rem);
          padding: 0.75rem;
          border: 1px solid rgba(153, 246, 228, 0.13);
          border-radius: 0.9rem;
          background: linear-gradient(145deg, rgba(21, 50, 46, 0.86), rgba(7, 24, 22, 0.86));
          box-shadow:
            0 18px 38px -24px rgba(0, 0, 0, 0.9),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(14px);
          transform: translateZ(18px);
          transition:
            border-color 220ms ease,
            box-shadow 220ms ease,
            transform 220ms ease;
        }

        .tn-node--north-west {
          left: 2%;
          top: 10%;
        }

        .tn-node--north-east {
          right: 2%;
          top: 10%;
        }

        .tn-node--south-west {
          left: 2%;
          bottom: 10%;
        }

        .tn-node--south-east {
          right: 2%;
          bottom: 10%;
        }

        .tn-node__top {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.58rem;
          font-weight: 650;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .tn-node__signal {
          display: grid;
          width: 1.15rem;
          height: 1.15rem;
          place-items: center;
          border: 1px solid rgba(94, 234, 212, 0.16);
          border-radius: 0.35rem;
          background: rgba(45, 212, 191, 0.08);
        }

        .tn-node__signal span {
          width: 0.34rem;
          height: 0.34rem;
          border-radius: 50%;
          background: #5eead4;
          box-shadow: 0 0 0.7rem rgba(94, 234, 212, 0.75);
        }

        .tn-node > strong,
        .tn-node > small {
          display: block;
        }

        .tn-node > strong {
          margin-top: 0.6rem;
          font-size: clamp(1rem, 3vw, 1.28rem);
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .tn-node > small {
          margin-top: 0.26rem;
          color: rgba(255, 255, 255, 0.42);
          font-size: 0.58rem;
        }

        .tn-node__meter {
          display: block;
          height: 0.16rem;
          margin-top: 0.65rem;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.07);
        }

        .tn-node__meter span {
          display: block;
          width: 72%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #0d9488, #5eead4);
          animation: tn-meter 4.4s ease-in-out infinite;
        }

        .tn-node--north-east .tn-node__meter span {
          width: 88%;
          animation-delay: -1.2s;
        }

        .tn-node--south-west .tn-node__meter span {
          width: 64%;
          animation-delay: -2.3s;
        }

        .tn-node--south-east .tn-node__meter span {
          width: 94%;
          animation-delay: -3.1s;
        }

        .tn-link {
          position: absolute;
          z-index: 1;
          left: 50%;
          top: 50%;
          width: 43%;
          height: 1px;
          overflow: visible;
          background: linear-gradient(90deg, rgba(94, 234, 212, 0.42), rgba(94, 234, 212, 0.05));
          transform-origin: left center;
          pointer-events: none;
        }

        .tn-link::before {
          position: absolute;
          inset: -0.2rem 0;
          border-top: 1px dashed rgba(94, 234, 212, 0.07);
          content: "";
        }

        .tn-link i {
          position: absolute;
          left: 4%;
          top: -0.18rem;
          width: 0.38rem;
          height: 0.38rem;
          border: 1px solid rgba(255, 255, 255, 0.78);
          border-radius: 50%;
          background: #2dd4bf;
          box-shadow: 0 0 0.9rem rgba(45, 212, 191, 0.85);
          animation: tn-packet 3.6s ease-in-out infinite;
        }

        .tn-link--north-west {
          transform: rotate(220deg);
        }

        .tn-link--north-east {
          transform: rotate(-40deg);
        }

        .tn-link--south-west {
          transform: rotate(140deg);
        }

        .tn-link--south-east {
          transform: rotate(40deg);
        }

        .tn-link--north-east i {
          animation-delay: -0.8s;
        }

        .tn-link--south-west i {
          animation-delay: -1.7s;
        }

        .tn-link--south-east i {
          animation-delay: -2.5s;
        }

        .tn-core {
          position: absolute;
          z-index: 4;
          left: 50%;
          top: 50%;
          width: clamp(13rem, 42%, 17rem);
          overflow: hidden;
          border: 1px solid rgba(153, 246, 228, 0.25);
          border-radius: 1.2rem;
          background:
            linear-gradient(145deg, rgba(19, 55, 50, 0.97), rgba(5, 23, 21, 0.98)),
            #071b18;
          box-shadow:
            0 2rem 5rem -2rem rgba(0, 0, 0, 0.88),
            0 0 4rem -1.5rem rgba(20, 184, 166, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          transform: translate(-50%, -50%) translateZ(42px);
        }

        .tn-core::before {
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 22%, rgba(255, 255, 255, 0.05), transparent 56%);
          transform: translateX(-100%);
          animation: tn-scan 6s ease-in-out infinite;
          content: "";
          pointer-events: none;
        }

        .tn-core__head {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.58rem;
          padding: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .tn-monogram {
          display: grid;
          width: 1.8rem;
          height: 1.8rem;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid rgba(153, 246, 228, 0.24);
          border-radius: 0.52rem;
          background: linear-gradient(145deg, #5eead4, #10b981);
          color: #06211d;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: -0.06em;
          box-shadow: 0 0.7rem 1.5rem -0.8rem rgba(45, 212, 191, 0.85);
        }

        .tn-core__head > span:nth-child(2) {
          min-width: 0;
        }

        .tn-core__head small,
        .tn-core__head strong {
          display: block;
        }

        .tn-core__head small {
          color: rgba(255, 255, 255, 0.38);
          font-size: 0.5rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .tn-core__head strong {
          margin-top: 0.1rem;
          font-size: 0.72rem;
          white-space: nowrap;
        }

        .tn-live {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          margin-left: auto;
          padding: 0.25rem 0.38rem;
          border: 1px solid rgba(52, 211, 153, 0.15);
          border-radius: 999px;
          background: rgba(52, 211, 153, 0.07);
          color: #6ee7b7;
          font-size: 0.5rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .tn-live i {
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 50%;
          background: #34d399;
          animation: tn-pulse 2s ease-out infinite;
        }

        .tn-core__body {
          position: relative;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          align-items: end;
          gap: 0.75rem;
          min-height: 5.8rem;
          padding: 0.9rem 0.85rem 0.75rem;
        }

        .tn-core__body small,
        .tn-core__body strong,
        .tn-core__body > div:first-child > span {
          display: block;
        }

        .tn-core__body small {
          color: rgba(255, 255, 255, 0.38);
          font-size: 0.52rem;
        }

        .tn-core__body strong {
          margin-top: 0.3rem;
          font-size: clamp(1.45rem, 4vw, 2rem);
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .tn-core__body > div:first-child > span {
          margin-top: 0.34rem;
          color: #6ee7b7;
          font-size: 0.5rem;
        }

        .tn-bars {
          display: flex;
          align-items: end;
          gap: 0.18rem;
          height: 3.8rem;
        }

        .tn-bars span {
          width: 100%;
          min-width: 0.12rem;
          border-radius: 999px 999px 0.12rem 0.12rem;
          background: linear-gradient(to top, rgba(13, 148, 136, 0.3), #5eead4);
          box-shadow: 0 0 0.65rem -0.25rem rgba(94, 234, 212, 0.9);
          transform-origin: bottom;
          animation: tn-bars 4s ease-in-out infinite;
        }

        .tn-bars span:nth-child(2n) {
          animation-delay: -1.4s;
        }

        .tn-bars span:nth-child(3n) {
          animation-delay: -2.6s;
        }

        .tn-core__foot {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.55rem;
          padding: 0.55rem 0.8rem 0.65rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.38);
          font-size: 0.5rem;
        }

        .tn-core__foot strong {
          color: #6ee7b7;
          font-size: 0.5rem;
          font-weight: 650;
        }

        .tn-routing {
          height: 0.16rem;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
        }

        .tn-routing i {
          display: block;
          width: 54%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, transparent, #5eead4, transparent);
          animation: tn-route 2.8s ease-in-out infinite;
        }

        .tn-status {
          justify-content: flex-end;
          gap: 1.1rem;
          border-top-width: 1px;
        }

        .tn-status > span:first-child {
          margin-right: auto;
          color: rgba(255, 255, 255, 0.62);
        }

        .tn-status__pulse {
          width: 0.35rem;
          height: 0.35rem;
          animation: tn-pulse 2s ease-out infinite;
        }

        @media (hover: hover) and (pointer: fine) {
          .tn-node:hover {
            border-color: rgba(94, 234, 212, 0.38);
            box-shadow:
              0 1.5rem 3rem -1.5rem rgba(0, 0, 0, 0.9),
              0 0 2rem -0.8rem rgba(45, 212, 191, 0.34);
            transform: translateZ(24px) translateY(-3px);
          }
        }

        @container (max-width: 34rem) {
          .tn-frame {
            border-radius: 1.25rem;
          }

          .tn-topbar,
          .tn-status {
            padding-inline: 0.72rem;
          }

          .tn-secure {
            display: none;
          }

          .tn-canvas {
            height: 28.5rem;
            min-height: 28.5rem;
            padding: 0.6rem;
          }

          .tn-orbit--outer {
            width: 22rem;
          }

          .tn-orbit--inner {
            width: 14rem;
          }

          .tn-node {
            width: min(7rem, 42%);
            padding: 0.62rem;
          }

          .tn-node--north-west {
            left: 0;
            top: 4%;
          }

          .tn-node--north-east {
            right: 0;
            top: 4%;
          }

          .tn-node--south-west {
            left: 0;
            bottom: 4%;
          }

          .tn-node--south-east {
            right: 0;
            bottom: 4%;
          }

          .tn-node__top {
            gap: 0.3rem;
            font-size: 0.5rem;
          }

          .tn-node__signal {
            width: 0.95rem;
            height: 0.95rem;
          }

          .tn-node > strong {
            margin-top: 0.48rem;
            font-size: 1rem;
          }

          .tn-node > small {
            overflow: hidden;
            font-size: 0.52rem;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .tn-node__meter {
            margin-top: 0.5rem;
          }

          .tn-link {
            width: 36%;
          }

          .tn-link--north-west {
            transform: rotate(238deg);
          }

          .tn-link--north-east {
            transform: rotate(-58deg);
          }

          .tn-link--south-west {
            transform: rotate(122deg);
          }

          .tn-link--south-east {
            transform: rotate(58deg);
          }

          .tn-core {
            width: min(14.5rem, 88%);
          }

          .tn-status {
            gap: 0;
          }

          .tn-status > span:nth-child(n + 2) {
            display: none;
          }
        }

        @container (max-width: 21rem) {
          .tn-address {
            padding-inline: 0.55rem;
          }

          .tn-window-dots {
            gap: 0.24rem;
          }

          .tn-canvas {
            height: 27rem;
            min-height: 27rem;
          }

          .tn-core {
            width: min(13.25rem, 90%);
          }

          .tn-node {
            width: 6.2rem;
          }

          .tn-node__top {
            letter-spacing: 0.04em;
          }

          .tn-node--north-west,
          .tn-node--north-east {
            top: 3%;
          }

          .tn-node--south-west,
          .tn-node--south-east {
            bottom: 3%;
          }
        }

        @keyframes tn-spin {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes tn-packet {
          0% {
            left: 4%;
            opacity: 0;
          }
          14%,
          84% {
            opacity: 1;
          }
          100% {
            left: 96%;
            opacity: 0;
          }
        }

        @keyframes tn-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.45);
          }
          72%,
          100% {
            box-shadow: 0 0 0 0.38rem rgba(52, 211, 153, 0);
          }
        }

        @keyframes tn-meter {
          0%,
          100% {
            transform: scaleX(0.74);
            transform-origin: left;
          }
          50% {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        @keyframes tn-scan {
          0%,
          24% {
            transform: translateX(-110%);
          }
          62%,
          100% {
            transform: translateX(110%);
          }
        }

        @keyframes tn-bars {
          0%,
          100% {
            transform: scaleY(0.74);
            opacity: 0.72;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes tn-route {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(280%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tn-depth {
            transform: none;
            transition: none;
          }

          .tn-ambient {
            transition: none;
          }

          .tn-orbit,
          .tn-link i,
          .tn-node__meter span,
          .tn-core::before,
          .tn-live i,
          .tn-bars span,
          .tn-routing i,
          .tn-status__pulse {
            animation: none;
          }

          .tn-node {
            transition: none;
          }
        }
      `}</style>
    </figure>
  );
}
