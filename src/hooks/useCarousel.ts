import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Slide, Settings, BrandOptions } from '../types';
import { DEFAULT_SLIDES, DEFAULT_SETTINGS, DEFAULT_BRAND_OPTIONS } from '../constants';

export const useCarousel = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'settings' | 'brand' | 'templates'>('content');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [brandOptions, setBrandOptions] = useState<BrandOptions>(DEFAULT_BRAND_OPTIONS);
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES as Slide[]);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slideImageRef = useRef<HTMLInputElement>(null);
  const brandLogoRef = useRef<HTMLInputElement>(null);
  const customBgRef = useRef<HTMLInputElement>(null);

  const updateSlide = (index: number, updates: Partial<Slide>) => {
    setSlides(prev => prev.map((slide, i) => 
      i === index ? { ...slide, ...updates } : slide
    ));
  };

  const addNewSlide = () => {
    const newSlide: Slide = {
      id: slides.length + 1,
      title: 'New Slide',
      content: 'Add your content here...',
      image: null,
      fontFamily: brandOptions.fontFamily,
      fontSize: 'text-3xl',
      textAlign: 'center',
      isBold: true,
      textPosition: 'center',
      textColor: brandOptions.textColor,
      backgroundOverlay: 0.7,
      layout: 'standard',
      animation: 'fade'
    };
    setSlides(prev => [...prev, newSlide]);
    setCurrentSlide(slides.length);
  };

  const deleteSlide = (index: number) => {
    if (slides.length > 1) {
      setSlides(prev => prev.filter((_, i) => i !== index));
      if (currentSlide >= index && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    }
  };

  const duplicateSlide = (index: number) => {
    const slideToDuplicate = slides[index];
    const newSlide: Slide = {
      ...slideToDuplicate,
      id: slides.length + 1,
      title: `${slideToDuplicate.title} (Copy)`,
    };
    setSlides(prev => [
      ...prev.slice(0, index + 1),
      newSlide,
      ...prev.slice(index + 1)
    ]);
    setCurrentSlide(index + 1);
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === slides.length - 1)) {
      return;
    }
    
    const newSlides = [...slides];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
    setSlides(newSlides);
    setCurrentSlide(newIndex);
  };

  const applyTemplate = (template: any) => {
    let updatedBrandOptions = { ...brandOptions };
    
    // Handle template images from templates folder
    if (template.id === 'template-image-1') {
      updatedBrandOptions = {
        ...brandOptions,
        backgroundStyle: 'image' as const,
        customBackgroundImage: '/templates/image.png'
      };
    } else if (template.id === 'template-image-2') {
      updatedBrandOptions = {
        ...brandOptions,
        backgroundStyle: 'image' as const,
        customBackgroundImage: '/templates/image copy.png'
      };
    } else {
      // Reset to default for other templates
      updatedBrandOptions = {
        ...brandOptions,
        backgroundStyle: 'brand-gradient' as const,
        customBackgroundImage: null
      };
    }

    setSlides(template.slides);
    setBrandOptions(updatedBrandOptions);
    setSettings(template.settings || settings);
    setSelectedTemplate(template.id);
    setCurrentSlide(0);
  };

  const generateImages = async () => {
    setIsGenerating(true);
    const images: string[] = [];
    
    try {
      for (let i = 0; i < slides.length; i++) {
        const element = slideRefs.current[i];
        if (element) {
          const canvas = await html2canvas(element, {
            width: 1080,
            height: 1080,
            background: undefined,
            useCORS: true,
            allowTaint: true,
          });
          images.push(canvas.toDataURL('image/png'));
        }
      }
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setIsGenerating(false);
    }
    
    return images;
  };

  const downloadImages = async () => {
    const images = await generateImages();
    
    images.forEach((image, index) => {
      const link = document.createElement('a');
      link.download = `slide-${index + 1}.png`;
      link.href = image;
      link.click();
    });
  };

  return {
    activeTab,
    setActiveTab,
    currentSlide,
    setCurrentSlide,
    isGenerating,
    previewMode,
    setPreviewMode,
    selectedTemplate,
    setSelectedTemplate,
    settings,
    setSettings,
    brandOptions,
    setBrandOptions,
    slides,
    setSlides,
    updateSlide,
    addNewSlide,
    deleteSlide,
    duplicateSlide,
    moveSlide,
    applyTemplate,
    generateImages,
    downloadImages,
    slideRefs,
    fileInputRef,
    slideImageRef,
    brandLogoRef,
    customBgRef
  };
};
