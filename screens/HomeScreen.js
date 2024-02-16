import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import tw from "twrnc";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={style.top}>
      <View style={tw`items-center justify-center flex-1 mt-10`}>
        <Image
          source={require("../assets/img3.png")}
          style={tw`w-[300px] h-[350px]`}
        />
      </View>
      <View style={tw`flex-1 items-center justify-center`}>
        <View style={tw`text-center mb-24 mt-24 `}>
          <Text style={tw`text-2xl text-center font-bold `}>Welcome</Text>
          <Text
            style={tw`text-[16px] text-gray-700 text-center text-center mt-1 `}
          >
            Stay orgainzed and live a good life
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("FitnessCenters")}
          style={tw`bg-[#08A88A] px-5 py-5 rounded-lg `}
        >
          <View style={tw`items-center flex-row justify-between gap-24`}>
            <Text style={tw` text-white text-lg`}>Get Started </Text>
            <AntDesign name="caretright" color="white" size={10} />
          </View>
        </TouchableOpacity>
        <View style={tw`flex-row mt-5 gap-1 items-center justify-center mb-24`}>
          <Text style={tw`text-gray-700 `}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={tw` text-[16px] font-bold text-[#08A88A]`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  top: {
    flex: 1,
    paddingTop: Platform.OS === "android " ? StatusBar.currentHeight : null,
  },
});
