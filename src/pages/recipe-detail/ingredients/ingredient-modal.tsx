import {
  AutoComplete,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { BrewingTypes as BT } from "brewing-shared";
import React, { useEffect, useState } from "react";
import { setPageIsClean } from "../../../redux/global-modals/slice";
import { useAppDispatch } from "../../../redux/hooks";
import DefaultGrains from "../../../data/default-grains";
import DefaultHops from "../../../data/default-hops";

interface IngredientModalProps {
  ingredientId: string;
  ingredientList: BT.ValidIngredient[];
  updateRecipe: (ingredient: BT.ValidIngredient) => void;
  handleCancel: () => void;
  measurementType: BT.MeasurementType;
}

const grainOptions = DefaultGrains.map((grain) => {
  return {
    value: grain.name,
  };
});

const hopOptions = DefaultHops.map((hop) => {
  return {
    value: hop.name,
  };
});

const IngredientModal = ({
  ingredientId,
  ingredientList,
  updateRecipe,
  handleCancel,
  measurementType,
}: IngredientModalProps) => {
  const [form] = Form.useForm<BT.ValidIngredient>();
  const dispatch = useAppDispatch();
  const [type, setType] = useState<BT.IngredientType>(null);
  const [step, setStep] = useState<BT.Step>(null);

  useEffect(() => {
    form.resetFields();

    const ingredientToUpdate = ingredientList.find(
      ({ id }) => ingredientId === id
    );
    if (ingredientToUpdate) {
      form.setFieldsValue(ingredientToUpdate);
      setType(ingredientToUpdate.type);
      setStep(ingredientToUpdate.step);
    } else if (ingredientId) {
      form.setFieldsValue({ step: ingredientId as BT.Step });
      setType(null);
      setStep(ingredientId as BT.Step);
    }
  }, [ingredientId]);

  // useEffect(() => {
  //   //form.resetFields();
  //   //form.setFieldsValue({ step, type });
  //   //setType(null);
  // }, [step]);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ step, type });
  }, [type]);

  const handleOnFieldsChange = (changedFields: any) => {
    if (changedFields.length === 0) {
      return null;
    }

    dispatch(setPageIsClean(false));

    if (changedFields[0].name[0] === "type") {
      setType(form.getFieldValue("type"));
    } else if (changedFields[0].name[0] === "step") {
      setStep(form.getFieldValue("step"));
    }
  };

  const handleHopNameSelect = (selection: string) => {
    const defaultHop = DefaultHops.find((hop) => hop.name === selection);

    if (defaultHop) {
      const ingredientToUpdate = form.getFieldsValue() as BT.Hop;
      ingredientToUpdate.alphaAcid = defaultHop.alpha;
      form.setFieldsValue(ingredientToUpdate);
    }
  };

  const handleGrainNameSelect = (selection: string) => {
    const defaultGrain = DefaultGrains.find(
      (grain) => grain.name === selection
    );

    if (defaultGrain) {
      const ingredientToUpdate = form.getFieldsValue() as BT.Fermentable;
      ingredientToUpdate.lovibond = defaultGrain.lovibond;
      ingredientToUpdate.potential = defaultGrain.gravity;
      ingredientToUpdate.form = defaultGrain.type;
      form.setFieldsValue(ingredientToUpdate);
    }
  };

  const handleSaveForm = async () => {
    try {
      const values = await form.validateFields();
      updateRecipe(values);
    } catch (e) {
      console.log("Invalid form.", e);
    }
  };

  const handleCancelClick = () => {
    setType(null);
    setStep(null);
    handleCancel();
  };

  const renderTypeSpecificElements = () => {
    switch (type) {
      case "Fermentable":
        return (
          <>
            <Row>
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                <Form.Item
                  name="name"
                  label="Name"
                  labelCol={{ span: 30, offset: 0 }}
                  rules={[
                    {
                      required: true,
                      message: "Please name your grain.",
                    },
                  ]}
                >
                  <AutoComplete
                    options={grainOptions}
                    style={{ width: 220 }}
                    filterOption={(inputValue, option) =>
                      option?.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onSelect={(selection: string) =>
                      handleGrainNameSelect(selection)
                    }
                    placeholder="Grain Name"
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="form"
                  label="Type"
                  labelCol={{ span: 30, offset: 0 }}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                  initialValue="grain"
                >
                  <Select style={{ width: 120 }}>
                    <Select.Option value="grain">Grain</Select.Option>
                    <Select.Option value="extract">
                      Liquid Extract
                    </Select.Option>
                    <Select.Option value="dry extract">
                      Dry Extract
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="amount"
                  label="Amount"
                  labelCol={{ span: 30, offset: 0 }}
                  rules={[
                    {
                      required: true,
                      message: "How much?",
                    },
                  ]}
                  initialValue="0"
                >
                  <InputNumber
                    min="0"
                    max="100"
                    step="0.1"
                    style={{ width: 105 }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="amountType"
                  label="Amount Type"
                  labelCol={{ span: 30, offset: 0 }}
                  rules={[
                    {
                      required: true,
                      message: "Enter a type",
                    },
                  ]}
                  initialValue={measurementType === "imperial" ? "lb" : "kg"}
                >
                  <Select style={{ width: 100 }}>
                    <Select.Option value="lb">lb</Select.Option>
                    <Select.Option value="kg">kg</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="lovibond"
                  label="Color"
                  labelCol={{ span: 30, offset: 0 }}
                  initialValue={0}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                >
                  <InputNumber
                    min="0"
                    max="100"
                    step="1"
                    style={{ width: 105 }}
                    addonAfter="lov"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="potential"
                  label="Gravity"
                  labelCol={{ span: 30, offset: 0 }}
                  initialValue={"1.000"}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                >
                  <InputNumber
                    stringMode
                    min="1"
                    max="2"
                    step="0.001"
                    style={{ width: 84 }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        );
      case "Hop":
        return (
          <>
            <Row>
              <Col span={14}>
                <Form.Item
                  name="name"
                  label="Name"
                  labelCol={{ span: 30, offset: 0 }}
                  rules={[
                    {
                      required: true,
                      message: "Please name your grain.",
                    },
                  ]}
                >
                  <AutoComplete
                    options={hopOptions}
                    style={{ width: 220 }}
                    filterOption={(inputValue, option) =>
                      option?.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onSelect={(selection: string) =>
                      handleHopNameSelect(selection)
                    }
                    placeholder="Hop Name"
                  />
                </Form.Item>
              </Col>
              <Col span={10}></Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="amount"
                  label="Amount"
                  labelCol={{ span: 30, offset: 0 }}
                  initialValue={0}
                  rules={[
                    {
                      required: true,
                      message: "How much?",
                    },
                  ]}
                >
                  <InputNumber
                    min="0"
                    max="100"
                    step="0.5"
                    style={{ width: 105 }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="amountType"
                  label="Amount Type"
                  labelCol={{ span: 30, offset: 0 }}
                  rules={[
                    {
                      required: true,
                      message: "Enter a type",
                    },
                  ]}
                  initialValue={measurementType === "imperial" ? "oz" : "g"}
                >
                  <Select style={{ width: 120 }}>
                    <Select.Option value="oz">oz</Select.Option>
                    <Select.Option value="g">g</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="alphaAcid"
                  label="Bitterness"
                  labelCol={{ span: 30, offset: 0 }}
                  initialValue={0}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                >
                  <InputNumber
                    min="0"
                    max="25"
                    step="0.1"
                    style={{ width: 105 }}
                    addonAfter="AA"
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        );
      case "Culture":
        return (
          <>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  labelCol={{ span: 30, offset: 0 }}
                  rules={[
                    {
                      required: true,
                      message: "Please name your yeast.",
                    },
                  ]}
                >
                  <Input style={{ width: 220 }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="amount"
                  label="Amount"
                  labelCol={{ span: 30, offset: 0 }}
                  initialValue={1}
                  rules={[
                    {
                      required: true,
                      message: "How much?",
                    },
                  ]}
                >
                  <InputNumber
                    min="0"
                    max="100"
                    step="1"
                    style={{ width: 105 }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="amountType"
                  label="Amount Type"
                  labelCol={{ span: 30, offset: 0 }}
                  rules={[
                    {
                      required: true,
                      message: "Enter a type",
                    },
                  ]}
                  initialValue="packages"
                >
                  <Input style={{ width: 115 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="attenuation"
                  label="Attenuation"
                  labelCol={{ span: 30, offset: 0 }}
                  initialValue="77"
                >
                  <InputNumber
                    style={{ width: 120 }}
                    min="0"
                    max="100"
                    step="1"
                    addonAfter="%"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="form"
                  label="Yeast Form"
                  labelCol={{ span: 30, offset: 0 }}
                  initialValue={"Dry"}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                >
                  <Select style={{ width: 120 }}>
                    <Select.Option value="Dry">Dry</Select.Option>
                    <Select.Option value="Liquid">Liquid</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </>
        );
      case "Misc":
        return (
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                labelCol={{ span: 30, offset: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Please name your yeast.",
                  },
                ]}
              >
                <Input style={{ width: 220 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="amount"
                label="Amount"
                labelCol={{ span: 30, offset: 0 }}
                rules={[
                  {
                    required: true,
                    message: "How much?",
                  },
                ]}
                initialValue="0"
              >
                <Input style={{ width: 115 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="amountType"
                label="Amount Type"
                labelCol={{ span: 30, offset: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Enter a type",
                  },
                ]}
                initialValue="each"
              >
                <Input style={{ width: 115 }} />
              </Form.Item>
            </Col>
          </Row>
        );
      case "Chemistry":
        return (
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                labelCol={{ span: 30, offset: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Please name your yeast.",
                  },
                ]}
              >
                <Input style={{ width: 220 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="amount"
                label="Amount"
                labelCol={{ span: 30, offset: 0 }}
                rules={[
                  {
                    required: true,
                    message: "How much?",
                  },
                ]}
                initialValue="0"
              >
                <Input style={{ width: 115 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="amountType"
                label="Amount Type"
                labelCol={{ span: 30, offset: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Enter a type",
                  },
                ]}
                initialValue="grams"
              >
                <Input style={{ width: 115 }} />
              </Form.Item>
            </Col>
          </Row>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title="Add/Edit Ingredient"
      visible={!!ingredientId}
      onOk={handleSaveForm}
      onCancel={handleCancelClick}
      destroyOnClose
      forceRender
    >
      <Form
        name="ingredient-edit-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        scrollToFirstError={true}
        autoComplete="off"
        layout="vertical"
        onFieldsChange={handleOnFieldsChange}
        preserve={false}
      >
        <Row justify="start" gutter={[12, 0]}>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Brewing Step"
              name="step"
              rules={[{ required: true, message: "A step is required." }]}
              labelCol={{ span: 30, offset: 0 }}
            >
              <Select style={{ width: 120 }}>
                <Select.Option value="StrikeWater">Strike Water</Select.Option>
                <Select.Option value="Mash">Mash</Select.Option>
                <Select.Option value="Boil">Boil</Select.Option>
                <Select.Option value="Fermentor">Fermentor</Select.Option>
                <Select.Option value="Bottle">Package</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Ingredient Type"
              name="type"
              rules={[{ required: true, message: "A type is required." }]}
              labelCol={{ span: 30, offset: 0 }}
            >
              <Select style={{ width: 120 }}>
                <Select.Option value="Fermentable">Fermentable</Select.Option>
                <Select.Option value="Hop">Hop</Select.Option>
                <Select.Option value="Culture">Culture</Select.Option>
                <Select.Option value="Chemistry">Chemistry</Select.Option>
                <Select.Option value="Misc">Misc.</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            {step !== "Bottle" && step !== "StrikeWater" && step !== "Mash" && (
              <Form.Item
                name="timing"
                label="Time"
                labelCol={{ span: 30, offset: 0 }}
                initialValue={ingredientId === "Boil" ? 60 : 0}
              >
                <InputNumber
                  min={0}
                  style={{ width: 95 }}
                  addonAfter={step === "Fermentor" ? "days" : "min"}
                />
              </Form.Item>
            )}
          </Col>
        </Row>
        {renderTypeSpecificElements()}
        <Row>
          <Col span={22}>
            <Form.Item
              label="Notes"
              name="notes"
              labelCol={{ span: 30, offset: 0 }}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default IngredientModal;
