import prisma from '../prisma.js';

export async function seedDailyChallenges() {
  const challenges = [
    {
      content:
        'Bangun pagi lebih awal hari ini. Mulai hari dengan mindset positif dan routine yang sehat.',
    },
    {
      content:
        'Baca buku inspiratif atau artikel motivasi minimal 15 menit. Feed your mind dengan konten positif.',
    },
    {
      content:
        'Lakukan olahraga intensif 30 menit (push-up, jogging, burpee). Physical exhaustion mengurangi urge secara signifikan.',
    },
    {
      content:
        'Cold shower challenge! Minimal 5 menit dengan air dingin. Ini melatih self-control dan mengurangi urge instantly.',
    },
    {
      content:
        'Hubungi accountability partner dan share progresmu hari ini. Saling menguatkan dan support.',
    },
    {
      content:
        'Tonton satu video edukatif tentang addiction recovery atau personal development. Perkuat motivasimu.',
    },
    {
      content:
        'Tuliskan 5 hal yang kamu syukuri dan 3 kebiasaan buruk yang ingin kamu tinggalkan. Refleksi adalah kunci perubahan.',
    },
    {
      content:
        'Aktifkan web filter dan screen time limit di semua devices. Prevention is better than cure.',
    },
    {
      content:
        'Tuliskan surat untuk dirimu sendiri tentang dampak negatif PMO dan benefits dari clean life.',
    },
    {
      content:
        'Bersihkan dan organize kamarmu. Buang semua yang bisa jadi trigger. Lingkungan bersih, pikiran jernih.',
    },
    {
      content:
        'Praktikkan mindful awareness hari ini. Setiap kali muncul urge, acknowledge it dan let it pass tanpa action.',
    },
    {
      content:
        'Lakukan satu kebaikan untuk orang lain hari ini. Helping others membuat kita merasa lebih baik tentang diri sendiri.',
    },
    {
      content:
        'Identifikasi 3 trigger terbesarmu dan buat emergency action plan untuk masing-masing (olahraga, call friend, leave room).',
    },
    {
      content:
        'Spend quality time dengan keluarga atau teman tanpa gadget. Hubungan yang sehat menguatkan resolusi untuk berubah.',
    },
    {
      content:
        'Practice intermittent fasting atau skip one meal. Melatih self-control dalam satu area membantu area lainnya.',
    },
    {
      content:
        'Journaling tentang progress, struggle, dan perasaanmu hari ini. Tulis juga goals dan harapanmu.',
    },
    {
      content:
        'Set 3 goals personal untuk minggu depan (fitness, productivity, learning). Write them down dan buat action plan.',
    },
    {
      content:
        'Dengarkan podcast atau audiobook tentang self-improvement sambil beraktivitas. Fill your day dengan konten positif.',
    },
    {
      content:
        'Lakukan meditasi atau mindfulness practice 10-15 menit. Calm your mind dan tingkatkan self-awareness.',
    },
    {
      content:
        'Buat vision board tentang kehidupanmu setelah terbebas: kesehatan optimal, hubungan sehat, karir cemerlang.',
    },
    {
      content:
        'Challenge: No social media hari ini. Hindari trigger dari Instagram, TikTok, atau platform lain.',
    },
    {
      content:
        'Kunjungi gym, join sports club, atau ikut community event. Social environment yang positif sangat membantu recovery.',
    },
    {
      content:
        'Makan makanan bergizi seimbang. Hindari sugar berlebih yang bisa trigger dopamine spike.',
    },
    {
      content: 'Buat playlist musik motivasi atau instrumental untuk didengar saat struggle.',
    },
    {
      content:
        'Setiap kali ada urge, lakukan: 1) Deep breathing 5 menit, 2) 20 push-ups, 3) Cold shower. Power combo!',
    },
    {
      content:
        'Reconnect dengan teman lama atau keluarga yang supportive. Strengthen positive relationships.',
    },
    {
      content:
        'Buat list achievements kecil sejak mulai recovery (1 hari clean, 1 minggu, 1 bulan). Celebrate small wins!',
    },
    {
      content:
        'Tidur lebih awal malam ini (sebelum jam 10). Quality sleep crucial untuk brain recovery dan energy esok hari.',
    },
    {
      content:
        'Replace satu negative thought dengan positive affirmation. Misal: "Aku tidak bisa" → "Aku sedang belajar dan berkembang".',
    },
    {
      content:
        'Spend 30 menit di outdoor untuk vitamin D dan fresh air. Nature therapy sangat healing untuk mental health.',
    },
  ];

  await prisma.dailyChallenge.createMany({
    data: challenges,
    skipDuplicates: true,
  });

  console.log(`[database]: Seeded ${challenges.length} daily challenges`);
}
