import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import Link from 'next/link';
import { NewsItem } from './types';

interface NewsCardProps {
    article: NewsItem;
    userId: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, userId }) => {
    const lastSlashIndex = article.link._text.lastIndexOf('/');
    const partAfterLastSlash =
        lastSlashIndex !== -1 ? article.link._text.substring(lastSlashIndex + 1) : article.link._text;

    const date = new Date(article.pubDate._text);
    const displayDate = date.toLocaleDateString('de-CH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric',
        // timeZoneName: 'short',
    });

    const imgSrcRegex = /<img.*?src=["'](.*?)["'].*?>/;
    const imgSrcMatch = article.description._text.match(imgSrcRegex);
    const imageSrc = imgSrcMatch && imgSrcMatch.length >= 2 && imgSrcMatch[1];
    const description = imageSrc ? article.description._text.replace(imgSrcMatch[0], '') : article.description._text;
    return (
        <Link
            href={{ pathname: `/article/${partAfterLastSlash}`, query: { userId: userId, url: article.link._text } }}
            style={{ alignContent: 'center' }}
        >
            <Card className="bg-slate-50 mb-2" style={{ maxWidth: 500 }}>
                <CardHeader>
                    <CardTitle>{article.title._text}</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* <h3 className="font-semibold text-lg md:text-xl">{article.title._text}</h3> */}
                    <p className="text-sm text-slate-500">{displayDate}</p>
                    {imageSrc && (
                        <div className="flex justify-center">
                            <img src={imageSrc} />
                        </div>
                    )}
                    <article
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                        className="text-lg mt-2 text-slate-700 font-light prose"
                    ></article>
                </CardContent>
            </Card>
        </Link>
    );
};
