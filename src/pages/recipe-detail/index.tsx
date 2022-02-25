import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Content from "../../components/content";
import { Hop, Recipe } from "../../types/recipe";
import { MeasurementType } from "../../types/brew-settings";
import { Stats } from "../../types/stats";
import { v4 as uuid } from "uuid";
import { getRecipeById } from "../../utils/api-calls";
import { Form, Button, Space, Divider, Affix, message, Col, Row } from "antd";
import GrainAdditions from "./grain-additions";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  processCreateUpdateRecipe,
  RecipeActionTypes,
  selectCurrentRecipe,
  setCurrentRecipe,
} from "../../redux/recipe-list/slice";
import {
  calculateFg,
  calculateOg,
  calculateSrm,
  calculateAbv,
  calculateIbu,
  getStats,
} from "../../utils/beer-math";
import HopAdditions from "./hop-additions";
import YeastAdditions from "./yeast-additions";
import GeneralInfo from "./general-info";
import StatsSection from "./stats";
import { setPageIsClean } from "../../redux/global-modals/slice";
import { recipeToImperial, recipeToMetric } from "../../utils/converters";
import { selectBrewSettings } from "../../redux/brew-settings/slice";
import { selectCurrentUser } from "../../redux/user/slice";

const defaultRecipe: Recipe = {
  name: "New Recipe",
  description: "",
  author: "",
  batchSize: 5,
  id: uuid(),
  fermentables: [],
  hops: [],
  cultures: [],
  type: "All grain",
  user: "bob",
  measurementType: "imperial",
  efficiency: 70,
};

const defaultStats: Stats = {
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
  const currentUser = useAppSelector(selectCurrentUser);
  const [form] = Form.useForm<Recipe>();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const recipe = useAppSelector(selectCurrentRecipe);
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [measurementType, setMeasurementType] = useState<MeasurementType>(
    brewSettings.measurementType
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [isDesktop] = useState<boolean>(
    window.matchMedia("(min-width: 1200px)").matches
  );

  useEffect(() => {
    const onComponentLoad = async () => {
      let workingRecipe: Recipe;
      if (location.pathname.includes("/recipes/duplicate") && id) {
        workingRecipe = await getRecipeById(id);
        workingRecipe.name = `Copy of ${workingRecipe.name}`;
        workingRecipe.id = uuid();
      } else if (location.pathname.includes("/recipes/edit") && id) {
        workingRecipe = await getRecipeById(id);
      } else {
        workingRecipe = { ...defaultRecipe };

        workingRecipe.author = brewSettings.author;
        workingRecipe.batchSize = brewSettings.batchSize;
        workingRecipe.efficiency = brewSettings.brewhouseEfficiency;
        workingRecipe.measurementType = brewSettings.measurementType;
        workingRecipe.user = currentUser?.uid ?? "";
      }

      setStats(getStats(workingRecipe, brewSettings));

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

  const handleSave = (recipeForm: Recipe) => {
    const newRecipe: Recipe = {
      ...recipeForm,
      id: recipe?.id ?? "",
      user: recipe?.user ?? "",
    };
    dispatch(processCreateUpdateRecipe(newRecipe));
    dispatch(setPageIsClean(true));
    message.success(`${newRecipe.name} has been saved.`);
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
        const oldRecipe: Recipe = form.getFieldsValue();
        form.setFieldsValue(recipeToMetric(oldRecipe));
        setMeasurementType("metric");
      } else {
        const oldRecipe: Recipe = form.getFieldsValue();
        form.setFieldsValue(recipeToImperial(oldRecipe));
        setMeasurementType("imperial");
      }
    }

    if (changedFields[0].name.includes("use")) {
      // hops use was changed, lets reset the timing value
      const hops: Hop[] = form.getFieldValue("hops");
      const indexToChange = changedFields[0].name[1];
      hops[indexToChange].timing = 0;
      form.setFieldsValue({ hops });
    }
  };

  const handleOnValuesChange = (changedValues: any) => {
    dispatch(setPageIsClean(false));

    const changedValue = Object.keys(changedValues)[0];
    if (
      changedValue === "fermentables" ||
      changedValue === "batchSize" ||
      changedValue === "efficiency" ||
      changedValue === "cultures" ||
      changedValue === "hops"
    ) {
      updateStats();
    }
  };

  const updateStats = () => {
    const workingRecipe: Recipe = form.getFieldsValue();
    setStats(getStats(workingRecipe, brewSettings));
  };

  const formSections = (
    <>
      <GeneralInfo measurementType={measurementType} />
      <Divider />
      <GrainAdditions form={form} measurementType={measurementType} />
      <Divider />
      <HopAdditions form={form} measurementType={measurementType} />
      <Divider />
      <YeastAdditions form={form} />
      <Divider />
    </>
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
              <StatsSection stats={stats} measurementType={measurementType} />
            </Affix>
          </Col>
        </Row>
      );
    }

    return (
      <>
        {formSections}
        <StatsSection stats={stats} measurementType={measurementType} />
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
