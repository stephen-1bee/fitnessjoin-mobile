import { View, Text } from "react-native"
import AppNavigator from "./AppNavigator"
import { useFonts } from "expo-font"

export default function App() {
  // font setup
  let [fontLoaded] = useFonts({
    "Nunito-Test": require("./assets/fonts/nunito-extrabold.ttf"),
    "Nunito-Extrabold": require("./assets/fonts/nunito-extrabold.ttf"),
    "Nunito-Black-Italics": require("./assets/fonts/nunito-black-italics.ttf"),
    "Nunito-Black": require("./assets/fonts/nunito-black.ttf"),
    "Nunito-Bold-Italics": require("./assets/fonts/nunito-bold-italics.ttf"),
    "Nunito-Bold": require("./assets/fonts/nunito-bold.ttf"),
    "Nunito-Extrabold-Italics": require("./assets/fonts/nunito-extrabold-italics.ttf"),
    "Nunito-Extralight-Italics": require("./assets/fonts/nunito-extralight-italics.ttf"),
    "Nunito-Extralight": require("./assets/fonts/nunito-extralight.ttf"),
    "Nunito-Italics": require("./assets/fonts/nunito-italics.ttf"),
    "Nunito-Light-Italics": require("./assets/fonts/nunito-light-italics.ttf"),
    "Nunito-Light": require("./assets/fonts/nunito-light.ttf"),
    "Nunito-Medium-Italics": require("./assets/fonts/nunito-medium-italics.ttf"),
    "Nunito-Medium": require("./assets/fonts/nunito-medium.ttf"),
    "Nunito-Regular": require("./assets/fonts/nunito-regular.ttf"),
    "Nunito-Semibold-Italics": require("./assets/fonts/nunito-semibold-italics.ttf"),
    "Nunito-Semibold": require("./assets/fonts/nunito-semibold.ttf"),
  })
  return <AppNavigator />
}
