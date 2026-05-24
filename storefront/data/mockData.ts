export interface Material {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface Master {
    id: number;
    name: string;
    rating: number; // 0 to 5
    image: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    image: string;
}

export const materials: Material[] = [
    { id: 1, name: "Ahşap Plaka - Meşe", price: 120, image: "/images/material-tools.png" },
    { id: 2, name: "Profesyonel Vernik", price: 85, image: "/images/material-tools.png" },
    { id: 3, name: "Zımpara Seti", price: 45, image: "/images/material-tools.png" },
];

export const masters: Master[] = [
    { id: 1, name: "Ahmet Yılmaz", rating: 5, image: "/images/master-portrait.png" },
    { id: 2, name: "Mehmet Demir", rating: 4, image: "/images/master-portrait.png" },
    { id: 3, name: "Ayşe Kaya", rating: 5, image: "/images/master-portrait.png" },
];

export const product: Product = {
    id: 1,
    name: "Doğal Meşe Sehpa",
    price: 5000,
    description: "Tamamlanmış, kullanıma hazır el yapımı masif meşe sehpa. Modern tasarım ve dayanıklı yapı.",
    image: "/images/material-tools.png", // Using materials image as fallback since product gen failed
};
