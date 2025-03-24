import { FC, memo, useState, useEffect } from "react";

import type { Product } from "../features/products/productsSlice";

interface ProductItemProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductItem: FC<ProductItemProps> = memo(
  ({ product, onAdd }) => {
    const [added, setAdded] = useState(false);

    const handleClick = () => {
      onAdd(product);
      setAdded(true);
    };

    useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;

      if (added) {
        timer = setTimeout(() => setAdded(false), 2000);
      }
      return () => clearTimeout(timer);
    }, [added]);

    return (
      <li className="border p-4 rounded flex flex-col items-center relative">
        <div className="w-32 h-32 flex items-center justify-center mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="h-16 w-full overflow-hidden flex items-center justify-center">
          <h2 className="font-semibold text-center w-full">
            {product.title}
          </h2>
        </div>
        <p className="mt-2">{product.price}$</p>
        <button
          onClick={handleClick}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 cursor-pointer w-full"
        >
          Добавить в корзину
        </button>
        {added && (
          <span className="absolute top-2 right-2 bg-white text-green-600 font-semibold px-2 py-1 rounded shadow">
            Добавлено!
          </span>
        )}
      </li>
    );
  }
);

export default ProductItem;
