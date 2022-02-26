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
import DefaultHops from "../../data/default-hops";
import { selectBrewSettings } from "../../redux/brew-settings/slice";
import { useAppSelector } from "../../redux/hooks";
import { MeasurementType } from "../../types/brew-settings";
import { Hop } from "../../types/recipe";
import { ouncesToGrams } from "../../utils/converters";
import styles from "./index.module.css";

interface HopAdditionsProps {
  form: FormInstance;
  measurementType: MeasurementType;
}

const typeAheadOptions = DefaultHops.map((hop) => {
  return {
    value: hop.name,
  };
});

const HopAdditions = ({ form, measurementType }: HopAdditionsProps) => {
  const { Option } = Select;

  const handleHopNameSelect = (selection: string, index: number) => {
    const defaultHop = DefaultHops.find((hop) => hop.name === selection);

    if (defaultHop) {
      const hops: Hop[] = form.getFieldValue("hops");
      hops[index].alphaAcid = defaultHop.alpha;
      form.setFieldsValue({ hops });
    }
  };

  const getHopTimeLabel = (index: number) => {
    const hopItem: Hop = form.getFieldValue("hops")[index];

    switch (hopItem.use) {
      case "Boil":
        return "min";
      case "Dry hop":
        return "days";
      default:
        return "min";
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
                      <Col xs={7} sm={7} md={4} lg={4} xl={4}>
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
                            style={{ width: 105 }}
                            addonAfter={
                              measurementType === "metric" ? "g" : "oz"
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={6} sm={6} md={4} lg={4} xl={4}>
                        <Form.Item
                          {...restField}
                          name={[name, "alphaAcid"]}
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
                      <Col xs={8} sm={8} md={4} lg={4} xl={4}>
                        <Form.Item
                          {...restField}
                          name={[name, "use"]}
                          label="Add To"
                          labelCol={{ span: 30, offset: 0 }}
                          initialValue={"Boil"}
                          rules={[
                            {
                              required: true,
                              message: "Required",
                            },
                          ]}
                        >
                          <Select style={{ width: 120 }}>
                            <Option value="Boil">Boil</Option>
                            <Option value="Dry hop">Dry hop</Option>
                            <Option value="Flame out">Flame out</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={6} sm={6} md={4} lg={4} xl={4}>
                        <Form.Item
                          {...restField}
                          name={[name, "timing"]}
                          label="Time"
                          labelCol={{ span: 30, offset: 0 }}
                          initialValue={0}
                        >
                          <InputNumber
                            disabled={
                              form.getFieldValue("hops")[index].use ===
                              "Flame out"
                            }
                            min={0}
                            style={{ width: 105 }}
                            addonAfter={getHopTimeLabel(index)}
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
