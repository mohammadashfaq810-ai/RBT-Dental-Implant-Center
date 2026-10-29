/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AppointmentRecord, PageRoute, SiteConfig } from './types';
import { DEFAULT_SITE_CONFIG } from './data/defaultConfig';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const LOCAL_STORAGE_KEY = 'rbt_dental_site_overrides_v1';

function mergeSiteConfig(overrides: Partial<SiteConfig> | undefined): SiteConfig {
  if (!overrides || typeof overrides !== 'object') {
    return DEFAULT_SITE_CONFIG;
  }

  return {
    ...DEFAULT_SITE_CONFIG,
    ...overrides,
    theme: {
      ...DEFAULT_SITE_CONFIG.theme,
      ...(overrides.theme || {}),
    },
    procedures: Array.isArray(overrides.procedures) && overrides.procedures.length > 0
      ? overrides.procedures
      : DEFAULT_SITE_CONFIG.procedures,
    schedule: Array.isArray(overrides.schedule) && overrides.schedule.length > 0
      ? overrides.schedule
      : DEFAULT_SITE_CONFIG.schedule,
  };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        return mergeSiteConfig(JSON.parse(cached));
      }
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_SITE_CONFIG;
  });
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Load saved config & appointments from server on startup
  useEffect(() => {
    let active = true;
    fetch('/api/site-data')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        if (data.overrides && Object.keys(data.overrides).length > 0) {
          const merged = mergeSiteConfig(data.overrides);
          setSiteConfig(merged);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.overrides));
          } catch {
            // Ignore storage quota errors
          }
        }
        if (Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
        }
      })
      .catch(() => {
        // Fallback to local state when offline
      });
    return () => {
      active = false;
    };
  }, []);

  // Dynamically sync CSS variables on :root whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--rbt-canvas', siteConfig.theme.canvasBg);
    root.style.setProperty('--rbt-surface', siteConfig.theme.surfaceBg);
    root.style.setProperty('--rbt-tint', siteConfig.theme.tintBg);
    root.style.setProperty('--rbt-heading', siteConfig.theme.headingColor);
    root.style.setProperty('--rbt-body', siteConfig.theme.bodyColor);
    root.style.setProperty('--rbt-accent', siteConfig.theme.accentColor);
    root.style.setProperty('--rbt-accent-dark', siteConfig.theme.accentDarkColor);
  }, [siteConfig.theme]);

  const handleBookService = (serviceName: string) => {
    setPreselectedService(serviceName);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveConfig = async (updated: SiteConfig) => {
    setSiteConfig(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore local storage quota errors for large base64 images
    }
    await fetch('/api/site-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
  };

  const handleResetConfig = async () => {
    setSiteConfig(DEFAULT_SITE_CONFIG);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // Ignore
    }
    await fetch('/api/site-config/reset', {
      method: 'POST',
    });
  };

  const handleAppointmentCreated = (apt: AppointmentRecord) => {
    setAppointments((prev) => [apt, ...prev]);
  };

  const handleUpdateAppointmentStatus = async (
    id: string,
    status: 'Pending' | 'Confirmed' | 'Completed'
  ) => {
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    await fetch(`/api/appointments/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => {});
  };

  const handleDeleteAppointment = async (id: string) => {
    setAppointments((prev) => prev.filter((item) => item.id !== id));
    await fetch(`/api/appointments/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen flex flex-col rbt-canvas-bg">
      <Navbar
        clinicName={siteConfig.clinicName}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onBookClick={() => handleBookService('')}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            config={siteConfig}
            onNavigate={setCurrentPage}
            onBookService={handleBookService}
            onAppointmentCreated={handleAppointmentCreated}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            config={siteConfig}
            onNavigate={setCurrentPage}
            onBookClick={() => handleBookService('')}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            config={siteConfig}
            onBookService={handleBookService}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            config={siteConfig}
            preselectedService={preselectedService}
            onAppointmentCreated={handleAppointmentCreated}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            config={siteConfig}
            appointments={appointments}
            onPreviewConfigChange={setSiteConfig}
            onSaveConfig={handleSaveConfig}
            onResetConfig={handleResetConfig}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            onDeleteAppointment={handleDeleteAppointment}
          />
        )}
      </main>

      <Footer config={siteConfig} onNavigate={setCurrentPage} />

      <WhatsAppButton
        whatsappDigits={siteConfig.whatsappDigits}
        leadDentist={siteConfig.leadDentist}
      />
    </div>
  );
}
