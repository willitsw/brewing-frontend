import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Content from "../../components/content";
import { Recipe } from "../../types/beer-interfaces";
import { v4 as uuid } from "uuid";
import { getRecipeById } from "../../utils/api-calls";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Radio,
  Space,
  Typography,
  Divider,
  Modal,
} from "antd";
import { deepCloneObject } from "../../utils/helpers";
import OkCancelModal from "../../components/ok-cancel-modal";
import { StepBackwardFilled } from "@ant-design/icons";
import GrainAdditions from "./grain-additions";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  processCreateUpdateRecipe,
  RecipeActionTypes,
} from "../../redux/recipe-list/slice";
import { FermentableAdditionType } from "../../types/beer-json";

const defaultRecipe: Recipe = {
  name: "New Recipe",
  description: "",
  author: "",
  batch_size: {
    unit: "gal",
    value: 5,
  },
  efficiency: {
    brewhouse: {
      unit: "%",
      value: 65,
    },
  },
  id: uuid(),
  ingredients: { fermentable_additions: [] },
  type: "all grain",
  user: "bob",
};

const RecipeDetailPage = () => {
  const [recipeForm] = Form.useForm();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const recipe = useAppSelector((state) => state.recipes.currentRecipe);
  const [isFormTouched, setIsFormTouched] = useState<boolean>(false);

  useEffect(() => {
    const onComponentLoad = async () => {
      let workingRecipe;
      if (location.pathname.includes("/recipes/duplicate") && id) {
        workingRecipe = await getRecipeById(id);
        workingRecipe.name = `Copy of ${workingRecipe.name}`;
        workingRecipe.id = uuid();
      } else if (location.pathname.includes("/recipes/edit") && id) {
        workingRecipe = await getRecipeById(id);
      } else {
        workingRecipe = defaultRecipe;
      }

      const grainsArray = workingRecipe.ingredients.fermentable_additions.map(
        (grain) => {
          return {
            name: grain.name,
            amount: grain.amount?.value ?? null,
            color: grain.color?.value ?? null,
            gravity: grain.yield?.potential?.value ?? null,
            type: grain.type,
          };
        }
      );

      recipeForm.setFieldsValue({
        name: workingRecipe.name,
        author: workingRecipe.author,
        batchSizeValue: workingRecipe.batch_size.value,
        efficiencyValue: workingRecipe.efficiency.brewhouse.value,
        type: workingRecipe.type,
        description: workingRecipe.description,
        grains: grainsArray,
      });

      dispatch({
        type: RecipeActionTypes.SetCurrentRecipe,
        payload: workingRecipe,
      });
    };
    onComponentLoad();
  }, []);

  const onFinish = (recipeForm: any) => {
    const submitCopy: Recipe = deepCloneObject(recipe);
    submitCopy.name = recipeForm.name;
    submitCopy.description = recipeForm.description;
    submitCopy.author = recipeForm.author;
    submitCopy.batch_size.value = recipeForm.batchSizeValue;
    submitCopy.efficiency.brewhouse.value = recipeForm.efficiencyValue;
    submitCopy.type = recipeForm.type;

    const fermentableAdditions: FermentableAdditionType[] =
      recipeForm.grains.map((grain: any): FermentableAdditionType => {
        return {
          name: grain.name,
          amount: {
            unit: "lb",
            value: grain.amount,
          },
          color: {
            unit: "Lovi",
            value: grain.color,
          },
          type: grain.type,
          yield: {
            potential: {
              unit: "sg",
              value: grain.gravity,
            },
          },
        };
      });

    submitCopy.ingredients.fermentable_additions = fermentableAdditions;
    dispatch(processCreateUpdateRecipe(submitCopy));
    setIsFormTouched(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Save failed:", errorInfo);
  };

  const goBackToRecipeList = () => {
    navigate("/recipes/list/");
  };

  const handleCancelClick = () => {
    if (isFormTouched) {
      setShowCancelModal(true);
    } else {
      goBackToRecipeList();
    }
  };

  return (
    <Content isLoading={!recipe} pageTitle={recipe ? recipe.name : ""}>
      <Button
        type="text"
        onClick={handleCancelClick}
        icon={<StepBackwardFilled />}
      >
        Back to Recipe List{" "}
      </Button>
      <Form
        name="recipe-edit-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={recipeForm}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        onFieldsChange={() => setIsFormTouched(true)}
      >
        <Typography.Title level={4}>General Info</Typography.Title>
        <Form.Item
          label="Recipe Name"
          name="name"
          rules={[{ required: true, message: "A recipe name is required." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Recipe Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[
            { warningOnly: true, message: "It is nice to enter an author." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Batch Size (gal)"
          name="batchSizeValue"
          rules={[{ required: true, message: "A batch size is required." }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Brewhouse Efficiency Percentage"
          name="efficiencyValue"
          rules={[
            {
              required: true,
              message: "An efficiency percentage is required.",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item label="Brew Type" name="type">
          <Radio.Group>
            <Radio.Button value="all grain">All Grain</Radio.Button>
            <Radio.Button value="extract">Extract</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Divider />

        <GrainAdditions recipeForm={recipeForm} />
        <Divider />

        <Space>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={handleCancelClick}>Cancel</Button>
          </Form.Item>
        </Space>
      </Form>
      <OkCancelModal
        onCancel={() => setShowCancelModal(false)}
        onSubmit={() => goBackToRecipeList()}
        showModal={showCancelModal}
        title={`Are you sure you'd like to cancel editing ${recipe?.name}?`}
      >
        This cannot be undone.
      </OkCancelModal>
    </Content>
  );
};

export default RecipeDetailPage;
