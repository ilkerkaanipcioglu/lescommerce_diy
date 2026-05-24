'use client';

import { useState, useEffect } from 'react';
import { masters as mockMasters, Master } from '@/data/mockData';
import './MasterList.css';
import Image from 'next/image';

export default function MasterList() {
    const [masters, setMasters] = useState<Master[]>(mockMasters);
    const [loading, setLoading] = useState(true);
    const [selectedMaster, setSelectedMaster] = useState<Master | null>(null);

    // Form fields
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('10:00');
    const [notes, setNotes] = useState('');

    const [bookingStatus, setBookingStatus] = useState<'idle' | 'booking' | 'success' | 'error'>('idle');
    const [bookingError, setBookingError] = useState('');

    useEffect(() => {
        fetch('http://localhost:4003/api/products?type=service')
            .then((res) => {
                if (!res.ok) throw new Error('API response error');
                return res.json();
            })
            .then((json) => {
                if (json.data && Array.isArray(json.data) && json.data.length > 0) {
                    const mapped = json.data.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        rating: 5,
                        image: (item.images && item.images[0]) || '/images/master-portrait.png'
                    }));
                    setMasters(mapped);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.warn('Failed to fetch masters from API, using mock fallback:', err);
                setLoading(false);
            });
    }, []);

    const handleBook = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMaster) return;

        setBookingStatus('booking');
        setBookingError('');

        // Prepare start/end time
        const startStr = `${bookingDate}T${bookingTime}:00Z`;
        const startDate = new Date(startStr);
        // End time is 1 hour later
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

        const payload = {
            appointment: {
                product_id: selectedMaster.id,
                customer_name: customerName,
                customer_email: customerEmail,
                customer_phone: customerPhone,
                start_time: startDate.toISOString(),
                end_time: endDate.toISOString(),
                notes: notes
            }
        };

        fetch('http://localhost:4003/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    if (data.errors) {
                        const errorMsg = Object.entries(data.errors)
                            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
                            .join('; ');
                        throw new Error(errorMsg);
                    }
                    throw new Error('Rezervasyon oluşturulamadı. Lütfen bilgilerinizi kontrol edin.');
                }
                return data;
            })
            .then(() => {
                setBookingStatus('success');
                // Reset form
                setCustomerName('');
                setCustomerEmail('');
                setCustomerPhone('');
                setBookingDate('');
                setNotes('');
            })
            .catch((err: any) => {
                console.error(err);
                setBookingStatus('error');
                setBookingError(err.message || 'Bir hata oluştu, randevu kaydedilemedi.');
            });
    };

    return (
        <section id="masters" className="masters-section">
            <div className="container">
                <h2 className="section-title">Uzman Ustalar</h2>
                {loading && (
                    <div className="loading-indicator" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        Usta bilgileri ve takvimleri yükleniyor...
                    </div>
                )}
                <div className="masters-grid">
                    {masters.map((master) => (
                        <div key={master.id} className="master-card">
                            <div className="master-image-wrapper">
                                <Image
                                    src={master.image.startsWith('/') ? master.image : '/images/master-portrait.png'}
                                    alt={master.name}
                                    width={120}
                                    height={120}
                                    className="master-image"
                                />
                            </div>
                            <h3 className="master-name">{master.name}</h3>
                            <div className="master-rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < master.rating ? 'filled' : ''}`}>★</span>
                                ))}
                            </div>
                            <button className="btn-secondary" onClick={() => { setSelectedMaster(master); setBookingStatus('idle'); }}>Randevu Al</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Glassmorphic Booking Modal */}
            {selectedMaster && (
                <div className="modal-overlay" onClick={() => setSelectedMaster(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{selectedMaster.name} - Randevu Formu</h3>
                            <button className="close-btn" onClick={() => setSelectedMaster(null)}>×</button>
                        </div>
                        {bookingStatus === 'success' ? (
                            <div className="booking-success-message">
                                <div className="success-icon">✓</div>
                                <h4>Randevunuz Alındı!</h4>
                                <p>Ahşap tasarım uzmanımız randevu saatinizde sizinle iletişime geçecektir.</p>
                                <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setSelectedMaster(null)}>Kapat</button>
                            </div>
                        ) : (
                            <form onSubmit={handleBook} className="booking-form">
                                <div className="form-group">
                                    <label htmlFor="c_name">Adınız Soyadınız</label>
                                    <input
                                        type="text"
                                        id="c_name"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Örn. Ahmet Yılmaz"
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="c_email">E-posta Adresiniz</label>
                                        <input
                                            type="email"
                                            id="c_email"
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            placeholder="adiniz@eposta.com"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="c_phone">Telefon Numaranız</label>
                                        <input
                                            type="tel"
                                            id="c_phone"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            placeholder="Örn. +90 555 123 45 67"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="b_date">Tarih</label>
                                        <input
                                            type="date"
                                            id="b_date"
                                            value={bookingDate}
                                            onChange={(e) => setBookingDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="b_time">Saat</label>
                                        <input
                                            type="time"
                                            id="b_time"
                                            value={bookingTime}
                                            onChange={(e) => setBookingTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="b_notes">Proje Detayları & Notlar</label>
                                    <textarea
                                        id="b_notes"
                                        rows={3}
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Hangi sehpa yapımı veya kurulum için usta talep ediyorsunuz? Özel istekleriniz..."
                                    ></textarea>
                                </div>

                                {bookingStatus === 'error' && (
                                    <div className="booking-error-message">
                                        ⚠️ Hata: {bookingError}
                                    </div>
                                )}

                                <div className="modal-actions">
                                    <button type="button" className="btn-cancel" onClick={() => setSelectedMaster(null)}>İptal</button>
                                    <button type="submit" className="btn-primary" disabled={bookingStatus === 'booking'}>
                                        {bookingStatus === 'booking' ? 'Onaylanıyor...' : 'Randevuyu Onayla'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
