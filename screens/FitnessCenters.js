import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function App({ navigation }) {
  const [loading, setloading] = useState(false);
  const [fitnessCenters, setFitnessCenters] = useState([]);

  const getAllFitnessCenters = async () => {
    setloading(true);
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(
        "https://fitness-join-api.onrender.com/api/v1/admins/all",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setFitnessCenters(result.fitness_centers);
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
                <TouchableOpacity
                  onPress={() => navigation.navigate("ViewFitnessDetail")}
                >
                  <View
                    key={center._id}
                    style={tw`bg-white shadow  items-center justify-center rounded-md mt-2 flex-col gap-1 py-3`}
                    onPress={() => navigation.navigate("signUp")}
                  >
                    <Text style={tw`text-black font-bold`}>{center.name}</Text>
                    <Text>{center.email}</Text>
                    <Text> {center.phone}</Text>
                    <Text> {center.location}</Text>
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
