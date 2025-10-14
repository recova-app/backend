import prisma from '../prisma.js';

export async function seedProfiles() {
  const users = await prisma.user.findMany();

  const profileData = [
    {
      answers: {
        durasi_kecanduan: '5-6 tahun',
        frekuensi_harian: '2-3 kali per hari',
        trigger_utama: 'Stress kerja, kesepian, browsing media sosial',
        dampak_kesehatan: 'Gangguan tidur, kelelahan, sulit konsentrasi, rasa bersalah',
        support_system: 'Pasangan (sudah cerita), konselor online, grup recovery',
      },
      dependencyLevel: 'High',
      aiSummary:
        'Andre menunjukkan komitmen kuat untuk pulih demi keluarganya. Dalam 2 minggu terakhir, berhasil mengurangi frekuensi relapse hingga 60%. Hubungan dengan pasangan mulai membaik. Tantangan terbesar adalah saat bekerja sendirian di malam hari. Disarankan untuk terus komunikasi terbuka dengan pasangan dan memanfaatkan accountability partner.',
    },
    {
      answers: {
        durasi_kecanduan: '4-5 tahun',
        frekuensi_harian: '1-2 kali per hari',
        trigger_utama: 'Sendirian di kamar, waktu luang berlebih, media sosial',
        dampak_kesehatan: 'Rasa bersalah intens, kecemasan sosial, sulit tidur',
        support_system: 'Teman dekat (belum cerita detail), komunitas online',
      },
      dependencyLevel: 'High',
      aiSummary:
        'Budi sangat termotivasi untuk bersih dan membangun hubungan yang sehat. Progress sangat baik dengan 10 hari clean streak saat ini. Visi masa depan yang lebih baik memberinya motivasi ekstra. Tantangan adalah menjaga konsistensi saat menghadapi stress. Disarankan untuk fokus pada tujuan jangka panjang dan melibatkan aktivitas positif.',
    },
    {
      answers: {
        durasi_kecanduan: '8-9 tahun',
        frekuensi_harian: '3-5 kali per hari',
        trigger_utama: 'Prokrastinasi, stress, kegagalan, kesepian',
        dampak_keseharian: 'Produktivitas kerja drop, kehilangan promosi, isolasi sosial',
        support_system: 'Psikolog, grup support online, mentor',
      },
      dependencyLevel: 'High',
      aiSummary:
        'David dalam fase recovery yang challenging setelah 8 tahun kecanduan berat. Sudah 2 minggu bersih dengan beberapa urge kuat. Kesadaran akan dampak negatif terhadap karirnya menjadi motivasi utama. Pola produktivitas mulai membaik. Disarankan untuk terus konsisten dengan terapi dan membangun routine pagi yang kuat untuk menghindari trigger.',
    },
    {
      answers: {
        durasi_kecanduan: '6-7 tahun',
        frekuensi_harian: '2-4 kali per hari',
        trigger_utama: 'Kecemasan, depresi, insomnia, kesepian',
        dampak_kesehatan: 'Depresi kronis, brain fog, fatigue, kehilangan libido sehat',
        support_system: 'Psikiater, support group, saudara (sudah cerita)',
      },
      dependencyLevel: 'High',
      aiSummary:
        'Ryan mengalami dampak kesehatan mental yang serius dari kecanduannya. Sudah menjalani terapi selama 3 bulan dan menunjukkan perbaikan signifikan. Mood lebih stabil dan episode depresi berkurang. Masih struggling dengan urge di malam hari saat insomnia. Disarankan untuk konsisten dengan medication dan sleep hygiene routine.',
    },
    {
      answers: {
        durasi_kecanduan: '3-4 tahun',
        frekuensi_harian: '1-3 kali per hari',
        trigger_utama: 'Stress kuliah, deadline tugas, exam anxiety',
        dampak_keseharian: 'IPK turun dari 3.5 ke 2.8, skip kelas, isolasi dari teman',
        support_system: 'Senior kampus, teman komunitas, konselor kampus',
      },
      dependencyLevel: 'Medium',
      aiSummary:
        'Faisal sebagai mahasiswa sangat aware akan dampak kecanduan terhadap akademiknya. Dalam 2 minggu terakhir, IPK mulai naik dan attendance meningkat 80%. Motivasi untuk lulus tepat waktu sangat kuat. Challenge terbesar adalah peer pressure dan akses mudah di kos-kosan. Disarankan untuk memanfaatkan study group dan aktivitas kampus sebagai distraction positif.',
    },
    {
      answers: {
        durasi_kecanduan: '7-8 tahun',
        frekuensi_harian: '2-3 kali per hari',
        trigger_utama: 'Rasa bersalah, stress, kesepian',
        dampak_spiritual: 'Merasa kehilangan makna hidup, sulit fokus pada nilai-nilai personal',
        support_system: 'Mentor spiritual, grup meditasi, sahabat terdekat',
      },
      dependencyLevel: 'High',
      aiSummary:
        'Eric sangat termotivasi oleh aspek spiritual dalam recoverynya. Sudah 1 minggu bersih dan merasakan perbedaan signifikan dalam ketenangan batin dan fokus. Praktik mindfulness membantu mengurangi urge. Tantangan adalah guilt dari masa lalu. Disarankan untuk fokus pada self-compassion, meditasi rutin, dan terus dekat dengan mentor spiritual untuk guidance.',
    },
  ];

  for (let i = 0; i < users.length && i < profileData.length; i++) {
    const user = users[i];
    const profile = profileData[i];
    if (user && profile) {
      await prisma.userProfile.create({
        data: {
          answers: profile.answers,
          dependencyLevel: profile.dependencyLevel,
          aiSummary: profile.aiSummary,
          userId: user.id,
        },
      });
    }
  }

  console.log(`[database]: Seeded ${users.length} user profiles`);
}
