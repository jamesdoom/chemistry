// Independent synthetic samples from the nonrelativistic hydrogen 1s distribution.
// r/a0 has Gamma(shape=3, scale=1/2) density; directions are isotropic.
// A fixed seed makes the illustration reproducible. These are not experimental data.
export function cloudSamples(count: number) {
  let seed = 19283;
  const uniform = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return (seed + 0.5) / 4294967296;
  };
  return Array.from({ length: count }, (_, id) => {
    const radius = -0.5 * Math.log(uniform() * uniform() * uniform());
    const cosTheta = 2 * uniform() - 1;
    const phi = 2 * Math.PI * uniform();
    const transverse = radius * Math.sqrt(1 - cosTheta * cosTheta);
    return {
      id,
      x: 250 + 30 * transverse * Math.cos(phi),
      y: 190 + 30 * transverse * Math.sin(phi),
    };
  });
}
export const probabilitySamples = cloudSamples(240);
