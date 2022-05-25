import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Space, Tooltip } from "antd";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  processDeleteBrewLog,
  setBrewLogList,
} from "../../redux/brew-log/slice";
import OkCancelModal from "../../components/ok-cancel-modal";

import { Breakpoint } from "antd/lib/_util/responsiveObserve";
import { DeleteOutlined } from "@ant-design/icons";
import { getBrewLogsByUser } from "../../utils/api-calls";
import { BrewingTypes as BT } from "brewing-shared";
import React from "react";
import moment from "moment";
import { DATE_FORMAT } from "../../constants";
import { useAnalytics } from "../../utils/analytics";

const BrewLogListTable = () => {
  const dispatch = useAppDispatch();
  const brewLogList = useAppSelector((state) => state.brewLogs.brewLogList);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { fireAnalyticsEvent } = useAnalytics();

  useEffect(() => {
    const getBrewLogList = async () => {
      const brewLogList = await getBrewLogsByUser();
      dispatch(setBrewLogList(brewLogList));
      setLoading(false);
    };
    getBrewLogList();
  }, []);

  const handleDeleteBrewLog = async () => {
    if (idToDelete) {
      dispatch(processDeleteBrewLog(idToDelete));
      fireAnalyticsEvent("Brew Log Deleted", { brewLogId: idToDelete });
    }
    setIdToDelete(null);
  };

  const showOnlyDesktop: Breakpoint[] = ["md"];

  const columnDefinitions = [
    {
      title: "Brew Session",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: BT.BrewLog) => (
        <Link to={"/brew-log/edit/" + record.id}>{text}</Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Brew Date",
      dataIndex: "brewDate",
      key: "brewDate",
      responsive: showOnlyDesktop,
      render: (text: string) => moment(text).format(DATE_FORMAT),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: BT.BrewLog) => (
        <Space>
          <Tooltip title="Delete">
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => setIdToDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const preparedBrewLogData = brewLogList.map((brewLog) => {
    return {
      ...brewLog,
      key: brewLog.id,
    };
  });

  return (
    <>
      <Button
        style={{ marginBottom: 10 }}
        type="primary"
        onClick={() => {
          navigate("/brew-log/new");
          fireAnalyticsEvent("Brew Log Created");
        }}
      >
        New Brew Log
      </Button>
      <Table
        columns={columnDefinitions}
        dataSource={preparedBrewLogData}
        loading={loading}
      />
      <OkCancelModal
        onCancel={() => setIdToDelete(null)}
        onSubmit={() => handleDeleteBrewLog()}
        showModal={idToDelete !== null}
        title="Delete brew log?"
      >
        This cannot be undone.
      </OkCancelModal>
    </>
  );
};

export default BrewLogListTable;
