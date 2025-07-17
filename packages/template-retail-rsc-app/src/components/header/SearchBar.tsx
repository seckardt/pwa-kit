'use client'

import {type ChangeEvent, type FormEvent, useCallback, useState} from 'react'
import {useLocation, useNavigate} from 'react-router'

export default function SearchBar() {
    const location = useLocation()
    const navigate = useNavigate()
    const [query, setQuery] = useState(location?.state?.query ?? '')

    const handleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault()
            if (query.trim()) {
                setQuery('')
                navigate(`/search?q=${encodeURIComponent(query)}`, {
                    state: {query}
                })
            }
        },
        [location, query]
    )

    return (
        <form onSubmit={handleSubmit} className="relative">
            <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
                type="submit"
                className="absolute left-0 top-0 p-2 text-gray-500"
                aria-label="Search"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </button>
        </form>
    )
}
