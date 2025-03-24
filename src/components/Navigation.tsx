import { FC } from "react";
import { NavLink } from "react-router-dom";

const Navigation: FC = () => (
  <nav className="bg-gray-800 p-4 flex">
    <NavLink
      to="/"
      end
      className={({ isActive }) =>
        `mr-4 text-white hover:text-gray-300 transition-colors duration-200 ${
          isActive ? "font-bold underline" : ""
        }`
      }
    >
      Каталог
    </NavLink>
    <NavLink
      to="/cart"
      className={({ isActive }) =>
        `text-white hover:text-gray-300 transition-colors duration-200 ${
          isActive ? "font-bold underline" : ""
        }`
      }
    >
      Корзина
    </NavLink>
  </nav>
);

export default Navigation;
