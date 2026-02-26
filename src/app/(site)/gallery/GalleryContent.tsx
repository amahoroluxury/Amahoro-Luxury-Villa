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

export default function GalleryContent() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/gallery');
                const data = await res.json();
                setImages(data);
            } catch (error) {
                console.error('Failed to fetch gallery images:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

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
                        <div className={styles.masonryGrid}>
                            {images.map((img) => (
                                <div
                                    key={img.id}
                                    className={`${styles.masonryItem} ${styles[img.span]}`}
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
        </div>
    );
}
