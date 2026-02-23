import Link from 'next/link';
import Image from 'next/image';
import styles from './FeaturedSpaces.module.css';

const spaces = [
  {
    id: 1,
    title: 'Master Suite',
    description: 'A spacious retreat with spa bath and direct access to the garden terrace.',
    image: '/images/gallery/gallery-7.jpg'
  },
  {
    id: 2,
    title: 'Chef\'s Kitchen',
    description: 'High-end appliances, coffee station, and fully stocked for culinary needs.',
    image: '/images/gallery/gallery-5.jpeg'
  },
  {
    id: 3,
    title: 'Fire Pit',
    description: 'Enjoy a night cap with friends in our private, stone-lined outdoor fire pit.',
    image: '/images/gallery/FIRE PIT.jpg'
  },
  {
    id: 4,
    title: 'Tropical Garden',
    description: 'A lush sanctuary featuring a zen water fountain and exotic Rwandan flora.',
    image: '/images/gallery/TROPICAL GARDEN.jpg'
  },
  {
    id: 5,
    title: 'Outdoor Barbecue',
    description: 'A fully equipped outdoor kitchen and dining area for al fresco entertaining.',
    image: '/images/gallery/OUTDOOR BARBECUE.jpeg'
  },
  {
    id: 6,
    title: 'Cinema Room',
    description: 'State-of-the-art cinematic experience with plush seating and surround sound.',
    image: '/images/gallery/movie-room.png'
  }
];

const FeaturedSpaces = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Explore the Villa</span>
          <h2 className={styles.title}>Spaces Designed for Living</h2>
        </div>

        <div className={styles.grid}>
          {spaces.map((space) => (
            <div key={space.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  priority={space.id === 1}
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.spaceTitle}>{space.title}</h3>
                <p className={styles.spaceDescription}>{space.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/gallery" className="btn btn-secondary">
            View All Spaces
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpaces;
