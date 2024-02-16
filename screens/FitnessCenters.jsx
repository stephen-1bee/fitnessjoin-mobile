import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  RefreshControl,
  Image,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import SessionStorage from "react-native-session-storage";

const FitnessCenters = () => {
  const navigator = useNavigation();
  const [recommended, setRecommended] = useState([]);
  const [allfitness, setAllfitness] = useState([]);
  const [loading, setloading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getFitnessCenters = async () => {
    try {
      setloading(true);
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(
        "https://fitness-join-api-xe62.onrender.com/api/v1/admins/all",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setAllfitness(result.fitness_centers);
          console.log(result.fitness_centers);
          setloading(false);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  const getRecommendedCenters = async () => {
    try {
      setloading(true);
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(
        "https://fitness-join-api-xe62.onrender.com/api/v1/admins/recomended",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setRecommended(result.recomended);
          console.log(result.recomended);
          setloading(false);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRecommendedCenters();
    getFitnessCenters();
  }, []);

  const handleMove = (center_id) => {
    if (typeof window !== "undefined") {
      SessionStorage.setItem("centerId", center_id);
    }
    navigator.navigate("ViewFitnessDetail");
    // alert(center_id);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <ScrollView
      style={style.nav}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={tw`items-center`}>
        <Text style={tw`text-lg font-semibold`}>
          Browse the range of Fitness Centers
        </Text>
        <Text style={tw`text-[14px] mb-2 text-center w-[230px]`}>
          Register with your preferred fitness center today.
        </Text>
        <TextInput
          style={tw` w-[350px] py-4 px-4 rounded-lg border border-[#ccc] outline-[#0000] `}
          placeholder="Search..."
          blurOnSubmit={true}
          clearButtonMode
          inputMode="text"
        />
      </View>
      {/* recommended */}
      <View style={tw`px-6 mt-5`}>
        <Text style={tw` font-semibold text-xl text-center`}>
          Recommended Fitness Center
        </Text>
        {loading ? (
          <ActivityIndicator style={tw`w-auto mt-5`} />
        ) : (
          <FlatList
            data={recommended}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleMove(item._id)}
                key={item._id}
                style={tw`h-[230px] w-[220px] rounded-lg shadow-lg mt-3 overflow-hidden`}
              >
                <ImageBackground
                  style={tw`w-full h-full rounded-lg`}
                  source={{ uri: item.photo }}
                  resizeMode="cover"
                >
                  <View style={tw`px-4 mt-8 gap-2`}>
                    <Text style={tw`font-bold text-white text-lg`}>
                      {item.name}
                    </Text>
                    <Text style={tw`text-white`}>
                      <Feather name="mail" size={20} /> {item.email}
                    </Text>
                    <Text style={tw`text-white`}>
                      <Feather name="phone" size={20} /> {item.phone}
                    </Text>
                    <Text style={tw`text-white`}>
                      <Feather name="map-pin" size={20} /> {item.location}
                    </Text>
                    <Text style={tw`text-white`}> {item.rating}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      {/* All fitness centers */}
      <View style={tw`px-6 mt-5 items-center justify-center`}>
        <Text style={tw` font-semibold text-lg`}>All Fitness Centers</Text>
        {loading ? (
          <ActivityIndicator style={tw`w-auto mt-5`} />
        ) : (
          <FlatList
            data={allfitness}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleMove(item._id)}>
                <View
                  key={item._id}
                  style={tw`bg-white w-[330px] mt-3 rounded-lg overflow-hidden gap-1 mb-3`}
                >
                  <Image
                    source={{ uri: item.photo }}
                    style={tw`h-[330px]`}
                    resizeMode="cover"
                  />
                  <Text style={tw`text-lg mt-2 font-semibold px-5`}>
                    {item.name}
                  </Text>
                  <Text style={tw`px-5 `}>
                    <Feather name="mail" size={20} /> {item.email}
                  </Text>
                  <Text style={tw` px-5`}>
                    <Feather name="phone" size={20} /> {item.phone}
                  </Text>
                  <Text style={tw`px-5`}>
                    <Feather name="map-pin" size={20} /> {item.location}
                  </Text>
                  <Text style={tw`px-5`}> {item.rating}</Text>

                  <View style={tw` `}>
                    {item.isOpened ? (
                      <View>
                        <Text style={tw`bg-[#d9fcf6] text-center py-2 `}>
                          Opened
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <Text style={tw`bg-[#fcdbd9] text-center py-2`}>
                          Closed
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default FitnessCenters;

const style = StyleSheet.create({
  nav: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },
});
