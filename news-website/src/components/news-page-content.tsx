'use client';

import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import PaywallCard from './paywall-card';
import CommentSection from './comment-section';
import { Comment } from '../../db/schema';
import { RefObject, use, useEffect, useRef, useState } from 'react';

const NewsPageContent = ({
    article,
    cleanedContent,
    displayDate,
    comments,
    userId,
    url,
}: {
    article: { title: string };
    cleanedContent: string;
    displayDate: string;
    comments: Comment[];
    userId: string;
    url: string;
}) => {
    const bottomRef: RefObject<HTMLButtonElement> = useRef(null);
    // const [buttonClicked, setButtonClicked] = useState(false);
    // const [bottomReached, setBottomReached] = useState(false);

    // if (typeof window !== 'undefined') {
    //     window.onscroll = () => {
    //         if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //             setIsAtBottom(true);
    //             console.log('bottom');
    //         } else {
    //             setIsAtBottom(false);
    //             console.log('not bottom');
    //         }
    //     };
    // }

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         window.onscroll = () => {
    //             if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //                 console.log('asdf');
    //                 setBottomReached(true);
    //             }
    //         };
    //     }
    // }, []);

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-slate-200">
            <div className="flex items-center justify-center">
                <button
                    onClick={() => {
                        if (bottomRef.current) {
                            // setButtonClicked(true);
                            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="fixed top-1/2 right-12 inline-flex items-center justify-center rounded-xl bg-yellow-400 px-8 py-3 font-semibold shadow transition-colors hover:bg-yellow-500 transform -translate-y-1/2"
                >
                    <span className="mr-2">Comment Below</span>
                    <ArrowDownIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 p-4 md:p-6 w-full max-w-4xl">
                <PaywallCard userId={userId} />
                <div className="flex flex-col items-center">
                    <Card className="mb-5 bg-slate-50">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-slate-800 font-serif">
                                {article.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-slate-500 font-medium">Published on {displayDate}</p>
                            <article
                                dangerouslySetInnerHTML={{ __html: cleanedContent }}
                                className="text-lg mt-2 text-slate-700 font-light prose"
                            ></article>
                        </CardContent>
                    </Card>
                    <CommentSection userId={userId} url={url} comments={comments} ref={bottomRef} />
                </div>
            </div>
            {/* <div ref={bottomRef}></div> */}
        </div>
    );
};

function ArrowDownIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
        </svg>
    );
}

export default NewsPageContent;
