"use client";

import React, { useState } from "react";
import { LinkIcon, CheckIcon } from "lucide-react";

interface CopyLinkButtonProps {
    title: string;
    slug: string;
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ title, slug }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        const url = `https://www.kongesque.com/blog/${slug}`;

        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <button
            onClick={handleCopyLink}
            className="flex items-center p-3 rounded border-[1px] border-secondary text-secondary hover:text-primary transition-colors duration-200"
        >
            {copied ? (
                <CheckIcon className="w-5 h-5" />
            ) : (
                <LinkIcon className="w-5 h-5" />
            )}
        </button>
    );
};

export default CopyLinkButton;
