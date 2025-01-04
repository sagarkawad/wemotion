import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Entypo, MaterialCommunityIcons, Foundation, Ionicons } from '@/assets/icons/icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light']?.tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"]?.inactiveTint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: [
          styles.tabBar,
          Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <Entypo name="home" size={30} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explorepage"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="post" size={30} color={color} />
             
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="recordpage"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={[styles.recordButton, { backgroundColor: Colors[colorScheme ?? 'light']?.tint }]}>
              <Foundation name="record" size={36} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="notificationpage"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="notifications" size={30} color={color} />
              
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="accountpage"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="account" size={30} color={color} />
              
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
   height: 70,
   backgroundColor: "#2c2c2c",
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -12,
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
});
