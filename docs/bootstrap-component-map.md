# Pemetaan Komponen Bootstrap vs Custom CSS
**Mata Kuliah:** Workshop Desain Aplikasi (TIF110809)  
**Kelompok:** 4 (NoBugNoCry) &middot; Golongan C  

Dokumen ini mendokumentasikan strategi arsitektur CSS di proyek Teras JTI, membedakan secara tegas bagian mana yang memanfaatkan framework **Bootstrap 5.3** dan bagian mana yang murni dibangun dengan **Custom CSS**. Hal ini menjadi landasan materi untuk penulisan **Bab 4.2 (Hasil dan Pembahasan Kode)** dalam Laporan Akhir.

---

## 1. Filosofi & Strategi Integrasi

Sesuai arahan modul praktikum, Bootstrap **bukan digunakan sebagai template instan yang mendominasi seluruh tampilan**, melainkan sebagai **komponen fungsional selektif**.

### Urutan Pemuatan (Load Order) Stylesheet:
```html
<!-- 1. Framework Utama (Reboot & Utilities Dasar) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

<!-- 2. Custom CSS (Spesifisitas Lebih Tinggi, Mempertahankan Brand Identity) -->
<link rel="stylesheet" href="assets/css/base.css" />
<link rel="stylesheet" href="assets/css/layout.css" />
<link rel="stylesheet" href="assets/css/components/button.css" />
<link rel="stylesheet" href="assets/css/components/card.css" />
<link rel="stylesheet" href="assets/css/components/form.css" />
<link rel="stylesheet" href="assets/css/components/status.css" />
<link rel="stylesheet" href="assets/css/components/table.css" />
<link rel="stylesheet" href="assets/css/components/profile.css" />
```

Dengan teknik pemuatan di atas, tipografi kustom (font lokal *Poppins* dan *Montserrat*) serta palet token warna (`--biru`, `--amber`, `--teks`) tetap memegang kendali tanpa dirusak oleh Reboot bawaan Bootstrap.

---

## 2. Tabel Pemetaan Komponen

| Komponen Tampilan | Teknologi Utama | Alasan Pemilihan & Peran | File Lokasi |
| :--- | :--- | :--- | :--- |
| **Navbar Collapse (Mobile Drawer)** | **Bootstrap 5** | Menyediakan transisi toggle hamburger menu yang mulus dan ramah aksesibilitas (`aria-expanded`) tanpa perlu menulis ratusan baris skrip custom. | `index.html` |
| **Topbar Header Internal** | **Custom CSS** | Desain brand bar dengan layout flexbox khusus, avatar initial dinamis, dan ikon SVG lonceng notifikasi. | `assets/css/layout.css` |
| **Hero Section & Stats Bar** | **Custom CSS** | Gradien warna brand JTI, efek transparan backdrop-filter, dan tipografi fluid clamp. | `assets/css/components/profile.css` |
| **Carousel Galeri Suasana** | **Bootstrap 5** | Slider foto fasilitas interaktif dengan kontrol *prev/next*, *indicators*, dan transisi otomatis (`data-bs-ride="carousel"`). | `index.html` |
| **Accordion Tanya Jawab (FAQ)** | **Bootstrap 5** | Interaksi *expand/collapse* yang terstruktur dan hemat ruang vertikal pada landing page profil. | `index.html` |
| **Modal Dialog Pembatalan & Syarat** | **Bootstrap 5** | Pop-up konfirmasi yang terisolasi dengan backdrop redup untuk memastikan pengguna tidak membatalkan reservasi secara tidak sengaja. | `riwayat.html`, `profil.html` |
| **Kartu Fasilitas & Ruangan** | **Custom CSS** | Desain grid kartu modular, badge status kustom, dan penyesuaian rasio aspek foto 16:9. | `assets/css/components/card.css`, `profile.css` |
| **Kalender Tanggal Ketersediaan** | **Custom CSS + JS** | Grid kalender 7 kolom berbasis CSS Grid murni dengan status pill dinamis dan interaksi klik langsung. | `assets/css/detail-tempat.css`, `assets/js/main.js` |
| **Tabel Slot & Rincian DP** | **Hybrid (CSS + BS)** | Menggunakan class utilitas `table table-bordered` Bootstrap yang di-override dengan token warna thead custom (`--biru-muda`). | `ketersediaan.html`, `pembayaran.html` |
| **Split-Screen Login & Register** | **Custom CSS** | Tata letak 2 kolom hero visual dan form panel dengan responsivitas mobile-stacking. | `assets/css/layout.css`, `login.html` |
| **Status Banner (Sukses, DP, Batal)** | **Custom CSS** | Komponen banner bergaris tepi aksen kiri 4px (`.banner-sukses`, `.banner-menunggu`) sesuai identitas visual Teras JTI. | `assets/css/components/status.css` |

---

## 3. Poin Penjelasan untuk Laporan Akhir (Bab 4.2)

1. **HTML5 Semantik:** Struktur halaman memanfaatkan tag bermakna baku (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) sehingga memenuhi standar praktikum dan mudah diindeks peramban.
2. **CSS3 Modular:** Pemisahan file berdasarkan hierarki *Base -> Layout -> Components* memudahkan pemeliharaan kode dan mencegah redundansi selector.
3. **Bootstrap 5:** Berperan sebagai pendukung fungsionalitas UI modern (Carousel, Accordion, Modal, Responsive Collapse) tanpa menghilangkan orisinalitas desain visual kelompok.
4. **JavaScript:** Bertanggung jawab atas logika simulasi front-end (manajemen sesi pengguna, filter pencarian live, sinkronisasi kalender, dan countdown timer).
