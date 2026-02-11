'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './faq.module.css';

const faqs = [
  {
    question: 'Is airport pickup available?',
    answer: 'Yes, with advance notice. We can arrange a private driver to meet you at Kigali International Airport and bring you directly to the villa.'
  },
  {
    question: 'Is early check-in or late check-out allowed?',
    answer: 'Based on availability. Please request early check-in or late check-out before your arrival, and we will do our best to accommodate your schedule.'
  },
  {
    question: 'Are events allowed?',
    answer: 'Small gatherings are permitted with prior approval. However, we maintain a 10 PM outdoor curfew to respect the peace and quiet of the Kibagabaga community.'
  },
  {
    question: 'How do payments work and what is Flutterwave?',
    answer: 'A minimum 50% deposit is required to confirm your reservation. Flutterwave is our secure payment gateway that accepts Visa, Mastercard, MTN Mobile Money, and PayPal. The remaining balance must be paid before check-in.'
  },
  {
    question: 'Is the villa family friendly?',
    answer: 'Absolutely. Amahoro Luxury Villa is ideal for families. We provide a portable crib, high chair, and children&apos;s dishes upon request to make your stay comfortable.'
  },
  {
    question: 'Do you offer monthly rentals?',
    answer: 'Yes, we accept monthly rentals. Please contact us directly or mention your interest in the booking request for special long-term rates.'
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>Common Questions</span>
          <h1>Everything you need to know</h1>
          <p className={styles.lead}>
            Find answers to common questions about your stay at  Amahoro Luxury Villa .
          </p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
              >
                <button
                  className={styles.question}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className={styles.answerWrapper}>
                  <div className={styles.answer}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
