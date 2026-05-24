'use client';

import { useState, useEffect } from 'react';
import './VideoPlayer.css';

export default function VideoPlayer() {
    const [video, setVideo] = useState({
        title: "Doğal Meşe Sehpa Yapımı",
        description: "Bu eğitimimizde masif meşe ahşap plaka kullanarak adım adım modern bir sehpa yapımını öğreniyoruz.",
        embedUrl: "https://www.youtube.com/embed/S2C_Puw_61I"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4003/api/videos')
            .then((res) => {
                if (!res.ok) throw new Error('API response was not ok');
                return res.json();
            })
            .then((json) => {
                if (json.data && Array.isArray(json.data) && json.data.length > 0) {
                    const firstVideo = json.data[0];
                    setVideo({
                        title: firstVideo.title || "Doğal Meşe Sehpa Yapımı",
                        description: firstVideo.description || "",
                        embedUrl: firstVideo.embed_url || "https://www.youtube.com/embed/S2C_Puw_61I"
                    });
                }
                setLoading(false);
            })
            .catch((err) => {
                console.warn('Failed to fetch video from API, using default fallback:', err);
                setLoading(false);
            });
    }, []);

    return (
        <section id="video" className="video-section">
            <div className="container">
                <div className="video-info" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 className="video-title" style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#f1f5f9' }}>{video.title}</h2>
                    <p className="video-desc" style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>{video.description}</p>
                </div>
                <div className="video-container">
                    {loading ? (
                        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>Yükleniyor...</div>
                    ) : (
                        <iframe
                            width="560"
                            height="315"
                            src={video.embedUrl}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            </div>
        </section>
    );
}
