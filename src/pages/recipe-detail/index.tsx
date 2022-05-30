import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Content from "../../components/content";
import { v4 as uuid } from "uuid";
import { getRecipeById } from "../../utils/api-calls";
import {
  Form,
  Button,
  Space,
  Divider,
  Affix,
  message,
  Col,
  Row,
  Tabs,
} from "antd";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  processCreateUpdateRecipe,
  selectCurrentRecipe,
  setCurrentRecipe,
} from "../../redux/recipe-list/slice";
import { getStats } from "../../utils/beer-math";
import GeneralInfo from "./general/general-info";
import StatsSection from "./statistics/stats";
import { setPageIsClean } from "../../redux/global-modals/slice";
import { gallonsToLiters, litersToGallons } from "../../utils/converters";
import { selectBrewSettings } from "../../redux/brew-settings/slice";
import { BrewingTypes as BT } from "brewing-shared";
import React from "react";
import Ingredients from "./ingredients/ingredients";
import moment from "moment";
import { useAnalytics } from "../../utils/analytics";

const defaultRecipe: BT.Recipe = {
  name: "New Recipe",
  description: "",
  author: "",
  batchSize: 5,
  id: uuid(),
  userId: "",
  type: "All grain",
  measurementType: "imperial",
  efficiency: 70,
  ingredients: [],
  createdDate: moment().toISOString(),
  updatedDate: moment().toISOString(),
};

const defaultStats: BT.Stats = {
  abv: 0,
  ibu: 0,
  og: 0,
  fg: 0,
  srm: 0,
  strikeWater: 0,
  hotLiquor: 0,
  waterLoss: 0,
};

const RecipeDetailPage = () => {
  const brewSettings = useAppSelector(selectBrewSettings);
  const [form] = Form.useForm<BT.Recipe>();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const recipe = useAppSelector(selectCurrentRecipe);
  const [stats, setStats] = useState<BT.Stats>(defaultStats);
  const [ingredients, setIngredients] = useState<BT.ValidIngredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDesktop] = useState<boolean>(
    window.matchMedia("(min-width: 1200px)").matches
  );
  const { fireAnalyticsEvent } = useAnalytics();

  useEffect(() => {
    const onComponentLoad = async () => {
      let workingRecipe: BT.Recipe;
      if (location.pathname.includes("/recipes/duplicate") && id) {
        workingRecipe = await getRecipeById(id);
        workingRecipe.name = `Copy of ${workingRecipe.name}`;
        workingRecipe.id = uuid();
      } else if (location.pathname.includes("/recipes/edit") && id) {
        workingRecipe = await getRecipeById(id);
      } else {
        workingRecipe = { ...defaultRecipe };

        workingRecipe.author = brewSettings.displayName;
        workingRecipe.batchSize = brewSettings.batchSize;
        workingRecipe.efficiency = brewSettings.brewhouseEfficiency;
        workingRecipe.measurementType = brewSettings.measurementType;
      }

      setStats(getStats(workingRecipe, brewSettings));
      setIngredients(workingRecipe.ingredients);

      form.setFieldsValue(workingRecipe);
      dispatch(setCurrentRecipe(workingRecipe));
      setLoading(false);
    };
    onComponentLoad();
  }, []);

  const handleSaveFailed = () => {
    message.error(
      "Form could not be saved. Please address any validation errors."
    );
  };

  const handleSave = (recipeForm: BT.Recipe) => {
    const newRecipe: BT.Recipe = {
      ...recipeForm,
      id: recipe?.id ?? "",
      userId: brewSettings.id ?? "",
      updatedDate: moment().toISOString(),
      createdDate: recipe.createdDate,
      ingredients,
    };
    dispatch(processCreateUpdateRecipe(newRecipe));
    dispatch(setPageIsClean(true));
    message.success(`${newRecipe.name} has been saved.`);
    fireAnalyticsEvent("Recipe Saved", { recipeId: recipe.id });
  };

  const goBackToRecipeList = () => {
    navigate("/recipes/list/");
  };

  const handleOnFieldsChange = (changedFields: any) => {
    if (changedFields.length === 0) {
      return null;
    }

    if (changedFields[0].name[0] === "measurementType") {
      // recipe type was changed, lets convert the recipe
      if (changedFields[0].value === "metric") {
        const metricBatchSize: number = gallonsToLiters(
          form.getFieldValue("batchSize")
        );
        form.setFieldsValue({ batchSize: metricBatchSize });
      } else {
        const imperialBatchSize: number = litersToGallons(
          form.getFieldValue("batchSize")
        );
        form.setFieldsValue({ batchSize: imperialBatchSize });
      }
      updateStats(ingredients);
    }
  };

  const handleOnValuesChange = (changedValues: any) => {
    dispatch(setPageIsClean(false));

    const changedValue = Object.keys(changedValues)[0];
    if (["batchSize", "efficiency"].includes(changedValue)) {
      updateStats(ingredients);
    }
  };

  const handleSetIngredients = (newIngredients: BT.ValidIngredient[]) => {
    dispatch(setPageIsClean(false));
    updateStats(newIngredients);
    setIngredients(newIngredients);
  };

  const updateStats = (newIngredients: BT.ValidIngredient[] = null) => {
    const workingRecipe: BT.Recipe = form.getFieldsValue();
    if (newIngredients !== null) {
      workingRecipe.ingredients = newIngredients;
    }
    setStats(getStats(workingRecipe, brewSettings));
  };

  const formSections = (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="General Info" key="1">
        <GeneralInfo measurementType={form.getFieldValue("measurementType")} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Ingredients" key="2">
        <Ingredients
          ingredients={ingredients}
          measurementType={form.getFieldValue("measurementType")}
          setIngredients={handleSetIngredients}
        />
      </Tabs.TabPane>
      {/* <Tabs.TabPane tab="Water Chemistry" key="3">
        Under construction
      </Tabs.TabPane> */}
    </Tabs>
  );

  const getLayout = () => {
    if (isDesktop) {
      return (
        <Row justify="start" gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            {formSections}
          </Col>
          <Col xs={0} sm={0} md={0} lg={8} xl={8}>
            <Affix offsetTop={10}>
              <StatsSection
                stats={stats}
                measurementType={form.getFieldValue("measurementType")}
              />
            </Affix>
          </Col>
        </Row>
      );
    }

    return (
      <>
        {formSections}
        <StatsSection
          stats={stats}
          measurementType={form.getFieldValue("measurementType")}
        />
        <Divider />
      </>
    );
  };

  return (
    <Form
      name="recipe-edit-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
      onFinish={handleSave}
      onFinishFailed={handleSaveFailed}
      scrollToFirstError={true}
      autoComplete="off"
      layout="vertical"
      onValuesChange={handleOnValuesChange}
      onFieldsChange={handleOnFieldsChange}
      preserve
    >
      <Content
        isLoading={loading}
        pageTitle={!loading ? recipe?.name ?? "" : ""}
      >
        {getLayout()}
        <Affix offsetBottom={10} style={{ float: "right" }}>
          <Space>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={goBackToRecipeList}>Back to Recipe List</Button>
            </Form.Item>
          </Space>
        </Affix>
      </Content>
    </Form>
  );
};

export default RecipeDetailPage;
