import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";
import { fetchEditTask } from "../../reducers/taskReducer";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";

export default function TaskEditModal(props) {
  useDeviceContext(tw);

  console.log("edit task props", props);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.users.items);
  const user_id = user.id;
  const token = useSelector((state) => state.users.token);
  const task_id = props.route.params;

  const category_id = useSelector((state) => state.categories.categoryID);
  console.log("task cat id", category_id);

  const [name, setName] = useState("");

  function onSubmit() {
    const input = {
      task_id: task_id,
      category_id: category_id,
      user_id: user_id,
      token: token,
      ...name,
      status: 1,
    };
    console.log("editing..", input);
    dispatch(fetchEditTask(input));
    navigation.goBack();
  }

  return (
    <View style={tw`flex-1 flex justify-center items-center bg-opacity-95 bg-gray-600`}>
      <View
        style={tw`w-70 h-50 bg-gray-400 rounded-lg flex flex-col justify-center items-center`}
      >
        <TouchableOpacity
          style={tw`w-60 flex flex-row justify-end mb-3`}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          style={tw`w-60 py-3 px-3 mb-4 rounded-lg text-center text-lg bg-gray-100`}
          placeholder="Edit Task Name"
          onChangeText={(text) => setName({ name: text })}
        ></TextInput>
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={tw` py-3 px-3 w-40 flex items-center bg-blue-600 rounded-lg`}
        >
          <Text style={tw`font-bold text-white text-lg`}>Edit Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
