import React, { useState } from 'react';
import {
  Palette,
  Image as ImageIcon,
  FileText,
  CalendarCheck,
  RotateCcw,
  Save,
  Lock,
  Upload,
  Trash2,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import {
  AppointmentRecord,
  DentistProcedure,
  ProcedureColorScheme,
  SiteConfig,
  ThemeColors,
} from '../types';
import { THEME_PRESETS } from '../data/defaultConfig';
import { ResilientImage } from '../components/ResilientImage';

interface AdminPageProps {
  config: SiteConfig;
  appointments: AppointmentRecord[];
  onPreviewConfigChange: (updated: SiteConfig) => void;
  onSaveConfig: (updated: SiteConfig) => Promise<void>;
  onResetConfig: () => Promise<void>;
  onUpdateAppointmentStatus: (
    id: string,
    status: 'Pending' | 'Confirmed' | 'Completed'
  ) => Promise<void>;
  onDeleteAppointment: (id: string) => Promise<void>;
}

type AdminTab = 'colors' | 'images' | 'content' | 'appointments';

const PROCEDURE_SCHEMES: Array<{ id: ProcedureColorScheme; label: string; badgeClass: string }> = [
  { id: 'emerald', label: 'Botanical Emerald', badgeClass: 'bg-emerald-600 text-white' },
  { id: 'sky', label: 'Ocean Sky Blue', badgeClass: 'bg-sky-600 text-white' },
  { id: 'amber', label: 'Warm Golden Amber', badgeClass: 'bg-amber-600 text-white' },
  { id: 'indigo', label: 'Royal Indigo', badgeClass: 'bg-indigo-600 text-white' },
  { id: 'teal', label: 'Clinical Deep Teal', badgeClass: 'bg-teal-600 text-white' },
  { id: 'rose', label: 'Vibrant Coral Rose', badgeClass: 'bg-rose-600 text-white' },
];

export const AdminPage: React.FC<AdminPageProps> = ({
  config,
  appointments,
  onPreviewConfigChange,
  onSaveConfig,
  onResetConfig,
  onUpdateAppointmentStatus,
  onDeleteAppointment,
}) => {
  const [unlocked, setUnlocked] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('colors');
  const [saving, setSaving] = useState(false);
  const [statusBanner, setStatusBanner] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim() === config.adminPasscode) {
      setUnlocked(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect clinic passcode. Use default passcode "rbt2026" to test.');
    }
  };

  const updateThemeField = (key: keyof ThemeColors, value: string) => {
    onPreviewConfigChange({
      ...config,
      theme: {
        ...config.theme,
        [key]: value,
      },
    });
  };

  const applyPreset = (colors: ThemeColors) => {
    onPreviewConfigChange({
      ...config,
      theme: { ...colors },
    });
    setStatusBanner('Theme preset applied live. Click "Save Website Changes" to persist.');
  };

  const handleImageFileUpload = (
    file: File | undefined,
    onLoaded: (dataUrl: string) => void
  ) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLoaded(reader.result);
        setStatusBanner('Image loaded into live preview. Click "Save Website Changes" to store.');
      }
    };
    reader.readAsDataURL(file);
  };

  const updateProcedureField = <K extends keyof DentistProcedure>(
    procId: string,
    field: K,
    value: DentistProcedure[K]
  ) => {
    const nextProcedures = config.procedures.map((p) =>
      p.id === procId ? { ...p, [field]: value } : p
    );
    onPreviewConfigChange({
      ...config,
      procedures: nextProcedures,
    });
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setStatusBanner('');
    try {
      await onSaveConfig(config);
      setStatusBanner('All custom colors, images, and clinic details have been saved!');
    } catch {
      setStatusBanner('Saved locally in current session.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetAll = async () => {
    setSaving(true);
    setStatusBanner('');
    try {
      await onResetConfig();
      setStatusBanner('Restored default light green theme, clinic images, and SEO text.');
    } finally {
      setSaving(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="py-16 px-5 sm:px-8 max-w-md mx-auto">
        <div className="rbt-surface-bg rounded-2xl border rbt-hairline p-7 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl rbt-tint-bg flex items-center justify-center rbt-heading-text">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="font-display text-2xl font-bold rbt-heading-text">
              Clinic Admin Control Panel
            </h1>
            <p className="text-sm text-[#476658] leading-relaxed">
              Manage website light-green color themes, dark heading colors, procedure photos, SEO
              content, and patient appointment bookings for {config.clinicName}.
            </p>
          </div>

          {authError && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs font-medium text-red-800">
              {authError}
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label
                htmlFor="admin-pass"
                className="block text-xs font-semibold rbt-heading-text mb-1.5"
              >
                Admin Passcode
              </label>
              <input
                id="admin-pass"
                type="password"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Enter passcode (rbt2026)"
                className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border rbt-hairline bg-white text-[#0d281d]"
              />
              <p className="text-xs text-[#526e61] mt-1.5 font-mono">
                Demo Passcode: rbt2026
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 text-sm font-semibold text-white rbt-accent-bg rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Unlock Admin Panel
              </button>
              <button
                type="button"
                onClick={() => setUnlocked(true)}
                className="py-2.5 px-4 text-xs font-semibold rbt-heading-text border rbt-hairline rounded-lg hover:bg-black/5 transition-colors cursor-pointer whitespace-nowrap"
              >
                Quick Demo Access
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14 px-5 sm:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Action Header */}
      <div className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-[#3b594c]">
            Live Website Customizer · {config.clinicName}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold rbt-heading-text">
            Admin Panel: Colors, Images, Content &amp; Bookings
          </h1>
          <p className="text-sm text-[#476658]">
            Any color or image adjustment updates the website immediately so you can preview before
            saving.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            disabled={saving}
            onClick={handleResetAll}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rbt-heading-text border rbt-hairline rounded-xl hover:bg-black/5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Defaults
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={handleSaveAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white rbt-accent-bg rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Website Changes'}
          </button>
        </div>
      </div>

      {statusBanner && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-3.5 flex items-center gap-2.5 text-sm font-medium text-emerald-950">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{statusBanner}</span>
        </div>
      )}

      {/* Segmented Navigation Tabs */}
      <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rbt-tint-bg rounded-xl border rbt-hairline">
        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'colors'
              ? 'rbt-surface-bg rbt-heading-text shadow-xs'
              : 'text-[#3b594c] hover:text-[#0d281d]'
          }`}
        >
          <Palette className="w-4 h-4" />
          Colors &amp; Theme
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('images')}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'images'
              ? 'rbt-surface-bg rbt-heading-text shadow-xs'
              : 'text-[#3b594c] hover:text-[#0d281d]'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Hero &amp; Procedure Images
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'content'
              ? 'rbt-surface-bg rbt-heading-text shadow-xs'
              : 'text-[#3b594c] hover:text-[#0d281d]'
          }`}
        >
          <FileText className="w-4 h-4" />
          Clinic Info &amp; SEO Copy
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('appointments')}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'appointments'
              ? 'rbt-surface-bg rbt-heading-text shadow-xs'
              : 'text-[#3b594c] hover:text-[#0d281d]'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          Appointments ({appointments.length})
        </button>
      </div>

      {/* TAB 1: COLORS & THEME */}
      {activeTab === 'colors' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-7 space-y-5">
            <h2 className="font-display text-xl font-bold rbt-heading-text">
              One-Click Light Green Clinic Presets
            </h2>
            <p className="text-sm text-[#476658]">
              Select a curated light-green background palette with high-contrast dark headings.
            </p>

            <div className="space-y-3">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyPreset(preset.colors)}
                  className="w-full text-left p-4 rounded-xl border rbt-hairline hover:bg-black/5 transition-colors cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold rbt-heading-text">
                      {preset.name}
                    </span>
                    <span className="font-mono text-xs text-[#526e61]">
                      {preset.colors.canvasBg} · {preset.colors.headingColor}
                    </span>
                  </div>
                  <p className="text-xs text-[#476658]">{preset.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-7 space-y-5">
            <h2 className="font-display text-xl font-bold rbt-heading-text">
              Fine-Tune Custom Website Colors
            </h2>
            <p className="text-sm text-[#476658]">
              Pick any custom color shade for the page background, dark headings, or primary
              action buttons.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl border rbt-hairline space-y-2">
                <label className="block text-xs font-semibold rbt-heading-text">
                  Page Background (Light Green)
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={config.theme.canvasBg}
                    onChange={(e) => updateThemeField('canvasBg', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={config.theme.canvasBg}
                    onChange={(e) => updateThemeField('canvasBg', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono rounded border rbt-hairline"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl border rbt-hairline space-y-2">
                <label className="block text-xs font-semibold rbt-heading-text">
                  Secondary Section Tint
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={config.theme.tintBg}
                    onChange={(e) => updateThemeField('tintBg', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={config.theme.tintBg}
                    onChange={(e) => updateThemeField('tintBg', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono rounded border rbt-hairline"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl border rbt-hairline space-y-2">
                <label className="block text-xs font-semibold rbt-heading-text">
                  Dark Heading Color
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={config.theme.headingColor}
                    onChange={(e) => updateThemeField('headingColor', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={config.theme.headingColor}
                    onChange={(e) => updateThemeField('headingColor', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono rounded border rbt-hairline"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl border rbt-hairline space-y-2">
                <label className="block text-xs font-semibold rbt-heading-text">
                  Primary CTA Accent Color
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={config.theme.accentColor}
                    onChange={(e) => updateThemeField('accentColor', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={config.theme.accentColor}
                    onChange={(e) => updateThemeField('accentColor', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono rounded border rbt-hairline"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl border rbt-hairline space-y-2">
                <label className="block text-xs font-semibold rbt-heading-text">
                  Card Surface Background
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={config.theme.surfaceBg}
                    onChange={(e) => updateThemeField('surfaceBg', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={config.theme.surfaceBg}
                    onChange={(e) => updateThemeField('surfaceBg', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono rounded border rbt-hairline"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl border rbt-hairline space-y-2">
                <label className="block text-xs font-semibold rbt-heading-text">
                  Body Text Color
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={config.theme.bodyColor}
                    onChange={(e) => updateThemeField('bodyColor', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={config.theme.bodyColor}
                    onChange={(e) => updateThemeField('bodyColor', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono rounded border rbt-hairline"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HERO & PROCEDURE IMAGES + PROCEDURE EXPLANATION COLORS */}
      {activeTab === 'images' && (
        <div className="space-y-8">
          {/* Hero & Clinic Building Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 space-y-4">
              <h2 className="font-display text-lg font-bold rbt-heading-text">
                Home Hero Clinic Banner
              </h2>
              <div className="h-48 rounded-xl overflow-hidden border rbt-hairline">
                <ResilientImage
                  src={config.heroImageUrl}
                  alt="Hero preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2.5">
                <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white rbt-accent-bg rounded-lg cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  Upload New Hero Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageFileUpload(e.target.files?.[0], (url) =>
                        onPreviewConfigChange({ ...config, heroImageUrl: url })
                      )
                    }
                  />
                </label>
                <input
                  type="text"
                  value={config.heroImageUrl}
                  onChange={(e) =>
                    onPreviewConfigChange({ ...config, heroImageUrl: e.target.value })
                  }
                  placeholder="Or paste image URL..."
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border rbt-hairline bg-white"
                />
              </div>
            </div>

            <div className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 space-y-4">
              <h2 className="font-display text-lg font-bold rbt-heading-text">
                About Page Clinic Building Photo
              </h2>
              <div className="h-48 rounded-xl overflow-hidden border rbt-hairline">
                <ResilientImage
                  src={config.clinicFacadeImageUrl}
                  alt="Clinic building preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2.5">
                <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white rbt-accent-bg rounded-lg cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Building Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageFileUpload(e.target.files?.[0], (url) =>
                        onPreviewConfigChange({ ...config, clinicFacadeImageUrl: url })
                      )
                    }
                  />
                </label>
                <input
                  type="text"
                  value={config.clinicFacadeImageUrl}
                  onChange={(e) =>
                    onPreviewConfigChange({ ...config, clinicFacadeImageUrl: e.target.value })
                  }
                  placeholder="Or paste image URL..."
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border rbt-hairline bg-white"
                />
              </div>
            </div>
          </div>

          {/* 4 Dentist Procedure Images & Explanation Box Colors */}
          <div className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-7 space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold rbt-heading-text">
                Dentist Procedure Images &amp; Attractive Explanation Colors
              </h2>
              <p className="text-sm text-[#476658] mt-1">
                Customize the photo and vibrant color theme used when explaining each procedure
                carried out by {config.leadDentist}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.procedures.map((proc) => (
                <div key={proc.id} className="rounded-xl border rbt-hairline p-5 space-y-4">
                  <p className="font-display text-sm font-bold rbt-heading-text">
                    {proc.indexLabel}. {proc.title}
                  </p>
                  <div className="h-44 rounded-lg overflow-hidden border rbt-hairline">
                    <ResilientImage
                      src={proc.imageUrl}
                      alt={proc.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rbt-accent-bg rounded-lg cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      Upload Procedure Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageFileUpload(e.target.files?.[0], (url) =>
                            updateProcedureField(proc.id, 'imageUrl', url)
                          )
                        }
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    value={proc.imageUrl}
                    onChange={(e) => updateProcedureField(proc.id, 'imageUrl', e.target.value)}
                    placeholder="Procedure image URL..."
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border rbt-hairline bg-white"
                  />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold rbt-heading-text">
                      Procedure Explanation Color Theme
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PROCEDURE_SCHEMES.map((sc) => (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() => updateProcedureField(proc.id, 'colorScheme', sc.id)}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-opacity cursor-pointer whitespace-nowrap ${
                            sc.badgeClass
                          } ${
                            proc.colorScheme === sc.id
                              ? 'ring-2 ring-offset-2 ring-slate-900'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          {sc.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLINIC DETAILS & SEO PROCEDURE TEXT */}
      {activeTab === 'content' && (
        <div className="space-y-8">
          <div className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-7 space-y-5">
            <h2 className="font-display text-xl font-bold rbt-heading-text">
              Core Clinic Details &amp; Hero Copy
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold rbt-heading-text mb-1">
                  Clinic Brand Name
                </label>
                <input
                  type="text"
                  value={config.clinicName}
                  onChange={(e) =>
                    onPreviewConfigChange({ ...config, clinicName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border rbt-hairline bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold rbt-heading-text mb-1">
                  Lead Dentist Name
                </label>
                <input
                  type="text"
                  value={config.leadDentist}
                  onChange={(e) =>
                    onPreviewConfigChange({ ...config, leadDentist: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border rbt-hairline bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold rbt-heading-text mb-1">
                  Display Phone Number
                </label>
                <input
                  type="text"
                  value={config.phoneDisplay}
                  onChange={(e) =>
                    onPreviewConfigChange({ ...config, phoneDisplay: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm font-mono rounded-lg border rbt-hairline bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold rbt-heading-text mb-1">
                  WhatsApp International Number (Digits Only)
                </label>
                <input
                  type="text"
                  value={config.whatsappDigits}
                  onChange={(e) =>
                    onPreviewConfigChange({ ...config, whatsappDigits: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm font-mono rounded-lg border rbt-hairline bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold rbt-heading-text mb-1">
                DHA Lahore Clinic Address
              </label>
              <input
                type="text"
                value={config.addressFull}
                onChange={(e) => onPreviewConfigChange({ ...config, addressFull: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border rbt-hairline bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold rbt-heading-text mb-1">
                Hero Main Headline (SEO H1)
              </label>
              <input
                type="text"
                value={config.heroHeadline}
                onChange={(e) =>
                  onPreviewConfigChange({ ...config, heroHeadline: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm rounded-lg border rbt-hairline bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold rbt-heading-text mb-1">
                Hero SEO Subheadline
              </label>
              <textarea
                rows={3}
                value={config.heroSubheadline}
                onChange={(e) =>
                  onPreviewConfigChange({ ...config, heroSubheadline: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm rounded-lg border rbt-hairline bg-white"
              />
            </div>
          </div>

          <div className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-7 space-y-5">
            <h2 className="font-display text-xl font-bold rbt-heading-text">
              Dentist Procedure Explanations &amp; SEO Descriptions
            </h2>
            <div className="space-y-6">
              {config.procedures.map((proc) => (
                <div key={proc.id} className="rounded-xl border rbt-hairline p-5 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold rbt-heading-text mb-1">
                      Procedure Heading ({proc.indexLabel})
                    </label>
                    <input
                      type="text"
                      value={proc.title}
                      onChange={(e) => updateProcedureField(proc.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border rbt-hairline bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold rbt-heading-text mb-1">
                      SEO Summary Paragraph
                    </label>
                    <textarea
                      rows={2}
                      value={proc.seoSummary}
                      onChange={(e) => updateProcedureField(proc.id, 'seoSummary', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border rbt-hairline bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold rbt-heading-text mb-1">
                      Dentist Procedure Walkthrough Explanation
                    </label>
                    <textarea
                      rows={3}
                      value={proc.dentistExecutionNarrative}
                      onChange={(e) =>
                        updateProcedureField(proc.id, 'dentistExecutionNarrative', e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border rbt-hairline bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: APPOINTMENTS INBOX */}
      {activeTab === 'appointments' && (
        <div className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold rbt-heading-text">
                Patient Consultation Requests
              </h2>
              <p className="text-sm text-[#476658]">
                Appointments submitted via the website appear here for reception follow-up.
              </p>
            </div>
            <span className="font-mono text-xs tabular-nums text-[#526e61]">
              Total: {appointments.length}
            </span>
          </div>

          {appointments.length === 0 ? (
            <div className="rounded-xl rbt-tint-bg p-8 text-center space-y-2">
              <p className="font-display text-base font-bold rbt-heading-text">
                No Patient Bookings Yet
              </p>
              <p className="text-xs text-[#476658]">
                Submit a test consultation from the Home or Contact page to see it arrive here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => {
                const cleanPatientPhone = apt.phone.replace(/\D/g, '');
                const formattedWaPhone = cleanPatientPhone.startsWith('0')
                  ? `92${cleanPatientPhone.slice(1)}`
                  : cleanPatientPhone;
                const replyWaUrl = `https://wa.me/${formattedWaPhone}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum ${apt.patientName}, this is RBT Dental & Implant Center (DHA Phase 5, Lahore) confirming your request for "${apt.service}".`
                )}`;

                return (
                  <div
                    key={apt.id}
                    className="rounded-xl border rbt-hairline p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#526e61]">
                        <span className="font-semibold rbt-heading-text text-sm">
                          {apt.patientName}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{apt.phone}</span>
                        <span aria-hidden="true">·</span>
                        <span>Status: {apt.status}</span>
                      </div>
                      <p className="font-display text-sm font-bold rbt-heading-text">
                        {apt.service}
                      </p>
                      <p className="text-xs font-mono tabular-nums text-[#476658]">
                        Preferred Slot: {apt.preferredDate} · {apt.preferredTime}
                      </p>
                      {apt.notes && (
                        <p className="text-xs text-[#284237] pt-1">Note: {apt.notes}</p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <select
                        aria-label="Appointment status"
                        value={apt.status}
                        onChange={(e) =>
                          onUpdateAppointmentStatus(
                            apt.id,
                            e.target.value as 'Pending' | 'Confirmed' | 'Completed'
                          )
                        }
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg border rbt-hairline bg-white rbt-heading-text"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                      </select>

                      <a
                        href={replyWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#128C7E] hover:bg-[#075E54] rounded-lg whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp Patient
                      </a>

                      <button
                        type="button"
                        onClick={() => onDeleteAppointment(apt.id)}
                        aria-label="Delete appointment"
                        className="inline-flex items-center justify-center p-2 text-red-700 hover:bg-red-50 rounded-lg border border-red-200 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
