import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Complete Your Payment',
    description: 'Finalize your reservation at Amahoro Luxury Villa. Secure payment for your remaining balance.',
};

export default function PayBalanceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
