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
import DefaultGrains from "../../data/default-grains";
import styles from "./grain-additions.module.css";

interface GrainAdditionsProps {
  recipeForm: FormInstance;
  srm: number | "-";
}

const typeAheadOptions = DefaultGrains.map((grain) => {
  return {
    value: grain.name,
  };
});

const GrainAdditions = ({ recipeForm, srm }: GrainAdditionsProps) => {
  const { Option } = Select;
  const { Title } = Typography;

  const handleGrainNameSelect = (selection: string) => {
    const defaultGrain = DefaultGrains.find(
      (grain) => grain.name === selection
    );

    if (defaultGrain) {
      const grains = recipeForm.getFieldValue("grains");
      const grainIndexToModify = grains.findIndex(
        (grain: any) => grain.name === defaultGrain.name
      );
      grains[grainIndexToModify].color = defaultGrain.lovibond;
      grains[grainIndexToModify].gravity = defaultGrain.gravity;
      grains[grainIndexToModify].type = defaultGrain.type;
      recipeForm.setFieldsValue(grains);
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
      <Row className={styles["grain-row"]}>
        <Col span={5}>
          <strong>Name</strong>
        </Col>
        <Col span={2}>
          <strong>Amount (LB)</strong>
        </Col>
        <Col span={2}>
          <strong>Color (Lovibond)</strong>
        </Col>
        <Col span={2}>
          <strong>Potential Gravity</strong>
        </Col>
        <Col span={3}>
          <strong>Type</strong>
        </Col>
        <Col span={1} />
      </Row>
      <Form.List name="grains">
        {(fields, { add, remove }) => (
          <>
            {fields.length === 0
              ? "No grains yet - feel free to add some!"
              : fields.map(({ key, name, ...restField }, index) => {
                  return (
                    <Row key={key}>
                      <Col span={5}>
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[
                            {
                              required: true,
                              message: "Please name your grain.",
                            },
                          ]}
                        >
                          <AutoComplete
                            options={typeAheadOptions}
                            style={{ width: 250 }}
                            filterOption={(inputValue, option) =>
                              option!.value
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                            }
                            onSelect={handleGrainNameSelect}
                            placeholder="Grain Name"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Form.Item
                          {...restField}
                          name={[name, "amount"]}
                          rules={[
                            {
                              required: true,
                              message: "How much?",
                            },
                          ]}
                        >
                          <InputNumber />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Form.Item {...restField} name={[name, "color"]}>
                          <InputNumber />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Form.Item {...restField} name={[name, "gravity"]}>
                          <InputNumber
                            stringMode
                            min="1"
                            max="2"
                            step="0.001"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item {...restField} name={[name, "type"]}>
                          <Select
                            onChange={(value: string) =>
                              handleTypeChange(value, index)
                            }
                            value={getInitialType(index)}
                            style={{ width: 150 }}
                          >
                            <Option value="grain">Grain</Option>
                            <Option value="extract">Liquid Extract</Option>
                            <Option value="dry extract">Dry Extract</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={1}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
                  );
                })}
            <Row>
              <Col span={12}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Col>
              <Col span={2}>
                <Title className={styles.srm} level={4}>
                  SRM: {srm}
                </Title>
              </Col>
            </Row>
          </>
        )}
      </Form.List>
    </>
  );
};

export default GrainAdditions;
