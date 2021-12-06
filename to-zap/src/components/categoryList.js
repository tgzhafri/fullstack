import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RefreshControl } from "react-native";
import LottieLoading from "./lottieLoading";
import LottieCubeLoading from "../components/lottieCubeLoading";

import tw from "twrnc";
import { useDeviceContext } from "twrnc";

import {
  NativeBaseProvider,
  Box,
  View,
  Text,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Radio,
  VStack,
  Spacer,
  Switch,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fetchEditCategory } from "../reducers/categoryReducer";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function CategoryList() {
  useDeviceContext(tw);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categoriesAll = useSelector((state) => state.categories.items);
  const token = useSelector((state) => state.users.token);
  // console.log("category list..", categories);
  const user = useSelector((state) => state.users.items);
  const user_id = user.id;
  const isLoading = useSelector((state) => state.categories.isLoading);

  const isLogout = useSelector((state) => state.users.isLogout);

  //-----------category pending task count code starts here----------//
  const pendingTaskCategoryArr = useSelector(
    (state) => state.categories.pending.taskCount
  );

  // category status, 0:delete, 1:active
  const categories = categoriesAll.filter((item) => item.status !== 0);

  const pendingTaskCount = pendingTaskCategoryArr.map((item) => item.count);
  const pendingTaskCategoryId = pendingTaskCategoryArr.map(
    (item) => item.category_id
  );

  // find number of categories list array, categories.length
  const maxArrLength = categories.length;
  // find the difference in array length between the two arrays
  const arrDiff = maxArrLength - pendingTaskCount.length;

  var dummyArr = [];
  for (let i = 0; i < arrDiff; i++) {
    dummyArr.push(0);
  }
  const categoryListPendingCount = [...pendingTaskCount, ...dummyArr];

  //--------category pending task count code ends here-------------//

  function onDelete(item) {
    const input = {
      token: token,
      id: item.id,
      status: 0,
      name: item.name,
      user_id: user_id,
    };
    console.log("deleting..", input);
    dispatch(fetchEditCategory(input));
  }

  //--------------random color code section starts here------------------ //
  const colors = [
    "#333333",
    "#2f0b0b",
    "#304f2d",
    "#3e1a1a",
    "#453823",
    "#630000",
    "#003366",
    "#330e0e",
    "#003333",
    "#3e2d2d",
    "#994F14",
    "#DA291C",
    "#007A33",
    "#EB9CA8",
    "#8A004F",
    "#000000",
    "#10069F",
    "#00a3e0",
    "#4CC1A1",
  ];
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
  shuffle(colors);
  // console.log("colors?", colors);
  //------------------- random color code section ends--------------------- //

  //--------------------refresh control code starts here ------------------//

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => setRefreshing(false));
  }, []);

  //--------------------refresh control code ends here ------------------//

  const renderItem = ({ item, index }) => (
    <Box style={tw`bg-transparent mb-2`}>
      <Pressable
        onPress={() => navigation.navigate("Task", item)}
        style={{
          backgroundColor: colors[index % colors.length],
        }}
      >
        <Box
          style={tw`w-85 h-20 flex flex-row justify-between items-center px-4`}
        >
          <HStack style={tw`flex w-full flex-row justify-between items-center`}>
            <Feather name="package" size={24} color="white" style={tw`mr-2`} />
            <VStack>
              <Text
                name="task"
                color="white"
                _dark={{ color: "warmGray.50" }}
                bold
                aria-label="task"
                fontSize="lg"
              >
                {item.list}
              </Text>
            </VStack>

            <Spacer />
            <Text
              style={tw`text-white text-lg font-bold`}
              _dark={{ color: "warmGray.50" }}
              alignSelf="center"
            >
              {categoryListPendingCount[index]}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = ({ item }) => (
    <HStack flex="1" pl="2" style={tw`mb-2`}>
      <Pressable
        w="70"
        ml="auto"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => navigation.navigate("CategoryEditModal", item.id)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            Edit
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        bg="red.500"
        justifyContent="center"
        onPress={() => onDelete(item)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="transparent" style={tw`flex-1 h-full pb-12`}>
      {refreshing === true ? (
        <Text style={tw`text-center`}>
          Refreshing new colours for your eyes...
        </Text>
      ) : (
        <></>
      )}
      {isLogout === true ? (
        <View
          style={tw`flex-1 flex flex-col justify-center items-center pt-24`}
        >
          <Text style={tw`w-70 text-center text-lg mb-2`}>
            You will be missed...not
          </Text>
          <LottieCubeLoading />
        </View>
      ) : isLoading === true ? (
        <LottieLoading />
      ) : (
        <SwipeListView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={categories}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          keyExtractor={categories.id}
          rightOpenValue={-140}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      )}
    </Box>
  );
}
