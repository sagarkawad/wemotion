// Import necessary libraries
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { PROD } from '@/constants/Links';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignIn() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    const data = {
        
            mixed: username,
            password: password,
            app_name: "wemotions",
        
    };

    try {
      const response = await axios.post(`${PROD}/user/login`, data);
      alert('Sign In Successful!');
      console.log(response.data);

      async function setToken () {
      // Set the received token from the response in the local storage of the device
      await AsyncStorage.setItem('token', response.data.token);
      }
      setToken();
    router.replace('./../(tabs)/accountpage');      
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Sign In Failed!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>Log in to join the conversation and connect with your community</Text>

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      {/* Email */}
      {/* <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      /> */}

      {/* Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#888"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 24,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  halfInput: {
    width: '48%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
  },
  icon: {
    marginLeft: 8,
  },
  continueButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
