import {
  Avatar,
  Button,
  ConfigProvider,
  Descriptions,
  Divider,
  List,
  Space,
  Tooltip,
  Typography,
  Modal,
} from "antd";
import React, { useState } from "react";
import { BrewingTypes as BT, RecipeUtils } from "brewing-shared";
import hop from "./hop.png";
import chemical from "./chemical.png";
import grain from "./grain.png";
import ingredient from "./ingredient.png";
import yeast from "./yeast.png";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import IngredientModal from "./ingredient-modal";
import { v4 as uuid } from "uuid";

interface IngredientsProps {
  measurementType: BT.MeasurementType;
  ingredients: BT.ValidIngredient[];
  setIngredients: (values: any) => void;
}

const ingredientIcons = {
  Culture: yeast,
  Fermentable: grain,
  Hop: hop,
  Misc: ingredient,
  Chemistry: chemical,
};

const Ingredients = ({
  measurementType,
  ingredients,
  setIngredients,
}: IngredientsProps) => {
  const [selectedIngredientId, setSelectedIngredientId] =
    useState<string>(null);
  const [ingredientToDelete, setIngredientToDelete] = useState<string>(null);

  const sortedIngredients = RecipeUtils.sortIngredientsByStep(ingredients);

  const steps = [
    {
      title: "Strike Water Additions",
      step: "StrikeWater",
      items: sortedIngredients.StrikeWater,
    },
    {
      title: "Mash Additions",
      step: "Mash",
      items: sortedIngredients.Mash,
    },
    {
      title: "Boil Additions",
      step: "Boil",
      items: sortedIngredients.Boil,
    },
    {
      title: "Fermentor Additions",
      step: "Fermentor",
      items: sortedIngredients.Fermentor,
    },
    {
      title: "Packaging Additions",
      step: "Bottle",
      items: sortedIngredients.Bottle,
    },
  ];

  const handleUpdateRecipe = (ingredient: BT.ValidIngredient) => {
    const ingredientToUpdate = ingredients.find(
      ({ id }) => selectedIngredientId === id
    );
    ingredient.id = ingredientToUpdate?.id ?? uuid();
    const newIngredients = [...ingredients];
    const ingredientIndexToReplace = newIngredients.findIndex(
      ({ id }) => id === ingredient.id
    );
    if (ingredientIndexToReplace !== -1) {
      newIngredients.splice(ingredientIndexToReplace, 1, ingredient);
    } else {
      newIngredients.push(ingredient);
    }
    setIngredients(newIngredients);
    setSelectedIngredientId(null);
  };

  const handleDeleteClick = () => {
    const newRawIngredients = [...ingredients].filter(
      (ingredient) => ingredient.id !== ingredientToDelete
    );
    setIngredients(newRawIngredients);

    setIngredientToDelete(null);
  };

  const formatListTitle = (text: string, step: string) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography.Title level={4}>{text}</Typography.Title>
      <Button
        style={{ marginLeft: "15px" }}
        type="primary"
        onClick={() => setSelectedIngredientId(step)}
      >
        Add Item
      </Button>
    </div>
  );

  const getTiming = (step: BT.Ingredient) => {
    if (step.step === "Boil") {
      return (
        <Descriptions.Item label="Timing">{step.timing} min</Descriptions.Item>
      );
    } else if (step.step === "Fermentor") {
      return (
        <Descriptions.Item label="Timing">{step.timing} days</Descriptions.Item>
      );
    }
    return null;
  };

  const getTypeSpecificDetails = (step: any) => {
    switch (step.type) {
      case "Chemistry":
        return (
          <Descriptions.Item label="Amount">{`${step.amount} ${step.amountType}`}</Descriptions.Item>
        );
      case "Fermentable":
        return (
          <>
            <Descriptions.Item label="Amount">{`${step.amount} ${step.amountType}`}</Descriptions.Item>
            <Descriptions.Item label="Lovibond">
              {step.lovibond}
            </Descriptions.Item>
            <Descriptions.Item label="Fermentable Type">
              {step.form}
            </Descriptions.Item>
            <Descriptions.Item label="Gravity">
              {step.potential}
            </Descriptions.Item>
          </>
        );
      case "Hop":
        return (
          <>
            <Descriptions.Item label="Amount">{`${step.amount} ${step.amountType}`}</Descriptions.Item>
            <Descriptions.Item label="Alpha Acid">
              {step.alphaAcid}
            </Descriptions.Item>
          </>
        );
      case "Culture":
        return (
          <>
            <Descriptions.Item label="Amount">{`${step.amount} ${step.amountType}`}</Descriptions.Item>
            <Descriptions.Item label="Attenuation">
              {step.attenuation}%
            </Descriptions.Item>
            <Descriptions.Item label="Yeast Type">
              {step.form}
            </Descriptions.Item>
          </>
        );
      case "Misc":
        return (
          <>
            <Descriptions.Item label="Amount">{`${step.amount} ${step.amountType}`}</Descriptions.Item>
          </>
        );
    }
  };

  const getDetails = (item: BT.Ingredient) => {
    return (
      <Descriptions
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {item.name}
            <Space>
              <Tooltip title="Edit">
                <Button
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => setSelectedIngredientId(item.id)}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => setIngredientToDelete(item.id)}
                />
              </Tooltip>
            </Space>
          </div>
        }
      >
        {getTiming(item)}
        {getTypeSpecificDetails(item)}
        {item.notes && (
          <Descriptions.Item label="Notes">{item.notes}</Descriptions.Item>
        )}
      </Descriptions>
    );
  };

  return (
    <ConfigProvider renderEmpty={() => null}>
      {steps.map(({ title, items, step }, index) => {
        return (
          <div key={index}>
            <List
              header={formatListTitle(title, step)}
              itemLayout="horizontal"
              dataSource={items}
              renderItem={(item: BT.Ingredient) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={ingredientIcons[item.type]} />}
                    description={getDetails(item)}
                  />
                </List.Item>
              )}
            />
            <Divider />
          </div>
        );
      })}
      {/* {selectedIngredientId && ( */}
      <IngredientModal
        handleCancel={() => setSelectedIngredientId(null)}
        ingredientId={selectedIngredientId}
        ingredientList={ingredients}
        updateRecipe={handleUpdateRecipe}
        measurementType={measurementType}
      />

      <Modal
        title="Delete Ingredient?"
        onCancel={() => setIngredientToDelete(null)}
        onOk={handleDeleteClick}
        visible={!!ingredientToDelete}
      >
        Are you sure you want to delete this ingredient?
      </Modal>
    </ConfigProvider>
  );
};

export default Ingredients;
