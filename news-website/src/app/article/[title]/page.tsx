import { NewsPage } from '@/components/news-page';
import { SearchParams } from '@/components/types';
import { notFound } from 'next/navigation';

export default function Home({ params, searchParams }: { params: { slug: string }; searchParams?: SearchParams }) {
    if (!searchParams?.url || !searchParams?.userId) {
        notFound();
    }
    return (
        <main>
            <NewsPage userId={searchParams.userId} url={searchParams.url} />
        </main>
    );
}
