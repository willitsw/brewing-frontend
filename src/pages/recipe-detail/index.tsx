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
  Affix,
  message,
  Col,
  Row,
} from "antd";
import { deepCloneObject } from "../../utils/helpers";
import OkCancelModal from "../../components/ok-cancel-modal";
import { StepBackwardFilled } from "@ant-design/icons";
import GrainAdditions from "./grain-additions";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  processCreateUpdateRecipe,
  RecipeActionTypes,
  selectCurrentRecipe,
} from "../../redux/recipe-list/slice";
import {
  CultureAdditionType,
  FermentableAdditionType,
  HopAdditionType,
  UseType,
} from "../../types/beer-json";
import { calculateSrm } from "../../utils/beer-math";
import HopAdditions from "./hop-additions";
import { selectCurrentUser } from "../../redux/user/slice";
import YeastAdditions from "./yeast-additions";
import GeneralInfo from "./general-info";
import styles from "./index.module.css";
import Stats from "./stats";
export interface RecipeGrain {
  name: string;
  amount: number | null;
  color: number | null;
  gravity: number | null;
  type:
    | "dry extract"
    | "extract"
    | "grain"
    | "sugar"
    | "fruit"
    | "juice"
    | "honey"
    | "other";
}

export interface RecipeHop {
  name: string;
  amount: number | null;
  alpha: number;
  additionType: UseType | null;
  minutes: number | null;
}

export interface RecipeYeast {
  name: string;
  attenuation: number;
}

export interface RecipeForm {
  name: string;
  author: string;
  batchSizeValue: number;
  efficiencyValue: number;
  type:
    | "cider"
    | "kombucha"
    | "soda"
    | "other"
    | "mead"
    | "wine"
    | "extract"
    | "partial mash"
    | "all grain";
  description?: string;
  grains: RecipeGrain[];
  hops: RecipeHop[];
  yeasts: RecipeYeast[];
}

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
  ingredients: {
    fermentable_additions: [],
    hop_additions: [],
    culture_additions: [],
  },
  type: "all grain",
  user: "bob",
};

