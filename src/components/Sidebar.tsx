import React from 'react';
import { ActiveTab, Slide, Settings, BrandOptions, Template } from '../types';
import { FONT_OPTIONS, TEMPLATES } from '../constants';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentSlide: number;
  slides: Slide[];
  updateSlide: (index: number, updates: Partial<Slide>) => void;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  brandOptions: BrandOptions;
  setBrandOptions: React.Dispatch<React.SetStateAction<BrandOptions>>;
  applyTemplate: (template: Template) => void;
  selectedTemplate: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  slideImageRef: React.RefObject<HTMLInputElement>;
  brandLogoRef: React.RefObject<HTMLInputElement>;
  customBgRef: React.RefObject<HTMLInputElement>;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentSlide,
  slides,
  updateSlide,
  settings,
  setSettings,
  brandOptions,
  setBrandOptions,
  applyTemplate,
  selectedTemplate,
  fileInputRef,
  slideImageRef,
  brandLogoRef,
}) => {
  const currentSlideData = slides[currentSlide];

  const handleSettingToggle = (setting: keyof Settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: { ...prev[setting], enabled: !prev[setting].enabled }
    }));
  };

  const handleSettingValue = (setting: keyof Settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: { ...prev[setting], value }
    }));
  };

  // Image upload handlers are handled directly in the onClick handlers

  return (
    <div className="w-96 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Customize</h2>
      
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        {(['content', 'settings', 'brand', 'templates'] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={currentSlideData.title}
                onChange={(e) => updateSlide(currentSlide, { title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={currentSlideData.content}
                onChange={(e) => updateSlide(currentSlide, { content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
              <select
                value={currentSlideData.layout}
                onChange={(e) => updateSlide(currentSlide, { layout: e.target.value as Slide['layout'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="standard">Standard</option>
                <option value="minimal">Minimal</option>
                <option value="quote">Quote</option>
                <option value="stat">Stat</option>
                <option value="split">Split</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
              <select
                value={currentSlideData.fontSize}
                onChange={(e) => updateSlide(currentSlide, { fontSize: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="text-xl">Extra Small</option>
                <option value="text-2xl">Small</option>
                <option value="text-3xl">Medium</option>
                <option value="text-4xl">Large</option>
                <option value="text-5xl">Extra Large</option>
                <option value="text-6xl">Huge</option>
                <option value="text-7xl">Massive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={currentSlideData.textColor}
                onChange={(e) => updateSlide(currentSlide, { textColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Overlay</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={currentSlideData.backgroundOverlay}
                onChange={(e) => updateSlide(currentSlide, { backgroundOverlay: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slide Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {currentSlideData.image ? (
                  <img
                    src={currentSlideData.image}
                    alt="Slide"
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                ) : (
                  <div className="text-gray-400 mb-2">No image</div>
                )}
                <button
                  onClick={() => slideImageRef.current?.click()}
                  className="text-purple-600 hover:text-purple-700 text-sm"
                >
                  {currentSlideData.image ? 'Change Image' : 'Upload Image'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.title.enabled}
                  onChange={() => handleSettingToggle('title')}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Show Title</span>
              </label>
              {settings.title.enabled && (
                <input
                  type="text"
                  value={settings.title.value}
                  onChange={(e) => handleSettingValue('title', e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.description.enabled}
                  onChange={() => handleSettingToggle('description')}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Show Description</span>
              </label>
              {settings.description.enabled && (
                <textarea
                  value={settings.description.value}
                  onChange={(e) => handleSettingValue('description', e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={2}
                />
              )}
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.name.enabled}
                  onChange={() => handleSettingToggle('name')}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Show Name</span>
              </label>
              {settings.name.enabled && (
                <input
                  type="text"
                  value={settings.name.value}
                  onChange={(e) => handleSettingValue('name', e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.linkedinHandle.enabled}
                  onChange={() => handleSettingToggle('linkedinHandle')}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Show LinkedIn Handle</span>
              </label>
              {settings.linkedinHandle.enabled && (
                <input
                  type="text"
                  value={settings.linkedinHandle.value}
                  onChange={(e) => handleSettingValue('linkedinHandle', e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headshot</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {settings.headshot.image ? (
                  <img
                    src={settings.headshot.image}
                    alt="Headshot"
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-2"
                  />
                ) : (
                  <div className="text-gray-400 mb-2">No headshot</div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-purple-600 hover:text-purple-700 text-sm"
                >
                  {settings.headshot.image ? 'Change Headshot' : 'Upload Headshot'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'brand' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
              <input
                type="color"
                value={brandOptions.primaryColor}
                onChange={(e) => setBrandOptions(prev => ({ ...prev, primaryColor: e.target.value }))}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
              <input
                type="color"
                value={brandOptions.secondaryColor}
                onChange={(e) => setBrandOptions(prev => ({ ...prev, secondaryColor: e.target.value }))}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
              <input
                type="color"
                value={brandOptions.accentColor}
                onChange={(e) => setBrandOptions(prev => ({ ...prev, accentColor: e.target.value }))}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
              <select
                value={brandOptions.fontFamily}
                onChange={(e) => setBrandOptions(prev => ({ ...prev, fontFamily: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font.value} value={font.value}>{font.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {brandOptions.brandLogo ? (
                  <img
                    src={brandOptions.brandLogo}
                    alt="Logo"
                    className="w-20 h-20 object-contain mx-auto mb-2"
                  />
                ) : (
                  <div className="text-gray-400 mb-2">No logo</div>
                )}
                <button
                  onClick={() => brandLogoRef.current?.click()}
                  className="text-purple-600 hover:text-purple-700 text-sm"
                >
                  {brandOptions.brandLogo ? 'Change Logo' : 'Upload Logo'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Corner Style</label>
              <select
                value={brandOptions.cornerStyle}
                onChange={(e) => setBrandOptions(prev => ({ ...prev, cornerStyle: e.target.value as BrandOptions['cornerStyle'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="modern">Modern</option>
                <option value="rounded">Rounded</option>
                <option value="square">Square</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shadow Intensity</label>
              <select
                value={brandOptions.shadowIntensity}
                onChange={(e) => setBrandOptions(prev => ({ ...prev, shadowIntensity: e.target.value as BrandOptions['shadowIntensity'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="none">None</option>
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="heavy">Heavy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Watermark</label>
              <input
                type="text"
                value={brandOptions.watermark}
                onChange={(e) => setBrandOptions(prev => ({ ...prev, watermark: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter watermark text..."
              />
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={brandOptions.watermarkEnabled}
                  onChange={(e) => setBrandOptions(prev => ({ ...prev, watermarkEnabled: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Enable watermark</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Choose a Template</h3>
            <div className="space-y-2">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => applyTemplate(template)}
                  className={`w-full p-4 border rounded-lg text-left transition-colors ${
                    selectedTemplate === template.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{template.preview}</span>
                    <div>
                      <div className="font-medium text-gray-900">{template.name}</div>
                      <div className="text-sm text-gray-500">{template.slides.length} slides</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
