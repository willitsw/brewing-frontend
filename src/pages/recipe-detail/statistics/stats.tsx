import { Col, Row, Statistic, Typography } from "antd";
import styles from "../index.module.css";
import hop from "./hop2.png";
import beer from "./beer.png";
import sixer from "./sixer.png";
import water from "./water.png";
import { BrewingTypes as BT } from "brewing-shared";
import React from "react";

interface StatsProps {
  stats: BT.Stats;
  measurementType: BT.MeasurementType;
}

const Stats = ({ stats, measurementType }: StatsProps) => {
  const { og, fg, abv, srm, ibu, strikeWater, hotLiquor, waterLoss } = stats;
  const ogDisplay = og?.toFixed(3) ?? null;
  const fgDisplay = fg?.toFixed(3) ?? null;
  const abvDisplay = abv?.toFixed(1) ?? null;
  const waterUnit = measurementType === "imperial" ? "gal" : "lit";
  const strikeWaterDisplay = `${strikeWater?.toFixed(1)} ${waterUnit}` ?? null;
  const hotLiquorDisplay =
    hotLiquor !== 0 ? `${hotLiquor?.toFixed(1)} ${waterUnit}` ?? null : "N/A";
  const waterLossDisplay = `${waterLoss?.toFixed(1)} ${waterUnit}` ?? null;

  const colorValue = srm == null ? 0 : srm < 40 ? srm : 40;
  const srmTag = "srm-" + colorValue;

  return (
    <>
      <Typography.Title level={4}>Stats</Typography.Title>
      <Row>
        <Col span={6}>
          <div className={`${styles["srm-container"]} ${srmTag}`}>
            <img src={beer} style={{ height: "50px", width: "50px" }} />
          </div>
        </Col>
        <Col span={6}>
          <Statistic title="SRM" value={srm ?? "-"} />
        </Col>
        <Col span={6}>
          <img
            src={hop}
            style={{ height: "50px", width: "50px", marginTop: "10px" }}
          />
        </Col>
        <Col span={6}>
          <Statistic title="IBU" value={ibu ?? "-"} />
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col span={6}>
          <img
            src={sixer}
            style={{
              height: "50px",
              width: "50px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          />
        </Col>
        <Col span={6}>
          <Statistic title="OG" value={ogDisplay ?? "-"} />
        </Col>
        <Col span={6}>
          <Statistic title="FG" value={fgDisplay ?? "-"} />
        </Col>
        <Col span={6}>
          <Statistic title="ABV" value={abvDisplay ?? "-"} />
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col span={6}>
          <img
            src={water}
            style={{
              height: "50px",
              width: "50px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          />
        </Col>
        <Col span={6}>
          <Statistic title="Strike Water" value={strikeWaterDisplay ?? "-"} />
        </Col>
        <Col span={6}>
          <Statistic title="Sparge Water" value={hotLiquorDisplay ?? "-"} />
        </Col>
        <Col span={6}>
          <Statistic title="Water Loss" value={waterLossDisplay ?? "-"} />
        </Col>
      </Row>
    </>
  );
};

export default Stats;
