import Link from 'next/link';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { eq } from 'drizzle-orm';

import { Back } from './back';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import CommentSection from './comment-section';
import PaywallCard from './paywall-card';
import { db } from '../../db';
import { comments as commentsSchema } from '../../db/schema';
import DeleteEmailButton from './delete-email-button';
import NewsPageContent from './news-page-content';

export async function NewsPage({ url, userId }: { url: string; userId: string }) {
    let res = await fetch(url, { next: { revalidate: 0 } });
    if (res.status === 403) {
        res = await fetch(url, {
            headers: {
                try: '1',
            },
            next: { revalidate: 0 },
        });
    }
    if (res.status === 403) {
        res = await fetch(url, {
            headers: {
                try: '2',
            },
            next: { revalidate: 0 },
        });
    }
    if (res.status === 403) {
        res = await fetch(url, {
            headers: {
                try: '3',
            },
            next: { revalidate: 0 },
        });
    }
    if (res.status === 403) {
        res = await fetch(url, {
            headers: {
                try: '4',
            },
            next: { revalidate: 0 },
        });
    }

    if (res.status !== 200) {
        notFound();
    }

    const comments = (
        await db.select().from(commentsSchema).where(eq(commentsSchema.article, url)).limit(50)
    ).reverse();

    const contentHtml = await res.text();
    var doc = new JSDOM(contentHtml, {
        url,
    });
    let reader = new Readability(doc.window.document);
    let article = reader.parse();
    const cleanedContent = article?.content
        .replace('<p><h2>More on this story</h2></p>', '')
        .replace('<p><h2 type="normal">More on this story</h2></p>', '')
        .replaceAll('%7Bwidth%7D', '480')
        .replaceAll('<svg', '<svg width="16px"')
        .replace(/<img src="https:\/\/www.bbc.com\/bbcx\/grey-placeholder.png">/g, '');

    if (!cleanedContent || !article) {
        notFound();
    }
    const date = new Date(article.publishedTime);
    const displayDate = date.toLocaleDateString('de-CH');

    return (
        <div>
            <header className=" flex items-center bg-white">
                <div className="flex items-center justify-between p-2 text-xl group ml-10 left-0 absolute">
                    <Link href={{ pathname: '/', query: { userId: userId } }}>
                        <Back />
                    </Link>
                </div>
                <Link href={{ pathname: '/', query: { userId: userId } }} className="m-auto">
                    <Image
                        src="/connectNewsLogo1.png"
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{ width: '150px', height: 'auto' }}
                        alt="logo"
                    />
                </Link>
                <DeleteEmailButton userId={userId} />
            </header>
            <NewsPageContent
                article={article}
                cleanedContent={cleanedContent}
                displayDate={displayDate}
                comments={comments}
                userId={userId}
                url={url}
            />
        </div>
    );
}
