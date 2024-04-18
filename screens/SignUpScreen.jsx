import { Feather } from "@expo/vector-icons"
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
import DropDownPicker from "react-native-dropdown-picker"

import tw from "twrnc"

const LoginScreen = ({ navigation }) => {
  const [email, setemail] = useState("")
  const [fname, setfname] = useState("")
  const [lname, setlname] = useState("")
  const [password, setpassword] = useState("")
  const [phone, setphone] = useState("")
  const [loading, setloading] = useState(false)

  const handleSignUp = async ({ navigation }) => {
    try {
      setloading(true)
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      var raw = JSON.stringify({
        first_name: fname,
        last_name: lname,
        email: email,
        password: password,
        phone: phone,
      })

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(
        "https://fitness-join-api.onrender.com/api/v1/users/create",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (!fname || !lname || !email || !password || !phone) {
            Alert.alert("Warning", "Fields Cannot be Empty")
            setloading(false)
          } else if (result.msg === "User added successfully") {
            alert(result.msg)
            navigation.navigate("LoginScreen")
            console.log(result.msg)
          } else {
            alert(result.msg)
            setloading(false)
          }
        })
        .catch((error) => console.log("error", error))
    } catch (err) {
      console.log(err)
      setloading(false)
    }
  }

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ])

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
        <Text style={tw`text-lg font-semibold`}>Signup</Text>
      </SafeAreaView>
      {/* icon */}

      <View style={tw`flex mt-[40px] gap-5`}>
        <View style={tw`gap-2`}>
          <Text style={tw`text-[20px] font-semibold text-left text-[#08A88A] `}>
            Welcome!
          </Text>
          <Text style={tw`text-gray-400 text-[15px]`}>Enter Your Details</Text>
        </View>
        <View style={tw`flex-1 items-center`}>
          <View style={tw`mb-10 w-[320px] gap-5`}>
            {/* firstname */}
            <TextInput
              onChangeText={(e) => setfname(e)}
              placeholder="Firstname"
              autoCapitalize="none"
              style={tw` px-1 py-4 rounded-md  border-b border-gray-400 mb-2`}
            />
            {/* lastname */}
            <TextInput
              onChangeText={(e) => setlname(e)}
              placeholder="Firstname"
              autoCapitalize="none"
              style={tw` px-1 py-4 rounded-md  border-b border-gray-400 mb-2`}
            />

            {/* email */}
            <TextInput
              onChangeText={(e) => setemail(e)}
              placeholder="Email Address"
              autoCapitalize="none"
              style={tw` px-1 py-4 rounded-md  border-b border-gray-400 mb-2`}
            />

            <TextInput
              onChangeText={(e) => setpassword(e)}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              style={tw` px-1 py-4 rounded-md border-b border-gray-400 mb-2`}
            />

            <TextInput
              onChangeText={(e) => setphone(e)}
              placeholder="Phone"
              autoCapitalize="none"
              style={tw` px-1 py-4 rounded-md border-b border-gray-400 mb-2`}
            />

            {/* <DropDownPicker
              style={{}}
              placeholder="Goal"
              open={open}
              maxHeight={200}
              value={value}
              items={items}
              autoScroll={true}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              zIndex={1000}
            /> */}
          </View>
          <TouchableOpacity
            style={tw`bg-[#08A88A] px-26 h-[60px] items-center justify-center rounded-full  mb-5`}
            onPress={() => handleLogin({ navigation })}
          >
            <Text style={tw`text-white `}>
              {loading ? <ActivityIndicator color="white" /> : "Sign up"}
            </Text>
          </TouchableOpacity>
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

// import React, { useState } from "react";
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Button,
//   TextInput,
//   KeyboardAvoidingView,
//   Alert,
//   ActivityIndicator,
// } from "react-native";

// import tw from "twrnc";
// import { ScrollView } from "react-native-gesture-handler";

