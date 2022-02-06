import { List, Typography } from "antd";

interface YeastAdditionsProps {
  recipeForm: any;
}

const YeastAdditions = ({ recipeForm }: YeastAdditionsProps) => {
  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];
  return (
    <>
      <Typography.Title level={4}>Yeast additions</Typography.Title>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
          </List.Item>
        )}
      />
    </>
  );
};

export default YeastAdditions;
