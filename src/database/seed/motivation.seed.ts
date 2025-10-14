import prisma from '../prisma.js';

export async function seedDailyMotivations() {
  const motivations = [
    {
      content:
        'Setiap hari adalah kesempatan baru untuk menjadi versi yang lebih baik dari dirimu. Jangan pernah putus asa, perubahan itu nyata.',
    },
    {
      content:
        'Kamu lebih kuat dari yang kamu kira. Setiap kali kamu menolak godaan, kamu sedang membangun karakter yang lebih tangguh.',
    },
    {
      content:
        'Relapse bukan akhir dari segalanya. Yang penting adalah bangkit, belajar dari kesalahan, dan terus melangkah maju.',
    },
    {
      content:
        'Perubahan dimulai dari keputusan kecil setiap hari. Hari ini, pilih untuk menjaga pikiran dan tindakanmu.',
    },
    {
      content:
        'Kamu tidak sendiri dalam perjuangan ini. Ribuan orang lainnya juga sedang berjuang. Bersama kita lebih kuat.',
    },
    {
      content:
        'Fokus pada hari ini. Satu hari clean adalah kemenangan. Jangan khawatir tentang besok, jalani hari ini dengan penuh kesadaran.',
    },
    {
      content:
        'Kesuksesan recovery diukur dari seberapa sering kamu bangkit setelah jatuh. Jangan biarkan negative thoughts membuatmu putus asa.',
    },
    {
      content:
        'Otakmu sedang dalam proses penyembuhan dan rewiring. Bersabarlah, perubahan nyata butuh waktu 90 hari atau lebih.',
    },
    {
      content:
        'Setiap kali kamu menolak untuk membuka konten yang merusak, kamu sedang memilih kehidupan yang lebih baik. Itu adalah kemenangan atas dirimu sendiri.',
    },
    {
      content:
        'Kamu layak mendapatkan kehidupan yang bersih, pikiran yang jernih, dan hubungan yang sehat. Recovery adalah investasi untuk masa depanmu.',
    },
    {
      content:
        'Progress tidak selalu terlihat dari luar, tapi perubahan sedang terjadi di dalam dirimu. Tetap percaya pada proses.',
    },
    {
      content:
        'Hari-hari sulit adalah bagian dari proses. Setiap kali kamu bertahan, kamu menjadi lebih kuat. Sabar dan terus berjuang.',
    },
    {
      content:
        'Ingat motivasimu di awal: untuk keluarga, untuk masa depan, untuk menjadi pribadi yang lebih baik. Pegang erat motivasi itu saat menghadapi godaan.',
    },
    {
      content:
        'Recovery adalah bentuk self-love dan komitmen pada diri sendiri. Setiap hari clean adalah hadiah untuk dirimu dan orang-orang yang kamu cintai.',
    },
    {
      content:
        'Setiap momen kamu bertahan adalah kemenangan kecil. Small wins today, bigger success tomorrow.',
    },
    {
      content:
        'Masa lalu tidak mendefinisikan masa depanmu. Setiap orang berhak untuk berubah dan menjadi lebih baik. Mulai dari sekarang.',
    },
    {
      content:
        'Urge dan craving akan berkurang seiring waktu. Brain fog adalah tanda otakmu sedang healing. Bersabarlah, ini fase sementara.',
    },
    {
      content:
        'Kamu sedang membangun character yang kuat dan mental yang tangguh. Setiap hari konsisten adalah batu bata fondasi masa depanmu.',
    },
    {
      content:
        'Jangan bandingkan journey-mu dengan orang lain. Setiap orang punya tantangan berbeda. Fokus pada progresmu sendiri.',
    },
    {
      content:
        'Saat ingin menyerah, ingat MENGAPA: Untuk kesehatan mental, untuk hubungan yang lebih baik, untuk masa depan yang cerah. Kamu sudah sejauh ini!',
    },
    {
      content:
        'Recovery menjadikanmu lebih kuat, lebih bijaksana, dan lebih percaya diri. Kamu sedang menjadi versi terbaik dari dirimu.',
    },
    {
      content:
        'Struggle hari ini bukan berarti kamu gagal. Itu bukti kamu masih melawan. Setiap perjuangan itu berharga. Tetap semangat!',
    },
    {
      content:
        'Pikiran negatif dan self-doubt adalah bagian dari proses. Jangan percaya semuanya. Praktikkan mindfulness dan fokus pada hal positif.',
    },
    {
      content:
        'Tidak perlu sempurna untuk memulai. Yang penting adalah niat dan usaha konsisten. Mulai sekarang dan terus berusaha.',
    },
    {
      content:
        'Setiap hari clean adalah investasi untuk kesehatan fisik, mental, dan masa depanmu. Investasi terbaik yang bisa kamu lakukan.',
    },
    {
      content:
        'Keluarga dan support systemmu bangga dengan perjuanganmu. Kamu menginspirasi mereka untuk juga menjadi lebih baik.',
    },
    {
      content:
        'Recovery adalah marathon, bukan sprint. Pelan tapi konsisten. Konsistensi kecil lebih baik dari usaha besar yang tidak berkelanjutan.',
    },
    {
      content:
        'Kamu memiliki kekuatan dalam dirimu untuk mengatasi ini. Percaya pada dirimu dan jangan ragu untuk minta bantuan saat butuh.',
    },
    {
      content:
        'Setiap kali kamu bertahan dari godaan, kamu membuktikan bahwa kamu lebih kuat dari kecanduanmu. Terus latih kekuatan itu.',
    },
    {
      content:
        'Hari ini mungkin berat, tapi besok bisa jadi hari terbaikmu. Setelah kesulitan pasti ada kemudahan. Bertahanlah.',
    },
  ];

  await prisma.dailyMotivation.createMany({
    data: motivations,
    skipDuplicates: true,
  });

  console.log(`[database]: Seeded ${motivations.length} daily motivations`);
}
