import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";

import styles from "../index.module.css";

const MiscAdditions = () => {
  return (
    <>
      <Typography.Title level={4}>Misc. additions</Typography.Title>
      <Form.List name="nonFermentables">
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
                              message: "Name of addition required.",
                            },
                          ]}
                        >
                          <Input style={{ width: 220 }} />
                        </Form.Item>
                      </Col>
                      <Col xs={16} sm={16} md={3} lg={3} xl={3}>
                        <Form.Item
                          {...restField}
                          name={[name, "amount"]}
                          label="Amount"
                          labelCol={{ span: 30, offset: 0 }}
                        >
                          <Input style={{ width: 90 }} />
                        </Form.Item>
                      </Col>
                      <Col xs={16} sm={16} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "notes"]}
                          label="Other Notes"
                          labelCol={{ span: 30, offset: 0 }}
                        >
                          <Input style={{ width: 400 }} />
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

export default MiscAdditions;
