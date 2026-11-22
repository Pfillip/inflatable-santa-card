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
    isolation: isolate;
    transition: --lean 2.5s ease, --amp 2.5s ease, --hat-lean 2.5s ease, --warn-color 1.5s ease;
  }
  :host([fill-height]) .scene {
    aspect-ratio: auto;
  }
  .sky {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 2.5s ease;
  }
  .sky.overcast-day {
    background: linear-gradient(#8f9daa, #d3dbe3);
  }
  .sky.night {
    background: linear-gradient(var(--ist-sky-night-top), var(--ist-sky-night-bottom));
  }
  .sky.overcast-night {
    background: linear-gradient(#141a26, #323c4f);
  }
  .overcast .sky.overcast-day,
  .night .sky.night,
  .night.overcast .sky.overcast-night {
    opacity: 1;
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
  .ground {
    transition: fill 2.5s ease;
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

  /*
   * Visual inflation state (v-off / v-half / v-on) uses transitions, so every
   * change between the three states animates – and can be interrupted midway.
   */
  .inflate,
  .rope {
    transition: transform 2.6s cubic-bezier(0.55, 0, 0.75, 0.4), opacity 0.3s ease 2.4s;
  }
  .v-off .inflate {
    transform: scale(1.35, 0.06);
    opacity: 0;
  }
  .v-half .inflate {
    transform: scale(1.12, 0.55);
  }
  .v-half .inflate,
  .v-half .rope {
    transition: transform 2.4s cubic-bezier(0.3, 1.25, 0.5, 1), opacity 0.2s ease;
  }
  .v-on .inflate,
  .v-on .rope {
    transform: none;
    transition: transform 3.2s cubic-bezier(0.3, 1.35, 0.45, 1), opacity 0.2s ease;
  }
  .head {
    transition: transform 1.8s ease-in;
  }
  .v-off .head {
    transform: rotate(85deg);
  }
  .v-half .head {
    transform: rotate(48deg);
    transition: transform 1.6s ease;
  }
  .v-on .head {
    transform: none;
    transition: transform 1.4s cubic-bezier(0.3, 1.6, 0.5, 1) 1.8s;
  }
  .heap {
    transition: opacity 0.5s ease 2.2s, transform 0.5s ease 2.2s;
  }
  .v-half .heap,
  .v-on .heap {
    opacity: 0;
    transform: scale(0.9, 0.7);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .no-anim *,
  .no-anim *::before,
  .no-anim *::after {
    transition: none !important;
  }

  /* ---------- tethers ---------- */
  .rope-l {
    transform-box: view-box;
    transform-origin: 36px 236px;
  }
  .rope-r {
    transform-box: view-box;
    transform-origin: 204px 236px;
  }
  .rope-l .rope-sway {
    transform-box: view-box;
    transform-origin: 36px 236px;
  }
  .rope-r .rope-sway {
    transform-box: view-box;
    transform-origin: 204px 236px;
  }
  /* slack on the ground while deflated */
  .v-off .rope {
    transform: scale(1, 0.06);
  }
  .v-half .rope {
    transform: scale(1, 0.55);
  }
  /* ropes follow Santa's lean and sway */
  .v-on .rope-sway {
    animation: ist-sway var(--sway-dur) ease-in-out infinite;
  }
  .v-half .rope-sway {
    animation: ist-sway calc(var(--sway-dur) * 1.3) ease-in-out infinite;
  }
  .rope path {
    transform-box: fill-box;
    transform-origin: center;
  }
  /* taut ropes hum in strong wind */
  .storm.v-on .rope path {
    animation: ist-rope-shiver 0.16s linear infinite;
  }
  /* the ropes snap tight just as Santa is fully inflated */
  .animate.v-on .rope path {
    animation: ist-rope-snap 0.6s ease-out 2.4s both;
  }

  /* ---------- idle motion ---------- */
  .v-on .sway {
    animation: ist-sway var(--sway-dur) ease-in-out infinite;
  }
  .v-half .sway {
    animation: ist-sway calc(var(--sway-dur) * 1.3) ease-in-out infinite;
  }
  .sway {
    transition: transform 1s ease;
  }
  .v-on .breathe {
    animation: ist-breathe 2.4s ease-in-out 3.4s infinite;
  }
  .animate.v-on .breathe,
  .animate.v-half .breathe {
    animation: ist-shudder 0.4s linear infinite;
  }
  .v-half .breathe {
    animation: ist-struggle 1.4s ease-in-out infinite;
  }
  .v-on .arm-wave {
    animation: ist-wave 1.8s ease-in-out 3.4s infinite;
  }
  .v-on .hat-tip {
    animation: ist-flutter var(--flutter-dur) ease-in-out infinite;
  }
  .storm.v-on .breathe {
    animation: ist-shudder 0.35s linear infinite;
  }

  /* ---------- inflation check failed ---------- */
  .fault .blower .led {
    fill: #ef4444;
    animation: ist-blink 0.4s steps(2) infinite;
  }
  .fault.v-half .breathe {
    animation: ist-struggle 0.9s ease-in-out infinite;
  }
  .chip.fault {
    color: #fff;
    background: #d32f2f;
    animation: ist-chip-in 0.5s ease both, ist-shake 0.5s ease 0.5s both;
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
    transition: color 2s ease;
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
    pointer-events: auto;
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


  /* ---------- effect groups fade in / out ---------- */
  .fx {
    position: absolute;
    inset: 0;
    animation: ist-fade-in 1.6s ease both;
    transition: opacity 1.5s ease;
  }
  .fx.leaving {
    opacity: 0;
  }
  .state-text {
    display: inline-block;
    animation: ist-text-in 0.6s ease both;
  }

  /* ---------- power button ---------- */
  .power {
    position: absolute;
    right: 12px;
    bottom: 12px;
    z-index: 3;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    padding: 0;
    display: grid;
    place-items: center;
    cursor: pointer;
    color: #fff;
    background: #6b7280;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: background 0.6s ease, box-shadow 0.6s ease, transform 0.15s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .power:hover {
    transform: scale(1.05);
  }
  .power:active {
    transform: scale(0.92);
  }
  .power:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 3px;
  }
  .power svg {
    position: static;
    width: 24px;
    height: 24px;
  }
  .power .ring {
    position: absolute;
    inset: -4px;
    width: auto;
    height: auto;
    border-radius: 50%;
    border: 3px solid transparent;
    pointer-events: none;
  }
  .on .power {
    background: #d81f26;
    box-shadow: 0 0 0 0 rgba(216, 31, 38, 0.6), 0 2px 6px rgba(0, 0, 0, 0.3);
    animation: ist-power-glow 2.4s ease-in-out infinite;
  }
  .pending .power .ring {
    border-top-color: #f5c542;
    border-right-color: #f5c542;
    animation: ist-spin 0.9s linear infinite;
  }
  .power.failed {
    animation: ist-shake 0.5s ease both;
  }
  .unavailable .power {
    background: #9ca3af;
    cursor: not-allowed;
    opacity: 0.7;
  }

  /* ---------- pending (switch command sent) ---------- */
  .pending .blower .led {
    fill: #f5c542;
    animation: ist-blink 0.5s steps(2) infinite;
  }
  .pending.off .blower .fan {
    animation: ist-spin 1.2s linear infinite;
  }
  .pending.off .heap {
    animation: ist-twitch 0.6s ease-in-out infinite;
  }
  .pending.on.v-on .breathe {
    animation: ist-shudder 0.5s linear infinite;
  }

  /* ---------- unavailable ---------- */
  .unavailable .figure {
    filter: grayscale(0.85) brightness(0.8);
  }
  .unavailable .blower .led {
    fill: #ef4444;
    animation: ist-blink 1.2s steps(2) infinite;
  }
  .unplugged {
    position: absolute;
    left: 50%;
    top: 38%;
    width: 44px;
    height: 44px;
    margin-left: -22px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.85);
    color: #b91c1c;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    animation: ist-fade-in 1s ease both, ist-bob 2.4s ease-in-out 1s infinite;
    pointer-events: none;
  }
  .unplugged svg {
    position: static;
    width: 26px;
    height: 26px;
  }

  /* ---------- chips ---------- */
  .chip {
    animation: ist-chip-in 0.5s ease both;
  }
  .chip.warning {
    transition: background 1.5s ease;
  }
  .chip.warning.severe {
    animation: ist-chip-in 0.5s ease both, ist-warn-pulse 1.8s ease-in-out 0.5s infinite;
  }
  .storm-hint.leaving {
    opacity: 0;
    transition: opacity 1.2s ease;
  }
  .storm-hint {
    animation: ist-chip-in 0.6s ease both, ist-pulse 1.6s ease-in-out 0.6s infinite;
  }

  @keyframes ist-struggle {
    0%, 100% { transform: scale(1, 1) rotate(0deg); }
    30% { transform: scale(1.03, 0.95) rotate(-2deg); }
    60% { transform: scale(0.98, 1.05) rotate(1.5deg); }
  }
  @keyframes ist-rope-shiver {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(0.4px, -0.5px); }
    75% { transform: translate(-0.4px, 0.5px); }
  }
  @keyframes ist-rope-snap {
    0% { transform: scale(1); }
    30% { transform: scale(1.04, 0.96); }
    60% { transform: scale(0.99, 1.02); }
    100% { transform: scale(1); }
  }
  @keyframes ist-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes ist-text-in {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: none; }
  }
  @keyframes ist-chip-in {
    from { opacity: 0; transform: translateY(6px) scale(0.95); }
    to { opacity: 1; transform: none; }
  }
  @keyframes ist-warn-pulse {
    0%, 100% { box-shadow: 0 0 0 0 var(--warn-color); }
    50% { box-shadow: 0 0 0 4px transparent; }
  }
  @keyframes ist-power-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(216, 31, 38, 0.55), 0 2px 6px rgba(0, 0, 0, 0.3); }
    50% { box-shadow: 0 0 0 8px rgba(216, 31, 38, 0), 0 2px 6px rgba(0, 0, 0, 0.3); }
  }
  @keyframes ist-shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
  @keyframes ist-blink {
    to { visibility: hidden; }
  }
  @keyframes ist-twitch {
    0%, 100% { transform: scale(1, 1); }
    50% { transform: scale(1.02, 1.08); }
  }
  @keyframes ist-bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  /* ---------- keyframes ---------- */
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
    .sway,
    .breathe,
    .arm-wave,
    .hat-tip,
    .rope-sway,
    .rope path,
    .on .halo,
    .flake,
    .drop,
    .streak-wrap,
    .cloud,
    .star,
    .fog,
    .flash,
    .storm-hint,
    .unplugged,
    .on .power,
    .chip,
    .fx {
      animation: none !important;
    }
    .v-on .sway,
    .v-on .rope-sway {
      transform: rotate(var(--lean));
    }
    .flake,
    .drop {
      transform: translateY(var(--rest, 40%));
    }
  }
`;
