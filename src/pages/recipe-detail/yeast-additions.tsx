import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Row, Typography } from "antd";

import styles from "./index.module.css";

const YeastAdditions = () => {
  return (
    <>
      <Typography.Title level={4}>Yeast additions</Typography.Title>
      <Form.List name="yeasts">
        {(fields, { add, remove }) => (
          <>
            {fields.length === 0
              ? "No yeasts yet - feel free to add some!"
              : fields.map(({ key, name, ...restField }) => {
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
                        >
                          <InputNumber
                            min="0"
                            max="100"
                            step="1"
                            formatter={(value) => {
                              return value ? `${value} %` : "0 %";
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
