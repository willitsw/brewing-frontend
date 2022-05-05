import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
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
  Switch,
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
import {
  brewSettingsToMetric,
  brewSettingsToImperial,
} from "../../utils/converters";
import { BrewingTypes as BT } from "brewing-shared";
import React from "react";

const BrewSettings = () => {
  const brewSettings = useAppSelector(selectBrewSettings);
  const [measurementType, setMeasurementType] = useState<BT.MeasurementType>(
    brewSettings.measurementType
  );
  const [sparge, setSparge] = useState<boolean>(brewSettings.sparge);

  const [form] = Form.useForm<BT.User>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onComponentLoad = async () => {
      form.setFieldsValue(brewSettings);
    };
    onComponentLoad();
  }, []);

  const handleSave = (form: BT.User) => {
    const updatedBrewSettings: BT.User = {
      ...form,
      id: brewSettings.id,
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
    if (changedFields.length === 0) {
      return null;
    }

    dispatch(setPageIsClean(false));

    if (changedFields[0].name[0] === "measurementType") {
      // measurement type was changed, lets convert the recipe
      if (changedFields[0].value === "metric") {
        const oldSettings: BT.User = form.getFieldsValue();
        form.setFieldsValue(brewSettingsToMetric(oldSettings));
        setMeasurementType("metric");
      } else {
        const oldSettings: BT.User = form.getFieldsValue();
        form.setFieldsValue(brewSettingsToImperial(oldSettings));
        setMeasurementType("imperial");
      }
    }

    if (changedFields[0].name[0] === "sparge") {
      setSparge(changedFields[0].value);
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
              style={{ width: "100%" }}
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
              labelCol={{ span: 20, offset: 0 }}
              style={{ width: 115 }}
            >
              <InputNumber
                min="0"
                max="100"
                step="0.1"
                addonAfter={measurementType === "metric" ? "l/kg" : "qt/lb"}
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
        <Typography.Title level={4}>Mash Settings</Typography.Title>
        <Row justify="start" gutter={[12, 0]}>
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <Form.Item
              label="Sparging"
              name="sparge"
              labelCol={{ span: 30, offset: 0 }}
              style={{ width: 105 }}
              initialValue={sparge}
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={sparge}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <Form.Item
              label="Mash Thickness"
              name="mashThickness"
              labelCol={{ span: 30, offset: 0 }}
              style={{ width: 125 }}
              initialValue="1.3"
              hidden={!sparge}
            >
              <InputNumber
                min="0"
                max="100"
                step="0.1"
                style={{ width: 115 }}
                addonAfter={measurementType === "metric" ? "l/kg" : "qt/lb"}
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
