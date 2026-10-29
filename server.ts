import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'clinic-store.json');

interface StoredData {
  overrides: Record<string, unknown>;
  appointments: Array<{
    id: string;
    patientName: string;
    phone: string;
    service: string;
    preferredDate: string;
    preferredTime: string;
    notes: string;
    status: 'Pending' | 'Confirmed' | 'Completed';
    createdAt: string;
  }>;
}

function readStore(): StoredData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_PATH)) {
      const initial: StoredData = {
        overrides: {},
        appointments: [],
      };
      fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as StoredData;
    return {
      overrides: parsed.overrides || {},
      appointments: Array.isArray(parsed.appointments) ? parsed.appointments : [],
    };
  } catch {
    return { overrides: {}, appointments: [] };
  }
}

function writeStore(data: StoredData): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '15mb' }));

  app.get('/api/site-data', (_req, res) => {
    const store = readStore();
    res.json(store);
  });

  app.put('/api/site-config', (req, res) => {
    const store = readStore();
    const incoming = req.body && typeof req.body === 'object' ? req.body : {};
    store.overrides = incoming;
    writeStore(store);
    res.json({ ok: true, overrides: store.overrides });
  });

  app.post('/api/site-config/reset', (_req, res) => {
    const store = readStore();
    store.overrides = {};
    writeStore(store);
    res.json({ ok: true, overrides: {} });
  });

  app.post('/api/appointments', (req, res) => {
    const { patientName, phone, service, preferredDate, preferredTime, notes } = req.body || {};
    if (!patientName || !phone || !service) {
      res.status(400).json({ error: 'Name, phone number, and selected dental treatment are required.' });
      return;
    }

    const store = readStore();
    const newAppointment = {
      id: `apt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      patientName: String(patientName).trim().slice(0, 120),
      phone: String(phone).trim().slice(0, 40),
      service: String(service).trim().slice(0, 120),
      preferredDate: String(preferredDate || 'Flexible').trim().slice(0, 40),
      preferredTime: String(preferredTime || 'Morning / Evening').trim().slice(0, 40),
      notes: String(notes || '').trim().slice(0, 600),
      status: 'Pending' as const,
      createdAt: new Date().toISOString(),
    };

    store.appointments.unshift(newAppointment);
    writeStore(store);
    res.status(201).json({ ok: true, appointment: newAppointment });
  });

  app.patch('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body || {};
    if (!['Pending', 'Confirmed', 'Completed'].includes(status)) {
      res.status(400).json({ error: 'Invalid appointment status.' });
      return;
    }

    const store = readStore();
    const idx = store.appointments.findIndex((item) => item.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Appointment not found.' });
      return;
    }

    store.appointments[idx].status = status;
    writeStore(store);
    res.json({ ok: true, appointment: store.appointments[idx] });
  });

  app.delete('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const store = readStore();
    store.appointments = store.appointments.filter((item) => item.id !== id);
    writeStore(store);
    res.json({ ok: true });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RBT Dental & Implant Center server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
