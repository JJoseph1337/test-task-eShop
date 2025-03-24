import { FC, Suspense, lazy } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navigation from "./components/Navigation";

const Catalog = lazy(() => import("./pages/Catalog"));
const Cart = lazy(() => import("./pages/Cart"));

const App: FC = () => (
  <BrowserRouter>
    <Navigation />
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route
          path="/"
          element={<Catalog />}
        />
        <Route
          path="/cart"
          element={<Cart />}
        />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
