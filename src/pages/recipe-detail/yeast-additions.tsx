import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  List,
  Row,
  Typography,
} from "antd";

interface YeastAdditionsProps {
  recipeForm: any;
}

const YeastAdditions = ({ recipeForm }: YeastAdditionsProps) => {
  return (
    <Form.List name="yeasts">
      {(fields, { add, remove }) => (
        <List
          header={
            <Typography.Title level={4}>Yeast additions</Typography.Title>
          }
          footer={
            <Row>
              <Col span={12}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add yeast
                </Button>
              </Col>
            </Row>
          }
          itemLayout="vertical"
          dataSource={fields}
          locale={{ emptyText: "No yeasts exist. Add some!" }}
          renderItem={({ key, name, ...restField }) => (
            <List.Item>
              <Form.Item
                {...restField}
                name={[name, "name"]}
                rules={[
                  {
                    required: true,
                    message: "Please name your yeast.",
                  },
                ]}
              >
                <Input placeholder="Yeast Name" size="large" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "attenuation"]}
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <InputNumber size="small" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </List.Item>
          )}
        />
      )}
    </Form.List>
  );
};

export default YeastAdditions;
