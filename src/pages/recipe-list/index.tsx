import Content from "../../components/content";
import RecipeListTable from "./recipe-list-table";
import React from "react";

const RecipeListPage = () => {
  return (
    <Content pageTitle="Recipe List">
      <RecipeListTable />
    </Content>
  );
};

export default RecipeListPage;
