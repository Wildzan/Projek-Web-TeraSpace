# Design Tokens & Standar Visual Teras JTI
**Mata Kuliah:** Workshop Desain Aplikasi (TIF110809)  
**Kelompok:** 4 (NoBugNoCry) &middot; Golongan C  

Dokumen ini mendefinisikan variabel resmi (Design Tokens) yang diterapkan di seluruh stylesheet proyek web Teras JTI, mengacu pada prinsip konsistensi desain dan kepatuhan aksesibilitas kontras WCAG 2.1 Level AA.

---

## 1. Palet Warna Resmi (Color Palette)

Semua warna dideklarasikan pada `:root` di file `assets/css/base.css`:

| Token CSS | Nilai HEX | Peran & Penggunaan | Rasio Kontras pada Teks Putih / Latar |
| :--- | :--- | :--- | :--- |
| `--biru` | `#1d4ed8` | Warna Primer (Brand Identity, Tombol Utama, Link Aksen) | 7.04:1 (Memenuhi WCAG AAA) |
| `--biru-tua` | `#1e40af` | Hover State Tombol Utama & Header Aksen | 9.48:1 (Memenuhi WCAG AAA) |
| `--biru-muda` | `#dbeafe` | Latar Belakang Badge, Avatar, & Container Lembut | Digunakan bersama teks `--biru-tua` (8.2:1) |
| `--hijau` | `#15803d` | Status Sukses & Badge Ruang "GRATIS" | 4.88:1 (Memenuhi WCAG AA) |
| `--hijau-muda` | `#dcfce7` | Background Banner Sukses & Badge Gratis | Digunakan bersama teks `#14532d` |
| `--amber` | `#92400e` | Status Peringatan & Badge "DP Rp 50.000" | 6.53:1 (Memenuhi WCAG AAA) |
| `--amber-muda` | `#fef3c7` | Background Banner Menunggu Pembayaran | Digunakan bersama teks `#92400e` |
| `--merah` | `#b91c1c` | Status Bahaya, Pembatalan, & Pesan Error | 5.86:1 (Memenuhi WCAG AA) |
| `--merah-muda` | `#fee2e2` | Background Banner Error / Kotak Peringatan | Digunakan bersama teks `#b91c1c` |
| `--teks` | `#111827` | Warna Teks Utama (Body Text & Heading) | 16.59:1 pada latar belakang `#f8fafc` |
| `--abu` | `#4b5563` | Warna Teks Sekunder & Keterangan Subtitle | 5.48:1 pada latar belakang putih |
| `--garis` | `#d1d5db` | Border Pemisah Kartu, Tabel, & Input | Pembatas visual elemen struktural |
| `--latar` | `#f8fafc` | Warna Latar Belakang Halaman Default | Mengurangi silau mata pengguna (soft white) |
| `--kartu` | `#ffffff` | Warna Latar Belakang Card & Panel Form | Kontras tinggi terhadap `--latar` |

---

## 2. Tipografi (Typography)

Sistem menggunakan font lokal yang disimpan di `assets/fonts/` untuk memastikan kemandirian aset tanpa dependensi koneksi internet luar:

1. **Heading Font (Judul & Brand):**
   - Keluarga: `"Montserrat", "Poppins", Arial, sans-serif`
   - Weight: `700 (Bold)`
   - Sifat: Modern, kokoh, dan berkarakter ramah mahasiswa.
2. **Body Text Font (Teks Isi & Keterangan):**
   - Keluarga: `"Poppins", Arial, sans-serif`
   - Weight: `400 (Regular)`, `500 (Medium)`, `600 (Semi-Bold)`
   - Line-height: `1.6` (menjamin keterbacaan artikel dan instruksi).

### Skala Ukuran Huruf (Type Scale):
- **Hero Title (`clamp`):** `2rem` s.d. `3rem` (32px - 48px)
- **H1 (Judul Halaman):** `1.5rem` (24px)
- **H2 (Judul Section):** `1.25rem` (20px)
- **H3 (Sub-judul / Judul Kartu):** `1.0625rem` (17px)
- **Body Regular:** `1rem` (16px)
- **Small / Metadata / Caption:** `0.875rem` (14px) dan `0.78rem` (12.5px)

---

## 3. Spacing & Radius

- **Lebar Kontainer Utama (`--lebar`):** `960px` (maksimal `1020px` pada halaman detail).
- **Gutter Responsif (`--gutter`):** `max(16px, calc((100% - var(--lebar)) / 2 + 16px))`.
- **Border Radius Standar (`--radius`):** `8px` (tombol, input form, pill).
- **Border Radius Kartu (`--radius-besar`):** `12px` (kontainer card, section box, modal).
- **Touch Target Minimum:** `44px x 44px` (mematuhi prinsip desain mobile-first dan aksesibilitas ramah jari).

---

## 4. Efek Gerak & Aksesibilitas

- **Transisi Standar:** `150ms` s.d. `250ms` untuk hover state tombol dan kartu.
- **Prefers Reduced Motion:** Diatur di `base.css` dengan mematikan animasi secara otomatis bagi pengguna yang mengaktifkan mode aksesibilitas sistem operasi.
- **Focus Visible:** `:focus-visible { outline: 2px solid var(--biru); outline-offset: 2px; }` memastikan navigasi keyboard terbantu penuh.
