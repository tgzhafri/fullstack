import React from "react";
import tw from "twrnc";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Pressable,
} from "react-native";
import { useDeviceContext } from "twrnc";
import { useNavigation } from "@react-navigation/native";

export default function AddCategoryCard() {
  useDeviceContext(tw);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={tw`w-85 h-15 bg-gray-400 rounded-lg flex flex-col justify-center items-center text-center mb-2`}
      onPress={() => navigation.navigate("CategoryAddModal")}
    ><Text style={tw`text-5xl font-bold`}>+</Text>
      {/* <View style={tw`w-85`}>
        <Text style={tw`text-5xl font-bold`}>+</Text>
      </View> */}
    </TouchableOpacity>
  );
}
