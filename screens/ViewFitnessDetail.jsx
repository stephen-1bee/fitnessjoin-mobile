import React, { useState, useEffect } from "react"
import tw from "twrnc"
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native"
import RBSheet from "@poki_san/react-native-bottom-sheet"
import { ScrollView } from "react-native-gesture-handler"
import img1 from "../assets/img1.jpg"
import SessionStorage from "react-native-session-storage"
import { Feather } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import StarRating from "react-native-star-rating"

const ViewFitnessDetail = ({ navigation }) => {
  const [center, setfitnessCenter] = useState([])
  const [memberships, setMemberships] = useState([])

  // handle register for membership
  const applyMembership = (membership_id) => {
    try {
      toast.success(`Membership selected`)
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("membershipId", membership_id)
      }
      setTimeout(() => {
        location.href = "/userSignup"
      }, 2000)
    } catch (err) {
      console.log(err)
    }
  }

  const center_id = SessionStorage.getItem("centerId")

  const getMemberships = async () => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(
        `http://localhost:1000/api/v1/memberships/all/center/${center_id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setMemberships(result.center_memberships)
          console.log(result.center_memberships)
        })
        .catch((error) => console.log("error", error))
    } catch (err) {
      console.log(err)
    }
  }
  console.log(memberships)
  const getFitnessCenter = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(
        `http://localhost:1000/api/v1/admins/one/${center_id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setfitnessCenter(result.admin)
          console.log(result.admin)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFitnessCenter()
    getMemberships()
  }, [])

  return (
    <View style={style.top}>
      <Image
        source={{ uri: `http://localhost:1000/${center[0]?.photo}` }}
        resizeMode="cover"
        style={tw`h-[50%]`}
      />
      <View style={tw`px-5 mt-5 gap-2`}>
        <Text style={tw`text-[15px]`}>Welcome to,</Text>
        <Text style={tw`text-xl font-semibold`}>
          {center ? center[0]?.name : "no center name"}
        </Text>

        <View style={tw`flex-row gap-1`}>
          <Feather name="mail" size={20} />
          <Text style={tw` text-[14px] text-gray-700`}>
            {center ? center[0]?.email : "no center eamil"}
          </Text>
        </View>

        <View style={tw`flex-row gap-1`}>
          <Feather name="message-circle" size={20} />
          <Text style={tw` text-[14px] text-gray-700`}>
            {center ? center[0]?.desc : "no center desc"}
          </Text>
        </View>
        <View style={tw`flex-row gap-1 `}>
          <Feather name="map-pin" size={20} />
          <Text style={tw`text-[14px] text-gray-700`}>
            {center ? center[0]?.location : "no center location"}hello
          </Text>
        </View>

        <View style={tw`flex-row gap-1 `}>
          <Feather name="phone" size={19} />
          <Text style={tw`text-[14px] text-gray-700`}>
            {center ? center[0]?.phone : "no center phone"}
          </Text>
        </View>
        <View style={tw`items-start`}>
          <StarRating
            starSize={20}
            rating={center[0]?.rating}
            emptyStarColor="black"
            fullStarColor="gold"
            containerStyle={{ gap: 8 }}
          />
        </View>
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
      </View>
      <View style={tw`px-5 mt-2`}>
        {center[0]?.isOpened ? (
          <TouchableOpacity
            onPress={() => this.RBSheet.open()}
            title="Register"
            style={tw`bg-[#08A88A] py-4 w-[200px] items-center px-5 rounded-full  `}
          >
            <Text style={tw`text-white text-[16px]`}>Register</Text>
          </TouchableOpacity>
        ) : (
          <View style={tw`mt-5 items-center justify-center gap-1 `}>
            <Feather name="frown" size={20} />
            <Text style={tw`text-[14px] text-gray-700`}>
              Fitness Center has closed Registration
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("FitnessCenters")}
        style={tw`items-center justify-center bg-black border border-black rounded-full w-10 h-10 absolute top-12 left-4`}
      >
        <Feather name="arrow-left" size={20} color={"white"} />
      </TouchableOpacity>

      <RBSheet
        // closeOnDragDown={true}
        dragFromTopOnly={true}
        closeOnPressMask={true}
        ref={(ref) => {
          this.RBSheet = ref
        }}
        height={500}
        openDuration={500}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <ScrollView
          style={tw`flex-1  flex-row mt-2 align-items justify-content`}
        >
          <View style={tw`rounded-lg items-center justify-center`}>
            <View style={tw`text-gray-700`}>
              <Text style={tw`text-2xl text-center`}>
                Available Memberships?
              </Text>
              <Text style={tw`text-center`}>
                Choose a plan that works best for you
              </Text>
            </View>
          </View>
        </ScrollView>
      </RBSheet>
      <StatusBar style />
    </View>
  )
}

export default ViewFitnessDetail

const style = StyleSheet.create({
  top: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 0 : 0,
  },
})
