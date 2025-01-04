import React from 'react'
import { Stack } from 'expo-router';


const Layout = () => {
  return (
    <Stack >
    <Stack.Screen name="signin" options={{headerShown: true}}/>
    <Stack.Screen name="signup" options={{headerShown: true}}/>
  </Stack>
  )
}

export default Layout