import React from "react";
import { Button } from "react-native-elements";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";

const BasicButton = ({ width, color = "blue", ...props }) => (
  <Button
    {...props}
    buttonStyle={{ width, backgroundColor: color, borderRadius: 10 }}
  />
);

export default BasicButton;
