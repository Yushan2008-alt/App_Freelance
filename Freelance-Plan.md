# Plan: Freelance Hub — PRD High-Level Planning

---

> **CATATAN WAJIB DIPATUHI:**
> - Selalu uji coba / preview sebelum konfirmasi selesai
> - Pastikan semua sistem dan fitur berjalan sepenuhnya sebelum menyatakan selesai
> - Boleh edit atau modifikasi kode tanpa meminta izin terlebih dahulu
> - Tanyakan pertanyaan jika ada hal yang perlu dikonfirmasi
> - Jika telah mencapai finish atau ada perubahan, selalu push ke GitHub akun **"Yushan2008-alt"** repo: https://github.com/Yushan2008-alt/App_Freelance

---

## Context

Membangun aplikasi manajemen freelance bernama **Freelance Hub** yang ditujukan untuk pemula yang kesulitan mengelola proyek dan keuangan tanpa harus menggunakan aplikasi rumit berbayar. Setelah deep research pada 10 kompetitor utama (Bonsai, HoneyBook, Dubsado, Indy, Plutio, Wave, Clockify, Toggl, Harvest, Fiverr Workspace), ditemukan celah pasar yang signifikan. Output sesi ini adalah file `PRD.md` yang komprehensif.

**Keputusan final:**
- **Nama**: Freelance Hub
- **Stack**: Next.js (frontend) + Supabase (auth, database, storage, realtime)
- **Platform**: Web App (browser, responsive)
- **Model**: 100% Gratis / Open Source
- **Bahasa**: Bilingual (Bahasa Indonesia + English, user dapat memilih)
- **Target**: Freelancer pemula Indonesia (dan global)

---

## Competitive Analysis Summary

### Kompetitor Terdekat & Kelemahannya

| App | Kelemahan Utama | Peluang untuk Freelance Hub |
|-----|---|---|
| **Indy** | Free tier dibatasi 3 dokumen/bulan | Semua fitur gratis tanpa limit |
| **Bonsai** | $24-99/bulan, payment delay 7-10 hari | Gratis, tidak ada payment delay |
| **Plutio** | Learning curve tinggi | UI lebih sederhana, onboarding bertahap |
| **Dubsado** | Kurva belajar ekstrem (user sewa specialist) | Beginner-first design |
| **HoneyBook** | Mahal ($29-129/mo), tidak ada time tracking | Gratis + native time tracking |
| **Wave** | Hanya accounting, tidak ada project management | All-in-one |
| **Clockify** | Tidak ada invoicing atau project management | All-in-one |

### Fitur yang TIDAK ADA di Kompetitor Manapun (Market Gaps)

1. **Scope Creep Detection** — Tidak ada app yang melacak scope asli vs pekerjaan aktual
2. **Smart Time Tracking Nudges** — Tidak ada yang mengingatkan user untuk mulai/stop timer
3. **Tax Estimation** — Tidak ada yang membantu hitung PPh/quarterly tax untuk freelancer
4. **Auto Late Payment Escalation** — Tidak ada eskalasi otomatis untuk invoice terlambat
5. **Client Health Score** — Tidak ada scoring klien berdasarkan reliabilitas pembayaran
6. **Income Forecasting** — Tidak ada prediksi cash flow yang beginner-friendly
7. **Change Order Management** — Tidak ada workflow formal untuk perubahan scope
8. **Bilingual Support** — Kompetitor mayoritas English-only

---

## PRD Document Structure

File yang akan dibuat: `PRD.md` di root direktori proyek.

### Struktur Lengkap PRD.md

