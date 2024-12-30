'use client';

import React from 'react';

interface ShareButtonProps {
    title: string;
    slug: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, slug }) => {
    const handleShare = () => {
        const text = encodeURIComponent(title); 
        const url = encodeURIComponent(`https://www.kongesque.com/blog/${slug}`);
        const twitterUrl = `https://x.com/intent/post?text=${text}&url=${url}`;
        window.open(twitterUrl, '_blank');
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center space-x-2 p-3 rounded border-[1px] border-secondary text-secondary hover:text-primary transition-colors duration-200"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="w-6 h-6" fill="currentColor">
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
            </svg>
        </button>
    );
};

export default ShareButton;
