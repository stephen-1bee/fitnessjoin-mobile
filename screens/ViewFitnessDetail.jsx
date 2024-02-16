import React, { useState, useEffect } from "react";
import tw from "twrnc";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  Button,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import img1 from "../assets/img1.jpg";
import SessionStorage from "react-native-session-storage";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const ViewFitnessDetail = ({ navigation }) => {
  const [center, setfitnessCenter] = useState([]);

  const center_id = SessionStorage.getItem("centerId");

  const getFitnessCenter = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(
        `https://fitness-join-api-xe62.onrender.com/api/v1/admins/one/${center_id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setfitnessCenter(result.admin);
          console.log(result.admin);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFitnessCenter();
  }, []);

  return (
    <View style={style.top}>
      <Image
        source={{ uri: center[0]?.photo }}
        resizeMode="cover"
        style={tw`h-[50%]`}
      />
      <View style={tw`px-5 mt-5 gap-2`}>
        <Text style={tw`text-[15px]`}>Welcome to,</Text>
        <Text style={tw`text-xl font-semibold`}>
          {center ? center[0]?.name : "no center name"}
        </Text>
        <Text style={tw` `}>
          <Feather name="mail" size={20} />
          {center ? center[0]?.email : "no center eamil"}
        </Text>
        <Text style={tw` `}>{center ? center[0]?.desc : "no center desc"}</Text>
        <Text style={tw`items-center mr-2 `}>
          <Feather name="map-pin" size={20} />
          {center ? center[0]?.location : "no center location"}
        </Text>
        <Text style={tw` `}>
          <Feather name="phone" size={20} />
          {center ? center[0]?.phone : "no center phone"}
        </Text>
        <View style={tw` w-[100px] rounded mt-2 rounded `}>
          {center[0]?.isOpened ? (
            <View>
              <Text style={tw`bg-[#d9fcf6]  text-center py-2 `}>Opened</Text>
            </View>
          ) : (
            <View>
              <Text style={tw`bg-[#fcdbd9]  text-center py-2`}>Closed</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("signUp")}
          title="Register"
          style={tw`bg-[#08A88A] py-4 w-[200px] items-center px-5 rounded-md mt-2 `}
        >
          <Text style={tw`text-white text-[16px]`}>Register</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style />
    </View>
  );
};

export default ViewFitnessDetail;

const style = StyleSheet.create({
  top: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 0 : 0,
  },
});

// <Image source={img1} style={tw`w-[350px] h-[200px] rounded-lg`} />
//       <Text style={tw`mt-10`}>Center id: {centerId}</Text>
//       <View style={tw` gap-2 justify-center mr-52 mt-20`}>
//         <Text style={tw`font-bold text-2xl`}>Welcome</Text>
//         <Text>Vvu Fitness Center</Text>
//         <Text>Description</Text>
//         <Text>Email</Text>
//         <Text>Location</Text>
//         <Text>Opened</Text>
//         <Text>Rating</Text>
