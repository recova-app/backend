import prisma from '../prisma.js';

export async function seedEducationContent() {
  const contents = [
    {
      title: 'CURE Your PORN ADDICTION | A Doctors Guide to Breaking The Habit',
      description:
        'Panduan dari dokter untuk menghentikan kecanduan pornografi. Membahas tanda-tanda, dampak, dan langkah-langkah praktis untuk mengatasinya, baik sendiri maupun dengan bantuan profesional.',
      url: 'http://www.youtube.com/watch?v=D2x6vY3r5K8',
      thumbnailUrl: 'https://i.ytimg.com/vi/D2x6vY3r5K8/maxresdefault.jpg',
      category: 'Mental Health',
    },
    {
      title: 'LANGKAH PERTAMA UNTUK BERHENTI DARI KECANDUAN PORNOGRAFI',
      description:
        'Penjelasan langkah pertama untuk pulih dari kecanduan pornografi, yaitu mengubah pola pikir dari penolakan menjadi penerimaan dan pentingnya mengubah rutinitas.',
      url: 'http://www.youtube.com/watch?v=a37iuykI9Io',
      thumbnailUrl: 'https://i.ytimg.com/vi/a37iuykI9Io/maxresdefault.jpg',
      category: 'Mental Health',
    },
    {
      title: 'Saat Stop Nonton Video P*rno, Beginilah yang Langsung Terjadi Kepada Tubuh Kalian..',
      description:
        'Membahas apa yang terjadi pada tubuh dan pikiran saat berhenti dari kecanduan pornografi, termasuk dampak negatif kecanduan dan timeline pemulihan (hari per hari).',
      url: 'http://www.youtube.com/watch?v=gJjsm2xcOy8',
      thumbnailUrl: 'https://i.ytimg.com/vi/gJjsm2xcOy8/maxresdefault.jpg',
      category: 'Wellness',
    },
    {
      title: 'Cara Memanage Nafsu - Ustadz Adi Hidayat',
      description:
        'Kajian dari Ustadz Adi Hidayat tentang cara mengelola dan menata nafsu dari perspektif Islam, serta bagaimana mengubah dorongan negatif menjadi pemicu kebaikan.',
      url: 'http://www.youtube.com/watch?v=TqZIsmrQ06o',
      thumbnailUrl: 'https://i.ytimg.com/vi/TqZIsmrQ06o/maxresdefault.jpg',
      category: 'Spiritual',
    },
    {
      title: 'Apa yang Terjadi Saat Orang Ketagihan Pornografi?',
      description:
        "Penjelasan ilmiah dari 'Kok Bisa?' tentang apa yang terjadi pada otak saat kecanduan pornografi, dampaknya pada fungsi kognitif, dan gangguan perilaku.",
      url: 'http://www.youtube.com/watch?v=Sq1s564ukTI',
      thumbnailUrl: 'https://i.ytimg.com/vi/Sq1s564ukTI/maxresdefault.jpg',
      category: 'Mental Health',
    },
    {
      title: "Tips DISIPLIN membangun KEBIASAAN! 💪🏻 Maudy Ayunda's Booklist",
      description:
        "Maudy Ayunda membedah buku 'Atomic Habits', memberikan tips praktis untuk membangun disiplin dan kebiasaan baru, seperti fokus pada sistem dan 4 langkah membangun habit.",
      url: 'http://www.youtube.com/watch?v=uqGf4PWDOUw',
      thumbnailUrl: 'https://i.ytimg.com/vi/uqGf4PWDOUw/maxresdefault.jpg',
      category: 'Self-Improvement',
    },
    {
      title: 'Cara Jadi Manusia Baru dalam 7 Hari | Reset Hidup yang lo Benci',
      description:
        "Strategi 'reset' hidup dari Agusleo Halim. Membahas cara kerja otak sebagai komputer dan pentingnya menutup 'tab' negatif (penyesalan, komplain) dan membuka 'tab' positif.",
      url: 'http://www.youtube.com/watch?v=gPdKGv9ZuAU',
      thumbnailUrl: 'https://i.ytimg.com/vi/gPdKGv9ZuAU/maxresdefault.jpg',
      category: 'Self-Improvement',
    },
    {
      title: 'Kamu Malas Tapi Harus Produktif? Ini Rahasia Biar Otak Ngegas Lagi!',
      description:
        "Tips 'hacking' otak dari Plus Satu Persen untuk mengatasi malas dan menjadi produktif, menggunakan teknik seperti 'Two-Minute Rule', 'Reward Sandwich', dan 'Environment Design'.",
      url: 'http://www.youtube.com/watch?v=WMfRHf5kjsE',
      thumbnailUrl: 'https://i.ytimg.com/vi/WMfRHf5kjsE/maxresdefault.jpg',
      category: 'Productivity',
    },
    {
      title: 'How to Be So Productive it Feels ILLEGAL',
      description:
        "10 'hacks' produktivitas dari Dan Martell untuk mendapatkan fokus super. Meliputi 'not-to-do list', 'focus triggers', 'start on hard mode', dan 'gamify your work'.",
      url: 'http://www.youtube.com/watch?v=hSGt_rhu49U',
      thumbnailUrl: 'https://i.ytimg.com/vi/hSGt_rhu49U/maxresdefault.jpg',
      category: 'Productivity',
    },
    {
      title: "Kunci dari Kebahagiaan = Bersikap Bodo Amat?! Maudy Ayunda's Booklist",
      description:
        "Maudy Ayunda membedah buku 'The Subtle Art of Not Giving a F*ck', membahas tentang pentingnya memilih hal yang dipedulikan dan menemukan kebahagiaan di hal-hal kecil.",
      url: 'http://www.youtube.com/watch?v=dAI12OGD04A',
      thumbnailUrl: 'https://i.ytimg.com/vi/dAI12OGD04A/maxresdefault.jpg',
      category: 'Mindfulness',
    },
    {
      title: 'Supaya Hidup Gak Overthinking..',
      description:
        "Obrolan Raditya Dika dan Henry Manampiring (penulis Filosofi Teras) tentang Stoikisme, 'dikotomi kendali', dan cara praktis menerapkannya agar tidak overthinking.",
      url: 'http://www.youtube.com/watch?v=9qwR3GmR63I',
      thumbnailUrl: 'https://i.ytimg.com/vi/9qwR3GmR63I/maxresdefault.jpg',
      category: 'Mindfulness',
    },
    {
      title: 'Cara Meningkatkan IQ dan Kecerdasan Otak',
      description:
        "Ferry Irwandi membahas cara meningkatkan kecerdasan otak, bukan hanya soal skor IQ. Tipsnya meliputi bermain game strategis, 'chunking' informasi, dan belajar musik.",
      url: 'http://www.youtube.com/watch?v=H-DeO-hnyTc',
      thumbnailUrl: 'https://i.ytimg.com/vi/H-DeO-hnyTc/maxresdefault.jpg',
      category: 'Self-Improvement',
    },
    {
      title: 'Mengatasi Rasa Kesepian (Rahasia Menghadapi Kesepian)',
      description:
        'Penjelasan dari Satu Persen tentang apa itu kesepian, bahayanya bagi kesehatan fisik dan mental, dan strategi praktis untuk mengatasinya dengan membangun koneksi sosial.',
      url: 'http://www.youtube.com/watch?v=0b9Qzow_lv0',
      thumbnailUrl: 'https://i.ytimg.com/vi/0b9Qzow_lv0/maxresdefault.jpg',
      category: 'Mental Health',
    },
    {
      title: 'Yang Capek Jadi Dewasa, Nonton Ini!',
      description:
        'Diskusi Raditya Dika dan psikolog Nago Tejema tentang lelahnya menjadi dewasa, kehilangan otentisitas diri, dan bagaimana masalah di masa lalu (terutama dengan orang tua) mempengaruhinya.',
      url: 'http://www.youtube.com/watch?v=ZOQhVk_YuSY',
      thumbnailUrl: 'https://i.ytimg.com/vi/ZOQhVk_YuSY/maxresdefault.jpg',
      category: 'Mental Health',
    },
    {
      title: 'Rahasia Jadi Manusia BERVALUE Tanpa Harus Jadi Orang Lain! | SUARA BERKELAS #54',
      description:
        "Obrolan Raditya Dika di Suara Berkelas tentang menjadi manusia 'ber-value'. Membahas beda introvert dan pemalu, pentingnya rasa bangga dalam bekerja, dan digital product.",
      url: 'http://www.youtube.com/watch?v=E14rVsVJk0M',
      thumbnailUrl: 'https://i.ytimg.com/vi/E14rVsVJk0M/maxresdefault.jpg',
      category: 'Self-Improvement',
    },
  ];

  await prisma.educationContent.createMany({
    data: contents,
  });

  console.log('[database]: Seeded education content');
}
