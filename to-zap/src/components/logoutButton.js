import React, { useState, useEffect } from "react";
import tw from "twrnc";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Pressable,
} from "react-native";
import { useDeviceContext } from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import { userLogout, fetchLogout } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function LogoutButton() {
  useDeviceContext(tw);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const navigation = useNavigation();


  function submitLogout() {
    console.log("logging out..");
    dispatch(fetchLogout(token));
  }
  useEffect(() => {
    if (!token) {
      console.log("token deleted");
      navigation.navigate("Login");
    }
  }, [token]);

  return (
    <Pressable onPress={() => submitLogout()} style={tw`mr-3`}>
      <MaterialIcons name="logout" size={24} color="white" />
    </Pressable>
  );
}
