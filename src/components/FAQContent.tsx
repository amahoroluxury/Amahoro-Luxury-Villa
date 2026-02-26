'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from '@/app/(site)/faq/faq.module.css';

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
        answer: 'Full payment (100%) is required at the time of booking. Flutterwave is our secure payment gateway that accepts Visa, Mastercard, MTN Mobile Money, and PayPal. A 20% refundable damage fee is also collected and will be refunded within 12 hours after checkout supervision, provided the property is left in good condition.'
    },
    {
        question: 'Is the villa family friendly?',
        answer: 'Absolutely. Amahoro Luxury Villa is ideal for families. We provide a portable crib, high chair, and children\'s dishes upon request to make your stay comfortable.'
    },
    {
        question: 'Do you offer monthly rentals?',
        answer: 'Yes, we accept monthly rentals. Please contact us directly or mention your interest in the booking request for special long-term rates.'
    },
];

export default function FAQContent() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="section-padding">
                <div className="container">
                    <div className={styles.faqList}>
                        {faqs.map((faq, index) => {
                            const isExpanded = activeIndex === index;
                            return (
                                <div
                                    key={index}
                                    className={`${styles.faqItem} ${isExpanded ? styles.active : ''}`}
                                >
                                    <button
                                        className={styles.question}
                                        onClick={() => toggleFAQ(index)}
                                        aria-expanded={isExpanded}
                                        aria-controls={`faq-answer-${index}`}
                                    >
                                        {faq.question}
                                        {isExpanded ? (
                                            <ChevronUp size={20} aria-hidden={true} />
                                        ) : (
                                            <ChevronDown size={20} aria-hidden={true} />
                                        )}
                                    </button>
                                    <div
                                        id={`faq-answer-${index}`}
                                        className={styles.answerWrapper}
                                        role="region"
                                    >
                                        <div className={styles.answer}>
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
