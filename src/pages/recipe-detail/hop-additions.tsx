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
import { RecipeHop } from ".";
import DefaultHops from "../../data/default-hops";
import { selectBrewSettings } from "../../redux/brew-settings/slice";
import { useAppSelector } from "../../redux/hooks";
import { ouncesToGrams } from "../../utils/unit-conversions";
import styles from "./index.module.css";

interface HopAdditionsProps {
  recipeForm: FormInstance;
}

const typeAheadOptions = DefaultHops.map((hop) => {
  return {
    value: hop.name,
  };
});

const HopAdditions = ({ recipeForm }: HopAdditionsProps) => {
  const { Option } = Select;
  const { measurementType } = useAppSelector(selectBrewSettings);

  const getInitialType = (index: number): string => {
    const hops = recipeForm.getFieldValue("hops");
    return hops[index]?.type ?? "add_to_boil";
  };

  const handleTypeChange = (selection: string, index: number) => {
    const hops = recipeForm.getFieldValue("hops");
    hops[index].type = selection;

    recipeForm.setFieldsValue(hops);
  };

  const handleHopNameSelect = (selection: string, index: number) => {
    const defaultHop = DefaultHops.find((hop) => hop.name === selection);

    if (defaultHop) {
      const hops: RecipeHop[] = recipeForm.getFieldValue("hops");
      hops[index].alpha = defaultHop.alpha;
      hops[index].additionType = "add_to_boil";
      hops[index].amount = 0;
      hops[index].minutes = 0;
      recipeForm.setFieldsValue(hops);
    }
  };

  return (
    <>
      <Typography.Title level={4}>Hop additions</Typography.Title>
      <Form.List name="hops">
        {(fields, { add, remove }) => (
          <>
            {fields.length === 0
              ? "No hops yet - feel free to add some!"
              : fields.map(({ key, name, ...restField }, index) => {
                  return (
                    <Row
                      key={key}
                      justify="start"
                      align="middle"
                      gutter={[12, 0]}
                    >
                      <Col xs={16} sm={16} md={7} lg={7} xl={7}>
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          label="Name"
                          labelCol={{ span: 30, offset: 0 }}
                          rules={[
                            {
                              required: true,
                              message: "Please name your hop.",
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
                            onSelect={(selection: string) =>
                              handleHopNameSelect(selection, index)
                            }
                            placeholder="Hop Name"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={7} sm={7} md={3} lg={3} xl={3}>
                        <Form.Item
                          {...restField}
                          name={[name, "amount"]}
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
                            style={{ width: 72 }}
                            formatter={(value) => {
                              if (measurementType === "metric") {
                                return value
                                  ? `${ouncesToGrams(parseFloat(value))} g`
                                  : "0 g";
                              }
                              return value ? `${value} oz` : "0 oz";
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={6} sm={6} md={3} lg={3} xl={3}>
                        <Form.Item
                          {...restField}
                          name={[name, "alpha"]}
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
                            formatter={(value) => {
                              return value ? `${value} AA` : "0 AA";
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={8} sm={8} md={3} lg={3} xl={3}>
                        <Form.Item
                          {...restField}
                          name={[name, "additionType"]}
                          label="Add To"
                          labelCol={{ span: 30, offset: 0 }}
                          initialValue={"add_to_boil"}
                          rules={[
                            {
                              required: true,
                              message: "Required",
                            },
                          ]}
                        >
                          <Select
                            onChange={(value: string) =>
                              handleTypeChange(value, index)
                            }
                            value={getInitialType(index)}
                            style={{ width: 90 }}
                          >
                            <Option value="add_to_boil">Boil</Option>
                            <Option value="add_to_fermentation">Dry Hop</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={6} sm={6} md={3} lg={3} xl={3}>
                        <Form.Item
                          {...restField}
                          name={[name, "minutes"]}
                          label="Time"
                          labelCol={{ span: 30, offset: 0 }}
                          initialValue={0}
                        >
                          <InputNumber
                            min={0}
                            formatter={(value) => {
                              const hopItem: RecipeHop =
                                recipeForm.getFieldValue("hops")[index];

                              switch (hopItem.additionType) {
                                case "add_to_boil":
                                  return `${value} min`;
                                case "add_to_fermentation":
                                  return `${value} days`;
                                default:
                                  return `${value} min`;
                              }
                            }}
                          />
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
                  Add a hop
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Form.List>
    </>
  );
};

export default HopAdditions;
