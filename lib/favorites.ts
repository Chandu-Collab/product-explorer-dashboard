export function getFavorites(): number[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export function toggleFavorite(productId: number): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const favorites = getFavorites();
  const isFavorite = favorites.includes(productId);

  const updatedFavorites = isFavorite
    ? favorites.filter((id) => id !== productId)
    : [...favorites, productId];

  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
}

export function isFavorite(productId: number): boolean {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  const favorites = getFavorites();
  return favorites.includes(productId);
}