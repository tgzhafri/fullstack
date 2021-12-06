import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Platform } from "react-native";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";
import LottieView from "lottie-react-native";

export default function LottieCubeLoading() {
  return (
    <View style={tw`flex-1 flex flex-col justify-center items-center`}>
      <Text style={tw`w-70 text-center text-lg mb-5`}>
        Loading something awesome...
      </Text>
      {Platform.OS === "ios" ? (
        <LottieView
          source={require("../assets/lottie-cube-loading.json")}
          loop={true}
          autoPlay={true}
          progress={0}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
