'use client';

import { createUser, getLatestUserFromId } from '@/app/actions';
import { useState, useRef, useEffect } from 'react';

const PaywallCard = ({ userId }: { userId: string }) => {
    const [userHasAccess, setUserHasAccess] = useState(true);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const start = new Date().getTime();

    useEffect(() => {
        async function handleId() {
            const user = await getLatestUserFromId(userId);
            if (!user || user.deleteButtonClicked) setUserHasAccess(false);
        }
        handleId();
    }, [userId]);

    const handleUnlock = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const end = new Date().getTime();
        if (emailInputRef.current?.value) {
            await createUser(userId, emailInputRef.current?.value, end - start);
            setUserHasAccess(true);
        }
    };

    useEffect(() => {
        document.body.style.overflow = userHasAccess ? 'auto' : 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [userHasAccess]);

    if (userHasAccess) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex z-50 overflow-auto overscroll-none">
            <div className="bg-white border-2 border-gray-300 p-12 text-center w-full h-1/2 relative top-2/3 shadow-md">
                <h2 className="text-xl">Provide your email address to see this article</h2>
                <form onSubmit={handleUnlock} className="flex flex-col items-center mt-5">
                    <input
                        ref={emailInputRef}
                        className="p-2 border border-gray-300 w-1/4"
                        type="email"
                        required
                        placeholder="Email"
                    />
                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 mt-5 hover:bg-green-400 cursor-pointer rounded-sm"
                    >
                        Unlock Article
                    </button>
                </form>
            </div>
        </div>
    );
};

// const validateEmail = (email: string) => {
//     const validate = String(email)
//         .toLowerCase()
//         .match(
//             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         );

//     if (validate) {
//         return true;
//     }
//     return false;
// };

export default PaywallCard;
