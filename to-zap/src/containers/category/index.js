import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  Button,
  FlatList,
  ScrollView,
  Modal,
  TouchableHighlight,
} from "react-native";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";

import AddCategoryCard from "../../components/addCategoryCard";
import {
  fetchCategory,
  fetchCompleteTaskCountGroupByCategory,
  fetchPendingTaskCountGroupByCategory,
} from "../../reducers/categoryReducer";
import { NativeBaseProvider } from "native-base";
import CategoryList from "../../components/categoryList";
import LottieLoading from "../../components/lottieLoading";
import LottieEmpty from "../../components/lottieEmpty";

export default function Category() {
  useDeviceContext(tw);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.items);
  const user_id = user.id;
  const token = useSelector((state) => state.users.token);
  const categoriesArr = useSelector((state) => state.categories.items);
  const task = useSelector((state) => state.tasks.items);

  // categories state, 0:delete, 1:active
  const categories = categoriesArr.filter((item) => item.status == 1);

  useEffect(() => {
    if (categoriesArr) {
      const categories = categoriesArr.filter((item) => item.status == 1);
    }
    // console.log("complete task..", categories);
  }, [categoriesArr]);

  const isLoading = useSelector((state) => state.categories.isLoading);

  useEffect(() => {
    if (token.length !== 0) {
      const data = {
        user_id: user_id,
        token: token,
      };
      // console.log("category data..", data);
      dispatch(fetchCategory(data));
      dispatch(fetchCompleteTaskCountGroupByCategory(data));
      dispatch(fetchPendingTaskCountGroupByCategory(data));
    }
  }, [user, token, task]);

  return (
    <NativeBaseProvider>
      {isLoading == true ? (
        <LottieLoading />
      ) : (
        <View
          style={tw`flex-1 flex flex-col h-full w-screen justify-start items-center py-4`}
        >
          <AddCategoryCard />
          {categories.length == 0 ? (
            <LottieEmpty />
          ) : (
            <View>
              {isLoading == true ? <LottieLoading /> : <CategoryList />}
            </View>
          )}
          {/* <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`flex-1 h-full w-full flex flex-col justify-start items-center py-4`}
        >
          <AddCategoryCard />
          <CategoryList />
          {/* {categories.map((list, index) => {
            return <CategoryCard data={list} key={index} />;
          })} 
        </ScrollView> */}
          {/* <FlatList
        contentContainerStyle={tw`h-full w-full flex flex-col justify-start px-5`}
        data={DATA}
        renderItem={(item) => <CategoryCard data={item} />}
        numColumns={2}
      /> */}
        </View>
      )}
    </NativeBaseProvider>
  );
}
