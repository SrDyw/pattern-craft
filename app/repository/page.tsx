"use client"

import { FormEvent, useEffect, useState } from "react";
import { Article } from "./mock/data";
import Image from "next/image";

export default function ArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getArticles() {
            try {
                setLoading(true);
                const fetchData = await fetch("/repository/api/articles/");

                if (!fetchData.ok) {
                    throw new Error('Error al cargar los artículos');
                }

                const data = await fetchData.json();
                setArticles(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        }
        getArticles();
    }, []);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);

        const article = {
            title: formData.get("title"),
            description: formData.get("description"),
            author: formData.get("author"),
            category: formData.get("category")
        };

        const request = await fetch("/repository/api/articles/", {
            body: JSON.stringify(article),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-16 px-6 bg-white dark:bg-black sm:items-start sm:px-16 sm:py-24">
                {/* Header */}
                <div className="w-full text-center sm:text-left mb-12">
                    <Image
                        className="dark:invert mx-auto sm:mx-0 mb-6"
                        src="/next.svg"
                        alt="Next.js logo"
                        width={120}
                        height={24}
                        priority
                    />
                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50 mb-4">
                        Repository Pattern
                    </h1>
                    <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 max-w-2xl">
                        Explore into an articles collection about technology, programing and more!
                    </p>
                </div>

                {/* Content */}
                <div className="w-full flex-1">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mb-4"></div>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400">Cargando artículos...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-16">
                            <p className="text-lg text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                            >
                                Try again
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article) => (
                                <a
                                    key={article.id}
                                    href={`/repository/${article.id}`}
                                    className="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-600"
                                >
                                    {article.category != "" && (<div className="mb-4">
                                        <span className="inline-block px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full">
                                            {article.category}
                                        </span>
                                    </div>)}

                                    <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {article.title}
                                    </h2>

                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-6 mb-4 line-clamp-3">
                                        {article.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                        <span className="text-sm text-zinc-500 dark:text-zinc-500">
                                            By {article.author}
                                        </span>
                                        <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                                            Read more →
                                        </button>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && articles.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
                                There's no articles available
                            </h3>
                            <p className="text-zinc-500 dark:text-zinc-500">
                                More coming soon...
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="w-full mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row sm:justify-between">
                        <div className="text-sm text-zinc-500 dark:text-zinc-500 text-center sm:text-left">
                            Mostrando {articles.length} artículo{articles.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                </div>
            </main>
            <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-black rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-6">Add new article</h2>

                <div className="space-y-6">
                    {/* Title Field */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full px-4 py-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                            placeholder="Enter article title"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="w-full px-4 py-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all resize-none"
                            placeholder="Enter article description"
                        />
                    </div>

                    {/* Author Field */}
                    <div className="space-y-2">
                        <label htmlFor="author" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            className="w-full px-4 py-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                            placeholder="Enter author name"
                        />
                    </div>

                    {/* Category Field */}
                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            className="w-full px-4 py-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                        >
                            <option value="">Select a category</option>
                            <option value="Technology">Technology</option>
                            <option value="Science">Science</option>
                            <option value="Programming">Programming</option>
                            <option value="Design">Design</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>

                    {/* Content Field */}
                    <div className="space-y-2">
                        <label htmlFor="content" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows={6}
                            className="w-full px-4 py-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all resize-none"
                            placeholder="Write your article content here..."
                        />
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:w-[120px]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:w-[140px]"
                        >
                            <span>Create</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}