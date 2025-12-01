// Definimos el tipo Product
export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
}

export type ApiResponse<T = any> = {
    success: boolean;
    count?: number;
    searchTerm?: string;
    data?: T;
    message?: string;
    error?: string;
};