```
# Freelance Hub — Product Requirements Document

## 1. Executive Summary
## 2. Problem Statement
## 3. Target User Persona
## 4. Competitive Analysis
## 5. Product Positioning & Value Proposition
## 6. Feature Roadmap
   ### Phase 1: MVP (Core Features)
   ### Phase 2: Differentiators
   ### Phase 3: Advanced Intelligence
## 7. Detailed Feature Specifications
   ### 7.1 Authentication & Onboarding
   ### 7.2 Dashboard
   ### 7.3 Project Management
   ### 7.4 Client Management
   ### 7.5 Financial Management (Invoice, Expenses)
   ### 7.6 Time Tracking
   ### 7.7 [Phase 2] Scope Guard
   ### 7.8 [Phase 2] Tax Estimator
   ### 7.9 [Phase 2] Payment Pipeline
   ### 7.10 [Phase 3] Client Health Score
   ### 7.11 [Phase 3] Income Forecasting
## 8. Database Schema (Supabase)
## 9. Technical Architecture
## 10. Design System
## 11. Indonesian Market Specifics
## 12. Internationalization (i18n)
## 13. Success Metrics & KPIs
## 14. Out of Scope (v1)
```

---

## Key Feature Decisions

### Phase 1: MVP Features

#### 1. Auth & Onboarding
- Supabase Auth (email/password + Google OAuth)
- Progressive onboarding: 5 langkah terpandu dengan penjelasan "mengapa ini penting"
- Profile setup: nama, foto, keahlian, mata uang default (IDR/USD/dll), bahasa (ID/EN)

#### 2. Dashboard
- Summary card: Total pendapatan bulan ini, proyek aktif, invoice outstanding, jam kerja
- Quick actions: "Buat Invoice", "Catat Waktu", "Tambah Proyek"
- Recent activity feed
- Upcoming deadlines widget

#### 3. Project Management
- Status: Draft → Active → Completed → Archived
- Field: nama proyek, klien, nilai proyek, deadline, deskripsi scope
- Kanban view (default) + List view
- Attach files (via Supabase Storage)
- Notes per proyek
- Link ke invoice & time entries

#### 4. Client Management
- Database klien: nama, email, telepon, perusahaan, alamat, negara
- Riwayat proyek per klien
- Total value per klien
- Status klien: Active / Inactive

#### 5. Financial Management
- **Invoice**: buat, kirim, track status (Draft/Sent/Viewed/Paid/Overdue)
- **Expenses**: catat pengeluaran, kategori, attach receipt
- **Laporan**: pendapatan vs pengeluaran, per bulan/kuartal/tahun
- Multi-currency (IDR default, + USD, EUR, SGD, MYR)
- PDF export invoice dengan branding user (logo, warna)
- Payment terms: Net 7, Net 14, Net 30, atau custom

#### 6. Time Tracking
- Timer start/stop (per proyek)
- Manual entry (isi jam & menit)
- View: harian/mingguan
- Convert time entries → invoice items
- Laporan waktu per proyek/klien

### Phase 2: Differentiator Features

#### 7. Scope Guard (UNIK — tidak ada di kompetitor)
- Definisikan scope saat buat proyek (bullet list deliverables)
- Track deliverable mana yang sudah selesai
- Visual: progress bar scope completion
- Alert jika pekerjaan melebihi scope asli
- "Request Change Order" button → buat revisi scope + invoice tambahan

#### 8. Tax Estimator (UNIK)
- User input: negara (Indonesia default), status pajak
- Sistem hitung estimasi PPh 21/23 (Indonesia) atau quarterly tax (US)
- Dashboard: "Sisihkan X% dari setiap invoice untuk pajak"
- Reminder kuartalan untuk lapor pajak
- Catatan: ini estimasi, bukan nasihat pajak resmi

#### 9. Smart Payment Pipeline
- Visual pipeline: Invoice Dikirim → Dilihat → Jatuh Tempo → Overdue
- Auto-reminder email template (bisa diaktifkan/nonaktifkan)
- Escalation timeline: reminder H+1, H+7, H+14 setelah jatuh tempo
- Late fee calculator (opsional, user set persentase)
- "Mark as Paid" dengan tanggal & metode pembayaran

