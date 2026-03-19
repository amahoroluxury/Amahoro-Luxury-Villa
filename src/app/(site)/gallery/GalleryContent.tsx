'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './gallery.module.css';

interface GalleryImage {
    id: string;
    url: string;
    category: string;
    span: string;
}

// Comprehensive fallback images ensuring no blank spaces
const fallbackImages: GalleryImage[] = [
    { id: 'f1', url: '/images/gallery/TROPICAL GARDEN.jpg', category: 'Tropical Garden', span: 'wide' },
    { id: 'f2', url: '/images/gallery/Living Room.jpg', category: 'Living Room', span: 'normal' },
    { id: 'f3', url: '/images/gallery/CHEFS KITCHEN.jpg', category: "Chef's Kitchen", span: 'normal' },
    { id: 'f4', url: '/images/gallery/master-suite.jpg', category: 'Master Suite', span: 'tall' },
    { id: 'f5', url: '/images/gallery/gallery-4.jpg', category: 'Villa Exterior', span: 'normal' },
    { id: 'f6', url: '/images/gallery/TERRACE VIEWS.jpeg', category: 'Terrace Views', span: 'normal' },
    { id: 'f7', url: '/images/gallery/FIRE PIT.jpg', category: 'Fire Pit', span: 'wide' },
    { id: 'f8', url: '/images/gallery/OUTDOOR BARBECUE.jpeg', category: 'Outdoor Barbecue', span: 'normal' },
    { id: 'f9', url: '/images/gallery/movie-room.png', category: 'Cinema Room', span: 'normal' },
    { id: 'f10', url: '/images/gallery/gallery-2.jpg', category: 'Villa Interior', span: 'tall' },
    { id: 'f11', url: '/images/gallery/gallery-3.jpg', category: 'Villa Details', span: 'normal' },
    { id: 'f12', url: '/images/gallery/gallery-7.jpg', category: 'Living Spaces', span: 'normal' },
    { id: 'f13', url: '/images/gallery/gallery-11.jpg', category: 'Garden Path', span: 'wide' },
    { id: 'f14', url: '/images/gallery/Bed Rooms page/MASTER SUITE.jpg', category: 'Master Bedroom', span: 'normal' },
    { id: 'f15', url: '/images/gallery/Bed Rooms page/2nd-bedroom.jpg', category: 'Second Bedroom', span: 'normal' },
    { id: 'f16', url: '/images/gallery/Bed Rooms page/3rd bedrooms.png', category: 'Third Bedroom', span: 'normal' },
    { id: 'f17', url: '/images/gallery/Bed Rooms page/4TH BEDROOM.jpeg', category: 'Fourth Bedroom', span: 'normal' },
    { id: 'f18', url: '/images/gallery/gallery-15.jpg', category: 'Patio Area', span: 'wide' },
    { id: 'f19', url: '/images/gallery/gallery-16.jpg', category: 'Dining Area', span: 'normal' },
    { id: 'f20', url: '/images/gallery/gallery-17.jpg', category: 'Sunset View', span: 'normal' },
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
                                    className={`${styles.galleryItem} ${styles[img.span] || ''}`}
                                    onClick={() => openLightbox(index)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.category}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
