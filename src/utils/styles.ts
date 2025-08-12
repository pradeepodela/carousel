import { BrandOptions } from '../types';

export const getBackgroundStyle = (brandOptions: BrandOptions): string => {
  switch (brandOptions.backgroundStyle) {
    case 'brand-gradient':
      return `linear-gradient(135deg, ${brandOptions.primaryColor}, ${brandOptions.secondaryColor})`;
    case 'gradient':
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    case 'solid':
      return brandOptions.primaryColor;
    case 'image':
      return brandOptions.customBackgroundImage 
        ? `url(${brandOptions.customBackgroundImage})` 
        : brandOptions.primaryColor;
    default:
      return `linear-gradient(135deg, ${brandOptions.primaryColor}, ${brandOptions.secondaryColor})`;
  }
};

export const getCornerStyle = (cornerStyle: BrandOptions['cornerStyle']): string => {
  switch (cornerStyle) {
    case 'rounded': return 'rounded-2xl';
    case 'square': return 'rounded-none';
    case 'modern': return 'rounded-3xl';
    default: return 'rounded-3xl';
  }
};

export const getShadowStyle = (shadowIntensity: BrandOptions['shadowIntensity']): string => {
  switch (shadowIntensity) {
    case 'none': return '';
    case 'light': return 'shadow-lg';
    case 'medium': return 'shadow-xl';
    case 'heavy': return 'shadow-2xl';
    default: return 'shadow-xl';
  }
};

export const getTextPositionClass = (textPosition: 'top' | 'center' | 'bottom'): string => {
  switch (textPosition) {
    case 'top': return 'justify-start';
    case 'center': return 'justify-center';
    case 'bottom': return 'justify-end';
    default: return 'justify-center';
  }
};
