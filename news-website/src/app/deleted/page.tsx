import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SearchParams } from '@/components/types';

export default function Deleted({ searchParams }: { searchParams?: SearchParams }) {
    return (
        <main className="min-h-screen">
            <header className=" flex items-center bg-white">
                <Link
                    href={{ pathname: '/', query: { userId: searchParams?.userId } }}
                    className="justify-self-center m-auto"
                >
                    <Image
                        src="/connectNewsLogo1.png"
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{ width: '150px', height: 'auto' }}
                        alt="logo"
                    />
                </Link>
            </header>
            <div className="text-center mt-10 text-xl">
                <div>Your email has been deleted successfully</div>
                <Link
                    className="inline-flex items-center justify-center mt-5"
                    href={{ pathname: '/', query: { userId: searchParams?.userId } }}
                >
                    <Button className="flex items-center bg-slate-300 hover:bg-slate-400" variant="outline">
                        Home
                    </Button>
                </Link>
            </div>
        </main>
    );
}
