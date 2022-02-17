import { Typography, Form, Input, InputNumber, Radio, Col, Row } from "antd";
import { selectBrewSettings } from "../../redux/brew-settings/slice";
import { useAppSelector } from "../../redux/hooks";
import { gallonsToLiters, ouncesToGrams } from "../../utils/unit-conversions";
import styles from "./index.module.css";

const GeneralInfo = () => {
  const { measurementType } = useAppSelector(selectBrewSettings);

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
        <Col xs={12} sm={12} md={8} lg={8} xl={8}>
          <Form.Item
            label="Batch Size"
            name="batchSizeValue"
            rules={[{ required: true, message: "A batch size is required." }]}
            labelCol={{ span: 30, offset: 0 }}
          >
            <InputNumber
              min="0"
              max="100"
              step="0.5"
              formatter={(value) => {
                if (measurementType === "metric") {
                  return value
                    ? `${gallonsToLiters(parseFloat(value))} L`
                    : "0 L";
                }
                return value ? `${value} gal` : "0 gal";
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={8}>
          <Form.Item
            label="Efficiency"
            name="efficiencyValue"
            rules={[
              {
                required: true,
                message: "An efficiency percentage is required.",
              },
            ]}
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
        <Col xs={12} sm={12} md={8} lg={8} xl={8}>
          <Form.Item
            label="Brew Type"
            name="type"
            labelCol={{ span: 30, offset: 0 }}
            style={{ width: "250px" }}
          >
            <Radio.Group>
              <Radio.Button value="all grain">All Grain</Radio.Button>
              <Radio.Button value="extract">Extract</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default GeneralInfo;
