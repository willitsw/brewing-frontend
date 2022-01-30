import { useState, useEffect } from "react";
import { Recipe } from "../../types/beer-interfaces";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Space, Tooltip } from "antd";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  processDeleteRecipe,
  refreshRecipeList,
} from "../../redux/recipe-list/slice";
import OkCancelModal from "../../components/ok-cancel-modal";

import styles from "./recipe-list-table.module.css";
import { Breakpoint } from "antd/lib/_util/responsiveObserve";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";

interface RecipeListTableProps {}

const RecipeListTable = ({}: RecipeListTableProps) => {
  const dispatch = useAppDispatch();
  const recipeList = useAppSelector((state) => state.recipes.recipeList);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const nameToDelete = idToDelete
    ? recipeList.find((recipe) => recipe.id === idToDelete)?.name
    : "";

  useEffect(() => {
    const getRecipeList = async () => {
      dispatch(refreshRecipeList());
    };
    getRecipeList();
  }, []);

  const handleDeleteRecipe = async () => {
    if (idToDelete) {
      dispatch(processDeleteRecipe(idToDelete));
    }
    setIdToDelete(null);
  };

  const showOnlyDesktop: Breakpoint[] = ["md"];

  const columnDefinitions = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Recipe) => (
        <Link to={"/recipes/edit/" + record.id}>{text}</Link>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      responsive: showOnlyDesktop,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      responsive: showOnlyDesktop,
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Recipe) => (
        <Space>
          <Tooltip title="Duplicate">
            <Button
              type="primary"
              shape="circle"
              icon={<CopyOutlined />}
              onClick={() => navigate("/recipes/duplicate/" + record.id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => setIdToDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const preparedRecipeData = recipeList.map((recipe) => {
    return {
      ...recipe,
      key: recipe.id,
    };
  });

  return (
    <>
      <Button
        className={styles["new-recipe-button"]}
        type="primary"
        onClick={() => navigate("/recipes/new")}
      >
        New Recipe
      </Button>
      <Table columns={columnDefinitions} dataSource={preparedRecipeData} />
      <OkCancelModal
        onCancel={() => setIdToDelete(null)}
        onSubmit={() => handleDeleteRecipe()}
        showModal={idToDelete !== null}
        title={`Delete recipe ${nameToDelete}?`}
      >
        This cannot be undone.
      </OkCancelModal>
    </>
  );
};

export default RecipeListTable;
