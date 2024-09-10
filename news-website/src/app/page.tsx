import { MainPage } from '@/components/main-page';

export default function Home({ searchParams }: { searchParams?: { userId: string; source: string | undefined } }) {
    if (!searchParams?.userId)
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-4xl">Error: No userId found</h1>
            </div>
        );
    return (
        <main>
            <MainPage searchParams={searchParams} />
        </main>
    );
}
