import Link from 'next/link';
import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="container header-container">
                <Link href="/" className="logo">
                    DIYABI<span className="logo-accent">.COM</span>
                </Link>
                <nav className="nav">
                    <a href="#video" className="nav-link">Video</a>
                    <a href="#materials" className="nav-link">Malzemeler</a>
                    <a href="#masters" className="nav-link">Ustalar</a>
                    <a href="#product" className="nav-btn">Satın Al</a>
                </nav>
            </div>
        </header>
    );
}