// const SignupScreen = ({ navigation }) => {
//   const [email, setemail] = useState("");
//   const [fname, setfname] = useState("");
//   const [lname, setlname] = useState("");
//   const [password, setpassword] = useState("");
//   const [phone, setphone] = useState("");
//   const [loading, setloading] = useState(false);

//   const handleSignUp = async ({ navigation }) => {
//     try {
//       setloading(true);
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");

//       var raw = JSON.stringify({
//         first_name: fname,
//         last_name: lname,
//         email: email,
//         password: password,
//         phone: phone,
//       });

//       var requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow",
//       };

//       await fetch(
//         "https://fitness-join-api.onrender.com/api/v1/users/create",
//         requestOptions
//       )
//         .then((response) => response.json())
//         .then((result) => {
//           if (!fname || !lname || !email || !password || !phone) {
//             Alert.alert("Warning", "Fields Cannot be Empty");
//             setloading(false);
//           } else if (result.msg === "User added successfully") {
//             alert(result.msg);
//             navigation.navigate("LoginScreen");
//             console.log(result.msg);
//           } else {
//             alert(result.msg);
//             setloading(false);
//           }
//         })
//         .catch((error) => console.log("error", error));
//     } catch (err) {
//       console.log(err);
//       setloading(false);
//     }
//   };

//   return (
//     <ScrollView style={tw``}>
//       <View style={tw`flex-1  items-center bg-white `}>
//         <Text style={tw`text-2xl font-semibold mt-5`}>Creat An Account</Text>
//         <Text style={tw`text-[18px] text-gray-500 w-78 text-center mt-2`}>
//           Fill your information below or register with google
//         </Text>

//         {/* form */}
//         <View style={tw`items-left justify-end mt-8`}>
//           <Text style={tw`text-lg font-semibold`}>First Name</Text>
//           <TextInput
//             onChangeText={(e) => setfname(e)}
//             placeholder="First Name"
//             style={tw`w-64 px-2 py-5 rounded-md border-dashed border-[1px] mb-2`}
//           />
//           <Text style={tw`text-lg  font-semibold mt-3 mb-1`}>Last Name</Text>
//           <TextInput
//             onChangeText={(e) => setlname(e)}
//             placeholder="Last Name"
//             style={tw`w-64 px-2 py-5 rounded-md border-dashed border-[1px] mb-2`}
//           />
//           <Text style={tw`text-lg  font-semibold mt-3 mb-1`}>Email</Text>
//           <TextInput
//             onChangeText={(e) => setemail(e)}
//             placeholder="Email"
//             style={tw`w-64 px-2 py-5 rounded-md border-dashed border-[1px] mb-2`}
//           />
//           <Text style={tw`text-lg font-semibold mt-3 mb-1`}>Password</Text>
//           <TextInput
//             onChangeText={(e) => setpassword(e)}
//             placeholder="password"
//             secureTextEntry="true"
//             style={tw`w-64 px-2 py-5 rounded-md border-dashed border-[1px] mb-2`}
//           />
//           <Text style={tw`text-lg font-semibold mt-3 mb-1`}>Phone</Text>
//           <TextInput
//             onChangeText={(e) => setphone(e)}
//             placeholder="phone"
//             style={tw`w-64 px-2 py-5 rounded-md border-dashed border-[1px] mb-2`}
//           />
//         </View>

//         <TouchableOpacity
//           style={tw`bg-green-800 px-26 py-4 rounded-md mt-2 mb-3`}
//           onPress={() => handleSignUp({ navigation })}
//         >
//                   <Text style={ tw`text-white `}>{loading ? <ActivityIndicator /> : "Sign Up"}</Text>
//         </TouchableOpacity>
//         <View style={tw`flex-row justify-center gap-2 mb-4 items-center`}>
//           <Text>Already have an Account?</Text>
//           <TouchableOpacity
//             title="login"
//             style={tw`text-black`}
//             onPress={() => navigation.navigate("login")}
//           >
//             <Text style={tw`text-[15px] font-bold`}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };
// export default SignupScreen;
