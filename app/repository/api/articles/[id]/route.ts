import { Articles } from "@/app/repository/contracts/ArticleRepository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    const parsedId = Number.parseInt(id);

    if (isNaN(parsedId)) {
        return NextResponse.json(
            {
                error: 'Invalid Id',
                message: 'The Id must be a valid integer number'
            },
            { status: 400 } // Bad Request
        );
    }
    return NextResponse.json(await Articles.find(parsedId));
}