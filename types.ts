
export enum VideoAspectRatio {
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}

export interface VideoGenerationState {
  isGenerating: boolean;
  status: string;
  videoUrl: string | null;
  error: string | null;
}
