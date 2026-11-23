# Dokumentasi Implementasi Desain & Kode Teras JTI
**Mata Kuliah:** Workshop Desain Aplikasi (TIF110809)  
**Kelompok:** 4 (NoBugNoCry) &middot; Golongan C  

Dokumen ini merangkum implementasi teknis kode HTML, CSS, JavaScript, dan Bootstrap pada website profile hybrid Teras JTI.

---

## 1. Struktur Semantik HTML5

Seluruh halaman web mematuhi kaidah semantik baku:
- `<header>`: Memuat navigasi utama publik (dengan toggler collapse Bootstrap pada layar ponsel) serta topbar internal area reservasi.
- `<nav>`: Navigasi link lintas halaman dan navigasi breadcrumb hirarkis.
- `<main>`: Konten utama setiap halaman yang memisahkan area kerja dengan header/footer.
- `<section>`: Pengelompokan bagian tematik (Hero, Tentang, Fasilitas, Galeri, Jam & Aturan, FAQ, Kontak).
- `<article>`: Komponen mandiri yang dapat diulang, seperti kartu ruangan pada katalog dan kartu riwayat pemesanan.
- `<aside>`: Kolom samping untuk formulir pemesanan cepat pada halaman detail dan branding panel pada halaman login.
- `<footer>`: Informasi hak cipta, nama tim pengembang Polije, dan tautan sekunder.

---

## 2. Struktur Modular CSS3

Direktori CSS dikelompokkan secara bersih tanpa tumpang tindih:
- `assets/css/base.css`: Reset CSS, deklarasi font lokal (@font-face Poppins & Montserrat), dan definisi design token (`:root`).
- `assets/css/layout.css`: Pengaturan layout global topbar, main container max-width 960px, footer, dan tata letak split-screen.
- `assets/css/components/`:
  - `button.css`: Styling tombol primer, sekunder, outline, dan status disabled.
  - `card.css`: Kartu konten umum, chip list filter, dan profil card.
  - `form.css`: Input teks, select box, radio button, dan checkbox yang ramah sentuhan.
  - `status.css`: Badge status label (`.label-gratis`, `.label-dp`) dan kotak banner informasi.
  - `table.css`: Pengaturan tabel data yang memiliki caption dan thead terstruktur.
  - `profile.css`: Khusus komponen landing page profil (Hero fluid, stats grid, tim pengembang, dan kontak).
  - `detail-tempat.css`: Khusus tata letak grid 2 kolom halaman detail ruangan dan kalender.

---

## 3. Logika JavaScript & Interaktivitas

Logika antarmuka diatur dalam dua berkas modular:
1. `assets/js/components/navbar.js`:
   - Menangani *smooth scroll* ketika mengklik menu tautan jangkar (`#fasilitas`, `#jadwal`, dll).
   - Menutup menu collapse Bootstrap secara otomatis setelah tautan di ponsel diklik.
   - Sinkronisasi status tautan aktif (`.active`) pada navigasi topbar internal.
2. `assets/js/main.js`:
   - Mengelola inisialisasi dan sinkronisasi data dummy sesi pengguna di `localStorage`.
   - Menangani alur formulir login, registrasi, dan logout.
   - Filter pencarian instan pada katalog ruangan (`dashboard.html`).
   - Pemilihan tanggal kalender interaktif dan pembuatan tiket reservasi baru.
   - Countdown timer 24 jam interaktif pada halaman pembayaran DP.
   - Penampilan dan pembatalan daftar riwayat reservasi melalui Bootstrap Modal.
