"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getFavorites } from '../../lib/favorites';
import { Product } from '../../types/product';
import { getProducts } from '../../lib/api';

export default function FavoritesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);

        const favoriteIds = getFavorites();
        const filteredProducts = allProducts.filter((product) => favoriteIds.includes(product.id));
        setFavoriteProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchData();
  }, []);

  if (favoriteProducts.length === 0) {
    return <div className="p-4">No favorite products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {favoriteProducts.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-48 object-cover mb-4"
          />
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-gray-500">${product.price}</p>
          <p className="text-sm text-gray-400">{product.category}</p>
        </div>
      ))}
    </div>
  );
}