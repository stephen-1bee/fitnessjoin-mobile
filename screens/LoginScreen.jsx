import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native"
import { TextInput } from "react-native-gesture-handler"
import SessionStorage from "react-native-session-storage"
import tw from "twrnc"

const LoginScreen = ({ navigation }) => {
  const [userId, setuserId] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setloading] = useState(false)
  const [showPassword, setshowPassword] = useState(false)

  SessionStorage.setItem("userId", userId)

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Warning!", "All fields are required")
      } else {
        let headersList = {
          Accept: "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Content-Type": "application/json",
        }

        let bodyContent = JSON.stringify({
          email: email,
          password: password,
        })

        let response = await fetch("http://localhost:1000/api/v1/users/login", {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        })

        let data = await response.json()
        if (data.msg === "login successful") {
          Alert.alert(data.msg)
          setuserId(data.user?._id)
          setUserCenterId(data.user?.center_id)
          navigation.navigate("UserScreen")
          console.log(data)
        } else {
          Alert.alert(data.msg)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ScrollView contentContainerStyle={tw`items-center flex-1 bg-white`}>
      <SafeAreaView
        style={tw`${styles.nav} flex-row items-center justify-between `}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("home")}
          style={tw`items-center justify-center bg-black border border-black rounded-full w-10 h-10 absolute top-[53px] right-[150px]`}
        >
          <Feather name="arrow-left" size={20} color={"white"} />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold`}>Login</Text>
      </SafeAreaView>
      {/* icon */}
      <View style={tw`bg-gray-400 h-20 w-20 rounded-full mt-10`}></View>

      <View style={tw`flex mt-[120px] gap-5`}>
        <View style={tw`gap-2`}>
          <Text style={tw`text-[20px] font-semibold text-left text-[#08A88A] `}>
            Welcome Back!
          </Text>
          <Text style={tw`text-gray-400 text-[15px]`}>Enter Your Details</Text>
        </View>
        <View style={tw`flex-1 items-center`}>
          <View style={tw`mb-10 w-[320px] gap-5`}>
            <View style={tw``}>
              <TextInput
                onChangeText={(e) => setEmail(e)}
                placeholder="Email Address"
                autoCapitalize="none"
                style={tw` px-1 py-4 rounded-md  border-b border-gray-300 mb-2`}
              />
            </View>
            <View stye={tw``}>
              <Feather name="eye" size={20} style={tw`items-center`} />
              <TextInput
                onChangeText={(e) => setPassword(e)}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                style={tw` px-1 py-4 rounded-md  border-b border-gray-300 mb-2`}
              />
            </View>
          </View>
          <TouchableOpacity
            style={tw`bg-[#08A88A] px-26 h-[60px] items-center justify-center rounded-full mt-2 mb-5`}
            onPress={() => handleLogin()}
          >
            <Text style={tw`text-white text-[16px]`}>
              {loading ? <ActivityIndicator color="white" /> : "Log In"}
            </Text>
          </TouchableOpacity>
          <View style={tw`flex-row`}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
              <Text style={tw`text-[#08A88A] font-semibold`}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  nav: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})

export default LoginScreen
