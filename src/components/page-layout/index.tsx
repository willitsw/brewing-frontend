import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home";
import RecipeDetailPage from "../../pages/recipe-detail";
import RecipeListPage from "../../pages/recipe-list";
import BrewSettingsPage from "../../pages/brew-settings";
import { useAppSelector } from "../../redux/hooks";
import { userIsAuthenticated } from "../../redux/user/slice";
import Footer from "../footer";
import Header from "../header";
import GlobalModals from "../global-modals";
import { selectGlobalIsLoading } from "../../redux/misc/slice";
import Loading from "../loading";
import React from "react";
import RecipePrinterFriendly from "../../pages/recipe-printer-friendly";
import BrewLogListPage from "../../pages/brew-log-list";
import BrewLogDetailPage from "../../pages/brew-log-detail";

const PageLayout = () => {
  const isAuthenticated = useAppSelector(userIsAuthenticated);
  const isLoading = useAppSelector(selectGlobalIsLoading);

  return (
    <Layout className="layout beer-layout">
      <Loading isLoading={isLoading}>
        <Header />
        <Routes>
          <Route path={"/home"} element={<HomePage />} />
          {isAuthenticated && (
            <>
              <Route path={"/recipes/list"} element={<RecipeListPage />} />
              <Route path={"/recipes/new"} element={<RecipeDetailPage />} />
              <Route
                path={"/recipes/edit/:id"}
                element={<RecipeDetailPage />}
              />
              <Route
                path={"/recipes/duplicate/:id"}
                element={<RecipeDetailPage />}
              />
              <Route
                path={"/recipes/print/:id"}
                element={<RecipePrinterFriendly />}
              />
              <Route path={"/brew-settings"} element={<BrewSettingsPage />} />
              <Route path={"/brew-log/list"} element={<BrewLogListPage />} />
              <Route path={"/brew-log/new"} element={<BrewLogDetailPage />} />
              <Route
                path={"/brew-log/edit/:id"}
                element={<BrewLogDetailPage />}
              />
            </>
          )}
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </Loading>
      <GlobalModals />
    </Layout>
  );
};

export default PageLayout;
