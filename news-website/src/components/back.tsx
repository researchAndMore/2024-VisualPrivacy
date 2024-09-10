import { Button } from '@/components/ui/button';

export function Back() {
    return (
        <Button className="flex items-center bg-slate-300 hover:bg-slate-400" variant="outline">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Home
        </Button>
    );
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </svg>
    );
}
