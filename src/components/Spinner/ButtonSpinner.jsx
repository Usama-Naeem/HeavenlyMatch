import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function ButtonSpinner() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#fff",
      }}
      spin
    />
  );
  return (
    <>
      <Spin indicator={antIcon} />
    </>
  );
}

export default ButtonSpinner;
