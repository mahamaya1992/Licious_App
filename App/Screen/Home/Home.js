import { Alert, Button, Dimensions, FlatList, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/reducer/User';
import { setAccount } from '../../Utils/Storage';
import Toast from 'react-native-simple-toast'
import { Container, Icon, StatusBar, Text } from 'react-native-basic-elements';
import { COLORS } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import HomeComp from '../../Component/HomeComp';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('screen')

const Home = () => {
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const navigation = useNavigation()
  const [query, setQuery] = useState()

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://openlibrary.org/subjects/sci-fi.json?details=true');
      const booksData = response.data.works;
      setBooks(booksData);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };


  const alertFunc = () => {
    Alert.alert('Log Out', 'Do you want to Logout ?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => logoutUser() },
    ]);
  };

  const logoutUser = async () => {
    dispatch(logout())
    setAccount(null)
    Toast.show('Logged Out Successfully', Toast.LONG);
  };

  return (
    <Container>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle='dark-content'
      />
      <View style={styles.welcome_main_view}>
        <Text style={styles.welcome_text}>
          Welcome To Home
        </Text>

        <TouchableOpacity onPress={alertFunc}
          style={styles.pressble_view}
        >
          <Icon
            name='logout'
            type='AntDesign'
            size={18}
            color={'red'}

          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('WishList')}
          style={styles.pressble_wishlist}
        >
          <Icon
            name={'heart'}
            type='AntDesign'
            size={20}
            color={'#d9332e'}
          />
        </TouchableOpacity>

      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SearchList')}
        style={styles.input_textView}>
        <TextInput
          leftIcon={{
            name: 'search',
            type: 'Ionicon',
            color: 'red'
          }}
          placeholder="Search City..."
          inputContainerStyle={{
            ...styles.search_box,
          }}
          inputStyle={{
            fontFamily: FONTS.regular,
            fontSize: 14,
          }}
          value={query}
          onChangeText={(v) => setQuery(v)}
        />
        {/* <Text style={{
          fontFamily: FONTS.regular,
          fontSize:10,
          color: '#cccccc',
          paddingTop: 15,
          left: 10
        }}>Search.....</Text> */}
      </TouchableOpacity>

      <FlatList
        data={books}
        renderItem={({ item, index }) => (
          <HomeComp item={item} index={index} />
        )}
        keyExtractor={item => item.key}
      />

    </Container>
  )
}

export default Home

const styles = StyleSheet.create({
  welcome_main_view: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  welcome_text: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#a754eb'
  },
  pressble_view: {
    position: 'absolute',
    right: 18
  },
  pressble_wishlist: {
    // position: 'absolute',
    left: 30
  },
  result_text: {
    fontFamily: FONTS.regular,
    fontSize: 12
  },
  card_view: {
    backgroundColor: COLORS.primaryThemeColor,
    marginHorizontal: 15,
    height: 120,
    elevation: 5,
    paddingHorizontal: 15
  },
  success_message: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 16,
    marginTop: 120
  },
  search_box: {
    marginHorizontal: 15,
    marginTop: 30,
    borderWidth: 0,
    elevation: 3,
    backgroundColor: 'red',
  },
  input_textView: {
    marginHorizontal: 15,
    elevation: 2,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
  }
})