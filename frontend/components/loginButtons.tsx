import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

interface ButtonProps {
    home: boolean;
}

export function LoginButton(props: ButtonProps) {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    if (user) {
        if (props.home) {
            return (
                <Link href="/account">
                    <button className="col-span-1 block w-full md:w-40 hover:transition-all focus:transition-all text-babyPowder bg-artichoke-600 hover:bg-artichoke-500 focus:ring-4 focus:outline-none focus:ring-charlestonGreen font-medium rounded-full px-5 py-2.5 text-center h-12" type="button">
                        Account
                    </button>
                </Link>
            );
        }
        return (
            <Link href="/api/auth/logout">
                <button className="col-span-1 block w-full md:w-40 hover:transition-all focus:transition-all text-babyPowder bg-artichoke-600 hover:bg-artichoke-500 focus:ring-4 focus:outline-none focus:ring-charlestonGreen font-medium rounded-full px-5 py-2.5 text-center h-12" type="button">
                    Logout
                </button>
            </Link>
        );
    }

    return (
        <Link href="/api/auth/login">
            <button className="col-span-1 block w-full md:w-40 hover:transition-all focus:transition-all text-babyPowder bg-artichoke-600 hover:bg-artichoke-500 focus:ring-4 focus:outline-none focus:ring-charlestonGreen font-medium rounded-full px-5 py-2.5 text-center h-12" type="button">
                Login
            </button>
        </Link>
    );
}

export function LoginIcons(props: ButtonProps) {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    if (user) {
        if (props.home) {
            return (
                <Link href="/account">
                    <button className="flex flex-col justify-center items-center w-12 h-12 hover:transition-all focus:transition-all text-babyPowder bg-artichoke-600 hover:bg-artichoke-500 focus:ring-4 focus:outline-none focus:ring-charlestonGreen font-medium rounded-full px-5 py-2.5" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </button>
                </Link>
            );
        }
        return (
            <Link href="/api/auth/logout">
                <button className="flex flex-col justify-center items-center w-12 h-12 hover:transition-all focus:transition-all text-babyPowder bg-artichoke-600 hover:bg-artichoke-500 focus:ring-4 focus:outline-none focus:ring-charlestonGreen font-medium rounded-full px-5 py-2.5" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                </button>
            </Link>
        );
    }

    return (
        <Link href="/api/auth/login">
            <button className="flex flex-col justify-center items-center w-12 h-12 hover:transition-all focus:transition-all text-babyPowder bg-artichoke-600 hover:bg-artichoke-500 focus:ring-4 focus:outline-none focus:ring-charlestonGreen font-medium rounded-full px-5 py-2.5" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
            </button>
        </Link>
    );
}