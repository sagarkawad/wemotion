import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import GridScreen from '@/components/Grid'
import { PROD } from '@/constants/Links'
import axios from 'axios'


function handleFocus() {
    router.push("./../../(search)/searchpage")
}



const Explore = () => {

    const [dataArray, setDataArray] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`${PROD}/posts/fetch/all`)
            console.log("res", data.posts);
            setDataArray(data.posts)
        }
        fetchData();
    }, [])
    



  return (
    <SafeAreaView >
        <View style={styles.container}>
            <TextInput style={styles.searchBar} placeholder='Search for user' onFocus={handleFocus}>

            </TextInput>
        </View>
        <View>
        <GridScreen data={dataArray}/>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    searchBar: {
        borderWidth: 1,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 16,
    }
})

export default Explore