import { svg } from "lit";

/**
 * Original artwork of an inflatable Santa. ViewBox 0 0 240 260, ground at y≈234.
 * Structure (outer → inner):
 *   .sway      – wind lean + sway (pivot at the feet)
 *   .inflate   – inflate / deflate animation
 *   .breathe   – subtle "blower" wobble while inflated
 *     .head    – droops while (de)inflating
 *       .hat-tip – flutters in the wind
 *     .arm-wave – waving arm
 */
export const defs = svg`
  <defs>
    <radialGradient id="ist-body" cx="38%" cy="32%" r="75%">
      <stop offset="0%" stop-color="#ff5a52" />
      <stop offset="55%" stop-color="#d81f26" />
      <stop offset="100%" stop-color="#8f0d14" />
    </radialGradient>
    <radialGradient id="ist-hat" cx="35%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#ff5a52" />
      <stop offset="100%" stop-color="#a5111a" />
    </radialGradient>
    <radialGradient id="ist-face" cx="40%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#ffe0c7" />
      <stop offset="100%" stop-color="#eeb48f" />
    </radialGradient>
    <linearGradient id="ist-fur" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#dfe6ee" />
    </linearGradient>
    <linearGradient id="ist-boot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a3a3a" />
      <stop offset="100%" stop-color="#111" />
    </linearGradient>
    <radialGradient id="ist-halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(255,214,150,0.75)" />
      <stop offset="60%" stop-color="rgba(255,170,90,0.18)" />
      <stop offset="100%" stop-color="rgba(255,170,90,0)" />
    </radialGradient>
    <clipPath id="ist-body-clip">
      <ellipse cx="120" cy="160" rx="52" ry="56" />
    </clipPath>
  </defs>
`;

export const ground = svg`
  <path class="ground" d="M-400 228 Q -200 216 0 226 Q 60 214 120 222 T 240 220 Q 420 214 640 226 L 640 600 L -400 600 Z" />
  <path class="ground-shine" d="M18 228 Q 70 220 118 227" />
`;

export const halo = svg`<ellipse class="halo" cx="120" cy="140" rx="110" ry="112" fill="url(#ist-halo)" />`;

export const ropes = svg`
  <g class="ropes">
    <path d="M80 196 Q 58 218 36 236" />
    <path d="M160 196 Q 182 218 204 236" />
    <rect x="33" y="232" width="6" height="8" rx="1" />
    <rect x="201" y="232" width="6" height="8" rx="1" />
  </g>
`;

export const blower = svg`
  <g class="blower">
    <rect x="98" y="226" width="44" height="12" rx="3" />
    <circle class="fan" cx="110" cy="232" r="4" />
    <circle class="led" cx="134" cy="232" r="2" />
  </g>
`;

export const shadow = svg`<ellipse class="shadow" cx="120" cy="236" rx="58" ry="6" />`;

