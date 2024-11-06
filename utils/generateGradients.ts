export const generateGradient = (seed: number): string => {
  const hue1 = (seed * 137.5) % 360;
  const hue2 = (hue1 + 60) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 80%, 60%), hsl(${hue2}, 80%, 60%))`;
};
