import { Product } from '../types/product';

const API_BASE_URL = 'https://fakestoreapi.com/products';

async function fetchWithTimeout(resource: string, options: RequestInit = {}, timeout = 15000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error('Request timed out. Please try again later.');
    }
    throw error;
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetchWithTimeout(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Unable to fetch products. Please try again later.');
  }
}

export async function getProductById(id: number): Promise<Product> {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} failed for product ID ${id}:`, error);
      if (attempt >= maxRetries) {
        throw new Error('Unable to fetch product details after multiple attempts. Please try again later.');
      }
    }
  }

  throw new Error('Unexpected error: Unable to fetch product details.'); // Fallback to satisfy return type
}