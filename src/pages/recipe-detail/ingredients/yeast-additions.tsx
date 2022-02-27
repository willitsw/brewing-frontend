import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";

import styles from "../index.module.css";

const YeastAdditions = () => {
  const { Option } = Select;

  return (
    <>
      <Typography.Title level={4}>Yeast additions</Typography.Title>
      <Form.List name="cultures">
        {(fields, { add, remove }) => (
          <>
            {fields.length === 0
              ? "No yeasts yet - feel free to add some!"
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
                              message: "Please name your yeast.",
                            },
                          ]}
                        >
                          <Input style={{ width: 220 }} />
                        </Form.Item>
                      </Col>
                      <Col xs={6} sm={6} md={3} lg={3} xl={3}>
                        <Form.Item
                          {...restField}
                          name={[name, "attenuation"]}
                          label="Attenuation"
                          labelCol={{ span: 30, offset: 0 }}
                          initialValue="77"
                        >
                          <InputNumber
                            min="0"
                            max="100"
                            step="1"
                            addonAfter="%"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={8} sm={8} md={4} lg={4} xl={4}>
                        <Form.Item
                          {...restField}
                          name={[name, "type"]}
                          label="Type"
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
                            <Option value="Dry">Dry</Option>
                            <Option value="Liquid">Liquid</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "notes"]}
                          label="Notes"
                          labelCol={{ span: 30, offset: 0 }}
                          initialValue={""}
                        >
                          <Input style={{ width: 265 }} />
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
                  Add a yeast
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Form.List>
    </>
  );
};

export default YeastAdditions;
