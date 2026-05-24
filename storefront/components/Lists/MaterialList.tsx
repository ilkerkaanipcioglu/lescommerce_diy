'use client';

import { useState, useEffect } from 'react';
import { materials as mockMaterials, Material } from '@/data/mockData';
import './MaterialList.css';
import Image from 'next/image';

export default function MaterialList() {
    const [materials, setMaterials] = useState<Material[]>(mockMaterials);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4003/api/products?type=material')
            .then((res) => {
                if (!res.ok) throw new Error('API response was not ok');
                return res.json();
            })
            .then((json) => {
                if (json.data && Array.isArray(json.data) && json.data.length > 0) {
                    const mapped = json.data.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        price: parseFloat(item.price) || 0,
                        image: (item.images && item.images[0]) || '/images/material-tools.png'
                    }));
                    setMaterials(mapped);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.warn('Failed to fetch materials from API, using mock fallback:', err);
                setLoading(false);
            });
    }, []);

    const total = materials.reduce((acc, item) => acc + item.price, 0);

    return (
        <section id="materials" className="materials-section">
            <div className="container">
                <h2 className="section-title">Gerekli Malzemeler</h2>
                <div className="material-card">
                    {loading && (
                        <div className="loading-indicator" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1rem' }}>
                            Stok bilgileri güncelleniyor...
                        </div>
                    )}
                    <ul className="material-list">
                        {materials.map((item) => (
                            <li key={item.id} className="material-item">
                                <div className="material-info">
                                    <div className="material-image-wrapper">
                                        <Image
                                            src={item.image.startsWith('/') ? item.image : '/images/material-tools.png'}
                                            alt={item.name}
                                            width={60}
                                            height={60}
                                            className="material-image"
                                        />
                                    </div>
                                    <span className="material-name">{item.name}</span>
                                </div>
                                <span className="material-price">{item.price} TL</span>
                            </li>
                        ))}
                    </ul>
                    <div className="material-footer">
                        <div className="material-total">
                            <span className="label">Toplam Tutar:</span>
                            <span className="value">{total} TL</span>
                        </div>
                        <button className="btn-primary full-width" onClick={() => alert('Malzemeler sepete eklendi!')}>Sepete Ekle</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
