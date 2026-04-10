"use client";

import { useEffect, useState } from "react";

const words = ["great", "unstoppable", "legendary", "remarkable", "powerful"];

const Title = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setWordIndex((i) => (i + 1) % words.length);
                setVisible(true);
            }, 400);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.1] dark:text-white-FFFFFF text-black-000112 mb-6">
            If you did all you said
            <br />
            you would do,{" "}
            <br className="hidden sm:block" />
            you will be{" "}
            <span
                className="text-violet-635FC7 inline-block transition-all duration-500"
                style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)" }}
            >
                {words[wordIndex]}
            </span>{" "}
            today.
        </h1>
    );
}

export default Title;
