import { Metadata } from 'next';
import styles from './house-rules.module.css';

export const metadata: Metadata = {
    title: 'House Rules',
    description: 'To ensure a peaceful stay for everyone, please review our house rules regarding smoking, quiet hours, and property care.',
};

export default function HouseRulesPage() {
    const rules = [
        {
            title: 'Check-in & Check-out',
            content: 'Check-in is from 2:00 PM. Check-out is by 11:00 AM. Early check-in or late check-out may be available upon request and is subject to availability.'
        },
        {
            title: 'Smoking Policy',
            content: 'Amahoro Luxury Villa is a non-smoking property. Smoking is strictly prohibited inside the villa. Guests may smoke in designated outdoor areas.'
        },
        {
            title: 'Quiet Hours',
            content: 'To respect our neighbors in the Kibagabaga community, we observe quiet hours from 10:00 PM to 7:00 AM.'
        },
        {
            title: 'Events & Gatherings',
            content: 'Small gatherings are allowed with prior approval. Large parties or loud events are strictly prohibited.'
        },
        {
            title: 'Pets',
            content: 'Pets are not allowed on the property unless specifically agreed upon in writing prior to booking.'
        },
        {
            title: 'Kitchen Use',
            content: 'Guests are welcome to use the fully stocked chef\'s kitchen. Please ensure appliances are handled with care and the space is left tidy.'
        }
    ];

    return (
        <div className={styles.wrapper}>
            <header className={styles.pageHeader}>
                <div className="container">
                    <span className={styles.label}>Guest Information</span>
                    <h1>House Rules</h1>
                    <p className={styles.lead}>
                        To ensure a peaceful and enjoyable stay for all our guests, please observe the following guidelines.
                    </p>
                </div>
            </header>

            <section className="section-padding">
                <div className="container">
                    <div className={styles.contentWrapper}>
                        {rules.map((rule, index) => (
                            <div key={index} className={styles.ruleItem}>
                                <h3 className={styles.ruleTitle}>
                                    {rule.title}
                                </h3>
                                <p className={styles.ruleContent}>
                                    {rule.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
