# Flowchart & Logika Interaksi Sistem Teras JTI
**Mata Kuliah:** Workshop Desain Aplikasi (TIF110809)  
**Kelompok:** 4 (NoBugNoCry) &middot; Golongan C  

Dokumen ini memetakan alur interaksi pengguna (User Flow) dan logika simulasi front-end pada website hybrid Teras JTI, sebagai acuan penyusunan **Bab 4.1 (Flowchart Sistem)** pada Laporan Akhir.

---

## 1. Flowchart Utama Pengguna (User Flow)

```
[ Mulai: Pengguna Mengakses Website ]
                  |
                  v
       +--------------------+
       |  Halaman Profil    | <------------------------------------+
       |   (index.html)     |                                      |
       +---------+----------+                                      |
                 |                                                 |
         [ Eksplorasi ]                                            |
                 |                                                 |
       +---------v----------+                                      |
       | Klik CTA Reservasi |                                      |
       +---------+----------+                                      |
                 |                                                 |
                 v                                                 |
       / Apakah Sesi Aktif? \                                      |
      [   (Simulasi Login)   ]                                     |
       \                    /                                      |
        -- Belum --   -- Sudah --                                  |
            |             |                                        |
            v             |                                        |
     +--------------+     |                                        |
     |  login.html  |     |                                        |
     | / registrasi |     |                                        |
     +------+-------+     |                                        |
            |             |                                        |
            v             v                                        |
     +------------------------------+                              |
     |   Katalog Pilihan Ruangan    |                              |
     |       (dashboard.html)       |                              |
     +--------------+---------------+                              |
                    |                                              |
            [ Pilih Ruangan ]                                      |
                    |                                              |
                    v                                              |
     +------------------------------+                              |
     |     Detail Tempat & Slot     |                              |
     |     (detail-tempat.html)     |                              |
     +--------------+---------------+                              |
                    |                                              |
        / Kategori Ruangan Apa? \                                  |
       [   Gratis vs Berbayar    ]                                 |
        \                       /                                  |
         -- Gratis --    -- Berbayar (Aula Mini) --                |
              |                        |                           |
              v                        v                           |
     +-----------------+      +-----------------+                  |
     | Kirim Formulir  |      | Halaman Bayar DP|                  |
     |  (reservasi)    |      | (pembayaran.html)                  |
     +--------+--------+      +--------+--------+                  |
              |                        |                           |
              |               [ Upload Bukti DP ]                  |
              |                        |                           |
              +------------+-----------+                           |
                           |                                       |
                           v                                       |
            +------------------------------+                       |
            |    Tiket Hasil Reservasi     |                       |
            |    (hasil-reservasi.html)    |                       |
            +--------------+---------------+                       |
                           |                                       |
                           v                                       |
            +------------------------------+                       |
            |      Riwayat Reservasi       |                       |
            |        (riwayat.html)        | ----------------------+
            +--------------+---------------+
                           |
                   [ Batal / Cetak ]
                           |
                           v
                       [ Selesai ]
```

---

## 2. Diagram State Transisi Reservasi

Setiap pemesanan yang dilakukan pengguna memiliki siklus status sebagai berikut:

```
[ DRAFT PEMESANAN ]
         |
         +-----------------------+
         |                       |
(Ruang Gratis)         (Aula Mini Berbayar)
         |                       |
         v                       v
[ TERKONFIRMASI ]      [ MENUNGGU PEMBAYARAN ]
(Langsung Terjadwal)             |
         |              +--------+--------+
         |              |                 |
         |         (Unggah DP)     (Timeout 24 Jam)
         |              |                 |
         |              v                 v
         +-------> [ TERKONFIRMASI ]   [ BATAL OTOMATIS ]
         |              |
 (Waktu Selesai)  (Opsi User)
         |              |
         v              v
    [ SELESAI ]   [ DIBATALKAN ]
```

---

## 3. Logika Simulasi JavaScript Client-Side

1. **State Persistence (`localStorage`):**
   - Kunci `teras_jti_user`: Menyimpan data sesi login mahasiswa aktif (Nama, NIM, Email, Status Login).
   - Kunci `teras_jti_reservations`: Menyimpan array riwayat pemesanan ruangan. Data baru ditambahkan di indeks paling awal (`unshift`).
2. **Pengecekan Filter Realtime:**
   - Filter chip kategori ("Semua", "Gratis", "Berbayar") memanfaatkan atribut data HTML5 `data-kategori` pada elemen `<article>`, dikombinasikan dengan pencocokan string teks pencarian secara live tanpa reload halaman.
3. **Kalender Interaktif:**
   - Elemen tombol `.kalender-date` merespons event `click`, memperbarui status visual `.is-selected`, dan otomatis mengisi nilai input tanggal pada formulir reservasi di kolom pendamping.
4. **Countdown Timer:**
   - Menggunakan `setInterval` per 1000 milidetik yang menghitung mundur dari nilai default (23 jam, 59 menit, 41 detik) untuk memberikan efek urgensi simulasi transaksi DP.
