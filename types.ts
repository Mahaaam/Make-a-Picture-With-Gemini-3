export enum AspectRatio {
  Square = '1:1',
  Landscape = '16:9',
  Portrait = '9:16',
  Desktop = '4:3',
  Tall = '3:4'
}

export enum ArtStyle {
  Realistic = 'Realistic',
  Anime = 'Anime',
  Cyberpunk = 'Cyberpunk',
  OilPainting = 'Oil Painting',
  ThreeDRender = '3D Render',
  Sketch = 'Pencil Sketch',
  Minimalist = 'Minimalist',
  Fantasy = 'Fantasy Art'
}

export interface ImageConfig {
  aspectRatio: AspectRatio;
  style: ArtStyle;
  primaryColor: string | null;
  isGradient: boolean;
  removeBackground: boolean;
  prompt: string;
  referenceImage: string | null; // Base64
}

export type Step = 'aspect' | 'style' | 'color' | 'prompt' | 'generating' | 'result';

export interface GeneratedImage {
  url: string;
  prompt: string;
}
