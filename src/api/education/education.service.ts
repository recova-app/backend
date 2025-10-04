import prisma from '../../database/prisma.js';

export async function findAllEducationContents() {
  const contents = await prisma.educationContent.findMany({
    orderBy: {
      title: 'asc',
    },
  });

  return contents;
}
