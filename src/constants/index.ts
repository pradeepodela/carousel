import { FontOption, Template } from '../types';

export const FONT_OPTIONS: FontOption[] = [
  { value: 'font-sans', label: 'Sans Serif (Inter)' },
  { value: 'font-serif', label: 'Serif (Georgia)' },
  { value: 'font-mono', label: 'Monospace (Menlo)' },
  { value: 'font-display', label: 'Display (Inter)' },
  { value: 'font-script', label: 'Script (Cursive)' },
];

export const TEMPLATES: Template[] = [
  {
    id: 'ai-startup',
    name: 'AI Startup Journey',
    preview: '🚀',
    slides: [
      { layout: 'standard', fontSize: 'text-4xl', isBold: true },
      { layout: 'stat', fontSize: 'text-5xl', textColor: '#ffffff' },
      { layout: 'quote', fontSize: 'text-3xl' },
      { layout: 'split', fontSize: 'text-2xl' },
      { layout: 'minimal', fontSize: 'text-6xl', isBold: true }
    ]
  },
  {
    id: 'growth-hacking',
    name: 'Growth Hacking',
    preview: '📈',
    slides: [
      { layout: 'standard', fontSize: 'text-3xl' },
      { layout: 'stat', fontSize: 'text-7xl', isBold: true },
      { layout: 'quote', fontSize: 'text-4xl' },
      { layout: 'split', fontSize: 'text-3xl' }
    ]
  },
  {
    id: 'personal-brand',
    name: 'Personal Brand',
    preview: '👤',
    slides: [
      { layout: 'minimal', fontSize: 'text-5xl', isBold: true },
      { layout: 'quote', fontSize: 'text-3xl' },
      { layout: 'standard', fontSize: 'text-4xl' }
    ]
  },
  {
    id: 'template-image-1',
    name: 'Template Image 1',
    preview: '🖼️',
    slides: [
      { 
        layout: 'standard', 
        fontSize: 'text-4xl', 
        isBold: true, 
        textColor: '#ffffff',
        backgroundOverlay: 0.5 
      },
      { 
        layout: 'minimal', 
        fontSize: 'text-5xl', 
        isBold: true, 
        textColor: '#ffffff',
        backgroundOverlay: 0.3 
      },
      { 
        layout: 'quote', 
        fontSize: 'text-3xl', 
        textColor: '#ffffff',
        backgroundOverlay: 0.4 
      }
    ]
  },
  {
    id: 'template-image-2',
    name: 'Template Image 2',
    preview: '🎨',
    slides: [
      { 
        layout: 'stat', 
        fontSize: 'text-6xl', 
        isBold: true, 
        textColor: '#ffffff',
        backgroundOverlay: 0.6 
      },
      { 
        layout: 'split', 
        fontSize: 'text-3xl', 
        textColor: '#ffffff',
        backgroundOverlay: 0.4 
      },
      { 
        layout: 'standard', 
        fontSize: 'text-4xl', 
        isBold: true, 
        textColor: '#ffffff',
        backgroundOverlay: 0.5 
      }
    ]
  }
];

export const DEFAULT_SLIDES = [
  {
    id: 1,
    title: 'Why 70% of AI Startups Fail at Product-Market Fit',
    content: 'Discover the critical mistakes that lead to failure',
    image: null,
    fontFamily: 'font-sans',
    fontSize: 'text-3xl',
    textAlign: 'center',
    isBold: true,
    textPosition: 'center',
    textColor: '#ffffff',
    backgroundOverlay: 0.7,
    layout: 'standard',
    animation: 'fade'
  },
  {
    id: 2,
    title: 'The AI PMF Problem',
    content: 'Most AI startups focus on technology, not market needs',
    image: null,
    fontFamily: 'font-sans',
    fontSize: 'text-3xl',
    textAlign: 'center',
    isBold: true,
    textPosition: 'center',
    textColor: '#ffffff',
    backgroundOverlay: 0.7,
    layout: 'standard',
    animation: 'slide'
  },
  {
    id: 3,
    title: 'Real Story: OpenAI\'s Pivot',
    content: 'From research lab to $80B company',
    image: null,
    fontFamily: 'font-sans',
    fontSize: 'text-3xl',
    textAlign: 'center',
    isBold: true,
    textPosition: 'center',
    textColor: '#ffffff',
    backgroundOverlay: 0.7,
    layout: 'quote',
    animation: 'zoom'
  },
  {
    id: 4,
    title: 'The New PMF Framework',
    content: 'Data-driven approach to finding product-market fit',
    image: null,
    fontFamily: 'font-sans',
    fontSize: 'text-3xl',
    textAlign: 'center',
    isBold: true,
    textPosition: 'center',
    textColor: '#ffffff',
    backgroundOverlay: 0.7,
    layout: 'standard',
    animation: 'fade'
  },
  {
    id: 5,
    title: 'Data-Backed Fit Equation',
    content: 'Use metrics to validate your AI product',
    image: null,
    fontFamily: 'font-sans',
    fontSize: 'text-3xl',
    textAlign: 'center',
    isBold: true,
    textPosition: 'center',
    textColor: '#ffffff',
    backgroundOverlay: 0.7,
    layout: 'stat',
    animation: 'slide'
  }
];

export const DEFAULT_SETTINGS = {
  title: { enabled: true, value: 'Why 70% of AI Startups Fail at Product-Market Fit' },
  description: { enabled: false, value: 'Enter your carousel description...' },
  name: { enabled: true, value: 'Your Name' },
  linkedinHandle: { enabled: true, value: 'your_linkedin_handle' },
  headshot: { enabled: true, image: null },
  slideImage: { enabled: true }
};

export const DEFAULT_BRAND_OPTIONS = {
  primaryColor: '#8B5CF6',
  secondaryColor: '#EC4899',
  accentColor: '#F97316',
  backgroundStyle: 'brand-gradient' as const,
  customBackgroundImage: null,
  fontFamily: 'font-sans',
  brandLogo: null,
  watermark: 'made with 2PR.io',
  watermarkEnabled: true,
  cornerStyle: 'modern' as const,
  shadowIntensity: 'medium' as const,
  textColor: '#ffffff'
};
