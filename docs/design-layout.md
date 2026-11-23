# Dokumentasi Layout & Responsivitas Teras JTI
**Mata Kuliah:** Workshop Desain Aplikasi (TIF110809)  
**Kelompok:** 4 (NoBugNoCry) &middot; Golongan C  

Dokumen ini menjelaskan sistem tata letak (layout grid) dan strategi responsivitas multi-device pada website Teras JTI.

---

## 1. Sistem Kontainer & Grid

1. **Kontainer Utama (Max-Width 960px):**
   - Halaman katalog, riwayat, profil, dan formulir menggunakan kontainer dengan batas lebar maksimal 960px (`var(--lebar)`) di tengah layar (`margin: 0 auto`).
   - Lebar ini dipilih untuk menjaga panjang baris teks (reading length) tetap optimal antara 60-80 karakter per baris demi kenyamanan membaca.
2. **Kontainer Detail (Max-Width 1020px):**
   - Halaman `detail-tempat.html` menggunakan kontainer yang sedikit lebih luas (1020px) untuk mengakomodasi tata letak dua kolom:
     - Kolom Kiri (1.55fr): Showcase foto, spesifikasi ruangan, dan kalender ketersediaan.
     - Kolom Kanan (1fr): Panel formulir reservasi cepat yang menempel saat di-scroll (`position: sticky; top: 80px`).
3. **Split-Screen Layout (Login & Registrasi):**
   - Menggunakan CSS Grid 2 Kolom (`1fr 1fr`):
     - Kolom Kiri: Panel branding warna biru `#1d4ed8` dengan logo Teras JTI dan deskripsi lembaga.
     - Kolom Kanan: Panel form input putih yang berpusat vertikal.

---

## 2. Breakpoints & Responsivitas Mobile-First

Sistem tata letak diuji pada empat ukuran layar acuan:
- **Mobile Small (375px - 480px):**
  - Grid kalender mengecil proporsional.
  - Navbar desktop berganti menjadi ikon hamburger dengan menu dropdown collapse Bootstrap.
  - Form split screen bertransformasi menjadi susunan vertikal 1 kolom tunggal (kolom branding berada di atas panel form).
- **Tablet (768px - 820px):**
  - Grid 2 kolom pada halaman detail dan halaman kontak beralih ke susunan bertumpuk (1 kolom) agar form tidak terhimpit.
  - Stats bar hero berganti dari 4 kolom menjadi 2 kolom x 2 baris.
- **Desktop (1024px - 1440px):**
  - Tata letak dua kolom penuh dengan gutter dinamis yang dihitung otomatis berdasarkan sisa lebar layar.
