import { NextRequest, NextResponse } from "next/server";
import { Articles } from "../../contracts/ArticleRepository";
import { Article } from "../../mock/data";


export const GET = async (request: NextRequest) => {
    return NextResponse.json(await Articles.all());
}


export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const article = await Articles.create({
            ...body,
            id: Math.floor(Math.random() * 10000)
        }) // Here would be necessary a model validation
        return NextResponse.json(article);
    } catch {
        return NextResponse.json({
            error: "Invalid input"
        }, { status: 400 })
    }

}