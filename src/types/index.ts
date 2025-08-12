export interface Slide {
  id: number;
  title: string;
  content: string;
  image: string | null;
  fontFamily: string;
  fontSize: string;
  textAlign: 'left' | 'center' | 'right';
  isBold: boolean;
  textPosition: 'top' | 'center' | 'bottom';
  textColor: string;
  backgroundOverlay: number;
  layout: 'standard' | 'split' | 'minimal' | 'quote' | 'stat';
  animation: 'none' | 'fade' | 'slide' | 'zoom';
}

export interface Settings {
  title: { enabled: boolean; value: string };
  description: { enabled: boolean; value: string };
  name: { enabled: boolean; value: string };
  linkedinHandle: { enabled: boolean; value: string };
  headshot: { enabled: boolean; image: string | null };
  slideImage: { enabled: boolean };
}

export interface BrandOptions {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundStyle: 'gradient' | 'solid' | 'image' | 'brand-gradient';
  customBackgroundImage: string | null;
  fontFamily: string;
  brandLogo: string | null;
  watermark: string;
  watermarkEnabled: boolean;
  cornerStyle: 'rounded' | 'square' | 'modern';
  shadowIntensity: 'none' | 'light' | 'medium' | 'heavy';
  textColor: string;
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  slides: Partial<Slide>[];
}

export interface FontOption {
  value: string;
  label: string;
}

export type ActiveTab = 'content' | 'settings' | 'brand' | 'templates';
