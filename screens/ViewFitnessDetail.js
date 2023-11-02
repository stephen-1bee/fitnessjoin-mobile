import React from "react";
import tw from "twrnc";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import img1 from "../assets/img1.jpg";

const ViewFitnessDetail = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={tw`items-center justify-center mt-14`}>
      <Image source={img1} style={tw`w-[350px] h-[200px] rounded-lg`} />
      <View>
        <View style={tw` gap-2 justify-center mr-52 mt-20`}>
          <Text style={tw`font-bold text-2xl`}>Welcome</Text>
          <Text>Vvu Fitness Center</Text>
          <Text>Description</Text>
          <Text>Email</Text>
          <Text>Location</Text>
          <Text>Opened</Text>
          <Text>Rating</Text>

          <TouchableOpacity
            style={tw`px-7 py-4 bg-green-800 rounded-lg mr-2 mt-12 `}
            onPress={() => navigation.navigate("signUp")}
          >
            <Text style={tw`text-white`}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default ViewFitnessDetail;
