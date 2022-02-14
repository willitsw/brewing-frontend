import { Button, Form, Input, Modal, Space, Typography } from "antd";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";

import styles from "./index.module.css";
import {
  setShowCreateAccountModal,
  showCreateAccountModal,
} from "../../../redux/global-modals/slice";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";

interface FormValues {
  email: string;
  password: string;
}

const CreateNewAccountModal = () => {
  const [form] = Form.useForm();
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const showCreateAccount = useAppSelector(showCreateAccountModal);
  const dispatch = useAppDispatch();

  const onCancel = () => dispatch(setShowCreateAccountModal(false));

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleGoogleSignUp = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.log("google signup failed:", error);
    }
    onCancel();
  };

  const handleFacebookSignUp = async () => {
    try {
      await signInWithRedirect(auth, facebookProvider);
    } catch (error) {
      console.log("facebook signup failed:", error);
    }
    onCancel();
  };

  const handleSubmit = async () => {
    setModalLoading(true);
    try {
      await form.validateFields();
      const values: FormValues = form.getFieldsValue();
      await createUserWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      console.log("email / password signup failed:", error);
    }
    setModalLoading(false);
    onCancel();
  };

  return (
    <Modal
      title="Create a New Account"
      visible={showCreateAccount}
      onOk={handleSubmit}
      onCancel={() => onCancel()}
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
      <Space
        className={styles["other-providers"]}
        align="center"
        direction="vertical"
      >
        <Typography.Title level={5}>- or -</Typography.Title>
        <Button
          icon={<GoogleOutlined />}
          type="primary"
          onClick={handleGoogleSignUp}
        >
          Sign up with Google
        </Button>
        {/* <Button
          icon={<FacebookOutlined />}
          type="primary"
          onClick={handleFacebookSignUp}
        >
          Sign up with Facebook
        </Button> */}
      </Space>
    </Modal>
  );
};

export default CreateNewAccountModal;
