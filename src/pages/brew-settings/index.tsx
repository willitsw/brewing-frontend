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
import { useEffect, useState } from "react";
import Content from "../../components/content";
import {
  processCreateUpdateBrewSettings,
  selectBrewSettings,
} from "../../redux/brew-settings/slice";
import { setPageIsClean } from "../../redux/global-modals/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { BrewSettings } from "../../types/brew-settings";
import { gallonsToLiters } from "../../utils/converters";

import styles from "./index.module.css";

const BrewSettings = () => {
  const brewSettings = useAppSelector(selectBrewSettings);
  const [localMeasurementType, setLocalMeasurementType] = useState(
    brewSettings.measurementType
  );
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

  const handleOnValuesChange = (changedValues: any) => {
    dispatch(setPageIsClean(false));

    const changedValue = Object.keys(changedValues)[0];
    if (changedValue === "measurementType") {
      console.log("measurement type updated");
      // const val = form.getFieldValue("batchSize");
      // form.setFieldsValue(val);
      // console.log(form.getFieldsValue());
      form.validateFields(["batchSize"]);
    }
  };

  console.log("heres the local measurement type", localMeasurementType);

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
        onValuesChange={handleOnValuesChange}
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
              shouldUpdate
            >
              <InputNumber
                min="0"
                max="100"
                step="0.5"
                formatter={(value) => {
                  const m = form.getFieldValue("measurementType");
                  console.log("m", m);
                  if (form.getFieldValue("measurementType") === "metric") {
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
