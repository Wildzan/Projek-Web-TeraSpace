/**
 * Logika Utama & Simulasi Interaktif Frontend
 * Teras JTI - Kelompok 4 (NoBugNoCry)
 * Mendukung simulasi login, manajemen reservasi dummy, dan filter realtime.
 */

// shortcut: data tersimpan di browser localStorage, ketika ada backend ganti ke API fetch
const STORAGE_USER_KEY = "teras_jti_user";
const STORAGE_RES_KEY = "teras_jti_reservations";

// Inisialisasi Data Dummy Bawaan jika belum ada
function initDefaultData() {
  if (!localStorage.getItem(STORAGE_USER_KEY)) {
    const defaultUser = {
      nama: "Farrel Ananta Firmansyah",
      nim: "E41240001",
      email: "farrel@student.polije.ac.id",
      isLoggedIn: true,
    };
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(defaultUser));
  }

  if (!localStorage.getItem(STORAGE_RES_KEY)) {
    const defaultReservations = [
      {
        id: "TRX-20261123-01",
        tempat: "Ruang Diskusi",
        tanggal: "Senin, 23 Nov 2026",
        jam: "10:00 - 12:00 WIB",
        orang: "4 Orang",
        keperluan: "Pengerjaan Project Workshop Desain Aplikasi Kelompok 4",
        status: "terkonfirmasi",
        biaya: "GRATIS",
      },
      {
        id: "TRX-20261125-02",
        tempat: "Aula Mini",
        tanggal: "Rabu, 25 Nov 2026",
        jam: "13:00 - 16:00 WIB",
        orang: "12 Orang",
        keperluan: "Sharing Session Persiapan Evaluasi Akhir Semester",
        status: "menunggu",
        biaya: "DP Rp 50.000",
      },
      {
        id: "TRX-20261120-03",
        tempat: "Ruang Diskusi",
        tanggal: "Jumat, 20 Nov 2026",
        jam: "08:00 - 10:00 WIB",
        orang: "5 Orang",
        keperluan: "Bimbingan Prototype Figma Bersama Dosen",
        status: "selesai",
        biaya: "GRATIS",
      },
    ];
    localStorage.setItem(STORAGE_RES_KEY, JSON.stringify(defaultReservations));
  }
}

