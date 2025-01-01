import {useState} from 'react'
import { View, TextInput, StyleSheet, Text, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { goback } from '@/hooks/useNavigation'
import { PROD } from '@/constants/Links'
import axios from 'axios'


// const UserListContainer = () => {
//     return (
      
//    )
//  }



const Search = () => {

    const [focus, setFocus] = useState(false);
    const [search, setSearch] = useState("");
    const [dataArray, setDataArray] = useState([]);

    const fetchData = async (searchParameter: string) => {
        const response = await axios.get(`${PROD}/search?type=user&query=${searchParameter}`)
        const data = response.data;
        console.log("res", data)
        setDataArray(data)
    }

  return (
    <SafeAreaView style={styles.container}>
    <View>

    <View style={styles.backContainer}>
    <Ionicons name="arrow-back" size={24} color="black" style={{width: 20}} onPress={goback}/>
        <View style={styles.searchBar}>
        <AntDesign name="search1" size={24} color="black" style={{width: 30}}/>
        <TextInput  placeholder='Search for user' onFocus={() => {
            setFocus(true);
        }} onBlur={() => {
            setFocus(false)
        }} value={search} onChange={(e) => {
            setSearch(e.nativeEvent.text)
            fetchData(e.nativeEvent.text);
        }}>
        
        </TextInput>
        </View>
    </View>
    <Text style={{marginTop: 20, marginBottom: 20}}>{`Search ${focus ? "Users" : "History"}`}</Text>
    </View>
    <FlatList
         data={dataArray}
         renderItem={({ item }) => (
           <View style={styles.userContainer}>
             <View style={styles.userInfo}>
               <Image 
                 source={{ uri: item.profile_picture_url }} 
                 style={styles.userPic} 
               />
               <Text>{item.username}</Text>
             </View>
             <View>
               <Text>x</Text>
             </View>
           </View>
         )}
         keyExtractor={(item, index) => index.toString()}
       />
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    userContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 10,
        marginBottom: 20,
    },
    userInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    userPic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "gray",
        marginRight: 10,
    },
    container: {
        padding: 20,
    },
    searchBar: {
        borderWidth: 1,
        height: 50,
        width: "90%",
        borderRadius: 10,
        paddingHorizontal: 16,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"

    },
    backContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})

export default Search