'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './gallery-manager.module.css';

interface GalleryImage {
    id: string;
    url: string;
    category: string;
    span: string;
    order: number;
}

export default function GalleryManager() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [newImage, setNewImage] = useState({ url: '', category: 'General', span: 'normal', order: 0 });

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        setImages(data);
        setLoading(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setAdding(true);

        let imageUrl = newImage.url;

        // If a file is selected, upload it first
        if (file) {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            try {
                const uploadRes = await fetch('/api/admin/upload', {
                    method: 'POST',
                    body: formData,
                });
                const uploadData = await uploadRes.json();
                if (uploadData.url) {
                    imageUrl = uploadData.url;
                } else {
                    alert('Upload failed: ' + (uploadData.error || 'Unknown error'));
                    setAdding(false);
                    setUploading(false);
                    return;
                }
            } catch (error) {
                console.error('Upload error:', error);
                alert('Upload failed');
                setAdding(false);
                setUploading(false);
                return;
            }
            setUploading(false);
        }

        if (!imageUrl) {
            alert('Please provide a URL or select a file');
            setAdding(false);
            return;
        }

        await fetch('/api/gallery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newImage, url: imageUrl }),
        });

        setNewImage({ url: '', category: 'General', span: 'normal', order: 0 });
        setFile(null);
        // Reset file input manually if needed, but simple state reset is usually enough for React form flow
        fetchImages();
        setAdding(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
        fetchImages();
    };

    if (loading) return <div className="admin-container">Loading...</div>;

    return (
        <div className="admin-container">
            <h1 className={styles.pageTitle}>Gallery Manager</h1>

            <section className={`admin-card ${styles.addSection}`}>
                <h3>Add New Image</h3>
                <form onSubmit={handleAdd} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setFile(e.target.files?.[0] || null)}
                            className={styles.fileInput}
                            aria-label="Upload image file"
                        />
                    </div>
                    <div className={styles.divider}>OR</div>
                    <div className={styles.inputGroup}>
                        <label>Image URL</label>
                        <input
                            type="text"
                            placeholder="e.g. /images/gallery/photo.jpg"
                            value={newImage.url}
                            onChange={e => setNewImage({ ...newImage, url: e.target.value })}
                        />
                    </div>
                    <select
                        value={newImage.category}
                        onChange={e => setNewImage({ ...newImage, category: e.target.value })}
                        aria-label="Image Category"
                    >
                        <option>General</option>
                        <option>Master Suite</option>
                        <option>Bedrooms</option>
                        <option>Living & Dining</option>
                        <option>Kitchen</option>
                        <option>Terraces & Garden</option>
                    </select>
                    <select
                        value={newImage.span}
                        onChange={e => setNewImage({ ...newImage, span: e.target.value })}
                        aria-label="Image Aspect Ratio"
                    >
                        <option value="normal">Normal (Landscape)</option>
                        <option value="tall">Tall (Portrait)</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Order"
                        value={newImage.order}
                        onChange={e => setNewImage({ ...newImage, order: parseInt(e.target.value) })}
                        aria-label="Image Display Order"
                    />
                    <button type="submit" disabled={adding || uploading}>
                        {uploading ? 'Uploading...' : adding ? 'Adding...' : 'Add Image'}
                    </button>
                </form>
            </section>

            <div className={styles.grid}>
                {images.map(img => (
                    <div key={img.id} className={styles.imageCard}>
                        <div className={styles.imagePreview}>
                            <Image src={img.url} alt={img.category} fill className={styles.img} sizes="200px" />
                        </div>
                        <div className={styles.imageInfo}>
                            <p><strong>{img.category}</strong> ({img.span})</p>
                            <p>Order: {img.order}</p>
                            <button onClick={() => handleDelete(img.id)} className={styles.deleteBtn}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
