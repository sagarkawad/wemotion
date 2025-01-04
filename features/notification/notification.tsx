import { Text, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import SignInModal from '@/components/SignInModal'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Notification = () => {
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

  return (
    <>
    <SafeAreaView style={styles.container}>
      <Text>Your activity will appear here</Text>
    </SafeAreaView>
    {userSignedIn ? null :  <SignInModal/>}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  }
})


export default Notification