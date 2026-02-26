const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const galleryImages = [
    { url: '/images/gallery/TROPICAL GARDEN.jpg', category: 'Terraces & Garden', span: 'tall', order: 1 },
    { url: '/images/gallery/FIRE PIT.jpg', category: 'Terraces & Garden', span: 'normal', order: 2 },
    { url: '/images/gallery/OUTDOOR BARBECUE.jpeg', category: 'Terraces & Garden', span: 'normal', order: 3 },
    { url: '/images/gallery/TERRACE VIEWS.jpeg', category: 'Terraces & Garden', span: 'normal', order: 4 },
    { url: '/images/gallery/CHEFS KITCHEN.jpg', category: 'Kitchen', span: 'tall', order: 5 },
    { url: '/images/gallery/Living Room.jpg', category: 'Living & Dining', span: 'normal', order: 6 },
    { url: '/images/gallery/Bed Rooms page/MASTER SUITE.jpg', category: 'Master Suite', span: 'normal', order: 7 },
    { url: '/images/gallery/Bed Rooms page/2nd-bedroom.jpg', category: 'Bedrooms', span: 'tall', order: 8 },
    { url: '/images/gallery/Bed Rooms page/3rd bedrooms.png', category: 'Bedrooms', span: 'tall', order: 9 },
    { url: '/images/gallery/Bed Rooms page/4TH BEDROOM.jpeg', category: 'Bedrooms', span: 'normal', order: 10 },
    { url: '/images/gallery/gallery-10.png', category: 'Bedrooms', span: 'tall', order: 11 },
    { url: '/images/gallery/gallery-11.jpg', category: 'Bedrooms', span: 'tall', order: 12 },
];

async function main() {
    console.log('Seeding gallery images...');
    for (const img of galleryImages) {
        await prisma.galleryImage.create({
            data: img,
        });
    }
    console.log('Seed complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
