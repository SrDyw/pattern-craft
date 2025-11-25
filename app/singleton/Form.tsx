'use client'


import { FormEvent, useContext } from "react"
import { User, UserContext, UserContextType } from "./UsersContext";

export default function Form() {
    const [_, setUser] = useContext(UserContext) as UserContextType


    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user: User = {
            username: formData.get("username") as string,
            email: formData.get("email") as string
        }
        setUser(user)
    }


    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col gap-6 p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl max-w-md w-full mx-auto"
        >
            <div className="space-y-2">
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-white/90 uppercase tracking-wide"
                >
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/10"
                    required
                />
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/90 uppercase tracking-wide"
                >
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/10"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl"
            >
                Get Started
            </button>
        </form>
    );
}