#### 10. Smart Time Nudges (UNIK)
- Browser notification: "Kamu sedang mengerjakan [Proyek X] — sudahkah timer dinyalakan?"
- Deteksi berdasarkan waktu aktif (jam kerja yang dikonfigurasi user)
- "Lupa catat waktu?" — quick-add waktu retroaktif

### Phase 3: Advanced Intelligence

#### 11. Client Health Score
- Scoring otomatis berdasarkan:
  - Kecepatan pembayaran (rata-rata hari setelah jatuh tempo)
  - Frekuensi scope creep (permintaan di luar scope)
  - Nilai total proyek
- Label: ⭐ Premium / ✅ Good / ⚠️ Watch / 🔴 At Risk
- Rekomendasi: "Pertimbangkan uang muka lebih besar untuk klien ini"

#### 12. Income Forecasting
- Grafik proyeksi 3 bulan ke depan berdasarkan proyek aktif + historis
- "Bulan lean" alert: "Pendapatanmu diprediksi rendah bulan depan — pertimbangkan cari proyek baru"
- Break-even tracker: pengeluaran rutin vs pendapatan minimum

---

## Database Schema (Supabase)

### Core Tables

```sql
-- Users (extends Supabase auth.users)
profiles: id, full_name, avatar_url, profession, default_currency, language, timezone, tax_country, created_at

-- Clients
clients: id, user_id, name, email, phone, company, address, country, currency, notes, status, created_at

-- Projects
projects: id, user_id, client_id, name, description, status, value, currency, start_date, deadline, created_at
-- status: 'draft' | 'active' | 'completed' | 'archived'

-- Project Scope Items (for Scope Guard)
scope_items: id, project_id, title, description, is_completed, created_at

-- Time Entries
time_entries: id, user_id, project_id, description, start_time, end_time, duration_minutes, is_billable, created_at

-- Invoices
invoices: id, user_id, client_id, project_id, invoice_number, status, issue_date, due_date, subtotal, tax_rate, tax_amount, total, currency, notes, created_at
-- status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled'

-- Invoice Items
invoice_items: id, invoice_id, description, quantity, unit_price, total

-- Expenses
expenses: id, user_id, project_id, description, amount, currency, category, receipt_url, date, created_at
-- category: 'software' | 'hardware' | 'marketing' | 'office' | 'travel' | 'other'

-- Change Orders
change_orders: id, project_id, title, description, additional_value, status, created_at
-- status: 'pending' | 'approved' | 'rejected'
```

---

## Technical Architecture

### Stack
- **Frontend**: Next.js 15 (App Router) + TypeScript
- **UI**: shadcn/ui + Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime, Edge Functions)
- **State Management**: Zustand atau React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts atau Chart.js
- **i18n**: next-intl (Bahasa Indonesia + English)
- **PDF Generation**: @react-pdf/renderer
- **Date**: date-fns dengan locale id (Indonesian)

### Supabase Features Used
- **Auth**: Email/Password + Google OAuth, Row Level Security (RLS)
- **Database**: PostgreSQL dengan RLS per user
- **Storage**: Receipt uploads, invoice PDF, avatar
- **Realtime**: Live update status invoice (opsional Phase 2)
- **Edge Functions**: Send reminder emails, generate PDF

### Next.js Structure
```
app/
  (auth)/login, register, forgot-password
  (dashboard)/
    dashboard/
    projects/ [id]/
    clients/ [id]/
    invoices/ [id]/
    expenses/
    time-tracking/
    reports/
    settings/
  api/ (minimal, mostly Supabase direct)
components/
  ui/ (shadcn components)
  features/ (domain-specific components)
lib/
  supabase/ (client, server, middleware)
  utils/
  validations/
  i18n/
```

---

## Design System

### Design Philosophy
**"Luxury Simplicity"** — elegan seperti brand premium (Rolls-Royce, Cartier), bersih seperti Apple, fungsional seperti Linear. Setiap elemen menampilkan kesan mahal dan eksklusif tanpa kerumitan. Terinspirasi Stripe Dashboard, Linear, dan luxury SaaS modern.

