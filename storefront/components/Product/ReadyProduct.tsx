'use client';

import { useState, useEffect } from 'react';
import { product as mockProduct, Product } from '@/data/mockData';
import './ReadyProduct.css';
import Image from 'next/image';

export default function ReadyProduct() {
    const [product, setProduct] = useState<Product>(mockProduct);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4003/api/products?type=finished_good')
            .then((res) => {
                if (!res.ok) throw new Error('API response was not ok');
                return res.json();
            })
            .then((json) => {
                if (json.data && Array.isArray(json.data) && json.data.length > 0) {
                    const firstItem = json.data[0];
                    setProduct({
                        id: firstItem.id,
                        name: firstItem.name,
                        price: parseFloat(firstItem.price) || 0,
                        description: firstItem.description || mockProduct.description,
                        image: (firstItem.images && firstItem.images[0]) || '/images/material-tools.png'
                    });
                }
                setLoading(false);
            })
            .catch((err) => {
                console.warn('Failed to fetch finished product from API, using mock fallback:', err);
                setLoading(false);
            });
    }, []);

    return (
        <section id="product" className="product-section">
            <div className="product-bg-overlay"></div>
            <div className="container product-container">
                <div className="product-image-area">
                    {loading ? (
                        <div style={{ color: 'var(--text-muted)' }}>Yükleniyor...</div>
                    ) : (
                        <Image
                            src={product.image.startsWith('/') ? product.image : '/images/material-tools.png'}
                            alt={product.name}
                            width={600}
                            height={400}
                            className="product-main-image"
                        />
                    )}
                </div>
                <div className="product-content">
                    <span className="product-badge">ÖZEL ÜRETİM</span>
                    <h2 className="product-title">{product.name}</h2>
                    <p className="product-desc">{product.description}</p>
                    <div className="product-price">{product.price} TL</div>
                    <button className="btn-primary product-btn" onClick={() => alert(`${product.name} sepete eklendi!`)}>Hemen Satın Al</button>
                </div>
            </div>
        </section>
    );
}
