import { getProductById } from '../../../lib/api';
import { Product } from '../../../types/product';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

interface ProductDetailsProps {
  params: { id: string };
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = await params; // Ensure params is resolved
  let product: Product | null = null;
  let error = '';

  try {
    product = await getProductById(Number(id));
  } catch (err) {
    error = (err as Error).message;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="p-4">
      <Link href="/">
        <FaArrowLeft className="text-blue-500 text-xl mb-4 inline-block" />
      </Link>
      <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="w-full max-w-sm rounded-lg shadow-md"
        />
        <div className="mt-4 md:mt-0">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-2">${product.price}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
}