# Arsitektur Informasi & Sitemap Hybrid Teras JTI
**Mata Kuliah:** Workshop Desain Aplikasi (TIF110809)  
**Kelompok:** 4 (NoBugNoCry) &middot; Golongan C  
**Program Studi:** D4 Teknik Informatika, Jurusan Teknologi Informasi, Politeknik Negeri Jember  

---

## 1. Konsep Desain Hybrid

Website Teras JTI mengusung arsitektur **Hybrid Web Profile & Reservation System**:
1. **Lapisan Profil Publik (Core Identity):**
   - Berfungsi sebagai representasi resmi fasilitas *co-working space* Jurusan Teknologi Informasi Polije.
   - Dapat diakses langsung oleh masyarakat umum, mahasiswa, dan dosen tanpa kewajiban login.
   - Memuat informasi visi, masalah yang diselesaikan, fasilitas unggulan, galeri dokumentasi kegiatan, jadwal operasional, FAQ, serta kanal kontak dan lokasi.
2. **Lapisan Layanan Reservasi (Supporting Service):**
   - Layanan interaktif peminjaman ruangan mandiri berbasis *client-side simulation* (tanpa backend server).
   - Menyediakan katalog tempat, pengecekan ketersediaan slot tanggal & jam, formulir booking, simulasi pembayaran uang muka (DP) via QRIS, dan panel pemantauan riwayat pemesanan.

---

## 2. Peta Situs (Sitemap)

```
[ PENGUNJUNG UMUM & MAHASISWA ]
               |
               v
       +-------------------------------+
       |    LANDING PAGE PROFIL        |
       |       (index.html)            |
       +---------------+---------------+
                       |
       +---------------+-----------------------+-----------------------+
       |               |                       |                       |
       v               v                       v                       v
[ Section Hero ] [ Section Tentang ]   [ Section Fasilitas ]   [ Section Kontak ]
- Slogan & CTA   - Profil Singkat      - Ruang Diskusi         - Gedung JTI Polije
- Quick Stats    - Tim NoBugNoCry      - Aula Mini (DP)        - WhatsApp / Email
                 - Latar Belakang      - Hot Desk & Cafe       - Denah Petunjuk
                                               |
                                               v
                                   [ CTA "Pesan Tempat" ]
                                               |
                                               v
                                   +-----------------------+
                                   |      GERBANG MASUK    |
                                   |      (login.html)     |
                                   +-----------+-----------+
                                               |
                       +-----------------------+-----------------------+
                       |                                               |
                       v                                               v
       +-------------------------------+               +-------------------------------+
       |       KATALOG RESERVASI       |               |         DAFTAR AKUN           |
       |       (dashboard.html)        |               |      (registrasi.html)        |
       +---------------+---------------+               +-------------------------------+
                       |
       +---------------+---------------+
       |                               |
       v                               v
[ Detail Tempat ]             [ Riwayat Pemesanan ]
(detail-tempat.html)           (riwayat.html)
- Kalender Slot                - Status Terkonfirmasi
- Form Booking                 - Status Menunggu DP
       |                       - Tombol Pembatalan
       v                               |
+--------------+                       v
| Pembayaran DP| ------------> [ Tiket Hasil Booking ]
(pembayaran.html)              (hasil-reservasi.html)
- QRIS Simulation              - Kode TRX & Detail
- Countdown Timer
```

---

## 3. Rincian URL & Struktur Halaman

| File Halaman | Peran & Aksesibilitas | Deskripsi & Komponen Kunci |
| :--- | :--- | :--- |
| `index.html` | **Publik (Utama)** | Landing page profil lengkap, Hero section, showcase fasilitas, Bootstrap Carousel galeri, Accordion FAQ, jadwal operasional, dan kontak lokasi. |
| `about/tentang.html` | **Publik (Pendukung)** | Latar belakang lengkap proyek, identifikasi masalah, dan profil 5 anggota Kelompok 4 (NoBugNoCry). |
| `login.html` | **Publik / Gerbang Masuk** | Tampilan split-screen login mahasiswa dengan autentikasi simulasi front-end. |
| `registrasi.html` | **Publik / Registrasi** | Formulir pendaftaran akun mahasiswa baru dengan integrasi nama dan NIM ke storage browser. |
| `dashboard.html` | **Layanan Reservasi** | Katalog kartu ruangan dengan filter realtime ("Semua", "Gratis", "Berbayar") dan pencarian teks. |
| `detail-tempat.html` | **Layanan Reservasi** | Layout 2 kolom: detail fasilitas + kalender interaktif di kiri, formulir pemesanan langsung di kanan. |
| `ketersediaan.html` | **Layanan Reservasi** | Tabel matriks ketersediaan slot jam harian per tanggal tertentu. |
| `reservasi.html` | **Layanan Reservasi** | Formulir konfirmasi detail peminjaman sebelum penerbitan tiket. |
| `pembayaran.html` | **Layanan Reservasi** | Rincian DP Rp 50.000, simulasi scan barcode QRIS, dan timer countdown 24 jam. |
| `hasil-reservasi.html` | **Layanan Reservasi** | Tiket digital bukti reservasi berhasil dilengkapi kode unik TRX dan opsi cetak. |
| `riwayat.html` | **Layanan Reservasi** | Dashboard riwayat pengguna, filter status pemesanan, dan modal pembatalan jadwal. |
| `profil.html` | **Layanan Reservasi** | Panel pengaturan akun mahasiswa, informasi identitas, dan tombol logout simulasi. |
