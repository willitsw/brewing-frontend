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
import {
  processCreateUpdateBrewSettings,
  selectBrewSettings,
} from "../../redux/brew-settings/slice";
import { setPageIsClean } from "../../redux/global-modals/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { BrewSettings } from "../../types/brew-settings";

import styles from "./index.module.css";

const BrewSettings = () => {
  const brewSettings = useAppSelector(selectBrewSettings);
  const [form] = Form.useForm<BrewSettings>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onComponentLoad = async () => {
      form.setFieldsValue(brewSettings);
    };
    onComponentLoad();
  }, []);

  const handleSave = (form: BrewSettings) => {
    dispatch(processCreateUpdateBrewSettings(form));
    message.success("Brew Settings have been updated.");
    dispatch(setPageIsClean(true));
  };

  const handleSaveFailed = () => {
    message.error(
      "Brew Settings could not be saved. Please address any validation errors."
    );
  };

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
        onValuesChange={() => dispatch(setPageIsClean(false))}
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
