import { Form, Input, Modal } from "antd";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

interface LoginModalProps {
  onCancel: () => void;
  showModal: boolean;
}

interface FormValues {
  email: string;
  password: string;
}

const LoginModal = ({ onCancel, showModal }: LoginModalProps) => {
  const [form] = Form.useForm();
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  const auth = getAuth();

  const handleSubmit = async () => {
    setModalLoading(true);
    try {
      await form.validateFields();
      const values: FormValues = form.getFieldsValue();
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      console.log("form submission failed:", error);
    }
    setModalLoading(false);
    onCancel();
  };

  return (
    <Modal
      title="Sign In"
      visible={showModal}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={modalLoading}
      forceRender
    >
      <Form name="sign-up" form={form} autoComplete="off">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { required: true, type: "email", message: "Email must be valid" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password is required" },
            { min: 6, message: "Password must be minimum 6 characters." },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
