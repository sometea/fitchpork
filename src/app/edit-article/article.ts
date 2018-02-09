export class Article {
    title: string;
    date: string;
    text: string;
}

export class ArticleWithKey {
    key: string;
    article: Article;
}