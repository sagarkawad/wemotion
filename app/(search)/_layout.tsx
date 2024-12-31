import React from 'react'
import { Stack } from 'expo-router';


const Layout = () => {
  return (
    <Stack>
    <Stack.Screen name="search" options={{headerShown: false, headerTitle: "search"}}/>
  </Stack>
  )
}

export default Layout