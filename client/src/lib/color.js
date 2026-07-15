function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((c) => c + c).join('')
    : normalized;
  const int = parseInt(value, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;
}

function mix(hex, target, amount) {
  const a = hexToRgb(hex);
  const b = hexToRgb(target);
  return rgbToHex({
    r: a.r + (b.r - a.r) * amount,
    g: a.g + (b.g - a.g) * amount,
    b: a.b + (b.b - a.b) * amount,
  });
}

/**
 * Deriva um gradiente de 3 pontos a partir da cor de uma linguagem:
 * mais escuro nas pontas, a cor real da linguagem no meio.
 */
export function getLanguageGradient(hex) {
  const from = mix(hex, '#000000', 0.55);
  const to = mix(hex, '#000000', 0.7);
  return `linear-gradient(135deg, ${from} 0%, ${hex} 50%, ${to} 100%)`;
}
