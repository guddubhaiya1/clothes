// Stub for Replit plugins when not in Replit environment
export const runtimeErrorOverlay = () => ({
  name: 'stub-runtime-error-overlay',
  apply: 'serve'
});

export const cartographer = () => ({
  name: 'stub-cartographer',
  apply: 'serve'
});

export const devBanner = () => ({
  name: 'stub-dev-banner',
  apply: 'serve'
});
