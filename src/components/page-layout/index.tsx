import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home";
import RecipeDetailPage from "../../pages/recipe-detail";
import RecipeListPage from "../../pages/recipe-list";
import BrewSettingsPage from "../../pages/brew-settings";
import { useAppSelector } from "../../redux/hooks";
import { userIsAuthenticated } from "../../redux/user/slice";
import Footer from "../footer";
import Header from "../header";

const PageLayout = () => {
  const isAuthenticated = useAppSelector(userIsAuthenticated);
  return (
    <Layout className="layout beer-layout">
      <Header />
      <Routes>
        <Route path={"/home"} element={<HomePage />} />
        {isAuthenticated && (
          <>
            <Route path={"/recipes/list"} element={<RecipeListPage />} />
            <Route path={"/recipes/new"} element={<RecipeDetailPage />} />
            <Route path={"/recipes/edit/:id"} element={<RecipeDetailPage />} />
            <Route
              path={"/recipes/duplicate/:id"}
              element={<RecipeDetailPage />}
            />
            <Route path={"/brew-settings"} element={<BrewSettingsPage />} />
          </>
        )}
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </Layout>
  );
};

export default PageLayout;
