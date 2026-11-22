import { css } from "lit";

export const cardStyles = css`
  :host {
    --ist-sky-day-top: #9cc7ec;
    --ist-sky-day-bottom: #e3f0fb;
    --ist-sky-night-top: #0b1733;
    --ist-sky-night-bottom: #2a3f6b;
    --ist-snow: #f4f8fc;
    --ist-snow-shade: #d6e2ee;
    --lean: 0deg;
    --amp: 1deg;
    --sway-dur: 4s;
    --flutter-dur: 2s;
    --hat-lean: 0deg;
    display: block;
    height: 100%;
  }
  ha-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
  ha-card:focus-visible {
    box-shadow: 0 0 0 2px var(--primary-color);
  }
  .scene {
    position: relative;
    flex: 1 1 auto;
    min-height: 200px;
    aspect-ratio: 24 / 22;
    overflow: hidden;
    background: linear-gradient(var(--ist-sky-day-top), var(--ist-sky-day-bottom));
    transition: background 2s ease;
    isolation: isolate;
  }
  :host([fill-height]) .scene {
    aspect-ratio: auto;
  }
  .scene.night {
    background: linear-gradient(var(--ist-sky-night-top), var(--ist-sky-night-bottom));
  }
  .scene.overcast:not(.night) {
    background: linear-gradient(#8f9daa, #d3dbe3);
  }
  .scene.overcast.night {
    background: linear-gradient(#141a26, #323c4f);
  }
  .tint {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(var(--warn-color, transparent), transparent 65%);
    opacity: var(--warn-opacity, 0);
    transition: opacity 1.5s ease;
  }
  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  /* ---------- ground ---------- */
  .ground {
    fill: var(--ist-snow);
  }
  .night .ground {
    fill: #c9d6ea;
  }
  .ground-shine {
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    opacity: 0.7;
  }
  .frost .ground-shine {
    stroke: #bfe6ff;
    stroke-dasharray: 2 6;
    opacity: 1;
  }
  .shadow {
    fill: rgba(30, 45, 70, 0.22);
  }

  /* ---------- figure ---------- */
  .figure {
    transition: filter 1.5s ease;
    filter: saturate(0.8) brightness(0.82);
  }
  .on .figure {
    filter: drop-shadow(0 0 6px rgba(255, 196, 120, 0.85)) brightness(1.06);
  }
  .halo {
    opacity: 0;
    transition: opacity 1.2s ease;
  }
  .on .halo {
    opacity: 0.55;
    animation: ist-glow 3s ease-in-out infinite;
  }
  .night.on .halo {
    opacity: 0.95;
  }
  .sway,
  .inflate,
  .breathe {
    transform-box: view-box;
    transform-origin: 120px 236px;
  }
  .head {
    transform-box: view-box;
    transform-origin: 120px 120px;
  }
  .arm-wave {
    transform-box: view-box;
    transform-origin: 158px 122px;
  }
  .hat-tip {
    transform-box: view-box;
    transform-origin: 120px 68px;
  }
  .heap {
    transform-box: view-box;
    transform-origin: 120px 234px;
  }
  .ropes path {
    fill: none;
    stroke: #c9b48a;
    stroke-width: 1.4;
  }
  .ropes rect {
    fill: #6b5a3e;
  }
  .ropes {
    transition: opacity 1s ease;
    opacity: 0.25;
  }
  .on .ropes {
    opacity: 1;
  }
  .blower rect {
    fill: #4b5563;
  }
  .blower .fan {
    fill: none;
    stroke: #9ca3af;
    stroke-width: 1.5;
    stroke-dasharray: 3 2;
    transform-box: fill-box;
    transform-origin: center;
  }
  .on .blower .fan {
    animation: ist-spin 0.4s linear infinite;
  }
  .blower .led {
    fill: #6b7280;
  }
  .on .blower .led {
    fill: #4ade80;
  }
  .seam {
    fill: none;
    stroke: rgba(80, 0, 0, 0.35);
    stroke-width: 1;
    stroke-dasharray: 3 3;
  }
  .gloss {
    fill: #fff;
    opacity: 0.22;
  }
  .button {
    fill: #f5c542;
  }
  .eye {
    fill: none;
    stroke: #3b2a20;
    stroke-width: 2.4;
    stroke-linecap: round;
  }
  .fold {
    fill: none;
    stroke: rgba(70, 0, 0, 0.45);
    stroke-width: 1.4;
    stroke-linecap: round;
  }

  /* resting states (also used when animations are disabled) */
  .off .inflate {
    transform: scale(1.35, 0.06);
    opacity: 0;
  }
  .off .head {
    transform: rotate(85deg);
  }
  .on .heap {
    opacity: 0;
  }

  /* state change animations */
  .on.animate .inflate {
    animation: ist-inflate 3.4s cubic-bezier(0.3, 0.7, 0.4, 1) both;
  }
  .on.animate .head {
    animation: ist-head-up 3.4s ease-out both;
  }
  .on.animate .heap {
    animation: ist-heap-out 3.4s ease-out both;
  }
  .off.animate .inflate {
    animation: ist-deflate 2.8s ease-in both;
  }
  .off.animate .head {
    animation: ist-head-down 2.8s ease-in both;
  }
  .off.animate .heap {
    animation: ist-heap-in 2.8s ease-out both;
  }

  /* idle motion while inflated */
  .on .sway {
    animation: ist-sway var(--sway-dur) ease-in-out infinite;
  }
  .off .sway {
    transition: transform 1s ease;
  }
  .on .breathe {
    animation: ist-breathe 2.4s ease-in-out 3.4s infinite;
  }
  .on .arm-wave {
    animation: ist-wave 1.8s ease-in-out 3.4s infinite;
  }
  .on .hat-tip {
    animation: ist-flutter var(--flutter-dur) ease-in-out infinite;
  }
  .storm.on .breathe {
    animation: ist-shudder 0.35s linear infinite;
  }

  /* ---------- weather particles ---------- */
  .flake,
  .drop,
  .streak-wrap {
    position: absolute;
    inset: 0;
    will-change: transform;
  }
  .flake {
    animation: ist-fall var(--dur) linear var(--delay) infinite;
  }
  .flake i {
    position: absolute;
    top: -6px;
    left: var(--x);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: #fff;
    opacity: var(--alpha, 0.9);
    box-shadow: 0 0 1px rgba(40, 60, 90, 0.35);
  }
  .drop {
    animation: ist-fall var(--dur) linear var(--delay) infinite;
  }
  .drop i {
    position: absolute;
    top: -20px;
    left: var(--x);
    width: 1.5px;
    height: 14px;
    border-radius: 1px;
    background: linear-gradient(transparent, rgba(190, 215, 255, 0.85));
    transform: rotate(var(--angle));
  }
  .streak-wrap {
    animation: ist-blow var(--dur) linear var(--delay) infinite;
  }
  .streak-wrap i {
    position: absolute;
    top: var(--y);
    left: 0;
    width: var(--len);
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75), transparent);
  }
  .wind-left .streak-wrap {
    animation-name: ist-blow-left;
  }
  .wind-left .streak-wrap i {
    left: auto;
    right: 0;
  }
  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: #fff;
    animation: ist-twinkle var(--dur) ease-in-out var(--delay) infinite;
  }
  .cloud {
    position: absolute;
    top: var(--y);
    left: 0;
    width: var(--w);
    height: calc(var(--w) * 0.32);
    border-radius: 999px;
    background: rgba(255, 255, 255, var(--alpha));
    filter: blur(1px);
    animation: ist-drift var(--dur) linear var(--delay) infinite;
  }
  .cloud::before,
  .cloud::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: inherit;
  }
  .cloud::before {
    width: 46%;
    height: 140%;
    left: 16%;
    bottom: 20%;
  }
  .cloud::after {
    width: 34%;
    height: 110%;
    left: 52%;
    bottom: 30%;
  }
  .wind-left .cloud {
    animation-name: ist-drift-left;
  }
  .fog {
    position: absolute;
    left: -50%;
    width: 200%;
    height: 30%;
    background: radial-gradient(ellipse at center, rgba(235, 240, 245, 0.75), transparent 70%);
    animation: ist-fog 24s ease-in-out infinite alternate;
  }
  .flash {
    position: absolute;
    inset: 0;
    background: #fff;
    opacity: 0;
    animation: ist-flash 7s linear infinite;
    mix-blend-mode: screen;
  }

  /* ---------- texts ---------- */
  .header {
    position: absolute;
    top: 10px;
    left: 14px;
    right: 14px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    pointer-events: none;
    z-index: 2;
  }
  .title {
    display: flex;
    flex-direction: column;
    color: #1e2a3a;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
  }
  .night .title {
    color: #f5f7fb;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  }
  .name {
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.3;
  }
  .state {
    font-size: 0.85rem;
    opacity: 0.85;
  }
  .storm-hint {
    font-size: 0.75rem;
    font-weight: 600;
    color: #fff;
    background: rgba(229, 57, 53, 0.9);
    padding: 3px 8px;
    border-radius: 999px;
    max-width: 55%;
    border-radius: 12px !important;
    text-align: right;
    line-height: 1.3;
    animation: ist-pulse 1.6s ease-in-out infinite;
  }
  .info {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px 12px;
    align-items: center;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.85rem;
    color: var(--primary-text-color);
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chip ha-icon {
    --mdc-icon-size: 18px;
  }
  .chip svg.arrow {
    position: static;
    width: 14px;
    height: 14px;
    flex: none;
  }
  .chip.warning {
    color: #1b1b1b;
    background: var(--warn-color);
  }
  .chip.warning.dark {
    color: #fff;
  }
  .warning-text {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .missing {
    padding: 16px;
    color: var(--error-color, #db4437);
  }

  /* ---------- keyframes ---------- */
  @keyframes ist-inflate {
    0% { transform: scale(1.35, 0.06); opacity: 0; }
    8% { opacity: 1; }
    35% { transform: scale(1.15, 0.45); }
    60% { transform: scale(0.94, 0.9); }
    75% { transform: scale(1.04, 1.04); }
    88% { transform: scale(0.99, 0.98); }
    100% { transform: scale(1, 1); opacity: 1; }
  }
  @keyframes ist-deflate {
    0% { transform: scale(1, 1); opacity: 1; }
    25% { transform: scale(1.02, 0.93); }
    60% { transform: scale(1.12, 0.5); }
    90% { transform: scale(1.3, 0.1); opacity: 1; }
    100% { transform: scale(1.35, 0.06); opacity: 0; }
  }
  @keyframes ist-head-up {
    0% { transform: rotate(80deg); }
    45% { transform: rotate(55deg); }
    70% { transform: rotate(-10deg); }
    85% { transform: rotate(5deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes ist-head-down {
    0% { transform: rotate(0deg); }
    20% { transform: rotate(-6deg); }
    60% { transform: rotate(40deg); }
    100% { transform: rotate(85deg); }
  }
  @keyframes ist-heap-out {
    0% { opacity: 1; transform: scale(1); }
    25% { opacity: 0; transform: scale(0.9, 0.7); }
    100% { opacity: 0; transform: scale(0.9, 0.7); }
  }
  @keyframes ist-heap-in {
    0%, 75% { opacity: 0; transform: scale(0.9, 0.7); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes ist-sway {
    0%, 100% { transform: rotate(calc(var(--lean) - var(--amp))); }
    50% { transform: rotate(calc(var(--lean) + var(--amp))); }
  }
  @keyframes ist-breathe {
    0%, 100% { transform: scale(1, 1); }
    50% { transform: scale(1.012, 0.99); }
  }
  @keyframes ist-shudder {
    0%, 100% { transform: scale(1, 1) skewX(0deg); }
    25% { transform: scale(1.015, 0.985) skewX(1.5deg); }
    75% { transform: scale(0.99, 1.01) skewX(-1.5deg); }
  }
  @keyframes ist-wave {
    0%, 100% { transform: rotate(-10deg); }
    50% { transform: rotate(10deg); }
  }
  @keyframes ist-flutter {
    0%, 100% { transform: rotate(calc(var(--hat-lean) - 4deg)); }
    50% { transform: rotate(calc(var(--hat-lean) + 4deg)); }
  }
  @keyframes ist-glow {
    0%, 100% { opacity: 0.55; }
    50% { opacity: 0.8; }
  }
  @keyframes ist-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes ist-fall {
    from { transform: translate(0, -5%); }
    to { transform: translate(var(--drift), 105%); }
  }
  @keyframes ist-blow {
    from { transform: translateX(-30%); opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    to { transform: translateX(110%); opacity: 0; }
  }
  @keyframes ist-blow-left {
    from { transform: translateX(30%); opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    to { transform: translateX(-110%); opacity: 0; }
  }
  @keyframes ist-drift {
    from { transform: translateX(-40%); }
    to { transform: translateX(calc(100cqw + 40%)); }
  }
  @keyframes ist-drift-left {
    from { transform: translateX(calc(100cqw + 40%)); }
    to { transform: translateX(-140%); }
  }
  @keyframes ist-twinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
  }
  @keyframes ist-fog {
    from { transform: translateX(-12%); }
    to { transform: translateX(12%); }
  }
  @keyframes ist-flash {
    0%, 61%, 64%, 67%, 100% { opacity: 0; }
    62% { opacity: 0.85; }
    63% { opacity: 0.2; }
    65% { opacity: 0.6; }
  }
  @keyframes ist-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.65; }
  }
  .layer.clouds {
    container-type: inline-size;
  }

  @media (prefers-reduced-motion: reduce) {
    .on .sway,
    .on .breathe,
    .on .arm-wave,
    .on .hat-tip,
    .on .halo,
    .flake,
    .drop,
    .streak-wrap,
    .cloud,
    .star,
    .fog,
    .flash,
    .storm-hint {
      animation: none !important;
    }
    .on .sway {
      transform: rotate(var(--lean));
    }
    .flake,
    .drop {
      transform: translateY(var(--rest, 40%));
    }
  }
`;
