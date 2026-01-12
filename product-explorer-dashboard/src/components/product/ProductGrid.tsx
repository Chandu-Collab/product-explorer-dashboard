"use client";

import { useState, useMemo, useEffect } from 'react';
import { Product } from '../../types/product';
import { getFavorites, toggleFavorite, isFavorite } from '../../lib/favorites';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Image from 'next/image';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favorites = getFavorites();
      setTimeout(() => {
        setFavorites(favorites);
        setIsClient(true);
      }, 0); // Avoid cascading renders
    }
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((product) => product.category));
    return Array.from(uniqueCategories);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesFavorites = showFavoritesOnly ? favorites.includes(product.id) : true;
      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [products, searchTerm, selectedCategory, showFavoritesOnly, favorites]);

  const handleToggleFavorite = (productId: number) => {
    toggleFavorite(productId);
    setFavorites(getFavorites()); // Update favorites state
  };

  if (!isClient) {
    return null; // Avoid rendering until client-side state is ready
  }

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className="text-2xl text-red-500 hover:text-red-700"
          title={showFavoritesOnly ? 'Show All Products' : 'Show Favorites Only'}
        >
          {showFavoritesOnly ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded block">
            <Link href={`/products/${product.id}`}>
              <Image src={product.image} alt={product.title} width={300} height={300} className="w-full h-48 object-cover mb-4 cursor-pointer" />
            </Link>
            <Link href={`/products/${product.id}`}>
              <h2 className="text-lg font-bold cursor-pointer">{product.title}</h2>
            </Link>
            <p className="text-gray-500">${product.price}</p>
            <p className="text-sm text-gray-400">{product.category}</p>
            <button
              onClick={() => handleToggleFavorite(product.id)}
              className="mt-2 text-2xl text-red-500 hover:text-red-700"
              title={isFavorite(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}