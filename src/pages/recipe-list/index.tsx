import Content from "../../components/content";
import OkCancelModal from "../../components/ok-cancel-modal";
import RecipeListTable from "./recipe-list-table";

const RecipeListPage = () => {
  return (
    <Content pageTitle="Recipe List">
      <RecipeListTable />
    </Content>
  );
};

export default RecipeListPage;