const RecipeDetailPage = () => {
  const [recipeForm] = Form.useForm<RecipeForm>();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const recipe = useAppSelector(selectCurrentRecipe);
  const currentUser = useAppSelector(selectCurrentUser);
  const [isFormTouched, setIsFormTouched] = useState<boolean>(false);
  const [srm, setSrm] = useState<number | "-">("-");
  const [loading, setLoading] = useState<boolean>(true);
  const [isDesktop] = useState<boolean>(
    window.matchMedia("(min-width: 1200px)").matches
  );

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

      const grainsArray: RecipeGrain[] =
        workingRecipe.ingredients.fermentable_additions.map((grain) => {
          return {
            name: grain.name,
            amount: grain.amount?.value ?? null,
            color: grain.color?.value ?? null,
            gravity: grain.yield?.potential?.value ?? null,
            type: grain.type,
          };
        });

      const hopsArray: RecipeHop[] =
        workingRecipe.ingredients.hop_additions?.map((hop) => {
          return {
            name: hop.name,
            amount: hop.amount?.value ?? null,
            alpha: hop.alpha_acid.value,
            additionType: hop.timing.use ?? null,
            minutes: hop.timing.time?.value ?? null,
          };
        }) ?? [];

      const yeastArray: RecipeYeast[] =
        workingRecipe.ingredients.culture_additions?.map((yeast) => {
          return {
            name: yeast.name,
            attenuation: yeast.attenuation?.value ?? 0,
          };
        }) ?? [];

      recipeForm.setFieldsValue({
        name: workingRecipe.name,
        author: workingRecipe.author,
        batchSizeValue: workingRecipe.batch_size.value,
        efficiencyValue: workingRecipe.efficiency.brewhouse.value,
        type: workingRecipe.type,
        description: workingRecipe.description,
        grains: grainsArray,
        hops: hopsArray,
        yeasts: yeastArray,
      });

      const srmData = grainsArray.map((grain: any) => {
        return {
          lovibond: grain.color,
          pounds: grain.amount,
        };
      });
      setSrm(calculateSrm(workingRecipe.batch_size.value, srmData));

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

  const handleSave = (recipeForm: RecipeForm) => {
    const submitCopy: Recipe = deepCloneObject(recipe);
    submitCopy.name = recipeForm.name;
    submitCopy.description = recipeForm.description;
    submitCopy.author = recipeForm.author;
    submitCopy.batch_size.value = recipeForm.batchSizeValue;
    submitCopy.efficiency.brewhouse.value = recipeForm.efficiencyValue;
    submitCopy.type = recipeForm.type;
    submitCopy.user = currentUser?.uid ?? "";

    const fermentableAdditions: FermentableAdditionType[] =
      recipeForm.grains.map((grain: RecipeGrain): FermentableAdditionType => {
        return {
          name: grain.name,
          amount: {
            unit: "lb",
            value: grain.amount ?? 0,
          },
          color: {
            unit: "Lovi",
            value: grain.color ?? 0,
          },
          type: grain.type,
          yield: {
            potential: {
              unit: "sg",
              value: grain.gravity ?? 0,
            },
          },
        };
      });
    submitCopy.ingredients.fermentable_additions = fermentableAdditions;

    const hopAdditions: HopAdditionType[] = recipeForm.hops.map(
      (hop: RecipeHop): HopAdditionType => {
        return {
          name: hop.name,
          alpha_acid: { value: hop.alpha, unit: "%" },
          timing: {
            time: {
              unit: "min",
              value: hop.minutes ?? 0,
            },
            use: hop.additionType ?? undefined,
          },
          amount: {
            unit: "oz",
            value: hop.amount ?? 0,
          },
        };
      }
    );
    submitCopy.ingredients.hop_additions = hopAdditions;

    const yeastAdditions: CultureAdditionType[] = recipeForm.yeasts.map(
      (yeast: RecipeYeast): CultureAdditionType => {
        return {
          name: yeast.name,
          form: "liquid",
          type: "ale",
          attenuation: { unit: "%", value: yeast.attenuation },
        };
      }
    );
    submitCopy.ingredients.culture_additions = yeastAdditions;

    dispatch(processCreateUpdateRecipe(submitCopy));
    setIsFormTouched(false);
    message.success(`${submitCopy.name} has been saved.`);
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

  const handleOnValuesChange = (changedValues: any) => {
    setIsFormTouched(true);

    const changedValue = Object.keys(changedValues)[0];
    if (changedValue === "grains" || changedValue === "batchSizeValue") {
      updateSrm();
    }
  };

  const updateSrm = () => {
    const recipe = recipeForm.getFieldsValue();

    if (!recipe?.batchSizeValue || !recipe?.grains) {
      setSrm("-");
    }
    const srmData = recipe.grains.map((grain: any) => {
      return {
        lovibond: grain.color,
        pounds: grain.amount,
      };
    });
    setSrm(calculateSrm(recipe.batchSizeValue, srmData));
  };

  const formSections = (
    <>
      <GeneralInfo />
      <Divider />
      <GrainAdditions recipeForm={recipeForm} srm={srm} />
      <Divider />
      <HopAdditions recipeForm={recipeForm} />
      <Divider />
      <YeastAdditions recipeForm={recipeForm} />
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
              <Stats />
            </Affix>
          </Col>
        </Row>
      );
    }

    return (
      <>
        {formSections}
        <Stats />
        <Divider />
      </>
    );
  };

  return (
    <>
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
                <Button onClick={handleCancelClick}>Back to Recipe List</Button>
              </Form.Item>
            </Space>
          </Affix>
        </Content>
      </Form>
      <OkCancelModal
        onCancel={() => setShowCancelModal(false)}
        onSubmit={() => goBackToRecipeList()}
        showModal={showCancelModal}
        title={`Are you sure you'd like to cancel editing ${recipe?.name}?`}
      >
        This cannot be undone.
      </OkCancelModal>
    </>
  );
};

export default RecipeDetailPage;
