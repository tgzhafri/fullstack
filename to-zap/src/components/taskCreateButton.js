import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TaskCreateButton() {
  useDeviceContext(tw);
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("TaskCreateModal")}
      style={tw`mr-3`}
    >
      <Feather name="plus" size={24} color="white" />
    </Pressable>
  );
}
