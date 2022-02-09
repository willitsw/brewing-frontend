import { Col, Row, Statistic, Typography } from "antd";

interface StatsProps {
  srm: number | "-";
}

const Stats = ({ srm }: StatsProps) => {
  return (
    <>
      <Typography.Title level={4}>Stats</Typography.Title>
      <Row gutter={[12, 0]}>
        <Col span={12}>
          <Statistic title="SRM" value={srm} />
        </Col>
        <Col span={12}>
          <Statistic title="ABV" value={6.2} />
        </Col>
      </Row>
    </>
  );
};

export default Stats;
