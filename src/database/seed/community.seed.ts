import prisma from '../prisma.js';

export async function seedCommunity() {
  const users = await prisma.user.findMany();

  if (users.length === 0) return;

  const allowedCategories = ['advice', 'motivation', 'story', 'question', 'assistance'] as const;

  const posts = [
    {
      title: 'Tips Mengatasi Urge di Minggu Pertama',
      content:
        'Hi everyone! Mau share tips yang efektif buat aku di minggu pertama: 1) Langsung lakukan aktivitas fisik (push-up, jalan kaki), 2) Keluar rumah dan cari lingkungan yang ramai, 3) Cold shower untuk instant reset, 4) Meditasi atau breathing exercise. Yang paling penting adalah avoid being alone dengan gadget. Stay strong!',
      category: 'advice',
      userId: users[0]?.id,
      comments: [
        {
          content:
            'Thanks for sharing! Cold shower memang instant mood changer. Aku juga lagi struggle di minggu pertama.',
          userId: users[1]?.id,
        },
        {
          content:
            'Setuju banget sama olahraga sampai capek! Aku biasanya push-up atau burpee kalau lagi kena urge kuat.',
          userId: users[3]?.id,
        },
        {
          content:
            'Meditasi dan mindfulness memang powerful! Langsung merasa lebih tenang dan bisa kontrol diri. 💪',
          userId: users[5]?.id,
        },
      ],
    },
    {
      title: 'Hari ke-21 dan Brain Fog Masih Kuat',
      content:
        'Udah 3 minggu clean tapi brain fog dan flatline masih berasa banget. Kadang ngerasa hopeless dan mikir "kapan normal lagi ya?". Ada yang pernah ngerasa kayak gini juga? Ini normal ga sih? Butuh support 😢',
      category: 'question',
      userId: users[3]?.id,
      comments: [
        {
          content:
            'Kamu tidak sendiri! Flatline itu bagian dari healing process. Otak kita lagi rewiring. Biasanya 30-90 hari baru mulai normal. Sabar ya, ini tanda progress!',
          userId: users[0]?.id,
        },
        {
          content:
            'Aku juga ngalamin brain fog parah di minggu ke-3. Sekarang udah bulan ke-2 dan jauh lebih baik. Tetap semangat, ini fase temporary!',
          userId: users[2]?.id,
        },
      ],
    },
    {
      title: 'Sukses 30 Hari Clean! 🎉',
      content:
        'Everyone! Aku berhasil 30 hari tanpa PMO untuk pertama kalinya dalam 5 tahun! Rasanya hidup lebih bermakna, tidur lebih nyenyak, dan confidence meningkat drastis. Untuk yang baru mulai, IT DOES GET BETTER! Jangan menyerah, kalian bisa!',
      category: 'motivation',
      userId: users[4]?.id,
      comments: [
        {
          content: 'So inspiring! Aku baru hari ke-7, semoga bisa kayak kamu. Keep it up!',
          userId: users[5]?.id,
        },
        {
          content: 'Congratulations! Proud of you! Keep going! 👏',
          userId: users[1]?.id,
        },
        {
          content:
            'Amazing achievement! Boleh share strategi utama yang paling membantu selama 30 hari ini?',
          userId: users[2]?.id,
        },
      ],
    },
    {
      title: 'Relapse Setelah 14 Hari, Merasa Gagal Total',
      content:
        'Kemarin aku relapse setelah 14 hari clean. Rasanya semua usaha hancur. Rasa bersalah dan malu sangat berat. Gimana cara bangkit lagi? Aku merasa seperti gagal karena sudah niat tapi masih jatuh lagi.',
      category: 'assistance',
      userId: users[5]?.id,
      comments: [
        {
          content:
            'Hey, jangan terlalu keras pada diri sendiri. Relapse bukan akhir dari segalanya. Yang penting kita bangkit lagi dan belajar dari kesalahan. Jangan biarkan negative thoughts menang!',
          userId: users[0]?.id,
        },
        {
          content:
            'Aku relapse 5 kali sebelum bisa 60 hari. Setiap kali relapse, aku belajar trigger baru. Jangan menyerah, setiap usaha itu berharga!',
          userId: users[3]?.id,
        },
      ],
    },
    {
      title: 'Accountability Partner - Siapa yang Butuh?',
      content:
        'Hi all! Aku ngerasa butuh accountability partner untuk saling support dan check-in harian. Ada yang mau join? Kita bisa bikin grup kecil untuk saling reminder dan motivasi. PM me if interested!',
      category: 'assistance',
      userId: users[1]?.id,
      comments: [
        {
          content:
            'Good idea! Aku juga butuh accountability partner. Journaling bareng bisa jadi powerful tool.',
          userId: users[2]?.id,
        },
        {
          content:
            'Count me in! Accountability partner terbukti efektif banget. Kita bisa saling reminder dan check-in harian.',
          userId: users[4]?.id,
        },
      ],
    },
    {
      title: 'Cara Menghadapi Trigger dari Media Sosial',
      content:
        'Friends, gimana caranya kalau trigger datang dari media sosial? Instagram dan TikTok penuh konten yang bisa jadi trigger. Udah coba unfollow tapi kadang masih muncul di explore. Ada saran praktis?',
      category: 'question',
      userId: users[2]?.id,
      comments: [
        {
          content:
            'Aku uninstall semua social media apps selama 90 hari pertama. Sekarang cuma pakai di browser dengan blocker. Game changer banget!',
          userId: users[0]?.id,
        },
        {
          content:
            'Pakai content filter + limit screen time. Aku set max 30 menit per hari untuk socmed. Lebih dari itu auto lock.',
          userId: users[1]?.id,
        },
      ],
    },
    {
      title: 'Perubahan yang Kurasakan Setelah 60 Hari',
      content:
        'Guys! 2 bulan clean! Perubahan yang aku rasakan: 1) Lebih fokus dan tenang dalam beraktivitas, 2) Energi dan produktivitas kerja meningkat 200%, 3) Confidence naik drastis, 4) Hubungan dengan pasangan membaik signifikan, 5) Lebih bisa kontrol emosi. Sungguh worth it! 💪',
      category: 'story',
      userId: users[1]?.id,
      comments: [
        {
          content: 'Amazing progress! Inspiring banget. Jadi tambah semangat!',
          userId: users[5]?.id,
        },
        {
          content:
            'Congrats! Aku juga mulai merasakan benefit di minggu ke-3. Semoga bisa konsisten seperti kamu!',
          userId: users[4]?.id,
        },
      ],
    },
    {
      title: 'Rekomendasi Buku/Video untuk Recovery',
      content:
        'Hi everyone! Ada rekomendasi buku atau video yang membantu proses recovery? Aku butuh penguat motivasi dan mindset. Thanks in advance!',
      category: 'advice',
      userId: users[0]?.id,
      comments: [
        {
          content:
            'Coba baca "Your Brain on Porn" by Gary Wilson. Very eye-opening tentang science di balik addiction.',
          userId: users[2]?.id,
        },
        {
          content:
            'Video "The Great Porn Experiment" di TEDx sangat recommended. Explains everything dengan jelas.',
          userId: users[3]?.id,
        },
      ],
    },
  ].map(post => ({
    ...post,
    category: allowedCategories.includes(post.category as (typeof allowedCategories)[number])
      ? post.category
      : 'advice',
  }));

  for (const postData of posts) {
    if (!postData.userId) continue;

    const post = await prisma.communityPost.create({
      data: {
        title: postData.title,
        content: postData.content,
        category: postData.category,
        userId: postData.userId,
      },
    });

    for (const commentData of postData.comments) {
      if (commentData.userId) {
        await prisma.communityComment.create({
          data: {
            content: commentData.content,
            userId: commentData.userId,
            postId: post.id,
          },
        });
      }
    }
  }

  console.log(`[database]: Seeded community posts & comments`);
}
