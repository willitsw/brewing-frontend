import React, { useEffect, useState } from "react";
import Content from "../../components/content";
import { BrewingTypes as BT } from "brewing-shared";
import { v4 as uuid } from "uuid";
import { selectBrewSettings } from "../../redux/brew-settings/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  Affix,
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  List,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
} from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  processCreateUpdateBrewLog,
  selectBrewLogList,
  selectCurrentBrewLog,
  setBrewLogList,
  setCurrentBrewLog,
} from "../../redux/brew-log/slice";
import {
  getBrewLogById,
  getBrewLogsByUser,
  getRecipeById,
  getRecipesByUser,
} from "../../utils/api-calls";
import { setPageIsClean } from "../../redux/global-modals/slice";
import moment, { Moment } from "moment";
import { DATE_FORMAT } from "../../constants";
import { selectRecipeList, setRecipeList } from "../../redux/recipe-list/slice";
import ReadOnlyRecipe from "../../components/read-only-recipe";
import OkCancelModal from "../../components/ok-cancel-modal";
import { DeleteOutlined } from "@ant-design/icons";

const defaultBrewLog: BT.BrewLog = {
  name: "New Brew Log Entry",
  brewDate: moment().toISOString(),
  id: uuid(),
  status: "In Progress",
  userId: "",
  batchNumber: 0,
  gravityReadings: [],
  brewingNotes: "",
  fermentationNotes: "",
  hopNotes: "",
  otherNotes: "",
  packagingNotes: "",
  tastingNotes: "",
  yeastNotes: "",
};

interface BrewLogForm extends BT.BrewLog {
  workingBrewDate: Moment;
}

