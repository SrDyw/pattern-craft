// components/ArticleDetails.tsx
"use client"

import { useState, useEffect } from "react";
import { Article } from "@/app/repository/mock/data";
import Image from "next/image";

export default function ArticleDetails({ id }: { id: string }) {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchArticle() {
            try {
                setLoading(true);
                const response = await fetch(`/repository/api/articles/${id}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Artículo no encontrado');
                    }
                    throw new Error('Error al cargar el artículo');
                }

                const data = await response.json();
                setArticle(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        }

        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-16 px-6 bg-white dark:bg-black sm:items-start sm:px-16 sm:py-24">
                    <div className="w-full flex flex-col items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mb-4"></div>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400">Cargando artículo...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-16 px-6 bg-white dark:bg-black sm:items-start sm:px-16 sm:py-24">
                    <div className="w-full text-center py-16">
                        <div className="text-6xl mb-4">😕</div>
                        <h1 className="text-2xl font-bold text-black dark:text-zinc-50 mb-4">Error</h1>
                        <p className="text-lg text-red-600 dark:text-red-400 mb-6">{error}</p>
                        <button
                            onClick={() => window.history.back()}
                            className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
                        >
                            ← Volver atrás
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-16 px-6 bg-white dark:bg-black sm:items-start sm:px-16 sm:py-24">
                    <div className="w-full text-center py-16">
                        <div className="text-6xl mb-4">📝</div>
                        <h1 className="text-2xl font-bold text-black dark:text-zinc-50 mb-4">Artículo no encontrado</h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">El artículo que buscas no existe o ha sido eliminado.</p>
                        <button
                            onClick={() => window.history.back()}
                            className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
                        >
                            ← Volver atrás
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-16 px-6 bg-white dark:bg-black sm:items-start sm:px-16 sm:py-24">

                {/* Header */}
                <div className="w-full mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors mb-6"
                    >
                        ← Volver a artículos
                    </button>

                    <Image
                        className="dark:invert mb-6"
                        src="/next.svg"
                        alt="Next.js logo"
                        width={100}
                        height={20}
                        priority
                    />
                </div>

                {/* Article Content */}
                <article className="w-full flex-1">
                    {/* Category Badge */}
                    {
                        article.category != "" && (
                            <div className="mb-6">
                                <span className="inline-block px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full">
                                    {article.category}
                                </span>
                            </div>
                        )
                    }

                    {/* Title */}
                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50 mb-6">
                        {article.title}
                    </h1>

                    {/* Description */}
                    <p className="text-xl leading-8 text-zinc-600 dark:text-zinc-400 mb-8">
                        {article.description}
                    </p>

                    {/* Author and Metadata */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500 mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Por {article.author}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span>•</span>
                            <span>Artículo #{article.id}</span>
                            <span>•</span>
                            <span>{article.category}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                        <div className="text-zinc-700 dark:text-zinc-300 leading-8 space-y-6">
                            {article.description ? (
                                <p className="whitespace-pre-line">{article.description}</p>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📄</div>
                                    <p className="text-lg text-zinc-500 dark:text-zinc-500">
                                        Este artículo no tiene contenido adicional.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </article>

                {/* Footer */}
                <div className="w-full mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row sm:justify-between">
                        <div className="text-sm text-zinc-500 dark:text-zinc-500">
                            ID del artículo: {article.id}
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <button
                                onClick={() => window.history.back()}
                                className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:w-[158px]"
                            >
                                ← Volver
                            </button>
                            <a
                                href="/repository"
                                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:w-[158px]"
                            >
                                <span>Ver todos</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}