import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              {loading && <Spinner />}
              <h1 className="text-center mb-4 fw-normal">Login Form</h1>
              {/* <h1 className="text-center mb-4 ">Login Form</h1> */}
              <Form layout="vertical" onFinish={submitHandler}>
                <Form.Item label="Email" name="email">
                  <Input type="email" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                  <Input type="password" />
                </Form.Item>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                  <Link to="/register" className="text-center mt-3 d-block">
                    Not a user ? Click Here to register
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Login;