// Sinkronisasi info pengguna di Topbar & Profil
function syncUserUI() {
  const user = JSON.parse(localStorage.getItem(STORAGE_USER_KEY));
  if (!user) return;

  // Inisial avatar (2 huruf)
  const initials = user.nama
    ? user.nama
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "NP";

  const avatarElems = document.querySelectorAll(
    "#topbar-avatar, .user-avatar, #profil-big-avatar"
  );
  avatarElems.forEach((el) => {
    el.textContent = initials;
  });

  const nameElems = document.querySelectorAll(
    "#topbar-username, .user-name, #profil-display-name"
  );
  nameElems.forEach((el) => {
    el.textContent = user.nama || "Pengguna Teras JTI";
  });

  const emailElem = document.getElementById("profil-display-email");
  if (emailElem && user.email) {
    emailElem.textContent = user.email;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initDefaultData();
  syncUserUI();

  // 1. Logika Login (login.html)
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const sandi = document.getElementById("sandi").value.trim();
      const alertBox = document.getElementById("login-alert");

      if (!email || !sandi) {
        if (alertBox) alertBox.classList.remove("d-none");
        return;
      }

      // Ambil nama dari bagian depan email
      const generatedName = email.split("@")[0].replace(/[._]/g, " ");
      const capitalized = generatedName
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      const user = {
        nama: capitalized || "Mahasiswa Polije",
        email: email,
        nim: "E41240001",
        isLoggedIn: true,
      };
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      window.location.href = "dashboard.html";
    });
  }

  // 2. Logika Registrasi (registrasi.html)
  const formReg = document.getElementById("form-registrasi");
  if (formReg) {
    formReg.addEventListener("submit", (e) => {
      e.preventDefault();
      const nama = document.getElementById("nama").value.trim();
      const nim = document.getElementById("nim").value.trim();
      const email = document.getElementById("email").value.trim();

      const newUser = {
        nama: nama,
        nim: nim,
        email: email,
        isLoggedIn: true,
      };
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser));
      alert("Akun berhasil didaftarkan! Selamat datang di Teras JTI.");
      window.location.href = "dashboard.html";
    });
  }

  // 3. Logika Logout (profil.html)
  const btnLogout = document.getElementById("btn-logout-user");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem(STORAGE_USER_KEY)) || {};
      user.isLoggedIn = false;
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      alert("Anda telah berhasil keluar dari akun.");
      window.location.href = "index.html";
    });
  }

  // 4. Filter & Pencarian Tempat di Dashboard (dashboard.html)
  const filterKategori = document.getElementById("filter-kategori");
  const cariInput = document.getElementById("cari");
  const articlesTempat = document.querySelectorAll("article[data-kategori]");

  if (filterKategori && articlesTempat.length > 0) {
    const chips = filterKategori.querySelectorAll(".chip-item");

    function applyFilter(kategori, query) {
      articlesTempat.forEach((art) => {
        const itemKat = art.getAttribute("data-kategori");
        const itemText = art.textContent.toLowerCase();

        const matchKat =
          kategori === "semua" ||
          (kategori === "gratis" && itemKat === "gratis") ||
          (kategori === "berbayar" && itemKat === "berbayar");

        const matchQuery = !query || itemText.includes(query);

        if (matchKat && matchQuery) {
          art.style.display = "";
        } else {
          art.style.display = "none";
        }
      });
    }

    chips.forEach((chip) => {
      chip.addEventListener("click", (e) => {
        e.preventDefault();
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const filterVal = chip.getAttribute("data-filter");
        const queryVal = cariInput ? cariInput.value.toLowerCase().trim() : "";
        applyFilter(filterVal, queryVal);
      });
    });

    if (cariInput) {
      cariInput.addEventListener("input", () => {
        const activeChip = filterKategori.querySelector(".chip-item.active");
        const filterVal = activeChip
          ? activeChip.getAttribute("data-filter")
          : "semua";
        applyFilter(filterVal, cariInput.value.toLowerCase().trim());
      });
    }
  }

  // 5. Kalender Interaktif & Form Reservasi (detail-tempat.html)
  const kalenderButtons = document.querySelectorAll(
    ".kalender-date:not(.is-empty)"
  );
  const inputTanggal = document.getElementById("tanggal");
  const formReservasi = document.getElementById("form-reservasi-detail");

  if (kalenderButtons.length > 0 && inputTanggal) {
    kalenderButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        kalenderButtons.forEach((b) => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");

        const tanggalTeks =
          btn.getAttribute("data-tanggal") ||
          `November 2026 (Tgl ${btn.textContent.trim()})`;
        inputTanggal.value = tanggalTeks;
      });
    });
  }

  if (formReservasi) {
    formReservasi.addEventListener("submit", (e) => {
      e.preventDefault();
      const tempat = document.getElementById("tempat").value;
      const tanggal = document.getElementById("tanggal").value;
      const jamMulai = document.getElementById("jam-mulai").value;
      const jamSelesai = document.getElementById("jam-selesai").value;
      const orang = document.getElementById("jumlah-orang").value;
      const keperluan = document.getElementById("keperluan").value;

      const newBooking = {
        id: `TRX-${Date.now().toString().slice(-8)}`,
        tempat: tempat,
        tanggal: tanggal,
        jam: `${jamMulai} - ${jamSelesai} WIB`,
        orang: orang,
        keperluan: keperluan,
        status: "terkonfirmasi",
        biaya: "GRATIS",
      };

      const existingRes =
        JSON.parse(localStorage.getItem(STORAGE_RES_KEY)) || [];
      existingRes.unshift(newBooking);
      localStorage.setItem(STORAGE_RES_KEY, JSON.stringify(existingRes));

      // Simpan booking terakhir untuk ditampilkan di halaman hasil
      sessionStorage.setItem("latest_booking", JSON.stringify(newBooking));
      window.location.href = "hasil-reservasi.html";
    });
  }

  // 6. Data Dinamis di Hasil Reservasi (hasil-reservasi.html)
  const resTempat = document.getElementById("res-tempat");
  if (resTempat) {
    const latest = JSON.parse(sessionStorage.getItem("latest_booking"));
    const user = JSON.parse(localStorage.getItem(STORAGE_USER_KEY));

    if (latest) {
      resTempat.textContent = latest.tempat;
      const resKode = document.getElementById("res-kode");
      if (resKode) resKode.textContent = latest.id;
      const resJadwal = document.getElementById("res-jadwal");
      if (resJadwal)
        resJadwal.textContent = `${latest.tanggal} · ${latest.jam}`;
      const resOrang = document.getElementById("res-orang");
      if (resOrang) resOrang.textContent = latest.orang;
    }
    if (user) {
      const resPemesan = document.getElementById("res-pemesan");
      if (resPemesan)
        resPemesan.textContent = `${user.nama} (${user.nim || "Mahasiswa"})`;
    }
  }

  // 7. Render & Pembatalan di Riwayat Reservasi (riwayat.html)
  const containerRiwayat = document.getElementById("daftar-riwayat-container");
  const filterRiwayat = document.getElementById("filter-riwayat");

  if (containerRiwayat) {
    function renderRiwayat(statusFilter = "semua") {
      const list = JSON.parse(localStorage.getItem(STORAGE_RES_KEY)) || [];
      containerRiwayat.innerHTML = "";

      const filtered = list.filter((item) => {
        if (statusFilter === "semua") return true;
        return item.status === statusFilter;
      });

      if (filtered.length === 0) {
        containerRiwayat.innerHTML = `
          <div class="text-center py-5 border rounded-3 bg-light text-muted">
            <p class="fs-5 m-0">&#128203; Tidak ada reservasi untuk kategori ini.</p>
          </div>
        `;
        return;
      }

      filtered.forEach((item) => {
        const isKonfirm = item.status === "terkonfirmasi";
        const isMenunggu = item.status === "menunggu";

        const badgeStatus = isKonfirm
          ? '<span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 rounded-pill small">Terkonfirmasi</span>'
          : isMenunggu
          ? '<span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2 py-1 rounded-pill small">Menunggu Pembayaran DP</span>'
          : '<span class="badge bg-secondary-subtle text-secondary border px-2 py-1 rounded-pill small">Selesai Digunakan</span>';

        const actionButtons = isKonfirm
          ? `
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-outline-danger btn-sm btn-trigger-batal" data-id="${item.id}">
                Batalkan Reservasi
              </button>
              <a href="hasil-reservasi.html" class="btn btn-outline-primary btn-sm">
                Lihat Tiket
              </a>
            </div>`
          : isMenunggu
          ? `
            <a href="pembayaran.html" class="btn btn-warning btn-sm fw-bold">
              Bayar DP Sekarang &rarr;
            </a>`
          : '<span class="badge bg-light text-muted border small">Telah Selesai</span>';

        const card = document.createElement("article");
        card.className = `p-3 border rounded-3 bg-white ${
          !isKonfirm && !isMenunggu ? "opacity-75" : ""
        }`;
        card.innerHTML = `
          <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
            <div>
              ${badgeStatus}
              <span class="badge bg-light text-dark border px-2 py-1 rounded-pill small ms-1">${
                item.biaya
              }</span>
              <h3 class="fs-5 fw-bold m-0 mt-2">${item.tempat}</h3>
              <p class="text-muted small m-0">&#128197; ${
                item.tanggal
              } &middot; &#128337; ${item.jam}</p>
            </div>
            <div class="text-end">
              <span class="text-muted small d-block">Kode Booking</span>
              <strong class="text-primary font-monospace">${item.id}</strong>
            </div>
          </div>
          <div class="p-2 bg-light rounded small text-secondary mb-3">
            <strong>Keperluan:</strong> ${item.keperluan} &middot; ${
          item.orang
        }
          </div>
          <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 pt-2 border-top">
            <span class="small text-muted">Gedung JTI Polije</span>
            ${actionButtons}
          </div>
        `;
        containerRiwayat.appendChild(card);
      });

      // Pasang event listener tombol batal
      document.querySelectorAll(".btn-trigger-batal").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idBatal = btn.getAttribute("data-id");
          targetBatalId = idBatal;
          if (modalBatal) modalBatal.show();
        });
      });
    }

    let targetBatalId = null;
    const modalEl = document.getElementById("modalBatalReservasi");
    const modalBatal =
      modalEl && window.bootstrap
        ? new window.bootstrap.Modal(modalEl)
        : null;

    const btnEksekusiBatal = document.getElementById("btn-eksekusi-batal");
    if (btnEksekusiBatal) {
      btnEksekusiBatal.addEventListener("click", () => {
        if (!targetBatalId) return;
        const list = JSON.parse(localStorage.getItem(STORAGE_RES_KEY)) || [];
        const updated = list.filter((r) => r.id !== targetBatalId);
        localStorage.setItem(STORAGE_RES_KEY, JSON.stringify(updated));
        if (modalBatal) modalBatal.hide();
        renderRiwayat();
        alert("Reservasi telah berhasil dibatalkan.");
      });
    }

    if (filterRiwayat) {
      filterRiwayat.querySelectorAll(".chip-item").forEach((chip) => {
        chip.addEventListener("click", (e) => {
          e.preventDefault();
          filterRiwayat
            .querySelectorAll(".chip-item")
            .forEach((c) => c.classList.remove("active"));
          chip.classList.add("active");
          renderRiwayat(chip.getAttribute("data-status"));
        });
      });
    }

    renderRiwayat();
  }

  // 8. Countdown Timer (pembayaran.html)
  const timerElem = document.getElementById("countdown-timer");
  if (timerElem) {
    let totalSeconds = 23 * 3600 + 59 * 60 + 41;
    const interval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(interval);
        timerElem.textContent = "Waktu Habis";
        return;
      }
      totalSeconds--;
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const minutes = String(
        Math.floor((totalSeconds % 3600) / 60)
      ).padStart(2, "0");
      const seconds = String(totalSeconds % 60).padStart(2, "0");
      timerElem.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
  }
});
