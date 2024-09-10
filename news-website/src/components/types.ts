export type NewsItem = {
    title: { _text: string };
    link: { _text: string };
    pubDate: { _text: string };
    guid: { _text: string };
    description: { _text: string };
};

export type SearchParams = { [key: string]: string | undefined };

export type RawBBCCard = {
    title: { _cdata: string };
    description: { _cdata: string };
    link: { _text: string };
    guid: {
        _attributes: {
            isPermaLink: boolean;
        };
        _text: string;
    };
    pubDate: { _text: string };
};
