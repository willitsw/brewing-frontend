import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home";
import RecipeDetailPage from "../../pages/recipe-detail";
import RecipeListPage from "../../pages/recipe-list";
import Header from "../header";

const PageLayout = () => {
  return (
    <Layout className="layout">
      <Header />
      <Routes>
        <Route path={"/home"} element={<HomePage />} />
        <Route path={"/recipes/list"} element={<RecipeListPage />} />
        <Route path={"/recipes/new"} element={<RecipeDetailPage />} />
        <Route path={"/recipes/edit/:id"} element={<RecipeDetailPage />} />
        <Route path={"/recipes/duplicate/:id"} element={<RecipeDetailPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  );
};

export default PageLayout;
