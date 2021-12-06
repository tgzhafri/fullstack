import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Platform } from "react-native";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";
import LottieView from "lottie-react-native";

export default function LottieLoading() {
  //--------------------- randomised loading text starts here-----------------------//
  const loadingTextArr = [
    "Loading content... or maybe the app is broken ?! jk, just wait a sec...",
    "Loading machine broke, or you're broken",
    "If you are reading this, you can read",
    "Loading your digital hug",
    "l o a d i n g a e s t h e t i c s",
    "Caution: Contents Spicy",
    "Error 404: Joke Not Found",
    "Hello Mr. FBI, what are we watching today",
    "Charging spirit bomb",
    "Are we there yet?",
    "Researching cheat codes",
    "Is this thing on..?",
    "Dispatching carrier pigeons",
    "Look behind you",
    "Loading Lines in 2021 LUL",
    "i solemnly swear that i am up to no good",
    "Did they just walk up slowly and load?",
    "Ready Player One",
    "Finishing this sente...",
    "Generating terrain...(sounds cooler than waiting for API call)",
    "Entering cheat codes",
    "They see me loading, They waiting",
    "Procedurally generating buttons",
    "Start your engines",
    "At least it's faster and prettier than your Government website... ",
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
  shuffle(loadingTextArr);

  //--------------------- randomised loading text ends here-----------------------//

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`w-70 text-center text-lg`}>{loadingTextArr[0]}</Text>

      {Platform.OS === "ios" ? (
        <LottieView
          source={require("../assets/lottie-loading.json")}
          loop={true}
          autoPlay={true}
          progress={0}
          style={{ width: 150, height: 150 }}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
