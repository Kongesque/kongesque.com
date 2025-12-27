"use client";

import React, { useState } from "react";
import { LinkIcon, CheckIcon } from "lucide-react";

interface CopyLinkButtonProps {
    title: string;
    slug: string;
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ title, slug }) => {
    const [copied, setCopied] = useState(false);

    const [showTooltip, setShowTooltip] = useState(false);

    const handleCopyLink = async () => {
        const url = `https://www.kongesque.com/blog/${slug}`;

        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setShowTooltip(false);
            }, 2000); // Reset and hide tooltip after 2 seconds
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div className="relative flex flex-col items-center">
            {showTooltip && (
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2 py-1 bg-blockBg border border-blockBorder rounded text-xs text-primary shadow-lg animate-in fade-in zoom-in-95 duration-200 whitespace-nowrap z-50">
                    {copied ? "Copied!" : "Copy link"}
                </div>
            )}
            <button
                onClick={handleCopyLink}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className={`flex items-center p-3 rounded border-[1px] transition-all duration-200 active:scale-95 ${copied
                    ? "border-accent text-accent bg-accent/10"
                    : "border-secondary text-secondary hover:text-primary hover:border-primary hover:bg-blockHover"
                    }`}
            >
                {copied ? (
                    <CheckIcon className="w-5 h-5 animate-in zoom-in spin-in-90 duration-300" />
                ) : (
                    <LinkIcon className="w-5 h-5 transition-transform duration-200" />
                )}
            </button>
        </div>
    );
};

export default CopyLinkButton;
