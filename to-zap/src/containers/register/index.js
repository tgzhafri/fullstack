import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisterUser, getUserFail } from "../../reducers/userReducer";

import { View, Text } from "react-native";
import { useFormik } from "formik";
import LottieCubeLoading from "../../components/lottieCubeLoading";

import BasicInput from "../../components/BasicInput";
import BasicButton from "../../components/BasicButton";

import validationSchema from "./schema";

const initialValues = {
  full_name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const SignUp = ({ navigation }) => {
  useDeviceContext(tw);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.items);
  const isLoading = useSelector((state) => state.users.isLoading);
  const error = useSelector((state) => state.users.error);
  // console.log("reg user..", users);
  // const status = users.status;
  const [data, setData] = useState({
    isRegister: false,
  });

  const onSubmit = async (values) => {
    console.log(values);
    dispatch(fetchRegisterUser(values));
    setData({ isRegister: true });
    await new Promise((resolve) => setTimeout(resolve, 5000));
  };
  useEffect(() => {
    if (user && data.isRegister === true && error === null) {
      console.log("user??", user);
      navigation.navigate("Login");
      setData({ isRegister: false });
    } else {
      console.log("not yet registered");
      // dispatch(getUserFail());
    }
  }, [user, data]);

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
        <View style={tw`flex flex-col justify-center items-center pt-24`}>
          <Text style={tw`w-70 text-center text-lg mb-5`}>
            You will be redirected to Login Page once registration is successful
          </Text>
          <LottieCubeLoading />
        </View>
      ) : (
        <>
          <Text style={tw`py-10 text-3xl text-gray-800 font-bold`}>
            Register Now
          </Text>

          <BasicInput
            placeholder={"Enter your full name"}
            iconName="user"
            iconSize={20}
            onChangeText={handleChange("full_name")}
            value={values.full_name}
            errorMessage={touched.full_name && errors.full_name}
          />
          <BasicInput
            placeholder={"Enter email"}
            iconName="envelope"
            iconSize={20}
            onChangeText={handleChange("email")}
            value={values.email}
            errorMessage={touched.email && errors.email}
          />
          <BasicInput
            placeholder={"Enter password"}
            iconName="lock"
            iconSize={24}
            secureTextEntry
            onChangeText={handleChange("password")}
            value={values.password}
            errorMessage={touched.password && errors.password}
          />
          <BasicInput
            placeholder={"Confirm password"}
            iconName="lock"
            iconSize={24}
            secureTextEntry
            onChangeText={handleChange("password_confirmation")}
            value={values.password_confirmation}
            errorMessage={
              touched.password_confirmation && errors.password_confirmation
            }
          />
          <BasicButton
            title={"Sign up"}
            width={200}
            onPress={handleSubmit}
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />
          <View style={tw`mt-5`}>
            <BasicButton
              title={"Already have an account? Login"}
              onPress={() => navigation.navigate("Login")}
              color="transparent"
              type="clear"
            />
          </View>
        </>
      )}
    </View>
  );
};

export default SignUp;
