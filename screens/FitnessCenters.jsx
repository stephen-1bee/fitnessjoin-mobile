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
import StarRating from "react-native-star-rating";
import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import SessionStorage from "react-native-session-storage";
import { SliderBox } from "react-native-image-slider-box";

const FitnessCenters = () => {
  const navigator = useNavigation();
  const [recommended, setRecommended] = useState([]);
  const [allfitness, setAllfitness] = useState([]);
  const [loading, setloading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const image = [
    "https://images.pexels.com/photos/20224156/pexels-photo-20224156/free-photo-of-smiling-women-lying-on-grass.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
    "https://images.pexels.com/photos/20267706/pexels-photo-20267706/free-photo-of-a-couple-is-sitting-on-top-of-a-bed-in-a-cabin.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
  ];

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
      <View style={tw`px-6 mt-5 overflow-hidden`}>
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
                style={tw`h-[230px] w-[200px] rounded-lg mt-3 overflow-hidden`}
              >
                <ImageBackground
                  style={tw`w-full h-full rounded-lg `}
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
                    <StarRating
                      rating={item.rating}
                      maxStars={5}
                      emptyStarColor="white"
                      fullStarColor="gold"
                      starSize={20}
                    />
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
            // showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleMove(item._id)}>
                <View
                  key={item._id}
                  style={tw`bg-white w-[330px] mt-3 rounded-lg overflow-hidden gap-2 mb-5`}
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

                  <View style={tw`px-5 w-[200px]`}>
                    <StarRating
                      maxStars={5}
                      rating={item.rating}
                      fullStarColor={"gold"}
                      emptyStarColor={"black"}
                      starSize={20}
                    />
                  </View>
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
    marginBottom: "100px",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },
});
