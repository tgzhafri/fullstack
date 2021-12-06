import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dimensions, TouchableOpacity, View, Switch } from "react-native";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";

import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Radio,
  VStack,
  Spacer,
} from "native-base";
import TaskList from "../../components/taskList";
import TaskListCompleted from "../../components/taskListCompleted";
import {
  fetchTask,
  fetchCompleteTask,
  fetchPendingTask,
} from "../../reducers/taskReducer";
import { getCategoryId } from "../../reducers/categoryReducer";
import LottieLoading from "../../components/lottieLoading";

export default function Task(props) {
  useDeviceContext(tw);
  const [mode, setMode] = useState("Basic");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.items);

  const id = props.route.params.id;
  const name = props.route.params.list;
  // console.log("category id..", id);
  const taskAll = useSelector((state) => state.tasks.items);
  // category status, 0:delete, 1:active, 2:completed
  // const task = taskAll.filter((item) => item.status == 1);
  const token = useSelector((state) => state.users.token);
  const isLoading = useSelector((state) => state.tasks.isLoading);

  useEffect(() => {
    const data = {
      category_id: id,
      token: token,
    };
    console.log("fetch task data..", data);
    if (isEnabled == false) {
      dispatch(fetchPendingTask(data));
    } else {
      dispatch(fetchCompleteTask(data));
    }

    dispatch(getCategoryId(data.category_id));
  }, [id, token, isEnabled]);

  return (
    <NativeBaseProvider>
      {isLoading == true ? (
        <LottieLoading />
      ) : (
        <Box bg="white" flex="1" safeAreaTop>
          <HStack
            style={tw`flex flex-row justify-between items-center px-5 pt-3 pb-2`}
          >
            <Heading size="lg">{name}</Heading>
            <VStack style={tw`flex flex-col justify-center items-center`}>
              {isEnabled == false ? (
                <Text>Pending</Text>
              ) : (
                <Text>Completed</Text>
              )}
              <Switch
                style={tw`ml-2`}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </VStack>
          </HStack>

          {isEnabled == false ? <TaskList /> : <TaskListCompleted />}
        </Box>
      )}
    </NativeBaseProvider>
  );
}