### Tema: **Light Luxury (Default)**

### Color Palette — Light Luxury (Primary)
- **Background**: `#F9F7F2` — warm off-white, terasa hangat & premium (bukan putih steril)
- **Surface**: `#FFFFFF` — card & panel
- **Surface Elevated**: `#FFFDF8` — modal, dropdown (sedikit warm tint)
- **Surface Subtle**: `#F3F0E8` — section backgrounds, alternating rows
- **Border**: `#E8E2D4` — warm beige border
- **Border Accent**: `#C9A84C` — emas untuk focus/highlight

- **Gold Primary**: `#B8962E` — emas deep untuk kontras di background terang
- **Gold Hover**: `#C9A84C` — emas lebih terang saat hover
- **Gold Light**: `#F0E6C4` — emas sangat muted untuk background badge/tag
- **Gold Dark**: `#8A6E1A` — emas gelap untuk teks di background emas

- **Text Primary**: `#1C1814` — warm near-black
- **Text Secondary**: `#6B6355` — warm grey-brown
- **Text Muted**: `#A89E8C` — warm muted

- **Success**: `#1E8A4C` | **Warning**: `#C07A0A` | **Danger**: `#C0392B`

### Color Palette — Dark Luxury (Toggle Opsional)
- **Background**: `#0F0E0C` — warm near-black
- **Surface**: `#1A1916`
- **Gold Primary**: `#C9A84C`
- **Text Primary**: `#F0EEE8`
- **Border**: `#2E2C28`

### Typography
- **Heading Font**: `Playfair Display` (Google Fonts) — serif elegan untuk heading H1-H3
- **Body Font**: `Inter` (Google Fonts) — sans-serif bersih untuk body teks
- **Mono Font**: `JetBrains Mono` — untuk angka invoice, kode
- **Scale**: 11px / 13px / 14px / 16px / 20px / 28px / 36px / 48px
- **Weight**: Regular (400), Medium (500), Semibold (600), Bold (700)
- **Letter-spacing**: Sedikit lebih lebar di heading (`tracking-wide`) untuk kesan premium

### Visual Effects & Details
- **Glassmorphism** pada modal dan sidebar: `backdrop-blur-xl bg-white/5 border border-white/10`
- **Subtle gradient** pada card header: `from-[#1A1A24] to-[#111118]`
- **Gold gradient accent** untuk elemen highlight: `from-[#C9A84C] to-[#E8C97A]`
- **Glow effect** pada primary button: `shadow-[0_0_20px_rgba(201,168,76,0.3)]`
- **Smooth transitions**: `transition-all duration-300 ease-in-out`
- **Border glow** saat hover/focus: `ring-1 ring-gold/50`

### Component Patterns
- **Cards**: `rounded-2xl`, border warm beige, subtle box-shadow (`shadow-sm`), hover: `shadow-md` + subtle lift
- **Primary Button**: background emas gradient (`from-[#B8962E] to-[#C9A84C]`), teks warm-white atau dark, smooth glow saat hover
- **Ghost Button**: border emas tipis, teks emas, background emas transparan saat hover
- **Tables**: header `Surface Subtle`, row alternating subtle warm, hover row dengan gold tint ringan
- **Forms**: floating labels dengan animasi naik, border emas saat focus, warm background input
- **Status Badges**: pill shape, background `Gold Light`, teks `Gold Dark`
- **Sidebar**: background `Surface Subtle` (`#F3F0E8`), item aktif: background putih + border kiri emas 3px
- **Empty States**: ikon outline emas tipis + teks elegan + CTA button
- **Charts/Graphs**: warna emas sebagai primary series, warm grey untuk secondary, background putih bersih
- **Loading States**: skeleton shimmer dengan warm gold gradient
- Default mode: **Light Luxury**, dengan toggle ke Dark mode di settings

