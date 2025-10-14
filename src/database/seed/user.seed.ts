import prisma from '../prisma.js';

export async function seedUsers() {
  const usersData = [
    {
      googleId: '108234567890123456789',
      email: 'andre.wijaya@gmail.com',
      nickname: 'Andre',
      userWhy:
        'Saya ingin pulih dari kecanduan ini untuk memperbaiki hubungan dengan pasangan dan menjadi pribadi yang lebih baik bagi keluarga saya',
      checkinTime: new Date('2024-01-01T07:00:00Z'),
    },
    {
      googleId: '109876543210987654321',
      email: 'budi.santoso@gmail.com',
      nickname: 'Budi',
      userWhy:
        'Ingin membangun hubungan yang sehat dan bermakna. Saya ingin menjadi partner yang lebih baik dan tidak membawa kebiasaan buruk ini ke dalam kehidupan saya',
      checkinTime: new Date('2024-01-01T06:30:00Z'),
    },
    {
      googleId: '107654321098765432109',
      email: 'david.chen@yahoo.com',
      nickname: 'David',
      userWhy:
        'Sudah 8 tahun terjebak dalam kecanduan ini. Produktivitas kerja menurun drastis dan saya kehilangan banyak kesempatan. Saya ingin hidup yang lebih bermakna dan produktif',
      checkinTime: new Date('2024-01-01T08:00:00Z'),
    },
    {
      googleId: '106543210987654321098',
      email: 'ryan.pratama@gmail.com',
      nickname: 'Ryan',
      userWhy:
        'Kecanduan ini merusak kesehatan mental saya. Saya sering merasa cemas, depresi, dan kehilangan motivasi. Saya ingin kembali merasakan kebahagiaan yang sejati',
      checkinTime: new Date('2024-01-01T06:00:00Z'),
    },
    {
      googleId: '105432109876543210987',
      email: 'faisal.rahman@outlook.com',
      nickname: 'Faisal',
      userWhy:
        'Sebagai mahasiswa, kecanduan ini sangat mengganggu studi saya. IPK menurun dan saya kehilangan fokus. Ingin lulus dengan prestasi yang baik dan punya masa depan cerah',
      checkinTime: new Date('2024-01-01T07:30:00Z'),
    },
    {
      googleId: '104321098765432109876',
      email: 'eric.tan@gmail.com',
      nickname: 'Eric',
      userWhy:
        'Saya ingin tumbuh secara spiritual dan mental. Kecanduan ini membuat saya merasa jauh dari nilai-nilai yang saya yakini dan menghambat pertumbuhan pribadi saya',
      checkinTime: new Date('2024-01-01T05:30:00Z'),
    },
  ];

  const users = await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true,
  });

  console.log(`[database]: Seeded ${users.count} users.`);
}