const BrewLogDetailPage = () => {
  const brewSettings = useAppSelector(selectBrewSettings);
  const [form] = Form.useForm<BrewLogForm>();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const brewLog = useAppSelector(selectCurrentBrewLog);
  const brewLogList = useAppSelector(selectBrewLogList);
  const recipeList = useAppSelector(selectRecipeList);
  const [selectedRecipe, setSelectedRecipe] = useState<BT.Recipe>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [potentialNewId, setPotentialNewId] = useState<string>(null);
  const [gravityReadingToDelete, setGravityReadingToDelete] =
    useState<number>(null);

  useEffect(() => {
    const onComponentLoad = async () => {
      if (recipeList?.length === 0) {
        const newRecipeList = await getRecipesByUser();
        dispatch(setRecipeList(newRecipeList));
      }
      if (brewLogList?.length === 0) {
        const newBrewLogs = await getBrewLogsByUser();
        dispatch(setBrewLogList(newBrewLogs));
      }
      let workingBrewLog: BT.BrewLog;
      if (location.pathname.includes("/brew-log/edit") && id) {
        workingBrewLog = await getBrewLogById(id);
      } else {
        workingBrewLog = {
          ...defaultBrewLog,
          batchNumber: brewLogList.length + 1,
        };
      }

      form.setFieldsValue({
        ...workingBrewLog,
        workingBrewDate: moment(workingBrewLog.brewDate),
      });
      dispatch(setCurrentBrewLog(workingBrewLog));

      if (workingBrewLog.recipe) {
        setSelectedRecipe(workingBrewLog.recipe);
      }
      setLoading(false);
    };
    onComponentLoad();
  }, []);

  const handleSaveFailed = () => {
    message.error(
      "Form could not be saved. Please address any validation errors."
    );
  };

  const handleSave = (brewLogForm: BrewLogForm) => {
    const newBrewLog: BrewLogForm = {
      ...brewLogForm,
      id: brewLog?.id ?? "",
      userId: brewSettings.id ?? "",
      brewDate: brewLogForm.workingBrewDate.toISOString(),
      recipe: selectedRecipe ?? null,
    };
    delete newBrewLog.workingBrewDate;
    dispatch(processCreateUpdateBrewLog(newBrewLog));
    dispatch(setPageIsClean(true));
    message.success("Brew Log has been saved.");
  };

  const handleChangeRecipe = async (newRecipeId: string) => {
    dispatch(setPageIsClean(false));
    const newRecipe = await getRecipeById(newRecipeId);
    setSelectedRecipe(newRecipe);
  };

  const handleDeleteClick = () => {
    const gravityReadings = [...form.getFieldValue("gravityReadings")];
    gravityReadings.splice(gravityReadingToDelete, 1);
    form.setFieldsValue({ gravityReadings });
    setGravityReadingToDelete(null);
  };

  const goBackToBrewLogList = () => {
    navigate("/brew-log/list/");
  };

  return (
    <Form
      name="brew-log-edit-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
      onFinish={handleSave}
      onFinishFailed={handleSaveFailed}
      onValuesChange={() => dispatch(setPageIsClean(false))}
      scrollToFirstError={true}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <Content
        pageTitle={!loading ? brewLog?.name ?? "" : ""}
        isLoading={loading}
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Log Data" key="1">
            <Row justify="start" gutter={[12, 0]}>
              <Col span={24}>
                <Typography.Title level={4}>General Info</Typography.Title>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Item
                  label="Brew Session Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please name your brew session",
                    },
                  ]}
                  labelCol={{ span: 30, offset: 0 }}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Item
                  label="Brew Date"
                  name="workingBrewDate"
                  rules={[
                    {
                      required: true,
                      message: "A Brew Date is required",
                    },
                  ]}
                  initialValue={moment()}
                >
                  <DatePicker
                    format={(date) => moment(date).format(DATE_FORMAT)}
                  />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Item
                  label="Status"
                  name="status"
                  initialValue="In Progress"
                >
                  <Radio.Group>
                    <Radio.Button value="In Progress">In Progress</Radio.Button>
                    <Radio.Button value="Complete">Complete</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Item
                  label="Batch Number"
                  name="batchNumber"
                  initialValue={brewLogList.length + 1}
                >
                  <InputNumber min="0" max="100" step="1" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <ConfigProvider renderEmpty={() => null}>
                  <Form.List name="gravityReadings">
                    {(fields, { add }) => (
                      <List
                        header={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography.Title level={4}>
                              Gravity Readings
                            </Typography.Title>
                            <Button
                              style={{ marginLeft: "15px" }}
                              type="primary"
                              onClick={add}
                            >
                              Add Gravity Reading
                            </Button>
                          </div>
                        }
                        bordered={false}
                        dataSource={fields}
                        renderItem={(field, index) => (
                          <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, curValues) =>
                              prevValues.date !== curValues.date ||
                              prevValues.gravity !== curValues.gravity ||
                              prevValues.notes !== curValues.notes
                            }
                          >
                            {() => (
                              <Row>
                                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "date"]}
                                    label="Date"
                                    initialValue={moment()}
                                  >
                                    <DatePicker
                                      format={(date) =>
                                        moment(date).format(DATE_FORMAT)
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "gravity"]}
                                    label="Gravity"
                                    initialValue={"1.000"}
                                  >
                                    <InputNumber
                                      stringMode
                                      min="1"
                                      max="2"
                                      step="0.001"
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={20} sm={20} md={20} lg={14} xl={14}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "notes"]}
                                    label="Notes"
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                  <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                    onClick={() => {
                                      setGravityReadingToDelete(index);
                                    }}
                                    style={{ marginTop: 30, marginLeft: 15 }}
                                  />
                                </Col>
                              </Row>
                            )}
                          </Form.Item>
                        )}
                      />
                    )}
                  </Form.List>
                </ConfigProvider>
              </Col>
              <Col span={24}>
                <Typography.Title level={4}>Process Notes</Typography.Title>
              </Col>
              <Col span={24}>
                <Form.Item label="Brewing Notes" name="brewingNotes">
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Fermentation Notes" name="fermentationNotes">
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Hop Notes" name="hopNotes">
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Yeast Notes" name="yeastNotes">
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Other Notes" name="otherNotes">
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Packaging Notes" name="packagingNotes">
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Tasting Notes" name="tastingNotes">
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Recipe" key="2">
            <>
              Select an existing recipe:
              <Select
                showSearch
                value={selectedRecipe ? selectedRecipe.name : "Select a recipe"}
                optionFilterProp="children"
                onChange={(newRecipeId) => {
                  if (
                    selectedRecipe &&
                    !recipeList.some((r) => r.id === selectedRecipe.id)
                  ) {
                    setPotentialNewId(newRecipeId);
                  } else {
                    handleChangeRecipe(newRecipeId);
                  }
                }}
                filterOption={(input, option) =>
                  // eslint-disable-next-line
                  // @ts-ignore
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                style={{ width: 240, marginLeft: 10, marginRight: 10 }}
              >
                {recipeList.map((recipe) => {
                  return (
                    <Select.Option key={recipe.id} value={recipe.id}>
                      {recipe.name}
                    </Select.Option>
                  );
                })}
              </Select>{" "}
              or <Link to={"/recipes/new/"}>create a new recipe</Link>.
              <div style={{ marginTop: 20 }}>
                {selectedRecipe ? (
                  <ReadOnlyRecipe recipe={selectedRecipe} />
                ) : (
                  "No recipe is selected. Please choose one from the dropdown above."
                )}
              </div>
            </>
          </Tabs.TabPane>
        </Tabs>
        <Affix offsetBottom={10} style={{ float: "right" }}>
          <Space>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={goBackToBrewLogList}>
                Back to Brew Log List
              </Button>
            </Form.Item>
          </Space>
        </Affix>
      </Content>
      <OkCancelModal
        onCancel={() => setPotentialNewId(null)}
        onSubmit={() => handleChangeRecipe(potentialNewId)}
        showModal={potentialNewId !== null}
        title="Change recipe in brew log?"
      >
        This selected recipe does not exist in your Recipe List anymore. If you
        change this, it will be lost forever. Continue?
      </OkCancelModal>
      <Modal
        title="Delete Gravity Reading?"
        onCancel={() => setGravityReadingToDelete(null)}
        onOk={handleDeleteClick}
        visible={gravityReadingToDelete !== null}
      >
        Are you sure you want to delete this gravity reading?
      </Modal>
    </Form>
  );
};

export default BrewLogDetailPage;
