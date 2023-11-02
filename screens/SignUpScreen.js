import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";

import tw from "twrnc";
import { ScrollView } from "react-native-gesture-handler";

const SignupScreen = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [loading, setloading] = useState(false);

  const handleSignUp = async ({ navigation }) => {
    try {
      setloading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        first_name: fname,
        last_name: lname,
        email: email,
        password: password,
        phone: phone,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        "https://fitness-join-api.onrender.com/api/v1/users/create",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (!fname || !lname || !email || !password || !phone) {
            Alert.alert("Warning", "Fields Cannot be Empty");
            setloading(false);
          } else if (result.msg === "User added successfully") {
            alert(result.msg);
            navigation.navigate("LoginScreen");
            console.log(result.msg);
          } else {
            alert(result.msg);
            setloading(false);
          }
        })
        .catch((error) => console.log("error", error));
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  return (
    <ScrollView style={tw``}>
      <View style={tw`flex-1  items-center bg-white `}>
        <Text style={tw`text-2xl font-semibold mt-5`}>Creat An Account</Text>
        <Text style={tw`text-[18px] text-gray-500 w-78 text-center mt-2`}>
          Fill your information below or register with google
        </Text>

        {/* form */}
        <View style={tw`items-left justify-end mt-8`}>
          <Text style={tw`text-lg font-semibold`}>First Name</Text>
          <TextInput
            onChangeText={(e) => setfname(e)}
            placeholder="First Name"
            style={tw`w-64 px-2 py-5 rounded-md border-dashed border-[1px] mb-2`}
          />
          <Text style={tw`text-lg  font-semibold mt-3 mb-1`}>Last Name</Text>
          <TextInput
            onChangeText={(e) => setlname(e)}
            placeholder="Last Name"
            style={tw`w-64 px-2 py-5 rounded-md border-dashed border-[1px] mb-2`}
          />
          <Text style={tw`text-lg  font-semibold mt-3 mb-1`}>Email</Text>
          <TextInput
            onChangeText={(e) => setemail(e)}
            placeholder="Email"
            style={tw`w-64 px-2 py-5 rounded-md border-dashed border-[1px] mb-2`}
          />
          <Text style={tw`text-lg font-semibold mt-3 mb-1`}>Password</Text>
          <TextInput
            onChangeText={(e) => setpassword(e)}
            placeholder="password"
            secureTextEntry="true"
            style={tw`w-64 px-2 py-5 rounded-md border-dashed border-[1px] mb-2`}
          />
          <Text style={tw`text-lg font-semibold mt-3 mb-1`}>Phone</Text>
          <TextInput
            onChangeText={(e) => setphone(e)}
            placeholder="phone"
            style={tw`w-64 px-2 py-5 rounded-md border-dashed border-[1px] mb-2`}
          />
        </View>

        <TouchableOpacity
          style={tw`bg-green-800 px-26 py-4 rounded-md mt-2 mb-3`}
          onPress={() => handleSignUp({ navigation })}
        >
                  <Text style={ tw`text-white `}>{loading ? <ActivityIndicator /> : "Sign Up"}</Text>
        </TouchableOpacity>
        <View style={tw`flex-row justify-center gap-2 mb-4 items-center`}>
          <Text>Already have an Account?</Text>
          <TouchableOpacity
            title="login"
            style={tw`text-black`}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={tw`text-[15px] font-bold`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default SignupScreen;
