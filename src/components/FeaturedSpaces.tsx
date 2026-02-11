import Link from 'next/link';
import Image from 'next/image';
import styles from './FeaturedSpaces.module.css';

const spaces = [
  {
    id: 1,
    title: 'Master Suite',
    description: 'A spacious retreat with spa bath and direct access to the garden terrace.',
    image: '/images/gallery/gallery-7.jpg',
    span: 'normal'
  },
  {
    id: 2,
    title: 'Chef\'s Kitchen',
    description: 'High-end appliances, coffee station, and fully stocked for culinary needs.',
    image: '/images/gallery/gallery-5.jpg',
    span: 'wide'
  },
  {
    id: 3,
    title: 'Fire Pit',
    description: 'Enjoy a night cap with friends in the private outdoor fire pit area.',
    image: '/images/gallery/gallery-14.jpg',
    span: 'normal'
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
            <div key={space.id} className={`${styles.card} ${space.span === 'wide' ? styles.wide : ''}`}>
              <div className={styles.imageWrapper}>
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
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
