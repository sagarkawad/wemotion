import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Ionicons } from '@expo/vector-icons'

const Search = () => {
  return (
    <SafeAreaView style={styles.container}>
    <View>

    <View style={styles.backContainer}>
    <Ionicons name="arrow-back" size={24} color="black" style={{width: 20}} />
        <View style={styles.searchBar}>
        <AntDesign name="search1" size={24} color="black" style={{width: 30}}/>
        <TextInput  placeholder='Search for user'>
        
        </TextInput>
        </View>
    </View>
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