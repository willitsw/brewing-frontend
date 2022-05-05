import React from "react";
import { BrewingTypes as BT, RecipeUtils as RU } from "brewing-shared";
import { Col, Descriptions, Divider, List, Row, Typography } from "antd";

interface ReadOnlyRecipeProps {
  recipe: BT.Recipe;
}

const ReadOnlyRecipe = ({ recipe }: ReadOnlyRecipeProps) => {
  const { Fermentable, Hop, Misc, Culture, Chemistry } =
    RU.sortIngredientsByType(recipe.ingredients);

  const { StrikeWater, Mash, Boil, Fermentor, Bottle } =
    RU.sortIngredientsByStep(recipe.ingredients);

  return (
    <>
      <style type="text/css" media="print">
        {"@page { size: auto; margin: 10mm !important; }"}
      </style>
      <Typography.Title level={2}>{recipe.name}</Typography.Title>
      <Descriptions
        title={<Typography.Title level={3}>General Info</Typography.Title>}
      >
        {recipe.description && (
          <Descriptions.Item span={3} label="Description">
            {recipe.description}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Author">{recipe.author}</Descriptions.Item>
        <Descriptions.Item label="Batch Size">
          {recipe.batchSize}
        </Descriptions.Item>
        <Descriptions.Item label="Target Efficiency">
          {recipe.efficiency}
        </Descriptions.Item>
        {recipe.createdDate && (
          <Descriptions.Item label="Created On">
            {recipe.createdDate}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Recipe Type">{recipe.type}</Descriptions.Item>
      </Descriptions>
      <Typography.Title level={3}>Ingredients</Typography.Title>
      <Row>
        <Col xs={12} sm={12} md={8} lg={8} xl={8}>
          {Fermentable.length > 0 && (
            <>
              <List
                header={
                  <Typography.Title level={5}>
                    - Fermentables -
                  </Typography.Title>
                }
                dataSource={Fermentable.map((fermentable) => {
                  return `${fermentable.amount} ${fermentable.amountType} ${fermentable.name} (${fermentable.form} - ${fermentable.lovibond} Lov)`;
                })}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <Divider />
            </>
          )}
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={8}>
          {Hop.length > 0 && (
            <>
              <List
                header={<Typography.Title level={5}>- Hops -</Typography.Title>}
                dataSource={Hop.map((hop) => {
                  return `${hop.amount} ${hop.amountType} ${hop.name} ${hop.alphaAcid} AA`;
                })}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <Divider />
            </>
          )}
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={8}>
          {Culture.length > 0 && (
            <>
              <List
                header={
                  <Typography.Title level={5}>- Cultures -</Typography.Title>
                }
                dataSource={Culture.map((culture) => {
                  return `${culture.amount} ${culture.amountType ?? ""} ${
                    culture.name
                  } - ${culture.attenuation}% attenuation`;
                })}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <Divider />
            </>
          )}
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={8}>
          {Misc.length > 0 && (
            <>
              <List
                header={
                  <Typography.Title level={5}>- Misc. -</Typography.Title>
                }
                dataSource={Misc.map((misc) => {
                  return `${misc.amount} ${misc.amountType ?? ""} ${misc.name}`;
                })}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <Divider />
            </>
          )}
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={8}>
          {Chemistry.length > 0 && (
            <>
              <List
                header={
                  <Typography.Title level={5}>- Chemistry -</Typography.Title>
                }
                dataSource={Chemistry.map((chemical) => {
                  return `${chemical.amount} ${chemical.amountType ?? ""} ${
                    chemical.name
                  }`;
                })}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <Divider />
            </>
          )}
        </Col>
      </Row>
      <Typography.Title level={3}>Steps</Typography.Title>
      {StrikeWater.length > 0 && (
        <>
          <List
            header={
              <Typography.Title level={5}>
                - Strike Water Preparation -
              </Typography.Title>
            }
            dataSource={StrikeWater.map((step, index) => {
              const stepNumber = index + 1;
              return `${stepNumber}. Add ${step.amount} ${
                step.amountType ?? ""
              } ${step.name}. ${step.notes ?? ""}`;
            })}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Divider />
        </>
      )}
      {Mash.length > 0 && (
        <>
          <List
            header={<Typography.Title level={5}>- Mash -</Typography.Title>}
            dataSource={Mash.map((step, index) => {
              const stepNumber = index + 1;
              return `${stepNumber}. Add ${step.amount} ${
                step.amountType ?? ""
              } ${step.name}. ${step.notes ?? ""}`;
            })}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Divider />
        </>
      )}
      {Boil.length > 0 && (
        <>
          <List
            header={<Typography.Title level={5}>- Boil -</Typography.Title>}
            dataSource={Boil.map((step, index) => {
              const stepNumber = index + 1;
              return `${stepNumber}. At ${
                step.timing
              } minutes left in boil, add ${step.amount} ${
                step.amountType ?? ""
              } ${step.name}. ${step.notes ?? ""}`;
            })}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Divider />
        </>
      )}
      {Fermentor.length > 0 && (
        <>
          <List
            header={
              <Typography.Title level={5}>- Fermentation -</Typography.Title>
            }
            dataSource={Fermentor.map((step, index) => {
              const stepNumber = index + 1;
              return `${stepNumber}. At ${
                step.timing
              } days into fermentation, add ${step.amount} ${
                step.amountType ?? ""
              } ${step.name}. ${step.notes ?? ""}`;
            })}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Divider />
        </>
      )}
      {Bottle.length > 0 && (
        <>
          <List
            header={
              <Typography.Title level={5}>- Packaging -</Typography.Title>
            }
            dataSource={Bottle.map((step, index) => {
              const stepNumber = index + 1;
              return `${stepNumber}. Add ${step.amount} ${
                step.amountType ?? ""
              } ${step.name}. ${step.notes ?? ""}`;
            })}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Divider />
        </>
      )}
    </>
  );
};

export default ReadOnlyRecipe;
