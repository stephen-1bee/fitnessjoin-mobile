import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import SessionStorage from "react-native-session-storage";
import { Feather } from "@expo/vector-icons";

export default function App({ navigation }) {
  const [loading, setloading] = useState(false);
  const [fitnessCenters, setFitnessCenters] = useState([]);
  // const [center_Id, setcenterId] = useState("");

  const handlemove = (centerId) => {
    navigation.navigate("ViewFitnessDetail");
    if (typeof sessionStorage !== "undefined") {
      SessionStorage.setItem("centerId", centerId);
    }
    // alert(centerId);
  };

  const getAllFitnessCenters = async () => {
    setloading(true);
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(
        "https://fitness-join-api-xe62.onrender.com/api/v1/admins/all",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setFitnessCenters(result.fitness_centers);
          // setcenterId(result.fitness_centers._id);
          setloading(false);
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllFitnessCenters();
  }, []);

  const fitnessUi = (image, name, email, phone, location, rating) => {
    <View>
      <Text>{image}</Text>
      <Text>{name}</Text>
      <Text>{email}</Text>
      <Text>{phone}</Text>
      <Text>{location}</Text>
      <Text>{rating}</Text>
    </View>;
  };

  return (
    <ScrollView>
      <View style={tw`flex-1 items-center pt-5 bg-[#f9fafd] mt-5`}>
        <View style={tw`flex-col flex-1 mb-5`}>
          <Text style={tw`font-bold text-xl text-center`}>
            Browse the range of Fitness Centers
          </Text>
          <Text style={tw`text-[14px] mb-2 text-center`}>
            Register with your preferred fitness center today
          </Text>

          <View style={tw`mt-5 gap-3`}>
            {loading ? (
              <ActivityIndicator style={tw`items-center`} />
            ) : (
              fitnessCenters.map((center) => (
                <TouchableOpacity onPress={() => handlemove(center._id)}>
                  <View
                    key={center._id}
                    style={tw`bg-white px-5 rounded-md mt-2 flex-col gap-1  `}
                    // onPress={() => navigation.navigate("signUp")}
                  >
                    <Image
                      source={{ uri: center.photo }}
                      style={tw`w-[100%] h-[200px] rounded-lg`}
                      resizeMode="contain"
                      alt="img"
                    />
                    <Text style={tw`text-black text-lg font-bold`}>
                      {center.name}
                    </Text>
                    <Text>
                      {" "}
                      <Feather name="mail" size={20} /> {center.email}
                    </Text>
                    <Text>
                      {" "}
                      <Feather name="phone" size={20} /> {center.phone}
                    </Text>
                    <Text>
                      {" "}
                      <Feather name="map-pin" size={20} /> {center.location}
                    </Text>
                    <Text> {center.rating}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
