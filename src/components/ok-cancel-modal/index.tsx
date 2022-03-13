import { useState } from "react";
import { Modal } from "antd";
import React from "react";

interface OkCancelModalProps {
  onSubmit: any;
  onCancel: () => void;
  showModal: boolean;
  title: string;
  children: React.ReactNode;
}

const OkCancelModal = ({
  onCancel,
  onSubmit,
  showModal,
  title,
  children,
}: OkCancelModalProps) => {
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setModalLoading(true);
    await onSubmit();
    setModalLoading(false);
  };

  return (
    <Modal
      title={title}
      visible={showModal}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={modalLoading}
      getContainer={false}
    >
      {children}
    </Modal>
  );
};

export default OkCancelModal;
