import React from 'react';
import { Slide, Settings, BrandOptions } from '../types';
import { getBackgroundStyle, getCornerStyle, getShadowStyle, getTextPositionClass } from '../utils/styles';

interface SlidePreviewProps {
  slide: Slide;
  settings: Settings;
  brandOptions: BrandOptions;
  index: number;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({
  slide,
  settings,
  brandOptions,
  index: _index
}) => {
  const backgroundStyle = getBackgroundStyle(brandOptions);
  const cornerStyle = getCornerStyle(brandOptions.cornerStyle);
  const shadowStyle = getShadowStyle(brandOptions.shadowIntensity);
  const textPositionClass = getTextPositionClass(slide.textPosition);

  return (
    <div
      className={`w-full h-full relative overflow-hidden ${cornerStyle} ${shadowStyle}`}
      style={{
        background: backgroundStyle,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background overlay */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0, 0, 0, ${slide.backgroundOverlay})` }}
      />

      {/* Brand logo */}
      {brandOptions.brandLogo && (
        <img 
          src={brandOptions.brandLogo} 
          alt="Brand Logo" 
          className="absolute top-4 left-4 w-12 h-12 object-contain z-10"
        />
      )}

      {/* Slide image */}
      {slide.image && (
        <img 
          src={slide.image} 
          alt="Slide" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Content based on layout */}
      <div className={`relative z-10 h-full flex flex-col p-8 ${slide.fontFamily || brandOptions.fontFamily}`}>
        {slide.layout === 'standard' && (
          <div className={`flex-1 flex flex-col ${textPositionClass} items-center text-center`}>
            <h2 
              className={`${slide.fontSize} ${slide.isBold ? 'font-bold' : ''} mb-4`}
              style={{ color: slide.textColor, textAlign: slide.textAlign }}
            >
              {slide.title}
            </h2>
            <p 
              className="text-xl opacity-90"
              style={{ color: slide.textColor, textAlign: slide.textAlign }}
            >
              {slide.content}
            </p>
          </div>
        )}

        {slide.layout === 'minimal' && (
          <div className={`flex-1 flex flex-col ${textPositionClass} items-center text-center`}>
            <h2 
              className={`${slide.fontSize} ${slide.isBold ? 'font-bold' : ''}`}
              style={{ color: slide.textColor, textAlign: slide.textAlign }}
            >
              {slide.title}
            </h2>
          </div>
        )}

        {slide.layout === 'quote' && (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="relative">
              <span className="text-6xl absolute -top-8 -left-4" style={{ color: slide.textColor }}>"</span>
              <h2 
                className={`${slide.fontSize} ${slide.isBold ? 'font-bold' : ''} italic mb-4`}
                style={{ color: slide.textColor, textAlign: slide.textAlign }}
              >
                {slide.title}
              </h2>
              <span className="text-6xl absolute -bottom-8 -right-4" style={{ color: slide.textColor }}>"</span>
            </div>
            <p 
              className="text-lg opacity-80"
              style={{ color: slide.textColor, textAlign: slide.textAlign }}
            >
              {slide.content}
            </p>
          </div>
        )}

        {slide.layout === 'stat' && (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h2 
              className={`${slide.fontSize} ${slide.isBold ? 'font-bold' : ''} mb-2`}
              style={{ color: slide.textColor }}
            >
              {slide.title}
            </h2>
            <p 
              className="text-2xl opacity-90"
              style={{ color: slide.textColor }}
            >
              {slide.content}
            </p>
          </div>
        )}

        {slide.layout === 'split' && (
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col justify-center items-center p-4">
              <h2 
                className={`${slide.fontSize} ${slide.isBold ? 'font-bold' : ''}`}
                style={{ color: slide.textColor, textAlign: slide.textAlign }}
              >
                {slide.title}
              </h2>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center p-4">
              <p 
                className="text-xl opacity-90"
                style={{ color: slide.textColor, textAlign: slide.textAlign }}
              >
                {slide.content}
              </p>
            </div>
          </div>
        )}

        {/* Settings overlay */}
        {settings.name.enabled && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.headshot.image && (
                <img 
                  src={settings.headshot.image} 
                  alt="Headshot" 
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <div className="text-white font-semibold">{settings.name.value}</div>
                {settings.linkedinHandle.enabled && (
                  <div className="text-white text-sm opacity-80">@{settings.linkedinHandle.value}</div>
                )}
              </div>
            </div>
            {brandOptions.watermarkEnabled && (
              <div className="text-white text-sm opacity-60">{brandOptions.watermark}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SlidePreview;
