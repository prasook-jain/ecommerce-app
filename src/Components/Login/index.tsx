import { Button, Form, Input, message } from "antd";
import { login } from "../../utility/api";
import styled from "styled-components";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { SET_USER } from "../../reduxStore/action";
import { IUser } from "../../utility/types";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  /* border: 1px solid black; */
  width: 600px;

  & h1 {
    text-decoration: underline;
  }
  & > div {
    width: 600px;
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      const response = (await login(values.username, values.password)) || "";

      if (response) {
        const user = { ...(response as Object), type: "user" };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: SET_USER,
          payload: {
            user,
          },
        });
        history.push("/");
      }
    } catch (error) {
      message.error(error, 5);
      console.log({ error });
    }
  };

  return (
    <Wrapper>
      <h1>Login</h1>
      <div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={() => {
            console.log("onFinishedFailded");
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Login;
