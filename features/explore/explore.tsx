import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

function handleFocus() {
    router.push("./../../(search)/search")
}

const Explore = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View>
            <TextInput style={styles.searchBar} placeholder='Search for user' onFocus={handleFocus}>

            </TextInput>
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