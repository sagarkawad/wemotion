import { Text, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import SignInModal from '@/components/SignInModal'

const Account = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  return (
    <>
    <SafeAreaView style={styles.container}>
      <Text>Your account details will appear here</Text>
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


export default Account;