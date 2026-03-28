PRD: Modernisasi Ekosistem Web SMKN 1 Rongga
Status: Draft | Author: Agung | Target Launch: Juni 2026

1. Ringkasan Proyek
Proyek ini bertujuan untuk mengganti website sekolah berbasis WordPress yang lambat dan berat menjadi arsitektur modern yang Decoupled (terpisah antara tampilan dan data). Fokus utama adalah kecepatan akses maksimal, keamanan tinggi, dan biaya operasional rendah (Zero Budget).
Tujuan Utama:
Performance: Skor Google PageSpeed 90+ (Loading < 1 detik).
Security: Menghilangkan risiko SQL Injection dengan menghapus database publik untuk web profil.
Ease of Use: Guru dapat mempublikasikan artikel menggunakan akun Google.
Scalability: Siap menampung trafik tinggi (PPDB) tanpa server down.

2. Arsitektur Sistem (Decoupled Approach)
Website akan dibagi menjadi dua bagian besar untuk menjaga stabilitas:
Main Web (Profil): Menggunakan Astro (Static Site Generation) di-host di Vercel.
Apps (Subdomain): Aplikasi Absensi (asik) dan Exam (exam) tetap berjalan di hosting saat ini, dan akan dimigrasi ke VPS (Docker) pada bulan Juni.

3. Fitur Utama (Requirements)
Fitur
Deskripsi
News Engine
Sistem berita berbasis file Markdown (.md) yang diolah oleh Astro.
Teacher Dashboard
Antarmuka admin web (Decap CMS) untuk input konten tanpa akses koding.
Google Auth
Login admin/guru menggunakan akun Google Workspace/Personal.
Automatic Image Opt
Konversi otomatis semua unggahan gambar ke format WebP.
Version Control
Semua perubahan konten tercatat sebagai riwayat commit di GitHub.
Legacy Integration
Integrasi menu navigasi ke subdomain aplikasi yang sudah ada.


4. Stack Teknologi
Frontend Framework: Astro (SSG Mode).
Content Management: Decap CMS (Git-based CMS).
Storage (Database): GitHub Repository (File-based).
Authentication: OAuth 2.0 via Google Identity Services.
Hosting & Deployment: Vercel (Hobby Plan).
Future Infrastructure: VPS (Oracle Cloud/Coolify) & Docker.

5. Struktur Folder Proyek (Technical Spec)
Plaintext
/
├── public/
│   ├── admin/           # Folder Konfigurasi Decap CMS
│   │   ├── index.html   # Entry point Admin UI
│   │   └── config.yml   # Pengaturan form input (Title, Date, Image, Body)
│   └── uploads/         # Direktori pusat media/gambar sekolah
├── src/
│   ├── content/         # "Database" Berita & Pengumuman (.md files)
│   │   └── berita/
│   │   └── config.ts    # Schema validation untuk keamanan data
│   ├── layouts/         # Template dasar (Header, Footer, Navbar)
│   └── pages/           # Halaman statis & Dynamic Routing untuk berita
└── astro.config.mjs     # Konfigurasi Build & Deployment


6. Alur Kerja Konten (Workflow)
Login: Guru akses /admin -> Login via Google.
Writing: Guru menulis artikel dan upload gambar di Dashboard.
Saving: Klik "Publish" -> Decap CMS melakukan Push file .md ke GitHub.
Building: Vercel mendeteksi perubahan -> Melakukan Build ulang (otomatis).
Live: Artikel terbit di website utama dalam waktu < 1 menit.

7. Rencana Migrasi & DNS
Root Domain (smkn1rongga.sch.id): Diarahkan ke Vercel via CNAME/A Record.
Subdomain (asik, exam): TETAP diarahkan ke IP Hosting lama (sampai migrasi VPS Juni).
Data Migration: Ekspor XML WordPress -> Konversi ke Markdown menggunakan script bantuan AI.

8. Catatan Keamanan
Tidak ada akses tulis (Write Access) langsung ke server aplikasi dari web profil.
Izin akses Dashboard Admin dibatasi hanya untuk domain email guru yang terdaftar.
Semua aset media di-host di CDN (Vercel) untuk mencegah beban berlebih pada VPS nantinya.

