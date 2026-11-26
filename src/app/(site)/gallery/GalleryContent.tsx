'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './gallery.module.css';

interface GalleryImage {
    id: string;
    url: string;
    category: string;
    span?: string;
    width?: number;
    height?: number;
}

// Default gallery photos. Shown unless 8+ photos have been added in the admin gallery.
// Laid out as a masonry grid: each photo keeps its own shape, so there are no gaps or awkward crops.
const fallbackImages: GalleryImage[] = [
    { id: 'g1', url: '/images/site/gallery-pool-night-aerial.webp', category: 'Pool at Night', width: 1600, height: 890 },
    { id: 'g2', url: '/images/site/gallery-fountain.webp', category: 'Zen Fountain', width: 863, height: 1296 },
    { id: 'g3', url: '/images/site/gallery-bedroom-2.webp', category: 'Bedroom 2', width: 1600, height: 1203 },
    { id: 'g4', url: '/images/site/gallery-pool-at-dawn.webp', category: 'Pool at Dawn', width: 1080, height: 810 },
    { id: 'g5', url: '/images/site/gallery-living-room.webp', category: 'Living Room', width: 1600, height: 1185 },
    { id: 'g6', url: '/images/site/gallery-night-pool.webp', category: 'Night-time Pool', width: 1600, height: 1212 },
    { id: 'g7', url: '/images/site/gallery-garden-path.webp', category: 'Garden Path', width: 1200, height: 1600 },
    { id: 'g8', url: '/images/site/gallery-master-desk.webp', category: 'Master Suite Desk', width: 1600, height: 1162 },
    { id: 'g9', url: '/images/site/gallery-garden-late-afternoon.webp', category: 'Garden in the Late Afternoon', width: 1600, height: 929 },
    { id: 'g10', url: '/images/site/gallery-evening-fire-pit.webp', category: 'Evening Fire Pit', width: 965, height: 1304 },
    { id: 'g11', url: '/images/site/gallery-movie-room.webp', category: 'Movie Room', width: 1600, height: 1239 },
    { id: 'g12', url: '/images/site/home-pool.webp', category: 'Pool & Garden', width: 1400, height: 1063 },
];

export default function GalleryContent() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/gallery');
                const data = await res.json();
                // Use API data if we have enough images, otherwise fallback
                setImages(data && data.length >= 8 ? data : fallbackImages);
            } catch (error) {
                console.error('Failed to fetch gallery images:', error);
                setImages(fallbackImages);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const lightboxPrev = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    };
    const lightboxNext = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % images.length);
    };

    // Handle keyboard navigation in lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowLeft') setLightboxIndex(prev => prev === null ? null : (prev - 1 + images.length) % images.length);
            if (e.key === 'ArrowRight') setLightboxIndex(prev => prev === null ? null : (prev + 1) % images.length);
        };
        if (lightboxIndex !== null) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [lightboxIndex, images.length]);

    return (
        <div className={styles.wrapper}>
            <header className={styles.pageHeader}>
                <div className="container">
                    <span className={styles.label}>Visual Experience</span>
                    <h1>A glimpse into your Kigali retreat</h1>
                </div>
            </header>

            <section className="section-padding">
                <div className="container">
                    {loading ? (
                        <div className={styles.loader}>Loading gallery...</div>
                    ) : (
                        <div className={styles.galleryGrid}>
                            {images.map((img, index) => (
                                <div
                                    key={img.id}
                                    className={styles.galleryItem}
                                    onClick={() => openLightbox(index)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.category}
                                        width={img.width || 1600}
                                        height={img.height || 1200}
                                        sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className={styles.img}
                                    />
                                    <div className={styles.overlay}>
                                        <span>{img.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div className={styles.lightboxOverlay} onClick={closeLightbox}>
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
                            ✕
                        </button>
                        <button className={styles.lightboxPrev} onClick={lightboxPrev} aria-label="Previous">
                            ‹
                        </button>
                        <div className={styles.lightboxImageWrapper}>
                            <Image
                                src={images[lightboxIndex].url}
                                alt={images[lightboxIndex].category}
                                fill
                                className={styles.lightboxImage}
                                sizes="95vw"
                                priority
                            />
                        </div>
                        <button className={styles.lightboxNext} onClick={lightboxNext} aria-label="Next">
                            ›
                        </button>
                        <div className={styles.lightboxCaption}>
                            <span>{images[lightboxIndex].category}</span>
                            <span className={styles.lightboxCount}>
                                {lightboxIndex + 1} / {images.length}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
