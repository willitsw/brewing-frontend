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

  const getInitialType = (index: number): string => {
    const hops = recipeForm.getFieldValue("hops");
    return hops[index]?.type ?? "";
  };

  const handleTypeChange = (selection: string, index: number) => {
    const hops = recipeForm.getFieldValue("hops");
    hops[index].type = selection;

    recipeForm.setFieldsValue(hops);
  };

  const handleHopNameSelect = (selection: string) => {
    const defaultHop = DefaultHops.find((hop) => hop.name === selection);

    if (defaultHop) {
      const hops = recipeForm.getFieldValue("hops");
      const hopIndexToModify = hops.findIndex(
        (hop: any) => hop.name === defaultHop.name
      );
      hops[hopIndexToModify].alpha = defaultHop.alpha;
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
                            onSelect={handleHopNameSelect}
                            placeholder="Hop Name"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={6} sm={6} md={3} lg={3} xl={3}>
                        <Form.Item
                          {...restField}
                          name={[name, "alpha"]}
                          label="Alpha Acid"
                          labelCol={{ span: 30, offset: 0 }}
                        >
                          <InputNumber stringMode min="0" max="25" step="0.1" />
                        </Form.Item>
                      </Col>
                      <Col xs={8} sm={8} md={3} lg={3} xl={3}>
                        <Form.Item
                          {...restField}
                          name={[name, "additionType"]}
                          label="Addition Type"
                          labelCol={{ span: 30, offset: 0 }}
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
                          label="Minutes"
                          labelCol={{ span: 30, offset: 0 }}
                        >
                          <InputNumber min={0} />
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
