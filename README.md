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

## 🛠️ Teknologi yang Digunakan

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **AI**: [Google Gemini](https://ai.google.dev/)
- **Validasi**: [Zod](https://zod.dev/)
- **Autentikasi**: JWT & Google OAuth

## 📦 Prasyarat

Sebelum mulai, pastikan sudah install:

- [Node.js](https://nodejs.org/) (v18+)
- [NPM](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

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

   Isi nilai variabel sesuai kebutuhan:

   ```env
   PORT=3000
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   JWT_SECRET="YOUR_RANDOM_SECRET_HERE"
   GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID_HERE"
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
   ```

4. **Migrasi database**

   ```bash
   npm run db:migrate
   ```

## ▶️ Menjalankan Aplikasi

### Mode Development

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

- **Users**: Pengguna dummy
- **Profiles**: Profil untuk setiap pengguna
- **Streaks**: Riwayat streak
- **Check-ins**: Data check-in harian
- **Journals**: Entri jurnal
- **Community**: Postingan dan komentar di komunitas
- **Education**: Konten edukasi

Untuk menjalankan proses seeding, gunakan perintah:

```bash
npm run db:seed
```

## 📜 Skrip NPM

- `npm run dev` - Jalankan server development (hot reload).
- `npm run lint` - Cek kualitas kode (ESLint).
- `npm run lint:fix` - Auto-fix linting.
- `npm run format` - Format kode dengan Prettier.
- `npm run db:migrate` - Jalankan migrasi database.
- `npm run db:studio` - Buka Prisma Studio.
- `npm run db:seed` - Isi database dengan data awal.

## 📂 Struktur Proyek

```
src/
├── api/                # Modul API (auth, users, journals, dll.)
│   ├── ai/
│   ├── auth/
│   ├── community/
│   ├── education/
│   ├── journals/
│   ├── routine/
│   └── users/
├── config/             # Konfigurasi (env, app settings)
├── core/               # Setup inti server Express
├── database/           # Konfigurasi Prisma & koneksi DB
├── middleware/         # Middleware kustom (auth, validation, dsb.)
├── routes/             # Routing API
└── types/              # Definisi tipe global (TypeScript)
```

## 📡 Endpoint API

Semua endpoint berada di bawah prefix: **`/api/v1`**

### Autentikasi

- `POST /auth/google` - Login / registrasi via Google Token.

### Pengguna

- `GET /users/me` - Ambil detail profil pengguna.
- `PUT /users/settings` - Update pengaturan profil.

### AI

- `POST /ai/ask-coach` - Kirim pesan ke AI Coach.

### Rutinitas & Streak

- `POST /routine/checkin` - Check-in harian.
- `GET /routine/statistics` - Statistik (streak, dll).

### Jurnal

- `GET /journals` - Ambil semua entri jurnal.
- `POST /journals` - Buat entri jurnal baru.

### Komunitas

- `GET /community` - Ambil semua postingan komunitas.
- `POST /community` - Buat postingan baru.
- `POST /community/:postId/comments` - Tambah komentar ke postingan.
- `POST /community/:postId/like` - Like postingan.

### Edukasi

- `GET /education` - Ambil semua konten edukasi.

## 🤝 Kontribusi

Kontribusi terbuka untuk siapa saja.

- Fork repositori ini
- Buat branch fitur (`git checkout -b feat/fitur-baru`)
- Commit perubahan (`git commit -m 'feat: tambah fitur baru'`)
- Push ke branch (`git push origin feat/fitur-baru`)
- Buat **Pull Request**

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi [MIT](LICENSE).
