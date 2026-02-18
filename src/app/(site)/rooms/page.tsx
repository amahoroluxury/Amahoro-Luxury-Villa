import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import styles from './rooms.module.css';

export const metadata: Metadata = {
  title: 'Accommodation',
  description: 'Explore our Afro-Modern suites designed for rest and privacy. 4 luxurious bedrooms with ensuite bathrooms and private vistas.',
};

const rooms = [
  {
    id: 'master-suite',
    name: 'Master Suite',
    description: 'The ultimate sanctuary featuring private balcony views and a spa-like ensuite.',
    features: ['King bed', 'Ensuite bath', 'Balcony views', 'Walk out to terrace', 'Spa bath with soaker tub'],
    image: '/images/gallery/Bed Rooms page/MASTER SUITE.jpg'
  },
  {
    id: 'bedroom-2',
    name: 'Bedroom 2',
    description: 'Elegantly designed with sliding doors to the patio and natural ventilation.',
    features: ['Queen bed', 'Ensuite bathroom', 'Sliding doors to patios', 'Mosquito nets', 'Quiet ceiling fans'],
    image: '/images/gallery/Bed Rooms page/2nd-bedroom.jpg'
  },
  {
    id: 'bedroom-3',
    name: 'Bedroom 3',
    description: 'A peaceful retreat with direct access to the lush outdoor spaces.',
    features: ['Queen bed', 'Ensuite bathroom', 'Sliding doors to patios', 'Mosquito nets', 'Quiet ceiling fans'],
    image: '/images/gallery/Bed Rooms page/3rd bedrooms.png'
  },
  {
    id: 'bedroom-4',
    name: 'Bedroom 4',
    description: 'Perfect for guests needing a quiet workspace without compromising on comfort.',
    features: ['Full bed', 'Workspace desk', 'Sliding door to patio', 'Ensuite bathroom'],
    image: '/images/gallery/Bed Rooms page/4TH BEDROOM.jpeg'
  }
];

export default function RoomsPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>Accommodation</span>
          <h1>Your private space, perfected for rest</h1>
          <p className={styles.lead}>
            Each room is thoughtfully designed with premium bedding, modern lighting, and calm comfort—so you wake up refreshed and ready for Kigali.
          </p>
        </div>
      </header>

      <section className={styles.roomsList}>
        <div className="container">
          {rooms.map((room, index) => (
            <div key={room.id} className={`${styles.roomRow} ${index % 2 !== 0 ? styles.reverse : ''}`}>
              <div className={styles.roomImage}>
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.img}
                />
              </div>
              <div className={styles.roomContent}>
                <span className={styles.roomNum}>0{index + 1}</span>
                <h2>{room.name}</h2>
                <p>{room.description}</p>
                <ul className={styles.features}>
                  {room.features.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.globalFeatures}>
        <div className="container">
          <div className={styles.globalCard}>
            <h3>All rooms include</h3>
            <p>Premium bedding, wardrobe space, blackout curtains, and modern lighting.</p>
            <Link href="/book" className={styles.primaryBtn}>Check Availability</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
