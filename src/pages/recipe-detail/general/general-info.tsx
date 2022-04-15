import { Typography, Form, Input, InputNumber, Radio, Col, Row } from "antd";
import { BrewingTypes as BT } from "brewing-shared";
import React from "react";

interface GeneralInfoProps {
  measurementType: BT.MeasurementType;
}

const GeneralInfo = ({ measurementType }: GeneralInfoProps) => {
  return (
    <>
      <Typography.Title level={4}>General Info</Typography.Title>
      <Row justify="start" gutter={[12, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Recipe Name"
            name="name"
            rules={[{ required: true, message: "A recipe name is required." }]}
          >
            <Input style={{ maxWidth: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Author"
            name="author"
            rules={[
              { warningOnly: true, message: "It is nice to enter an author." },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="start" gutter={[12, 0]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item label="Recipe Description" name="description">
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="start" gutter={[12, 0]}>
        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
          <Form.Item
            label="Batch Size"
            name="batchSize"
            rules={[{ required: true, message: "A batch size is required." }]}
            style={{ width: 105 }}
            labelCol={{ span: 30, offset: 0 }}
          >
            <InputNumber
              min="0"
              max="100"
              step="0.5"
              addonAfter={measurementType === "metric" ? "l" : "gal"}
            />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
          <Form.Item
            label="Efficiency"
            name="efficiency"
            rules={[
              {
                required: true,
                message: "An efficiency percentage is required.",
              },
            ]}
            labelCol={{ span: 30, offset: 0 }}
            style={{ width: 105 }}
          >
            <InputNumber min="0" max="100" step="1" addonAfter="%" />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form.Item
            label="Brew Type"
            name="type"
            labelCol={{ span: 30, offset: 0 }}
            style={{ width: "250px" }}
            initialValue="All grain"
          >
            <Radio.Group>
              <Radio.Button value="All grain">All Grain</Radio.Button>
              <Radio.Button value="Extract">Extract</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form.Item
            label="Measurement Type"
            name="measurementType"
            labelCol={{ span: 30, offset: 0 }}
            style={{ width: "250px" }}
            initialValue={measurementType}
          >
            <Radio.Group>
              <Radio.Button value="imperial">Imperial</Radio.Button>
              <Radio.Button value="metric">Metric</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default GeneralInfo;
