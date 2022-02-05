import { Button, Form, Input, Modal, Space, Typography } from "antd";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithCustomToken,
} from "firebase/auth";
import { useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";

import styles from "./index.module.css";

declare const window: any;

interface LoginModalProps {
  onCancel: () => void;
  showModal: boolean;
}

interface FormValues {
  email: string;
  password: string;
  customToken: string;
}

const LoginModal = ({ onCancel, showModal }: LoginModalProps) => {
  const [form] = Form.useForm();
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.log("google signup failed:", error);
    }
    onCancel();
  };

  const handleFacebookSignIn = async () => {
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
      if (window.useCustomToken) {
        await signInWithCustomToken(auth, values.customToken);
      } else {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      }
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
        {window.useCustomToken ? (
          <Form.Item label="Custom Token" name="customToken">
            <Input />
          </Form.Item>
        ) : (
          <>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                {
                  required: true,
                  type: "email",
                  message: "Email must be valid",
                },
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
          </>
        )}
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
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
        {/* <Button
          icon={<FacebookOutlined />}
          type="primary"
          onClick={handleFacebookSignIn}
        >
          Sign in with Facebook
        </Button> */}
      </Space>
    </Modal>
  );
};

export default LoginModal;
