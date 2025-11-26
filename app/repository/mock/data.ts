// Versión simplificada
export type Article = {
  id: number;
  title: string;
  description: string;
  author: string;
  category: string;
};

export const articles: Article[] = [
  {
    id: 1,
    title: "Artículo 1",
    description: "Descripción del artículo 1",
    author: "Autor 1",
    category: "Tecnología"
  },
  {
    id: 2,
    title: "Artículo 2",
    description: "Descripción del artículo 2",
    author: "Autor 2",
    category: "Ciencia"
  },
  {
    id: 3,
    title: "Artículo 3",
    description: "Descripción del artículo 3",
    author: "Autor 3",
    category: "Programación"
  }
];

export default articles;