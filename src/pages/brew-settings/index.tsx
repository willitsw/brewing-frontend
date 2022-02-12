import {
  Affix,
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Typography,
} from "antd";
import { useEffect } from "react";
import Content from "../../components/content";
import { BrewSettings } from "../../types/brew-settings";

import styles from "./index.module.css";

const defaultSettings: BrewSettings = {
  batchSize: 5,
  boilTime: 60,
  brewhouseEfficiency: 70,
  measurementType: "imperial",
  kettleTrubWaterLoss: 0.25,
  fermentorTrubWaterLoss: 0.25,
  boilOffWaterLossRate: 1.5,
  waterLossPerGrain: 0.125,
  author: "",
};

const BrewSettings = () => {
  const [form] = Form.useForm<BrewSettings>();

  useEffect(() => {
    const onComponentLoad = async () => {
      // if we have settings for this user, set them here instead of defaults
      form.setFieldsValue(defaultSettings);
    };
    onComponentLoad();
  }, []);

  const handleSave = (form: BrewSettings) => {
    //dispatch(processCreateUpdateBrewSettings(form));
    console.log("form saved", form);
    message.success("Brew Settings have been updated.");
  };

  const handleSaveFailed = () => {
    message.error(
      "Brew Settings could not be saved. Please address any validation errors."
    );
  };

  //TODO: confirm modal on navigate away

  return (
    <Content pageTitle="Brew Settings">
      <Form
        name="brew-settings-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        onFinish={handleSave}
        onFinishFailed={handleSaveFailed}
        scrollToFirstError={true}
        autoComplete="off"
        layout="vertical"
      >
        <Typography.Title level={4}>General Defaults</Typography.Title>
        <Row justify="start" gutter={[12, 0]}>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Author"
              name="author"
              labelCol={{ span: 30, offset: 0 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Batch Size"
              name="batchSize"
              labelCol={{ span: 30, offset: 0 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Boil Time"
              name="boilTime"
              labelCol={{ span: 30, offset: 0 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Brewhouse Efficiency"
              name="brewhouseEfficiency"
              labelCol={{ span: 30, offset: 0 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Measurement Type"
              name="measurementType"
              labelCol={{ span: 30, offset: 0 }}
              style={{ width: "250px" }}
            >
              <Radio.Group>
                <Radio.Button value="imperial">Imperial</Radio.Button>
                <Radio.Button value="metric">Metric</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Typography.Title level={4}>Water Loss Constants</Typography.Title>
        <Row justify="start" gutter={[12, 0]}>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Grain Water Loss / lb"
              name="waterLossPerGrain"
              labelCol={{ span: 30, offset: 0 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Fermenter Dead Space"
              name="fermentorTrubWaterLoss"
              labelCol={{ span: 30, offset: 0 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Kettle Dead Space"
              name="kettleTrubWaterLoss"
              labelCol={{ span: 30, offset: 0 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Evaporation Water Loss / hr"
              name="boilOffWaterLossRate"
              labelCol={{ span: 30, offset: 0 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Affix offsetBottom={10} style={{ float: "right" }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Affix>
      </Form>
    </Content>
  );
};

export default BrewSettings;
