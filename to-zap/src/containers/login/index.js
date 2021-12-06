import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../reducers/userReducer";
import { View, Text, Image } from "react-native";
import { Formik, useFormik, Button } from "formik";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";
import LottieCubeLoading from "../../components/lottieCubeLoading";

import BasicInput from "../../components/BasicInput";
import BasicButton from "../../components/BasicButton";

import validationSchema from "./schema";

const initialValues = {
  email: "",
  password: "",
};
const images = {
  logo: require("../../assets/tz_logo_dark.png"),
};
const Login = ({ navigation }) => {
  useDeviceContext(tw);

  const [data, setData] = useState({
    isLogin: false,
  });

  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const isLoading = useSelector((state) => state.users.isLoading);

  const onSubmit = async (values) => {
    console.log(values);
    dispatch(fetchUser(values));
    setData({ isLogin: true });
    await new Promise((resolve) => setTimeout(resolve, 3000));
  };

  useEffect(() => {
    if (token && data.isLogin === true) {
      console.log("token is", token);
      navigation.navigate("Category");
      setData({ isLogin: false });
    }
  }, [token]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    isSubmitting,
    isValid,
    handleSubmit,
  } = formik;

  return (
    <View style={tw`flex-1 flex-col justify-start items-center px-3`}>
      {isLoading === true ? (
        <View style={tw`flex-1 flex flex-col justify-center items-center pt-24`}>
          <Text style={tw`w-70 text-center text-lg mb-2`}>
            You too shall pass...
          </Text>
          <Text style={tw`w-70 text-center text-lg mb-5`}>
            once login successful
          </Text>
          <LottieCubeLoading />
        </View>
      ) : (
        <>
          <View style={tw`flex flex-col py-10 items-center justify-center`}>
            <Text style={tw`py-5 text-5xl font-bold text-gray-800`}>
              To-Zap
            </Text>
            <Image source={images.logo} style={{ width: 80, height: 80 }} />
          </View>
          <BasicInput
            placeholder={"Enter e-mail"}
            iconName="envelope"
            iconSize={16}
            name="email"
            id="email"
            onChangeText={handleChange("email")}
            value={values.email}
            errorMessage={touched.email && errors.email}
          />
          <BasicInput
            placeholder={"Enter password"}
            iconName="lock"
            iconSize={22}
            secureTextEntry
            name="password"
            id="password"
            onChangeText={handleChange("password")}
            value={values.password}
            errorMessage={touched.password && errors.password}
          />
          <BasicButton
            title={"Login"}
            width={200}
            onPress={handleSubmit}
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />
          <View style={tw`mt-5`}>
            <BasicButton
              title={"Don't have an account? Sign Up"}
              onPress={() => navigation.navigate("Register")}
              color="transparent"
              type="clear"
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Login;
