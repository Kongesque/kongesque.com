"use client";

import { useEffect } from 'react';

interface TrainingLogProps {
    embedId: string;
}

const TrainingLog: React.FC<TrainingLogProps> = ({ embedId }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://strava-embeds.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="strava-embed-placeholder" data-embed-type="activity" data-embed-id={embedId} data-style="standard" data-from-embed="false"></div>
    );
};

export default TrainingLog;
