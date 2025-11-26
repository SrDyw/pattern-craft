import { Article } from "../mock/data";

export default interface IArticleRepository {
    all(): Promise<Article[]>;
    find(id: number): Promise<Article | undefined>;
    create(article: Article): Promise<Article | undefined>
}