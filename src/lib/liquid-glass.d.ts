export interface LiquidGlassOptions {
  scale?: number;
  chroma?: number;
  border?: number;
  mapBlur?: number;
  blur?: number;
  saturate?: number;
  radius?: number | null;
  fallbackBlur?: number;
}

export interface LiquidGlassInstance {
  supported: boolean;
  refresh: () => void;
  destroy: () => void;
}

export function liquidGlass(
  el: HTMLElement,
  opts?: LiquidGlassOptions
): LiquidGlassInstance;

export default liquidGlass;
