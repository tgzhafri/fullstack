import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/containers/login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Register from "./src/containers/register";
import Category from "./src/containers/category";
import CategoryAddModal from "./src/containers/categoryAddModal";
import CategoryEditModal from "./src/containers/categoryEditModal";
import TaskCreateButton from "./src/components/taskCreateButton";
import Task from "./src/containers/task";
import TaskCreateModal from "./src/containers/taskCreateModal";
import TaskEditModal from "./src/containers/taskEditModal";

import LogoutButton from "./src/components/logoutButton";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store/configureStore";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  useDeviceContext(tw);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
                headerStyle: tw`bg-blue-900`,
                headerTitleStyle: tw`text-white font-bold`,
                headerRight: null,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerBackVisible: false,
                headerShown: false,
                headerStyle: tw`bg-blue-900`,
                headerTitleStyle: tw`text-white font-bold`,
              }}
            />
            <Stack.Screen
              name="Category"
              component={Category}
              options={{
                headerLeft: null,
                headerBackVisible: false,
                headerShown: true,
                gestureEnabled: false,
                headerStyle: tw`bg-blue-900`,
                headerTitleStyle: tw`text-white font-bold`,
                headerRight: () => <LogoutButton />,
              }}
            />
            <Stack.Screen
              name="CategoryAddModal"
              component={CategoryAddModal}
              options={{
                headerBackVisible: true,
                headerShown: false,
                headerStyle: tw`bg-blue-900`,
                headerTitleStyle: tw`text-white font-bold`,
                presentation: "containedTransparentModal",
              }}
            />
            <Stack.Screen
              name="CategoryEditModal"
              component={CategoryEditModal}
              options={{
                headerBackVisible: true,
                headerShown: false,
                headerStyle: tw`bg-blue-900`,
                headerTitleStyle: tw`text-white font-bold`,
                presentation: "transparentModal",
              }}
            />
            <Stack.Screen
              name="Task"
              component={Task}
              options={{
                headerBackVisible: true,
                headerShown: true,
                headerStyle: tw`bg-blue-900`,
                headerTitleStyle: tw`text-white font-bold`,
                headerRight: () => <TaskCreateButton />,
              }}
            />
            <Stack.Screen
              name="TaskCreateModal"
              component={TaskCreateModal}
              options={{
                headerBackVisible: true,
                headerShown: false,
                headerStyle: tw`bg-blue-900`,
                headerTitleStyle: tw`text-white font-bold`,
                presentation: "transparentModal",
              }}
            />
            <Stack.Screen
              name="TaskEditModal"
              component={TaskEditModal}
              options={{
                headerBackVisible: true,
                headerShown: false,
                headerStyle: tw`bg-blue-900`,
                headerTitleStyle: tw`text-white font-bold`,
                presentation: "transparentModal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
