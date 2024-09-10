import Link from 'next/link';
import { xml2json } from 'xml-js';

import { NewsCard } from './news-card';
import { NewsItem, RawBBCCard } from './types';
import clsx from 'clsx';
import Image from 'next/image';

export async function MainPage({ searchParams }: { searchParams: { userId: string; source: string | undefined } }) {
    const xmlSRF = await fetch('https://www.srf.ch/news/bnf/rss/19032223', { next: { revalidate: 3600 } }).then((res) =>
        res.text()
    );
    const jsonSRF = JSON.parse(xml2json(xmlSRF, { compact: true, spaces: 4 }));
    const articlesSRF = jsonSRF.rss?.channel?.item.slice(0, 8) as NewsItem[];

    const xmlBBC = await fetch('http://feeds.bbci.co.uk/news/world/rss.xml', { next: { revalidate: 3600 } }).then(
        (res) => res.text()
    );
    const jsonBBC = JSON.parse(xml2json(xmlBBC, { compact: true, spaces: 4 }));
    const articlesBBC = jsonBBC.rss?.channel?.item.slice(0, 8).map((articleCard: RawBBCCard): NewsItem => {
        return {
            title: { _text: articleCard.title._cdata },
            link: { _text: articleCard.link._text },
            description: { _text: articleCard.description._cdata },
            guid: { _text: articleCard.guid._text },
            pubDate: { _text: articleCard.pubDate._text },
        };
    }) as NewsItem[];

    const sliderStyle = clsx({
        'bg-slate-300 flex h-[34px] w-[100px] flex-shrink-0 items-center rounded-[8px] border border-[#dedfde] p-1 duration-300 ease-in-out after:h-[24px] after:w-[44px] after:rounded-md after:bg-slate-100 after:shadow-sm after:duration-300 after:border after:border-[#666666]/100 after:bg-gradient-to-b after:opacity-100 indeterminate:after:hidden':
            true,
        ' after:translate-x-[46px]': searchParams?.source === 'srf',
    });
    const BBCstyle = clsx({
        'py-1 transition-colors duration-300 inline-block w-[50px] cursor-pointer hover:text-black': true, //always applies
        'text-black': searchParams?.source === 'bbc',
    });
    const SRFstyle = clsx({
        'py-1 transition-colors duration-300 inline-block w-[50px] cursor-pointer hover:text-black': true, //always applies
        'text-black': searchParams?.source === 'srf',
    });

    return (
        <div className="flex flex-col min-h-screen">
            {/* <div className="text-red-500 p-2 text-center">
                <b>DISCLAIMER:</b> This site is under development.
                </a>
            </div> */}
            <header className=" flex items-center bg-white">
                <div className="flex items-center justify-between p-2 text-xl group ml-10 left-0 absolute">
                    <span className={sliderStyle}></span>
                    <span className="z-50 absolute p-1 text-sm flex justify-between text-center w-[100px] text-[#666666] hover:text-black ">
                        <Link
                            className={BBCstyle}
                            href={{ pathname: '/', query: { userId: searchParams.userId, source: 'bbc' } }}
                        >
                            BBC
                        </Link>
                        <Link
                            className={SRFstyle}
                            href={{ pathname: '/', query: { userId: searchParams.userId, source: 'srf' } }}
                        >
                            SRF
                        </Link>
                    </span>
                </div>

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
            <div className="flex flex-1 justify-center p-2">
                <div className="flex flex-col items-center mr-2">
                    {searchParams?.source === 'srf'
                        ? articlesSRF.map(
                              (article, index) =>
                                  index % 2 === 0 && (
                                      <NewsCard
                                          key={article.link._text}
                                          article={article}
                                          userId={searchParams.userId}
                                      />
                                  )
                          )
                        : articlesBBC.map(
                              (article, index) =>
                                  index % 2 === 0 && (
                                      <NewsCard
                                          key={article.link._text}
                                          article={article}
                                          userId={searchParams.userId}
                                      />
                                  )
                          )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {searchParams?.source === 'srf'
                        ? articlesSRF.map(
                              (article, index) =>
                                  index % 2 !== 0 && (
                                      <NewsCard
                                          key={article.link._text}
                                          article={article}
                                          userId={searchParams.userId}
                                      />
                                  )
                          )
                        : articlesBBC.map(
                              (article, index) =>
                                  index % 2 !== 0 && (
                                      <NewsCard
                                          key={article.link._text}
                                          article={article}
                                          userId={searchParams.userId}
                                      />
                                  )
                          )}
                </div>
                {/* <CookieBanner /> */}
            </div>
            {/* this is needed for the privacy chrome extension to know where the privacy link is */}
            <div className="hidden">
                <a href="/privacy">Hidden Link</a>
            </div>
        </div>
    );
}