export const santa = svg`
  <g class="sway">
    <g class="inflate">
      <g class="breathe">
        <!-- boots -->
        <ellipse cx="98" cy="221" rx="17" ry="9" fill="url(#ist-boot)" />
        <ellipse cx="142" cy="221" rx="17" ry="9" fill="url(#ist-boot)" />
        <!-- legs -->
        <path d="M90 186 L 92 218 Q 98 222 108 218 L 116 194 L 124 194 L 132 218 Q 142 222 148 218 L 150 186 Z" fill="url(#ist-body)" />
        <rect x="88" y="208" width="22" height="7" rx="3.5" fill="url(#ist-fur)" />
        <rect x="130" y="208" width="22" height="7" rx="3.5" fill="url(#ist-fur)" />

        <!-- left arm (resting) -->
        <path d="M76 128 Q 52 150 58 184 L 72 182 Q 70 156 86 140 Z" fill="url(#ist-body)" />
        <rect x="54" y="176" width="22" height="8" rx="4" fill="url(#ist-fur)" transform="rotate(-6 65 180)" />
        <ellipse cx="64" cy="192" rx="10" ry="11" fill="#1f6b33" />

        <!-- body -->
        <ellipse cx="120" cy="160" rx="52" ry="56" fill="url(#ist-body)" />
        <g clip-path="url(#ist-body-clip)">
          <rect x="113" y="100" width="14" height="120" rx="7" fill="url(#ist-fur)" />
          <path d="M60 204 Q 120 222 180 204 L 180 230 L 60 230 Z" fill="url(#ist-fur)" />
          <rect x="60" y="170" width="120" height="14" fill="#1b1b1b" />
          <circle class="button" cx="120" cy="140" r="2.6" />
          <circle class="button" cx="120" cy="156" r="2.6" />
        </g>
        <rect x="108" y="166" width="24" height="22" rx="3" fill="none" stroke="#f5c542" stroke-width="4" />
        <path class="seam" d="M80 118 Q 70 160 82 205" />
        <path class="seam" d="M160 118 Q 170 160 158 205" />
        <ellipse class="gloss" cx="96" cy="132" rx="14" ry="24" transform="rotate(20 96 132)" />

        <!-- right arm (waving) -->
        <g class="arm-wave">
          <path d="M160 128 Q 186 118 192 86 L 178 82 Q 176 104 154 114 Z" fill="url(#ist-body)" />
          <rect x="174" y="80" width="22" height="8" rx="4" fill="url(#ist-fur)" transform="rotate(10 185 84)" />
          <ellipse cx="187" cy="70" rx="10" ry="12" fill="#1f6b33" />
          <ellipse cx="179" cy="73" rx="4" ry="6" fill="#1f6b33" transform="rotate(-30 179 73)" />
        </g>

        <!-- head -->
        <g class="head">
          <circle cx="120" cy="90" r="27" fill="url(#ist-face)" />
          <!-- beard -->
          <path d="M92 90 Q 90 118 104 130 Q 112 140 120 136 Q 128 140 136 130 Q 150 118 148 90 Q 142 106 132 104 Q 120 112 108 104 Q 98 106 92 90 Z" fill="url(#ist-fur)" />
          <ellipse cx="111" cy="104" rx="10" ry="5" fill="#fff" transform="rotate(12 111 104)" />
          <ellipse cx="129" cy="104" rx="10" ry="5" fill="#fff" transform="rotate(-12 129 104)" />
          <circle cx="120" cy="98" r="5.2" fill="#ec8f78" />
          <circle cx="106" cy="96" r="4.5" fill="#f7a1a1" opacity="0.6" />
          <circle cx="134" cy="96" r="4.5" fill="#f7a1a1" opacity="0.6" />
          <path class="eye" d="M106 87 Q 110 83 114 87" />
          <path class="eye" d="M126 87 Q 130 83 134 87" />
          <ellipse class="gloss" cx="110" cy="78" rx="7" ry="4" />
          <!-- hat -->
          <g class="hat-tip">
            <path d="M95 70 Q 104 34 134 30 Q 160 30 170 48 Q 158 44 150 48 Q 146 58 147 70 Z" fill="url(#ist-hat)" />
            <circle cx="172" cy="52" r="8" fill="url(#ist-fur)" />
          </g>
          <rect x="90" y="63" width="60" height="14" rx="7" fill="url(#ist-fur)" />
        </g>
      </g>
    </g>
  </g>
`;

/** The deflated heap lying on the ground. */
export const heap = svg`
  <g class="heap">
    <path d="M66 234 Q 64 214 84 216 Q 92 202 108 210 Q 120 198 134 208 Q 152 200 160 216 Q 180 214 178 234 Z" fill="url(#ist-body)" />
    <path d="M86 224 Q 100 214 112 222 Q 120 216 128 222" class="fold" />
    <path d="M136 218 Q 146 212 156 222" class="fold" />
    <path d="M100 234 Q 108 222 122 226 Q 136 222 144 234 Z" fill="url(#ist-fur)" />
    <ellipse cx="150" cy="212" rx="11" ry="6" fill="url(#ist-fur)" />
    <ellipse cx="88" cy="226" rx="9" ry="5" fill="#1f6b33" />
    <circle cx="170" cy="226" r="5" fill="url(#ist-fur)" />
  </g>
`;
