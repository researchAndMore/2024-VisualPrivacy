'use client';

// import type { Metadata } from 'next';
import { redirect, useSearchParams } from 'next/navigation';
import CookieBanner from '../components/ui/cookie-banner';
import './globals.css';
import ChromeExtensionMockup from '@/components/extension_mockup/chrome-extension-mockup';
import { useEffect, useState } from 'react';
import { createInteractionData } from './actions';

// export const metadata: Metadata = {
//     title: 'Daily News',
//     description: 'This website shows the latest news in Switzerland.',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();

    const userId = searchParams.get('userId');
    if (!userId) {
        const randomId = Math.random().toString(36).substring(5);
        redirect(`?userId=${randomId}`);
    }

    const [privacyRating, setPrivacyRating] = useState<string | null>(null);

    useEffect(() => {
        if (userId && userId.slice(-2).toLowerCase() === 'gr') setPrivacyRating('B');
        else if (userId && userId.slice(-2).toLowerCase() === 'br') setPrivacyRating('F');
        const createInteractionEntry = async () => {
            await createInteractionData(userId);
        };
        createInteractionEntry();
        // else {
        //     const randomCharacter = getRandomCharacter();
        //     setPrivacyRating(randomCharacter);
        // }
        //     // Add event listener for messages from the Chrome extension
        //     const handleMessage = (event: MessageEvent) => {
        //         const data: PrivacyPolicyInteraction = {
        //             userId: userId,
        //         };
        //         if (event.data.buttonPress === 'collection') data.collection = true;
        //         if (event.data.buttonPress === 'sharing') data.sharing = true;
        //         if (event.data.buttonPress === 'control') data.control = true;
        //         if (event.data.buttonPress === 'security') data.security = true;
        //         handlePrivacyExtensionButtonClicked(data);
        //     };
        //     window.addEventListener('message', handleMessage);
        //     return () => {
        //         window.removeEventListener('message', handleMessage);
        //     };
    }, [userId]);

    // const userIdRegex = /\d{3}(GR|gr|BR|br)/;

    return (
        <html lang="en">
            <body className="bg-slate-100">
                {children} <CookieBanner userId={userId} />
                {typeof window !== 'undefined' && privacyRating && (
                    <ChromeExtensionMockup userId={userId} privacyRating={privacyRating} />
                )}
            </body>
        </html>
    );
}

const getRandomCharacter = () => {
    // Generate a random number between 0 and 6 (inclusive)
    var randomNumber = Math.floor(Math.random() * 7);
    // Map the random number to a character between 'A' and 'G'
    var randomCharacter = String.fromCharCode('A'.charCodeAt(0) + randomNumber);
    return randomCharacter;
};
