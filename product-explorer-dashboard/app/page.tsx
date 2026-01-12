import { getProducts } from '@/lib/api';
import { Product } from '@/types/product';
import ProductGrid from '@/components/product/ProductGrid';
import Loader from '@/components/ui/Loader';

export default async function Page() {
  let products: Product[] = [];
  let error = '';
  let isLoading = true;

  try {
    products = await getProducts();
    isLoading = false;
  } catch (err) {
    error = (err as Error).message;
    isLoading = false;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div className="p-4">
      <ProductGrid products={products} />
    </div>
  );
}
