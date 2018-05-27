export enum ArticleType {
    News = 'news',
    Release = 'release',
    Page = 'page',
    Post = 'post'
}

export class Article {
    title: string;
    date: string;
    type: ArticleType;
    text: string;
    thumbnail: string;
}

export class ArticleWithKey {
    key: string;
    article: Article;
}
