import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEditCategory } from "../../reducers/categoryReducer";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";

export default function CategoryEditModal(props) {
  useDeviceContext(tw);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log("category id..", props.route.params);
  const token = useSelector((state) => state.users.token);
  const category_id = props.route.params;
  const user = useSelector((state) => state.users.items);
  const user_id = user.id;

  const [input, setInput] = useState({
    name: "",
    id: "",
    token: "",
    status: 1,
    user_id: "",
  });

  useEffect(() => {
    setInput({ id: category_id, token: token, user_id: user_id });
  }, [category_id, token]);

  function onSubmit() {
    console.log("editing category name..", input);
    dispatch(fetchEditCategory(input));
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
          placeholder="Edit Category Name"
          onChangeText={(text) => setInput({ ...input, name: text })}
        ></TextInput>
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={tw` py-3 px-3 w-40 flex items-center bg-blue-600 rounded-lg`}
        >
          <Text style={tw`font-bold text-white text-lg`}>Edit Category</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
