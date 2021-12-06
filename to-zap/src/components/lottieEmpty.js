import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Platform } from "react-native";
import tw from "twrnc";
import { useDeviceContext } from "twrnc";
import LottieView from "lottie-react-native";

export default function LottieEmpty() {
  //--------------------- randomised loading text starts here-----------------------//
  const emptyTextArr = [
    "If you are reading this, you can read and see that there's nothing here",
    "Hello Mr. FBI, how you doin. There's plenty empty space here for you to join",
    "Nothing is lonelier than this empty SPACE...unless you're single",
    "Empty space, Empty space everywhere...",
    "Free space, Free space everywhere...",
    "White space, White space everywhere...",
    "Outer space, it's still empty",
    "Look at all this free empty space",
    "What if I told you, this page is more than 99.999999% empty space",
    "Look at this view, it's so empty",
    "I need some space",
    "There's probably John Cena wearing camo hiding here, I guess we'll never know",
    "Too much white space you have",
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
  shuffle(emptyTextArr);

  //--------------------- randomised loading text ends here-----------------------//
  return (
    <View style={tw`flex-1 justify-start items-center mt-20`}>
      <Text style={tw`w-70 text-center text-lg mb-5`}>{emptyTextArr[0]}</Text>
      {Platform.OS === "ios" ? (
        <LottieView
          source={require("../assets/lottie-empty.json")}
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
