"use client";

import Link from "next/link";

const Logo = () => {
    return (
        <>
            <Link href="/" className="flex items-center gap-3 relative z-10 group">
                <div className="flex gap-1.5 items-end">
                    <div className="w-1.5 h-6 bg-violet-635FC7 rounded-full group-hover:h-7 duration-200" />
                    <div className="w-1.5 h-6 bg-violet-635FC7 rounded-full opacity-75 group-hover:h-5 duration-200 delay-75" />
                    <div className="w-1.5 h-6 bg-violet-635FC7 rounded-full opacity-50 group-hover:h-4 duration-200 delay-100" />
                </div>
                <span className="hidden sm:flex text-xl font-bold dark:text-white-FFFFFF text-black-000112 group-hover:text-violet-635FC7 duration-200">
                    Managelly
                </span>
            </Link>
        </>
    );
}

export default Logo;