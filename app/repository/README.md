# Repository Pattern

The repository pattern is an abstraction over data storage that separates data access logic from business logic. This is very useful in large applications to maintain scalability.

## Benefits:

#### 1. Decoupling  
Data access logic is completely separated from business logic, which is crucial in large applications.

#### 2. Easy to maintain and scale
Since modules are separated, we can make changes to specific parts without affecting the rest.

#### 3. Organization
This pattern helps keep our code clean and organized.

## Implementation:

### 1. Contract (Interface)
```tsx
export default interface IArticleRepository {
    all(): Promise<Article[]>;
    find(id: number): Promise<Article | undefined>;
    create(article: Article): Promise<Article | undefined>;
}
```

### 2. Implementation
```tsx
import { Article, articles as mockData } from "./data";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default class ArticleRepository implements IArticleRepository {
    private _articles: Article[] = mockData;

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
        this._articles = [...this._articles, article];
        return article;
    }
}

export const Articles: IArticleRepository = new ArticleRepository();
```

### 3. API Routes

**GET all articles** (`/repository/api/articles/route.ts`):
```tsx
import { NextRequest, NextResponse } from "next/server";
import { Articles } from "../../contracts/ArticleRepository";

export const GET = async (request: NextRequest) => {
    return NextResponse.json(await Articles.all());
}

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const article = await Articles.create({
            ...body,
            id: Math.floor(Math.random() * 10000)
        });
        return NextResponse.json(article);
    } catch {
        return NextResponse.json({
            error: "Invalid input"
        }, { status: 400 });
    }
}
```

**GET article by ID** (`/repository/api/articles/[id]/route.ts`):
```tsx
import { Articles } from "@/app/repository/contracts/ArticleRepository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const parsedId = Number.parseInt(id);

    if (isNaN(parsedId)) {
        return NextResponse.json(
            {
                error: 'Invalid Id',
                message: 'The Id must be a valid integer number'
            },
            { status: 400 }
        );
    }
    return NextResponse.json(await Articles.find(parsedId));
}
```

### 4. Data Model
```tsx
export type Article = {
    id: number;
    title: string;
    description: string;
    author: string;
    category: string;
};

export const articles: Article[] = [
    {
        id: 1,
        title: "Article 1",
        description: "Description 1",
        author: "Author 1",
        category: "Technology"
    },
    {
        id: 2,
        title: "Article 2", 
        description: "Description 2",
        author: "Author 2",
        category: "Science"
    }
];
```

## Usage:
The repository provides a clean interface for data operations while abstracting the underlying implementation. Components can use the repository without knowing how data is stored or retrieved.