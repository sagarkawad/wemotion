import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

const SignInModal = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);


  console.log("hey there")

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={["40%"]}
      >
        <BottomSheetView style={styles.contentContainer} >
          <Text style={{marginBottom: 30}} >Login in to check your activity</Text>
        <Button style={styles.buttonNewAccount} onPress={() => {router.push("./../(account)/signup")}}><Text style={styles.textStyleAccount}>Create New Account</Text></Button>
          <Button style={styles.buttonLogin} onPress={() => {router.push("./../(account)/signin")}}><Text style={styles.textStyleLogin}>Login</Text></Button>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
  buttonNewAccount: {
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6200ee', // Example color
    width: 380,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLogin: {
    marginVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "gray",
    width: 380,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyleLogin: {
    color: "gray",
  },
  textStyleAccount: {
    color: "white",
  }
});

export default SignInModal;