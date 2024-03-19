import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screen/Home/Home';
import WishList from '../Screen/Home/WishList';
import SearchList from '../Screen/Home/SearchList';

const Stack = createStackNavigator();

const AppStack = () => {
     return (
          <Stack.Navigator
               screenOptions={{
                    headerShown: false,
               }}
               initialRouteName='Home'
          >
               <Stack.Screen name="Home" component={Home} />
               <Stack.Screen name="WishList" component={WishList} />
               <Stack.Screen name="SearchList" component={SearchList} />

          </Stack.Navigator>
     )
}

export default AppStack

const styles = StyleSheet.create({})