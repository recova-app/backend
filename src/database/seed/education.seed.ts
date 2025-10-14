import prisma from '../prisma.js';

export async function seedEducationContent() {
  const contents = [
    {
      title: 'The Science of Pornography Addiction - Your Brain on Porn',
      description:
        'Penjelasan ilmiah tentang bagaimana pornografi mempengaruhi otak dan menciptakan kecanduan. Video ini membantu memahami mengapa recovery itu penting dan bagaimana proses penyembuhan bekerja.',
      url: 'https://www.youtube.com/watch?v=wSF82AwSDiU',
      thumbnailUrl: 'https://i.ytimg.com/vi/wSF82AwSDiU/maxresdefault.jpg',
      category: 'Mental Health',
    },
    {
      title: 'NoFap Benefits: Real Science & Timeline',
      description:
        'Penjelasan timeline dan benefits yang akan dirasakan selama proses NoFap/recovery. Berbasis riset dan pengalaman nyata untuk memberikan ekspektasi yang realistis.',
      url: 'https://www.youtube.com/watch?v=9mbp7DuiSCQ',
      thumbnailUrl: 'https://i.ytimg.com/vi/9mbp7DuiSCQ/maxresdefault.jpg',
      category: 'Self-Improvement',
    },
    {
      title: 'Menjaga Pandangan dalam Islam - Ustadz Khalid Basalamah',
      description:
        'Kajian mendalam tentang pentingnya menjaga pandangan dalam Islam dan bahaya zina mata. Penguat iman untuk yang sedang berjuang melawan kecanduan.',
      url: 'https://www.youtube.com/watch?v=X3kJ_3xJqsM',
      thumbnailUrl: 'https://i.ytimg.com/vi/X3kJ_3xJqsM/maxresdefault.jpg',
      category: 'Mental Health',
    },
    {
      title: 'How to Overcome Porn Addiction - Practical Strategy',
      description:
        'Strategi praktis dan actionable untuk mengatasi kecanduan pornografi. Mencakup tips menghindari trigger, membangun accountability, dan recovery plan.',
      url: 'https://www.youtube.com/watch?v=FmjjxdDwOIc',
      thumbnailUrl: 'https://i.ytimg.com/vi/FmjjxdDwOIc/maxresdefault.jpg',
      category: 'Self-Improvement',
    },
    {
      title: 'Dealing with Urges and Triggers - Recovery Tips',
      description:
        'Teknik dan strategi untuk mengatasi urge dan trigger saat recovery. Video ini memberikan tools praktis yang bisa langsung diterapkan saat menghadapi godaan.',
      url: 'https://www.youtube.com/watch?v=kKhAx_cZ-14',
      thumbnailUrl: 'https://i.ytimg.com/vi/kKhAx_cZ-14/maxresdefault.jpg',
      category: 'Mental Health',
    },
    {
      title: 'Guided Meditation for Addiction Recovery',
      description:
        'Meditasi terpandu khusus untuk membantu proses recovery dari kecanduan. Membantu menenangkan pikiran dan mengurangi anxiety. Cocok dilakukan setiap hari.',
      url: 'https://www.youtube.com/watch?v=SEfs5TJZ6NA',
      thumbnailUrl: 'https://i.ytimg.com/vi/SEfs5TJZ6NA/maxresdefault.jpg',
      category: 'Mindfulness',
    },
    {
      title: 'Jangan Berzina! Bahaya dan Hukumnya - Ustadz Hanan Attaki',
      description:
        'Kajian tentang bahaya zina dan pornografi dari perspektif Islam. Sangat powerful untuk memperkuat motivasi spiritual dalam recovery.',
      url: 'https://www.youtube.com/watch?v=rKK5v8vC-kU',
      thumbnailUrl: 'https://i.ytimg.com/vi/rKK5v8vC-kU/maxresdefault.jpg',
      category: 'Mental Health',
    },
    {
      title: 'The Reboot: Rebooting from Porn Addiction',
      description:
        'Penjelasan lengkap tentang proses reboot/recovery dari kecanduan pornografi. Mencakup fase-fase recovery, flatline, dan tips bertahan hingga akhir.',
      url: 'https://www.youtube.com/watch?v=_rz8b2I7H8I',
      thumbnailUrl: 'https://i.ytimg.com/vi/_rz8b2I7H8I/maxresdefault.jpg',
      category: 'Self-Improvement',
    },
    {
      title: 'Cold Shower Benefits for NoFap Recovery',
      description:
        'Manfaat cold shower untuk proses recovery dan cara melakukannya dengan benar. Cold shower adalah salah satu tool paling efektif untuk mengatasi urge.',
      url: 'https://www.youtube.com/watch?v=ZfZb7LqmD10',
      thumbnailUrl: 'https://i.ytimg.com/vi/ZfZb7LqmD10/maxresdefault.jpg',
      category: 'Wellness',
    },
    {
      title: 'Building Healthy Habits to Replace Addiction',
      description:
        'Cara membangun kebiasaan sehat untuk menggantikan kebiasaan buruk. Berdasarkan konsep Atomic Habits yang sangat applicable untuk recovery journey.',
      url: 'https://www.youtube.com/watch?v=PZ7lDrwYdZc',
      thumbnailUrl: 'https://i.ytimg.com/vi/PZ7lDrwYdZc/maxresdefault.jpg',
      category: 'Self-Improvement',
    },
    {
      title: 'Sleep Better: Tips for Recovery',
      description:
        'Tips berbasis sains untuk meningkatkan kualitas tidur. Tidur yang berkualitas sangat crucial dalam proses recovery karena membantu penyembuhan otak.',
      url: 'https://www.youtube.com/watch?v=nm1TxQj9IsQ',
      thumbnailUrl: 'https://i.ytimg.com/vi/nm1TxQj9IsQ/maxresdefault.jpg',
      category: 'Wellness',
    },
    {
      title: 'Mengelola Nafsu - Kajian Singkat',
      description:
        'Kajian Islam tentang cara mengelola nafsu dengan bijak. Memberikan perspektif spiritual yang penting dalam perjalanan recovery.',
      url: 'https://www.youtube.com/watch?v=5p7dN8kLcV4',
      thumbnailUrl: 'https://i.ytimg.com/vi/5p7dN8kLcV4/maxresdefault.jpg',
      category: 'Mental Health',
    },
  ];

  await prisma.educationContent.createMany({
    data: contents,
  });

  console.log('[database]: Seeded education content');
}
