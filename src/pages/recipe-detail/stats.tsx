import { Col, Row, Statistic, Typography } from "antd";

interface StatsProps {
  srm: number | "-";
  og: number | "-";
}

const Stats = ({ srm, og }: StatsProps) => {
  return (
    <>
      <Typography.Title level={4}>Stats</Typography.Title>
      <Row gutter={[12, 0]}>
        <Col span={12}>
          <Statistic title="SRM" value={srm} />
        </Col>
        <Col span={12}>
          <Statistic title="OG" value={og} />
        </Col>
      </Row>
    </>
  );
};

export default Stats;
