# Catatan Pengembang & Instruksi Sistem Teras JTI
**Mata Kuliah:** Workshop Desain Aplikasi (TIF110809)  
**Kelompok:** 4 (NoBugNoCry) &middot; Golongan C  

Dokumen ini memuat panduan kerja, konvensi teknis, dan catatan arsitektur untuk pengembangan berkelanjutan website Teras JTI.

---

## 1. Konvensi Arsitektur Proyek
- **Model Proyek:** Website Profil Hybrid dengan Layanan Reservasi Interaktif Front-End (Static Simulation).
- **Semantik HTML:** Wajib menggunakan elemen HTML5 semantik (`header`, `nav`, `main`, `section`, `article`, `footer`, `aside`).
- **Styling:**
  - Urutan muat: Bootstrap 5.3 CSS -> `base.css` -> `layout.css` -> `components/*.css`.
  - Jangan menimpa token warna pada `:root` secara acak. Pertahankan konsistensi warna brand `--biru` (#1d4ed8) dan `--amber` (#92400e).
- **JavaScript:**
  - Logika murni Vanilla JavaScript (ES6+).
  - Penyimpanan data dummy memanfaatkan `localStorage` browser agar data pengguna dan pemesanan tidak hilang saat berpindah halaman.
  - Penanda shortcut fungsional: `/* shortcut: <keterangan batasan>, <kapan ditingkatkan> */`.

---

## 2. Status Pengerjaan (Per 23 November 2026)
- [x] **TODO 1: Migrasi Landing Page ke Website Profil Hybrid** (`index.html` sebagai profil publik, `login.html` sebagai gerbang login terpisah).
- [x] **TODO 2: Pemasangan CDN Bootstrap & Penyelarasan Navigasi Konsisten** (Seluruh 11 file HTML tersinkronisasi).
- [x] **TODO 3: Konsolidasi Konten Profil dari Subfolder** (`about/tentang.html` terintegrasi dengan landing page).
- [x] **TODO 4: Pembuatan Komponen Profil Baru di CSS** (`assets/css/components/profile.css`).
- [x] **TODO 5: Integrasi Komponen Fungsional Bootstrap** (Carousel galeri, Accordion FAQ, Modal pembatalan & info, Navbar collapse).
- [x] **TODO 6: Logika JavaScript Navigasi & Sesi Pengguna** (`navbar.js` & `main.js`).
- [x] **TODO 7: Fungsionalitas Interaktif Reservasi, Riwayat & Pembatalan** (`riwayat.html`, `detail-tempat.html`, `dashboard.html`).
- [x] **TODO 8: Pengisian Dokumen Teknis Lengkap di Folder `docs/`** (`sitemap`, `token`, `bootstrap-map`, `flowchart`, `user-testing`, dll).
