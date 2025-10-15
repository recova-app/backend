# Recova Backend API

Selamat datang di **Recova Backend API** 👋
Proyek ini menyediakan layanan backend untuk aplikasi **Recova**, yang dirancang untuk membantu pengguna dalam perjalanan pemulihan dan pembentukan kebiasaan positif.

## 🚀 Fitur Utama

- **Autentikasi Pengguna** - Login aman menggunakan Google OAuth & JWT.
- **Manajemen Profil** - Atur profil (nama panggilan, alasan pemulihan, waktu check-in harian).
- **Check-in Harian** - Catat mood & komitmen setiap hari.
- **Pelacakan Streak** - Hitung streak harian untuk menjaga motivasi.
- **Jurnal Pribadi** - Simpan entri jurnal refleksi perjalanan.
- **Statistik Pengguna** - Lihat streak saat ini, streak terpanjang, dan total check-in.
- **Komunitas** - Posting, komentar, dan interaksi dengan sesama pengguna.
- **Konten Edukasi** - Konten untuk mendukung perjalanan pemulihan.
- **AI Coach** - Pendamping virtual yang memberikan dukungan emosional dan motivasi.
- **Konten Harian** - Motivasi dan tantangan harian untuk menginspirasi pengguna.

## 🛠️ Teknologi yang Digunakan

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **AI**: [Google Gemini](https://ai.google.dev/)
- **Validasi**: [Zod](https://zod.dev/)
- **Autentikasi**: [JWT](https://www.jwt.io/) & [Google OAuth](https://developers.google.com/identity/protocols/oauth2?hl=id)

## 📦 Prasyarat

Sebelum mulai, pastikan sudah install:

- [Node.js](https://nodejs.org/) (v18+)
- [NPM](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (Opsional, untuk menjalankan dengan container)

## ⚡ Instalasi

1. **Clone repositori**

   ```bash
   git clone https://github.com/recova-app/backend.git
   cd backend
   ```

2. **Install dependensi**

   ```bash
   npm install
   ```

3. **Setup variabel lingkungan**
   Buat file `.env` dari contoh `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Isi nilai variabel sesuai kebutuhan. Lihat penjelasan lengkap di bawah.

4. **Migrasi database**

   ```bash
   npm run db:migrate
   ```

## ⚙️ Variabel Lingkungan (.env)

File `.env` digunakan untuk mengkonfigurasi aplikasi. Berikut adalah penjelasan untuk setiap variabel yang ada di `.env.example`:

- `PORT`: Port tempat server akan berjalan (contoh: `3000`).
- `DOCS_URL`: URL untuk dokumentasi API (contoh: `/docs`).
- `JWT_SECRET`: Kunci rahasia acak untuk menandatangani token JWT.
- `GOOGLE_CLIENT_ID`: Client ID dari Google Cloud Console untuk otentikasi Google OAuth.
- `GEMINI_API_KEY`: Kunci API untuk layanan Google Gemini yang digunakan oleh AI Coach.
- `GEMINI_MODEL`: Model AI Gemini yang akan digunakan (contoh: `gemini-2.0-flash`).
- `DATABASE_USER`: Nama pengguna untuk database PostgreSQL.
- `DATABASE_PASSWORD`: Kata sandi untuk database PostgreSQL.
- `DATABASE_NAME`: Nama database yang akan digunakan.
- `DATABASE_URL`: URL koneksi lengkap ke database PostgreSQL. Format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`.

## ▶️ Menjalankan Aplikasi

### Mode Development (Lokal)

```bash
npm run dev
```

Server berjalan di: [http://localhost:3000](http://localhost:3000)

### Mode Production

```bash
npm run build
npm start
```

### 🌱 Database Seeding

Proyek ini dilengkapi dengan mekanisme _seeding_ untuk mengisi database dengan data awal untuk keperluan development dan testing.

Data yang di-seed meliputi:

- **Users**: Data pengguna dengan berbagai latar belakang
- **Profiles**: Profil lengkap beserta informasi pendukung recovery
- **Streaks**: Riwayat streak dan aktivitas pemulihan
- **Check-ins**: Data check-in harian dengan variasi mood
- **Journals**: Entri jurnal refleksi perjalanan pengguna
- **Community**: Postingan dan komentar komunitas
- **Education**: Konten edukasi terkait pemulihan dan pengembangan diri
- **Daily Motivations**: Motivasi harian untuk mendukung proses recovery
- **Daily Challenges**: Tantangan harian untuk membangun kebiasaan positif

Untuk menjalankan proses seeding, gunakan perintah:

```bash
npm run db:seed
```

## 🐳 Menjalankan dengan Docker

Proyek ini menyediakan konfigurasi Docker untuk mempermudah proses setup di lingkungan development dan deployment di production.

### Konfigurasi Docker

- **`Dockerfile`**: Konfigurasi untuk membangun image production. Menggunakan _multi-stage build_ untuk menghasilkan image yang optimal dan ringan.
- **`Dockerfile.dev`**: Konfigurasi untuk lingkungan development. Mengaktifkan _hot-reloading_ sehingga perubahan pada kode akan langsung terlihat tanpa perlu me-restart container.
- **`docker-compose.yml`**: Mendefinisikan layanan untuk lingkungan production, terdiri dari service `api` dan `db` (PostgreSQL).
- **`docker-compose.dev.yml`**: Mendefinisikan layanan untuk lingkungan development. Menggunakan `Dockerfile.dev` dan me-mount volume kode sumber untuk _hot-reloading_.

### Menjalankan (Development)

Pastikan file `.env` sudah diisi sesuai konfigurasi database di `docker-compose.dev.yml`.

```bash
docker-compose -f docker-compose.dev.yml up -d --build
```

### Menjalankan (Production)

Buat file `.env.production` sebelum menjalankan di mode production.

```bash
docker-compose -f docker-compose.yml up -d --build
```

## 📜 Skrip NPM

- `npm run dev` - Jalankan server development (hot reload).
- `npm run build` - Build TypeScript ke JavaScript.
- `npm run lint` - Cek kualitas kode (ESLint).
- `npm run lint:fix` - Auto-fix linting.
- `npm run format` - Format kode dengan Prettier.
- `npm run postinstall` - Generate Prisma client setelah install dependensi.
- `npm run db:migrate` - Jalankan migrasi database (development).
- `npm run db:deploy` - Terapkan migrasi database (production/deployment).
- `npm run db:reset` - Reset database dan jalankan ulang migrasi.
- `npm run db:push` - Sinkronisasi skema Prisma ke database tanpa migrasi.
- `npm run db:studio` - Buka Prisma Studio.
- `npm run db:seed` - Isi database dengan data awal (seeding).

## 📂 Struktur Proyek

```
src/
├── api/                # Modul API (auth, users, journals, dll.)
│   ├── ai/
│   ├── auth/
│   ├── community/
│   ├── content/
│   ├── education/
│   ├── journals/
│   ├── routine/
│   ├── users/
│   └── welcome/
├── config/             # Konfigurasi (env, app settings)
├── core/               # Setup inti server Express
├── database/           # Konfigurasi Prisma & koneksi DB
├── handler/          # Error handling & response standar
├── middleware/         # Middleware kustom (auth, validation, dsb.)
├── routes/             # Routing API
├── types/              # Definisi tipe global (TypeScript)
├── utils/              # Utilitas & helper functions
└── views/              # Tampilan Views
```

## 📡 Rute & Endpoint API

Semua endpoint berada di bawah prefix: **`/api/v1`**. Pengaturan rute utama terdapat di `src/routes/index.ts` yang menggabungkan semua modul API.

- **`/api/v1/auth`**: Menangani semua rute terkait otentikasi pengguna.
  - `POST /google` - Login / registrasi via Google Token.
  - `POST /onboarding` - Selesaikan proses onboarding (nama panggilan, alasan, waktu check-in).

- **`/api/v1/users`**: Rute untuk manajemen profil dan data pengguna.
  - `GET /me` - Ambil detail profil pengguna.
  - `PUT /settings` - Update pengaturan profil.

- **`/api/v1/ai`**: Rute untuk fitur berbasis AI.
  - `POST /ask-coach` - Kirim pesan ke AI Coach.
  - `GET /summary` - Dapatkan ringkasan check-in harian.
  - `POST /onboarding-analysis` - Analisis data onboarding.

- **`/api/v1/routine`**: Rute untuk rutinitas harian dan statistik.
  - `POST /checkin` - Check-in harian.
  - `GET /statistics` - Statistik (streak, dll).

- **`/api/v1/journals`**: Rute untuk jurnal pribadi pengguna.
  - `GET /` - Ambil semua entri jurnal.
  - `POST /` - Buat entri jurnal baru.

- **`/api/v1/community`**: Rute untuk interaksi dalam komunitas.
  - `GET /` - Ambil semua postingan komunitas.
  - `POST /` - Buat postingan baru.
  - `POST /:postId/comments` - Tambah komentar ke postingan.
  - `POST /:postId/like` - Like postingan.

- **`/api/v1/education`**: Rute untuk konten edukasi.
  - `GET /` - Ambil semua konten edukasi.

- **`/api/v1/content`**: Rute untuk konten dinamis.
  - `GET /daily` - Ambil konten harian.

## 🤝 Kontribusi

Kontribusi terbuka untuk siapa saja.

- Fork repositori ini
- Buat branch fitur (`git checkout -b feat/new-feature`)
- Commit perubahan (`git commit -m 'feat: add new feature'`)
- Push ke branch (`git push origin feat/new-feature`)
- Buat **Pull Request**

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi [MIT](LICENSE).
