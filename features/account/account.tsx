import { useState } from 'react'
import SignInModal from '@/components/SignInModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";


const Account = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setUserSignedIn(true);
      }
    };

    checkToken();
  }, []);

  const signOut = async () => {
    await AsyncStorage.setItem("token", "")
    setUserSignedIn(false);
  }

  return (
    <>

    {userSignedIn ?  <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Account Section */}
      <Text style={styles.sectionHeader}>Account</Text>
      <TouchableOpacity style={styles.itemContainer}>
        <FontAwesome5 name="user" size={18} color="black" />
        <Text style={styles.itemText}>Manage Account</Text>
        <Ionicons name="chevron-forward" size={18} color="black" />
      </TouchableOpacity>

      {/* General Section */}
      <Text style={styles.sectionHeader}>General</Text>
      <TouchableOpacity style={styles.itemContainer}>
        <Ionicons name="moon" size={18} color="black" />
        <Text style={styles.itemText}>Theme</Text>
        <Ionicons name="chevron-forward" size={18} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemContainer}>
        <FontAwesome5 name="globe" size={18} color="black" />
        <Text style={styles.itemText}>One Vibe Tribe</Text>
        <Ionicons name="chevron-forward" size={18} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemContainer}>
        <FontAwesome5 name="search" size={18} color="black" />
        <Text style={styles.itemText}>Search for the best vibes</Text>
        <Ionicons name="chevron-forward" size={18} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemContainer}>
        <Ionicons name="shield-checkmark" size={18} color="black" />
        <Text style={styles.itemText}>Privacy Policy</Text>
        <Ionicons name="chevron-forward" size={18} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemContainer}>
        <Ionicons name="document-text" size={18} color="black" />
        <Text style={styles.itemText}>Terms & Conditions</Text>
        <Ionicons name="chevron-forward" size={18} color="black" />
      </TouchableOpacity>

      {/* Sign Out Section */}
      <TouchableOpacity style={[styles.itemContainer, styles.signOutContainer]}>
        <Ionicons name="log-out-outline" size={18} color="red" />
        <Text style={[styles.itemText, styles.signOutText]} onPress={signOut}>Sign out</Text>
      </TouchableOpacity>
    </ScrollView> :  <SignInModal/>}
    </>
  )
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
    color: "black",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  itemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "black",
  },
  signOutContainer: {
    marginTop: 24,
    borderBottomWidth: 0,
  },
  signOutText: {
    color: "red",
    fontWeight: "bold",
  },
})


export default Account;