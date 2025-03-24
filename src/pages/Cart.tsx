import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../features/cart/cartSlice";

const Cart: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(
    (state: RootState) => state.cart.items
  );

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + item.product.price * item.quantity,
        0
      ),
    [items]
  );

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Корзина</h1>
      {items.length === 0 ? (
        <div>Корзина пуста</div>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li
                key={item.product.id}
                className="mb-2 border p-2 rounded"
              >
                <div className="font-semibold">
                  {item.product.title}
                </div>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleDecrement(item.product.id)
                    }
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 transition-colors duration-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="mx-2">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleIncrement(item.product.id)
                    }
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 transition-colors duration-200 cursor-pointer"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      handleRemove(item.product.id)
                    }
                    className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200 cursor-pointer"
                  >
                    Удалить
                  </button>
                </div>
                <div className="mt-2">
                  Сумма:{" "}
                  {(
                    item.product.price * item.quantity
                  ).toFixed(2)}
                  $
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleClearCart}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-200 cursor-pointer"
          >
            Очистить корзину
          </button>
        </>
      )}
      <div className="mt-4 font-bold">
        Итого: {total.toFixed(2)}$
      </div>
    </div>
  );
};

export default Cart;
