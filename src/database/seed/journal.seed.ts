import prisma from '../prisma.js';

export async function seedJournals() {
  const users = await prisma.user.findMany({
    include: {
      checkins: {
        orderBy: {
          checkinDate: 'desc',
        },
      },
    },
  });

  const journalTemplates = {
    successful: {
      Termotivasi: [
        'Hari ini aku berhasil! Rasanya lega bisa melewati hari tanpa kembali ke kebiasaan lama. Aku mulai melihat perubahan positif dalam hidupku.',
        'Pagi ini aku bangun dengan perasaan penuh semangat. Aku yakin bisa terus mempertahankan progress ini. Satu hari lagi berhasil!',
        'Merasa bangga dengan diriku sendiri hari ini. Meskipun ada godaan, aku berhasil menolak dan fokus pada tujuanku.',
      ],
      Fokus: [
        'Hari ini produktivitasku meningkat. Aku bisa menyelesaikan pekerjaan dengan lebih cepat dan efisien.',
        'Konsentrasi hari ini jauh lebih baik. Aku merasa lebih hadir dan tidak terdistraksi seperti biasanya.',
        'Berhasil menyelesaikan semua tugas hari ini. Fokus memang kunci utama kesuksesan recovery ini.',
      ],
      Tenang: [
        'Hari yang damai. Aku merasa lebih tenang dan bisa menikmati momen-momen kecil dalam hidup.',
        'Tidak ada keinginan kuat untuk kembali ke kebiasaan lama. Aku mulai merasa nyaman dengan rutinitas baruku.',
        'Hari ini berjalan dengan smooth. Aku grateful bisa merasakan ketenangan ini.',
      ],
      Bahagia: [
        'Hari yang menyenangkan! Aku merasa bahagia dan bersyukur atas progress yang sudah aku capai.',
        'Mood hari ini sangat baik. Keluargaku juga mulai melihat perubahan positif padaku. Ini membuatku semakin termotivasi!',
        'Aku benar-benar menikmati hari ini. Tanpa beban kebiasaan lama, hidup terasa lebih ringan dan menyenangkan.',
      ],
      Segar: [
        'Bangun pagi dengan tubuh yang segar dan pikiran yang jernih. Ini hasil dari kebiasaan baru yang lebih sehat.',
        'Energiku penuh hari ini. Aku merasa jauh lebih fit dibanding sebelumnya.',
        'Tidur nyenyak dan bangun segar. Perubahan gaya hidup ini benar-benar worth it!',
      ],
      Gelisah: [
        'Hari ini agak gelisah, tapi aku berhasil mengalihkan perhatian dengan aktivitas lain. Tetap bertahan!',
        'Ada sedikit kegelisahan, tapi aku ingat kenapa aku memulai ini. Aku harus terus maju.',
      ],
    },
    failed: {
      Cemas: [
        'Hari ini aku gagal. Merasa cemas dan kecewa dengan diriku sendiri. Tapi aku tahu ini bukan akhir, aku harus bangkit lagi besok.',
        'Anxiety menyerang hari ini dan aku kalah. Rasanya berat, tapi aku tidak akan menyerah. Tomorrow is a new day.',
        'Gagal hari ini karena perasaan cemas yang overwhelming. Aku butuh strategi yang lebih baik untuk menghadapi ini.',
      ],
      Sedih: [
        'Relapse hari ini membuatku sedih. Tapi aku harus ingat bahwa ini adalah proses, bukan kegagalan total.',
        'Hari yang berat. Aku merasa down dan akhirnya kembali ke kebiasaan lama. Besok harus lebih baik.',
      ],
      Frustasi: [
        'Frustasi dengan diriku sendiri karena tidak bisa menahan diri hari ini. Aku harus belajar dari kesalahan ini.',
        'Gagal lagi dan aku merasa frustrasi. Tapi aku tidak akan berhenti mencoba. Recovery itu bukan jalan yang lurus.',
      ],
      Lelah: [
        'Terlalu lelah hari ini dan akhirnya aku menyerah. Aku butuh istirahat yang cukup untuk bisa fokus pada recovery.',
        'Kelelahan fisik dan mental membuatku lemah hari ini. Aku harus lebih memperhatikan self-care.',
      ],
      Gelisah: [
        'Kegelisahan hari ini terlalu kuat. Aku tidak bisa melawan dan akhirnya relapse. Aku perlu mencari cara yang lebih baik.',
        'Gagal karena tidak bisa mengatasi perasaan gelisah. Mungkin aku perlu berbicara dengan support system.',
      ],
      Bingung: [
        'Hari ini aku bingung dan kehilangan arah. Akhirnya kembali ke kebiasaan lama tanpa sadar. Aku butuh clarity.',
      ],
    },
  };

  for (const user of users) {
    for (const checkin of user.checkins) {
      const statusKey = checkin.isSuccessful ? 'successful' : 'failed';
      const statusTemplates = journalTemplates[statusKey];
      const moodTemplates = statusTemplates[checkin.mood as keyof typeof statusTemplates];

      let content = '';
      if (moodTemplates && Array.isArray(moodTemplates) && moodTemplates.length > 0) {
        const randomTemplate = moodTemplates[Math.floor(Math.random() * moodTemplates.length)];
        content = randomTemplate || 'Hari ini adalah bagian dari perjalanan recovery ku.';
      } else {
        content = checkin.isSuccessful
          ? 'Hari ini berhasil melewati tantangan. Aku bersyukur bisa tetap konsisten.'
          : 'Hari ini aku gagal, tapi aku tidak akan menyerah. Besok adalah kesempatan baru.';
      }

      await prisma.journal.create({
        data: {
          content,
          userId: user.id,
          checkinId: checkin.id,
        },
      });
    }
  }

  const totalJournals = await prisma.journal.count();
  console.log(`[database]: Seeded ${totalJournals} journals`);
}
