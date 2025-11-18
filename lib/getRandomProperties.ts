import type { Property } from "@/types/property";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getRandomProperties(properties: Property[]): Property[] {
  const rng = mulberry32(123456);

  return properties
    .map((p) => ({ p, r: rng() }))
    .sort((a, b) => a.r - b.r)
    .map((obj) => obj.p)
    .slice(0, 3);
}
