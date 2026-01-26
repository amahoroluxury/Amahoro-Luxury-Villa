'use client';

import { motion } from 'framer-motion';
import Logo from './Logo';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  return (
    <motion.div 
      className={styles.overlay}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className={styles.logoWrapper}
        >
          <Logo height={120} theme="dark" />
        </motion.div>
        
        <motion.div 
          className={styles.loaderLine}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        <motion.span 
          className={styles.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Experience Peace
        </motion.span>
      </div>
    </motion.div>
  );
}
