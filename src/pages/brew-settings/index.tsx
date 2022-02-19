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
import { BrewSettings, MeasurementType } from "../../types/brew-settings";
import {
  brewSettingsToMetric,
  brewSettingsToImperial,
} from "../../utils/converters";

import styles from "./index.module.css";

const BrewSettings = () => {
  const brewSettings = useAppSelector(selectBrewSettings);
  const [measurementType, setMeasurementType] = useState<MeasurementType>(
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
    const updatedBrewSettings: BrewSettings = {
      ...form,
      userId: brewSettings.userId,
    };
    dispatch(processCreateUpdateBrewSettings(updatedBrewSettings));
    message.success("Brew Settings have been updated.");
    dispatch(setPageIsClean(true));
  };

  const handleSaveFailed = () => {
    message.error(
      "Brew Settings could not be saved. Please address any validation errors."
    );
  };

  const handleOnFieldsChange = (changedFields: any) => {
    dispatch(setPageIsClean(false));

    if (changedFields[0].name[0] === "measurementType") {
      // measurement type was changed, lets convert the recipe
      if (changedFields[0].value === "metric") {
        const oldSettings: BrewSettings = form.getFieldsValue();
        form.setFieldsValue(brewSettingsToMetric(oldSettings));
        setMeasurementType("metric");
      } else {
        const oldSettings: BrewSettings = form.getFieldsValue();
        form.setFieldsValue(brewSettingsToImperial(oldSettings));
        setMeasurementType("imperial");
      }
    }
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
        onFieldsChange={handleOnFieldsChange}
      >
        <Typography.Title level={4}>General Defaults</Typography.Title>
        <Row justify="start" gutter={[12, 0]}>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Author"
              name="author"
              labelCol={{ span: 30, offset: 0 }}
              style={{ width: 350 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={3} lg={3} xl={3}>
            <Form.Item
              label="Batch Size"
              name="batchSize"
              labelCol={{ span: 30, offset: 0 }}
              style={{ width: 105 }}
            >
              <InputNumber
                min="0"
                max="100"
                step="0.5"
                addonAfter={measurementType === "metric" ? "l" : "gal"}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={3} lg={3} xl={3}>
            <Form.Item
              label="Boil Time"
              name="boilTime"
              labelCol={{ span: 30, offset: 0 }}
              style={{ width: 105 }}
            >
              <InputNumber addonAfter="min" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={3} lg={3} xl={3}>
            <Form.Item
              label="Efficiency"
              name="brewhouseEfficiency"
              labelCol={{ span: 30, offset: 0 }}
              style={{ width: 105 }}
            >
              <InputNumber addonAfter="%" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
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
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <Form.Item
              label="Grain Water Loss"
              name="waterLossPerGrain"
              labelCol={{ span: 30, offset: 0 }}
              style={{ width: 105 }}
            >
              <InputNumber
                addonAfter={measurementType === "metric" ? "lit" : "gal"}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <Form.Item
              label="Fermenter Dead Space"
              name="fermentorTrubWaterLoss"
              labelCol={{ span: 30, offset: 0 }}
              style={{ width: 105 }}
            >
              <InputNumber
                addonAfter={measurementType === "metric" ? "lit" : "gal"}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <Form.Item
              label="Kettle Dead Space"
              name="kettleTrubWaterLoss"
              labelCol={{ span: 30, offset: 0 }}
              style={{ width: 105 }}
            >
              <InputNumber
                addonAfter={measurementType === "metric" ? "lit" : "gal"}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <Form.Item
              label="Evaporation Water Loss"
              name="boilOffWaterLossRate"
              labelCol={{ span: 30, offset: 0 }}
              style={{ width: 105 }}
            >
              <InputNumber
                addonAfter={measurementType === "metric" ? "lit/hr" : "gal/hr"}
              />
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
