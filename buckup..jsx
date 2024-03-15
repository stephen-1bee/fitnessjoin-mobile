<FlatList
  data={recommended}
  horizontal
  showsHorizontalScrollIndicator={false}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => handleMove(item._id)}
      key={item._id}
      style={tw`h-[230px] w-[350px] rounded-lg mt-3 overflow-hidden`}
    >
      <ImageBackground
        style={tw`w-full h-full rounded-lg `}
        source={{ uri: item.photo }}
        resizeMode="cover"
      >
        <View style={tw`px-4 mt-8 gap-2`}>
          <Text style={tw`font-bold text-white text-lg`}>{item.name}</Text>
          <Text style={tw`text-white`}>
            <Feather name="mail" size={20} /> {item.email}
          </Text>
          <Text style={tw`text-white`}>
            <Feather name="phone" size={20} /> {item.phone}
          </Text>
          <Text style={tw`text-white`}>
            <Feather name="map-pin" size={20} /> {item.location}
          </Text>
          {/* <Text style={tw`text-white`}> {item.rating}</Text> */}
          <View style={tw`w-[500px]`}>
            <StarRating
              rating={item.rating}
              maxStars={5}
              emptyStarColor="white"
              fullStarColor="gold"
              starSize={20}
            />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )}
/>;
