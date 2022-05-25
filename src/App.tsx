import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PageLayout from "./components/page-layout";
import AuthProvider from "./components/auth-provider";
import React from "react";
import { AnalyticsProvider } from "./utils/analytics";

export enum RouteSegments {
  Home = "/home",
  RecipesList = "/recipes/list",
  RecipesDetail = "/recipes/detail",
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AnalyticsProvider>
          <AuthProvider>
            <PageLayout />
          </AuthProvider>
        </AnalyticsProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
