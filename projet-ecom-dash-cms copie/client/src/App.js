import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";

import AddProduct from "components/AddProduct";
import UpdateProduct from "components/UpdateProduct";
import Admin from "scenes/admin";
import Customers from "scenes/customers";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Transactions from "scenes/transactions";

import NotFound from "client/components/NotFound";
import Cart from "client/scenes/cart";
import DetailProduct from "client/scenes/detailProduct";
import Home from "client/scenes/home";
import LayoutClient from "client/scenes/layout";
import Login from "client/scenes/loginPage";
import Product from "client/scenes/product";
import ProfilPage from "client/scenes/profilPage";
import Register from "client/scenes/registerPage";
import ForgotPassword from "client/widget/ForgotPassword";
import AddBillboard from "components/AddBillboard";
import AddCategory from "components/AddCategory";
import AddColor from "components/AddColor";
import AddProductAdmin from "components/AddProductAdmin";
import AddSize from "components/AddSize";
import Billboard from "scenes/billboard";
import Category from "scenes/category";
import Color from "scenes/color";
import Orders from "scenes/order";
import ProductAdmin from "scenes/product";
import Size from "scenes/size";
import Store from "scenes/store";

function App() {
  const isReduxReady = useSelector((state) => state._persist.rehydrated);
  const mode = useSelector((state) => state.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const current_user = useSelector((state) => state.user?.roleId);

  if (!isReduxReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<LayoutClient currentUser={current_user} />}>
              <Route
                path="/login"
                element={<Login currentUser={current_user} />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/profil" element={<ProfilPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/productdetail/:id" element={<DetailProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product" element={<Product />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            <Route path="*" element={<NotFound />} />

            <Route element={<Layout currentUser={current_user} />}>
              <Route path="/" element={<Dashboard to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={<Dashboard currentUser={current_user} />}
              />
              <Route path="/createproducts" element={<AddProduct />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/update/:id" element={<UpdateProduct />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/store" element={<Store />} />
              <Route path="/billboard" element={<Billboard />} />
              <Route path="/addbillboard" element={<AddBillboard />} />
              <Route path="/category" element={<Category />} />
              <Route path="/addcategory" element={<AddCategory />} />
              <Route path="/color" element={<Color />} />
              <Route path="/addcolor" element={<AddColor />} />
              <Route path="/size" element={<Size />} />
              <Route path="/addsize" element={<AddSize />} />
              <Route path="/productadmin" element={<ProductAdmin />} />
              <Route path="/addproduct" element={<AddProductAdmin />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
