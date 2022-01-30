import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/header";
import HomePage from "./pages/home";
import RecipeListPage from "./pages/recipe-list";
import RecipeDetailPage from "./pages/recipe-detail";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export enum RouteSegments {
  Home = "/home",
  RecipesList = "/recipes/list",
  RecipesDetail = "/recipes/detail",
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout className="layout">
          <Header />
          <Routes>
            <Route path={"/home"} element={<HomePage />} />
            <Route path={"/recipes/list"} element={<RecipeListPage />} />
            <Route path={"/recipes/new"} element={<RecipeDetailPage />} />
            <Route path={"/recipes/edit/:id"} element={<RecipeDetailPage />} />
            <Route
              path={"/recipes/duplicate/:id"}
              element={<RecipeDetailPage />}
            />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
