import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Content from "../../components/content";
import { Hop, Recipe } from "../../types/recipe";
import { MeasurementType } from "../../types/brew-settings";
import { v4 as uuid } from "uuid";
import { getRecipeById } from "../../utils/api-calls";
import { Form, Button, Space, Divider, Affix, message, Col, Row } from "antd";
import GrainAdditions from "./grain-additions";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  processCreateUpdateRecipe,
  RecipeActionTypes,
  selectCurrentRecipe,
} from "../../redux/recipe-list/slice";
import {
  calculateFg,
  calculateOg,
  calculateSrm,
  calculateAbv,
  calculateIbu,
} from "../../utils/beer-math";
import HopAdditions from "./hop-additions";
import YeastAdditions from "./yeast-additions";
import GeneralInfo from "./general-info";
import Stats from "./stats";
import { setPageIsClean } from "../../redux/global-modals/slice";
import { recipeToImperial, recipeToMetric } from "../../utils/converters";

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

const RecipeDetailPage = () => {
  const [recipeForm] = Form.useForm<Recipe>();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const recipe = useAppSelector(selectCurrentRecipe);
  const [srm, setSrm] = useState<number | null>(null);
  const [og, setOg] = useState<number | null>(null);
  const [fg, setFg] = useState<number | null>(null);
  const [abv, setAbv] = useState<number | null>(null);
  const [ibu, setIbu] = useState<number | null>(null);
  const [measurementType, setMeasurementType] =
    useState<MeasurementType>("imperial");
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
        workingRecipe = defaultRecipe;
        // TODO: add defaults from brew settings here
      }

      recipeForm.setFieldsValue(workingRecipe);

      setSrm(calculateSrm(workingRecipe.batchSize, workingRecipe.fermentables));
      const workingOg = calculateOg(
        workingRecipe.fermentables,
        workingRecipe.batchSize,
        workingRecipe.efficiency
      );
      const workingFg = calculateFg(workingOg, workingRecipe.cultures);
      const workingAbv = calculateAbv(workingOg, workingFg);

      setOg(workingOg);
      setFg(workingFg);
      setAbv(workingAbv);

      const workingIbu = calculateIbu(
        workingOg,
        workingRecipe.hops,
        workingRecipe.batchSize
      );
      setIbu(workingIbu);

      dispatch({
        type: RecipeActionTypes.SetCurrentRecipe,
        payload: workingRecipe,
      });
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
    dispatch(processCreateUpdateRecipe(recipeForm));
    dispatch(setPageIsClean(true));
    message.success(`${recipeForm.name} has been saved.`);
  };

  const goBackToRecipeList = () => {
    navigate("/recipes/list/");
  };

  const handleOnFieldsChange = (changedFields: any) => {
    if (changedFields[0].name[0] === "measurementType") {
      // recipe type was changed, lets convert it
      if (changedFields[0].value === "metric") {
        const oldRecipe: Recipe = recipeForm.getFieldsValue();
        recipeForm.setFieldsValue(recipeToMetric(oldRecipe));
        setMeasurementType("metric");
      } else {
        const oldRecipe: Recipe = recipeForm.getFieldsValue();
        recipeForm.setFieldsValue(recipeToImperial(oldRecipe));
        setMeasurementType("imperial");
      }
    }

    if (changedFields[0].name.includes("use")) {
      // hops use was changed, lets reset the timing value
      const hops: Hop[] = recipeForm.getFieldValue("hops");
      const indexToChange = changedFields[0].name[1];
      hops[indexToChange].timing = 0;
      recipeForm.setFieldsValue({ hops });
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
    const workingRecipe = recipeForm.getFieldsValue();
    setSrm(calculateSrm(workingRecipe.batchSize, workingRecipe.fermentables));
    const workingOg = calculateOg(
      workingRecipe.fermentables,
      workingRecipe.batchSize,
      workingRecipe.efficiency
    );
    const workingFg = calculateFg(workingOg, workingRecipe.cultures);
    const abv = calculateAbv(workingOg, workingFg);
    setOg(workingOg);
    setFg(workingFg);
    setAbv(abv);
    const workingIbu = calculateIbu(
      workingOg,
      workingRecipe.hops,
      workingRecipe.batchSize
    );
    setIbu(workingIbu);
  };

  const formSections = (
    <>
      <GeneralInfo measurementType={measurementType} />
      <Divider />
      <GrainAdditions
        recipeForm={recipeForm}
        measurementType={measurementType}
      />
      <Divider />
      <HopAdditions recipeForm={recipeForm} measurementType={measurementType} />
      <Divider />
      <YeastAdditions />
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
              <Stats srm={srm} og={og} fg={fg} abv={abv} ibu={ibu} />
            </Affix>
          </Col>
        </Row>
      );
    }

    return (
      <>
        {formSections}
        <Stats srm={srm} og={og} fg={fg} abv={abv} ibu={ibu} />
        <Divider />
      </>
    );
  };

  return (
    <Form
      name="recipe-edit-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={recipeForm}
      onFinish={handleSave}
      onFinishFailed={handleSaveFailed}
      scrollToFirstError={true}
      autoComplete="off"
      layout="vertical"
      onValuesChange={handleOnValuesChange}
      onFieldsChange={handleOnFieldsChange}
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