### Animasi & Micro-interactions

**WAJIB — Smooth Animations:**
- **Button click**: `scale(0.97)` saat mousedown + `scale(1)` saat release — `transition: transform 150ms ease`
- **Button hover**: slight lift + shadow intensify — `transform: translateY(-1px); transition: 200ms ease`
- **Card hover**: `translateY(-2px)` + shadow upgrade — `transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1)`
- **Page transition**: fade-in + slight slide-up (`translateY(8px) → translateY(0)`) — `duration: 300ms`
- **Sidebar item hover**: background fill dari kiri ke kanan (slide) — `duration: 200ms`
- **Modal open**: scale dari `0.95 → 1.0` + fade-in — `duration: 250ms`
- **Form focus**: border color transition + label float — `duration: 200ms ease`
- **Status badge change**: color crossfade — `duration: 300ms`
- **Number counter**: angka di dashboard card animate count-up saat pertama load
- **Toast notification**: slide-in dari kanan + auto-dismiss slide-out — `duration: 350ms`
- **Dropdown/Select**: fade + scale dari `0.95 → 1` dengan origin-top — `duration: 180ms`
- **Loading skeleton**: shimmer gradient sweep dari kiri ke kanan — `duration: 1.5s infinite`
- **Chart bars/lines**: animate masuk dari bawah/kiri saat pertama render
- **Accordion/Collapsible**: height animate smooth (tidak jump)

**Library**: Framer Motion untuk page transitions & complex animations; CSS transitions untuk micro-interactions sederhana.

---

## Indonesian Market Specifics

### Pembayaran Lokal
- Tampilkan instruksi transfer bank (BCA, BNI, BRI, Mandiri)
- Field nomor rekening pada profil user
- Invoice template dengan kolom "Rekening Tujuan"
- Catatan: Freelance Hub tidak memproses pembayaran, hanya tracking

### Pajak Indonesia
- PPh 21: 5-35% (karyawan/penerima penghasilan)
- PPh 23: 2% (jasa dari badan/perusahaan)
- PPh Final UMKM: 0.5% dari omset (jika omset < 4.8M/tahun)
- Tax Estimator akan menyediakan kalkulasi estimasi sederhana untuk ini

### Format Lokal
- Mata uang: `Rp 1.500.000` (bukan `IDR 1,500,000`)
- Tanggal: `1 April 2026` (format Indonesia)
- Angka: titik sebagai pemisah ribuan (bukan koma)

---

## Internationalization (i18n)

- Default bahasa: Bahasa Indonesia
- Bahasa kedua: English
- User pilih bahasa di Settings
- Semua string di `messages/id.json` dan `messages/en.json`
- Date, number, currency formatting mengikuti locale
- Menggunakan **next-intl** library

---

## Success Metrics (MVP)

| Metrik | Target 3 Bulan |
|--------|---|
| Registered users | 500+ |
| Active users (weekly) | 100+ |
| Projects created | 300+ |
| Invoices generated | 200+ |
| GitHub stars | 50+ |
| User satisfaction (survey) | >4/5 |

---

## Out of Scope (v1)

- Payment processing / escrow (hanya tracking)
- Mobile native app (hanya web responsive)
- Team collaboration / multi-user workspace
- AI writing assistant (proposal/contract generation)
- White-labeling
- API publik
- Integrasi pihak ketiga (Zapier, QuickBooks)

---

## Files to Create

1. `PRD.md` — dokumen utama PRD (di root proyek)
2. Tidak ada file lain yang dibuat di sesi ini (hanya planning)

## Verification

Setelah PRD.md selesai ditulis, verifikasi dengan:
1. Review semua 14 section ada dan terisi
2. Pastikan competitive analysis mencerminkan research yang telah dilakukan
3. Pastikan database schema konsisten dengan semua fitur yang direncanakan
4. Pastikan design system decisions konsisten
5. User review dan konfirmasi PRD sebelum mulai coding
