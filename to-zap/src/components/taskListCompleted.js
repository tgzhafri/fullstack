import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RefreshControl } from "react-native";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";
import { useNavigation } from "@react-navigation/native";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Checkbox,
  VStack,
  Spacer,
  Switch,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { fetchEditTask, fetchTickTask } from "../reducers/taskReducer";
import LottieEmpty from "../components/lottieEmpty";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function TaskList() {
  useDeviceContext(tw);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const taskArr = useSelector((state) => state.tasks.items);

  // category status, 0:delete, 1:active, 2:completed
  const task = taskArr.filter((item) => item.status == 2);
  console.log("task list completed..", task);

  useEffect(() => {
    if (taskArr) {
      const task = taskArr.filter((item) => item.status == 2);
    }
    console.log("complete task..", task);
  }, [taskArr]);

  const token = useSelector((state) => state.users.token);

  const category_id = useSelector((state) => state.categories.categoryID);

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const currentDate = new Date();
  // var date = new Date(Date.parse("2021-11-26T01:34:04.000000Z"));
  // console.log("current date", currentDate);
  // console.log("date..", date);
  // var dayDiff = Math.round(Math.abs((currentDate - date) / oneDay));
  // console.log("day diff", dayDiff);

  const taskCreatedAt = taskArr.map((item) => {
    var d = new Date(Date.parse(item.created_at));
    const dayDiff = Math.round(Math.abs((currentDate - d) / oneDay));
    return dayDiff;
  });
  // console.log("task created at how many days ago??", taskCreatedAt);

  const onTick = async (item) => {
    console.log("ticked!");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const input = {
      token: token,
      task_id: item.id,
      name: item.name,
      status: 1,
      category_id: category_id,
    };
    console.log("task completed", input);
    dispatch(fetchEditTask(input));
  };

  //-----------------code for swap date format starts here------------------//
  const [isSwap, setSwap] = useState(false);
  const swapDate = React.useCallback(() => {
    setSwap(true);
    wait(1500).then(() => setSwap(false));
  }, []);
  console.log("isSwap status??", isSwap);

  const formattedDate = taskArr.map((item) => {
    var d = new Date(Date.parse(item.created_at));
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let date = d.toLocaleDateString("en-us", options);
    return date;
  });
  // console.log("formatted date?", formattedDate);

  //-----------------code for swap date format ends here------------------//

  //--------------------refresh control code starts here ------------------//

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    swapDate();
    wait(1500).then(() => setRefreshing(false));
  }, []);

  //--------------------refresh control code ends here ------------------//

  function onDelete(item) {
    const input = {
      token: token,
      task_id: item.id,
      name: item.name,
      status: 0,
      category_id: category_id,
    };
    console.log("deleting..", input);
    dispatch(fetchEditTask(input));
  }
  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable onPress={() => console.log("You touched me")} bg="white">
        <Box
          style={tw`flex-1 w-full px-3 py-5 flex flex-col justify-start border-b`}
        >
          <HStack alignItems="center" space={3}>
            <Checkbox
              value="complete"
              accessibilityLabel="This is a complete checkbox"
              onChange={() => onTick(item)}
              defaultIsChecked
            />
            <VStack>
              <Text
                name="task"
                color="coolGray.800"
                _dark={{ color: "warmGray.50" }}
                bold
                aria-label="task"
                strikeThrough
              >
                {item.name}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              color="coolGray.800"
              _dark={{ color: "warmGray.50" }}
              alignSelf="center"
              onPress={swapDate}
            >
              {isSwap === true ? (
                <Text>{formattedDate[index]}</Text>
              ) : (
                <>
                  {taskCreatedAt[index] === 1 ? (
                    <Text>{taskCreatedAt[index]} day ago</Text>
                  ) : taskCreatedAt[index] === 0 ? (
                    <Text> less than a day</Text>
                  ) : (
                    <Text>{taskCreatedAt[index]} days ago</Text>
                  )}
                </>
              )}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = ({ item }) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => navigation.navigate("TaskEditModal", item.id)}
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
    <Box safeArea flex="1">
      {task.length == 0 ? (
        <LottieEmpty />
      ) : (
        <SwipeListView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={task}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-140}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      )}
    </Box>
  );
}
