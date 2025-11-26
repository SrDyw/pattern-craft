import { wait } from "@/app/_libs/promiseUtils";
import { Article, articles } from "../mock/data";
import IArticleRepository from "./IArticlesRepository";

export default class ArticleRepository implements IArticleRepository {
    private _articles: Article[] = articles;


    async all(): Promise<Article[]> {
        await wait(1000);
        return this._articles;
    }
    async find(id: number): Promise<Article | undefined> {
        await wait(1000);
        return this._articles.find(x => x.id === id);
    }
    async create(article: Article): Promise<Article | undefined> {
        await wait(1000);
        this._articles = [...this._articles, article]
        return article;
    }
}

export const Articles: IArticleRepository = new ArticleRepository();