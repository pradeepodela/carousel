import { Download, ChevronLeft, ChevronRight, Plus, Trash2, Move, Copy, Eye } from 'lucide-react';
import { useCarousel } from './hooks/useCarousel';
import Sidebar from './components/Sidebar';
import SlidePreview from './components/SlidePreview';

const LinkedInCarouselGenerator = () => {
  const {
    activeTab,
    setActiveTab,
    currentSlide,
    setCurrentSlide,
    isGenerating,
    previewMode,
    setPreviewMode,
    selectedTemplate,
    settings,
    setSettings,
    brandOptions,
    setBrandOptions,
    slides,
    updateSlide,
    addNewSlide,
    deleteSlide,
    duplicateSlide,
    moveSlide,
    applyTemplate,
    downloadImages,
    fileInputRef,
    slideImageRef,
    brandLogoRef,
    customBgRef
  } = useCarousel();

  const currentSlideData = slides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LinkedIn Carousel Generator</h1>
              <p className="text-gray-600">Create stunning carousels for LinkedIn</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Eye size={16} />
                {previewMode ? 'Edit Mode' : 'Preview'}
              </button>
              <button
                onClick={downloadImages}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                <Download size={16} />
                {isGenerating ? 'Generating...' : 'Download All'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-4">
          {/* Sidebar */}
          {!previewMode && (
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              currentSlide={currentSlide}
              slides={slides}
              updateSlide={updateSlide}
              settings={settings}
              setSettings={setSettings}
              brandOptions={brandOptions}
              setBrandOptions={setBrandOptions}
              applyTemplate={applyTemplate}
              selectedTemplate={selectedTemplate}
              fileInputRef={fileInputRef}
              slideImageRef={slideImageRef}
              brandLogoRef={brandLogoRef}
              customBgRef={customBgRef}
            />
          )}

          {/* Main Preview Area */}
          <div className={`${previewMode ? 'w-full' : 'flex-1'} bg-white rounded-lg shadow-sm p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {previewMode ? 'LinkedIn Preview' : 'Slide Preview'}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {currentSlide + 1} / {slides.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Container */}
            <div className={`relative ${previewMode ? 'w-full' : 'max-w-2xl mx-auto'}`}>
              <div className={`${previewMode ? 'w-full' : 'aspect-square'} relative overflow-hidden`}>
                <SlidePreview
                  slide={currentSlideData}
                  settings={settings}
                  brandOptions={brandOptions}
                  index={currentSlide}
                />
              </div>
              
              {/* Thumbnail Navigation */}
              {!previewMode && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg cursor-pointer transition-all ${
                        index === currentSlide ? 'ring-2 ring-purple-500' : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg p-2 flex items-center justify-center">
                        <div className="text-white text-xs text-center line-clamp-2">
                          {slide.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Slide Actions */}
            {!previewMode && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={addNewSlide}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <Plus size={16} />
                  Add Slide
                </button>
                <button
                  onClick={() => duplicateSlide(currentSlide)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Copy size={16} />
                  Duplicate
                </button>
                <button
                  onClick={() => moveSlide(currentSlide, 'up')}
                  disabled={currentSlide === 0}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  <Move size={16} />
                  Move Up
                </button>
                <button
                  onClick={() => moveSlide(currentSlide, 'down')}
                  disabled={currentSlide === slides.length - 1}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  <Move size={16} />
                  Move Down
                </button>
                <button
                  onClick={() => deleteSlide(currentSlide)}
                  disabled={slides.length === 1}
                  className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result as string;
              setSettings(prev => ({
                ...prev,
                headshot: { ...prev.headshot, image: result }
              }));
            };
            reader.readAsDataURL(file);
          }
        }}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={slideImageRef}
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result as string;
              updateSlide(currentSlide, { image: result });
            };
            reader.readAsDataURL(file);
          }
        }}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={brandLogoRef}
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result as string;
              setBrandOptions(prev => ({ ...prev, brandLogo: result }));
            };
            reader.readAsDataURL(file);
          }
        }}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={customBgRef}
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result as string;
              setBrandOptions(prev => ({ ...prev, customBackgroundImage: result }));
            };
            reader.readAsDataURL(file);
          }
        }}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default LinkedInCarouselGenerator;
