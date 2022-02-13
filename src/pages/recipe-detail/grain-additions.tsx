import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Col,
  Form,
  FormInstance,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";
import { RecipeForm, RecipeGrain } from ".";
import DefaultGrains from "../../data/default-grains";
import styles from "./index.module.css";

interface GrainAdditionsProps {
  recipeForm: FormInstance<RecipeForm>;
}

const typeAheadOptions = DefaultGrains.map((grain) => {
  return {
    value: grain.name,
  };
});

const GrainAdditions = ({ recipeForm }: GrainAdditionsProps) => {
  const { Option } = Select;

  const handleGrainNameSelect = (selection: string) => {
    const defaultGrain = DefaultGrains.find(
      (grain) => grain.name === selection
    );

    if (defaultGrain) {
      const grains: RecipeGrain[] = recipeForm.getFieldValue("grains");
      const grainIndexToModify = grains.findIndex(
        (grain: RecipeGrain) => grain.name === defaultGrain.name
      );
      grains[grainIndexToModify].color = defaultGrain.lovibond;
      grains[grainIndexToModify].gravity = defaultGrain.gravity;
      grains[grainIndexToModify].type = defaultGrain.type;
      grains[grainIndexToModify].amount = 0;

      recipeForm.setFieldsValue({ grains });
    }
  };

  const handleTypeChange = (selection: string, index: number) => {
    const grains = recipeForm.getFieldValue("grains");
    grains[index].type = selection;

    recipeForm.setFieldsValue(grains);
  };

  const getInitialType = (index: number): string => {
    const grains = recipeForm.getFieldValue("grains");
    return grains[index]?.type ?? "";
  };

  return (
    <>
      <Typography.Title level={4}>Grain additions</Typography.Title>
      <Form.List name="grains">
        {(fields, { add, remove }) => (
          <>
            {fields.length === 0
              ? "No grains yet - feel free to add some!"
              : fields.map(({ key, name, ...restField }, index) => {
                  return (
                    <Row
                      key={key}
                      justify="start"
                      align="middle"
                      gutter={[12, 0]}
                    >
                      <Col xs={16} sm={16} md={8} lg={8} xl={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
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
                            options={typeAheadOptions}
                            style={{ width: 220 }}
                            filterOption={(inputValue, option) =>
                              option?.value
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                            }
                            onSelect={handleGrainNameSelect}
                            placeholder="Grain Name"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={7} sm={7} md={3} lg={3} xl={3}>
                        <Form.Item
                          {...restField}
                          name={[name, "amount"]}
                          label="Amount"
                          labelCol={{ span: 30, offset: 0 }}
                          rules={[
                            {
                              required: true,
                              message: "How much?",
                            },
                          ]}
                          initialValue={0}
                        >
                          <InputNumber
                            min="0"
                            max="100"
                            step="0.1"
                            style={{ width: 72 }}
                            formatter={(value) => {
                              return value ? `${value} lbs` : "0 lbs";
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={6} sm={6} md={3} lg={3} xl={3}>
                        <Form.Item
                          {...restField}
                          name={[name, "color"]}
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
                            step="0.1"
                            style={{ width: 72 }}
                            formatter={(value) => {
                              return value ? `${value} L` : "0 L";
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={6} sm={6} md={3} lg={3} xl={3}>
                        <Form.Item
                          {...restField}
                          name={[name, "gravity"]}
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
                      <Col xs={8} sm={8} md={4} lg={4} xl={4}>
                        <Form.Item
                          {...restField}
                          name={[name, "type"]}
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
                          <Select
                            onChange={(value: string) =>
                              handleTypeChange(value, index)
                            }
                            value={getInitialType(index)}
                            style={{ width: 120 }}
                          >
                            <Option value="grain">Grain</Option>
                            <Option value="extract">Liquid Extract</Option>
                            <Option value="dry extract">Dry Extract</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={1}>
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          className={styles["edit-delete-icon"]}
                        />
                      </Col>
                    </Row>
                  );
                })}
            <Row>
              <Col span={24}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add a grain
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Form.List>
    </>
  );
};

export default GrainAdditions;
