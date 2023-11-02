import React, { useState } from "react";
import { View, Text, Modal, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

const UserScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 bg-white`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View>
            <Text style={tw`text-gray-700 text-[14px] mt-2 ml-2 p-2`}>
              TEUSDAY, 10 OCT
            </Text>
            <Text
              style={tw`text-gray-700 text-[26px] mb-3 font-black absolute top-8 left-4`}
            >
              Summary
            </Text>
          </View>
          <View style={tw`items-center justify-center px-6 mt-8`}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <FontAwesome name="user-circle-o" size={22} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={tw`items-center mt-8 ml-4 font-semibold text-xl`}>
          Activities
        </Text>
        <View
          style={tw` bg-[#f0f0f0] mt-2 p-3 w-[330px] h-44 gap-5 ml-3 rounded-lg `}
        >
          <View style={tw`gap-1`}>
            <Text style={tw`text-[16px] font-bold`}>Moves</Text>
            <Text style={tw`text-[14px]`}>Moves</Text>
          </View>
          <View style={tw`gap-1`}>
            <Text style={tw`text-[16px] font-bold`}>Steps</Text>
            <Text style={tw`text-[14px]`}>Moves</Text>
          </View>
          <View style={tw`gap-1`}>
            <Text style={tw`text-[16px] font-bold`}>Distance</Text>
            <Text style={tw`text-[14px]`}>Moves</Text>
          </View>
        </View>
        {/* Session */}
        <Text style={tw`items-center mt-8 ml-4 font-semibold text-xl`}>
          Sessions
        </Text>
        <View
          style={tw`gap-5 bg-[#f0f0f0] mt-2 p-3 w-[330px] h-24 gap-8 ml-3 rounded-lg `}
        ></View>

        {/* Modal */}
        <Modal
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <Text style={tw`text-center mt-5 font-bold text-lg`}>Account</Text>
          <Text
            style={tw`left-78 text-green-600 absolute mt-5 font-bold text-lg items-end`}
            onPress={() => setModalVisible(false)}
          >
            Done
          </Text>
          <View
            style={tw`mt-10 ml-6 w-[330px] py-5 px-5 bg-[#f0f0f0] items-start justify-between items-center flex-row rounded-lg`}
          >
            <View style={tw`gap-1`}>
              <Text style={tw`font-semibold text-[16px]`}>Darkwa Stephen</Text>
              <Text>darkwas.stephen@gmail.com</Text>
            </View>
            <View>
              <AntDesign name="caretright" size={8} />
            </View>
          </View>

          {/* second view */}
          <View style={tw`mt-10 ml-6 mr-6 bg-[#f0f0f0] w-[330px]  rounded-lg`}>
            <TouchableOpacity>
              <View
                style={tw`border-b border-gray-200 py-4 px-5  items-start justify-between items-center flex-row`}
              >
                <View style={tw`gap-1`}>
                  <Text style={tw`text-[17px]`}>Membership</Text>
                </View>
                <View>
                  <AntDesign name="caretright" size={8} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={tw` border-b border-gray-200 py-4 px-5 bg-[#f0f0f0] items-start justify-between items-center flex-row`}
              >
                <View style={tw`gap-1`}>
                  <Text style={tw`text-[17px]`}>Membership</Text>
                </View>
                <View>
                  <AntDesign name="caretright" size={8} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={tw`py-4 px-5 bg-[#f0f0f0] items-start justify-between items-center flex-row rounded-b-lg`}
              >
                <View style={tw`gap-1`}>
                  <Text style={tw`text-[17px]`}>Membership</Text>
                </View>
                <View>
                  <AntDesign name="caretright" size={8} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* Notification */}
          <TouchableOpacity>
            <View
              style={tw`mt-10 ml-6 mr-6 py-4 px-5 bg-[#f0f0f0] items-start justify-between items-center flex-row rounded-lg`}
            >
              <View style={tw`gap-1`}>
                <Text style={tw` text-[17px]`}>Notification</Text>
              </View>
              <View>
                <AntDesign name="caretright" size={8} />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default UserScreen;
