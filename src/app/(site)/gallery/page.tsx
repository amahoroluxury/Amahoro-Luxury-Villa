import { Metadata } from 'next';
import GalleryContent from './GalleryContent';
import styles from './gallery.module.css';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'A visual glimpse into your Kigali retreat. Explore the villa’s spaces, tropical garden, and modern interiors.',
};

export default function GalleryPage() {
  return <GalleryContent />;
}
