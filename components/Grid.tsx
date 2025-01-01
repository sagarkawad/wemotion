import { FlatList, Text, View, StyleSheet, ScrollView, Image} from 'react-native';


//const data = Array.from({ length: 32 }, (_, index) => `Item ${index + 1}`);

const GridScreen = ({data}) => {
  const renderItem = ({ item }: {item: any}) => (
    
    <View style={styles.gridItem}>
     
      <View style={styles.profileInfoContainer}>
        <Image source={{ uri: item.thumbnail_url }} 
        style={styles.profileInfoContainer}/>
        <Image style={styles.profileImg} source={{ uri: item.picture_url }}></Image>
        <Text style={styles.profileText}>{item.username}</Text>
      </View>
    </View>
  );

  return (
   
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3} // Adjust for the number of columns
      contentContainerStyle={styles.grid}
    />
   
  );
};

const styles = StyleSheet.create({
  
  gridItem: {
    flex: 1,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, 
    height: 200,
  },
  profileImg: {
    height: 30,
    width: 30,
    backgroundColor: "red",
    borderRadius: 30,
    marginBottom: 6,
  },
  profileInfoContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileText: {
    color: "white",
  }
});

export default GridScreen;
