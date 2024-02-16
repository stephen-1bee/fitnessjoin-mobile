import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SessionStorage from "react-native-session-storage";
import tw from "twrnc";

const LoginScreen = ({ navigation }) => {
  const [userId, setuserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  SessionStorage.setItem("userId", userId);

  console.log(`userid: ${userId}`);

  const handleLogin = async ({ navigation }) => {
    setloading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "https://fitness-join-api.onrender.com/api/v1/users/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (!email || !password) {
          Alert.alert("Warning", "Fields cannot be empty");
          setloading(false);
        } else if (result.msg === "Login successful") {
          setuserId(result.user._id);
          setloading(true);
          Alert.alert("Success", result.msg);
          setloading(false);
          navigation.navigate("UserScreen");
          console.log(result.msg);
        } else {
          Alert.alert("Error", result.msg);
          setloading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <ScrollView contentContainerStyle={tw`items-center flex-1 bg-white`}>
      <View style={tw`flex-1 items-center justify-center `}>
        <Text style={tw`text-lg font-bold `}>Login Screen</Text>
        <View style={tw`mb-10`}>
          <View style={tw``}>
            <Text style={tw`mb-2 text-lg font-semibold`}>Email</Text>
            <TextInput
              onChangeText={(e) => setEmail(e)}
              placeholder="email"
              autoCapitalize="none"
              style={tw`w-64 px-2 py-5 rounded-md border-dashed border-[1px] mb-2`}
            />
          </View>
          <View>
            <Text style={tw`mb-2 text-lg font-semibold`}>Password</Text>
            <TextInput
              onChangeText={(e) => setPassword(e)}
              placeholder="password"
              secureTextEntry="true"
              style={tw`w-64 rounded-md px-2 py-5 border-dashed border-[1px] `}
            />
          </View>
        </View>
        <TouchableOpacity
          style={tw`bg-green-800 px-26 py-4 rounded-md mt-2 mb-5`}
          onPress={() => handleLogin({ navigation })}
        >
          <Text style={tw`text-white `}>
            {loading ? <ActivityIndicator /> : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
