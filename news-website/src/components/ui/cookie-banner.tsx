'use client';

import { Button } from '@/components/ui/button';
import { addCookiesState, handlePrivacyPolicyClicked, navigate, userInteractedWithCookies } from '@/app/actions';
import { useEffect, useState } from 'react';

export default function CookieBanner({ userId }: { userId: string }) {
    const [handled, setHandled] = useState(true);

    useEffect(() => {
        const checkCookies = async () => {
            const interacted = await userInteractedWithCookies(userId);
            if (interacted) setHandled(true);
            else setHandled(false);
        };

        checkCookies();
    }, [userId]);

    if (handled) {
        return null;
    }

    return (
        <div className="flex fixed h-48 bottom-0 w-full p-4 bg-white items-center md:px-6">
            <div className="flex-1 space-y-2 flex flex-col">
                <p className="text-gray-500 text-xl">We use cookies to improve your experience on our site.</p>
                <p className="text-gray-500">
                    By using our site, you acknowledge that you have read and understand our{' '}
                    <button
                        onClick={async () => {
                            await handlePrivacyPolicyClicked(userId);
                            navigate(`/privacy?userId=${userId}`);
                        }}
                        className="underline underline-offset-2"
                    >
                        Privacy Policy
                    </button>
                    .
                </p>
            </div>
            <div className="flex space-x-4 pr-10">
                <Button
                    className="w-28 h-14 mr-2 bg-gray-300 hover:bg-slate-400"
                    variant="outline"
                    onClick={() => {
                        addCookiesState(userId, false);
                        setHandled(true);
                    }}
                >
                    Decline
                </Button>
                <Button
                    className="w-28 h-14 bg-gray-300 hover:bg-slate-400"
                    variant="outline"
                    onClick={() => {
                        addCookiesState(userId, true);
                        setHandled(true);
                        // setCookie('localConsent', 'true', {});
                    }}
                >
                    Accept
                </Button>
            </div>
        </div>
    );
}
