// data.ts

import { Product } from "../debounce";


// Creamos 10 productos mock
export const products: Product[] = [
  {
    id: 1,
    name: "Laptop Pro",
    description: "Laptop de alta gama para profesionales",
    price: 1299.99,
    category: "Electrónica",
    inStock: true
  },
  {
    id: 2,
    name: "Smartphone X",
    description: "Teléfono inteligente con cámara avanzada",
    price: 899.99,
    category: "Electrónica",
    inStock: true
  },
  {
    id: 3,
    name: "Tablet Lite",
    description: "Tablet ligera para uso diario",
    price: 349.99,
    category: "Electrónica",
    inStock: false
  },
  {
    id: 4,
    name: "Auriculares Bluetooth",
    description: "Auriculares inalámbricos con cancelación de ruido",
    price: 199.99,
    category: "Audio",
    inStock: true
  },
  {
    id: 5,
    name: "Monitor 4K",
    description: "Monitor ultra HD para gaming y trabajo",
    price: 499.99,
    category: "Electrónica",
    inStock: true
  },
  {
    id: 6,
    name: "Teclado Mecánico",
    description: "Teclado para gamers con switches azules",
    price: 89.99,
    category: "Periféricos",
    inStock: true
  },
  {
    id: 7,
    name: "Mouse Ergonómico",
    description: "Mouse diseñado para comodidad prolongada",
    price: 49.99,
    category: "Periféricos",
    inStock: false
  },
  {
    id: 8,
    name: "Smart Watch",
    description: "Reloj inteligente con monitor de salud",
    price: 249.99,
    category: "Wearables",
    inStock: true
  },
  {
    id: 9,
    name: "Altavoz Portátil",
    description: "Altavoz Bluetooth resistente al agua",
    price: 79.99,
    category: "Audio",
    inStock: true
  },
  {
    id: 10,
    name: "Cámara Web HD",
    description: "Cámara para videollamadas en alta definición",
    price: 59.99,
    category: "Periféricos",
    inStock: true
  }
];