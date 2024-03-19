import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Icon, Text } from 'react-native-basic-elements'
import { FONTS } from '../Constants/Fonts'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../Redux/reducer/WishlistSlice'

const HomeComp = ({ item, index }) => {

  const [select, setSelect] = useState(false);
  const navigation = useNavigation()
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  const handleAddToWishlist = (item) => {
    if (!wishlistItems.some(it => item.cover_id === it?.cover_id)) {
      dispatch(addItem(item));
      setSelect(!select)
    } else {
      alert('Item is already in the wishlist!');
    }

  };

  const handleRemoveFromWishlist = (item) => {
    dispatch(removeItem(item));
    setSelect(!select)
  };

  return (

    <Card
      style={styles.main_card}
    >
      <TouchableOpacity>
        <Image
          source={require('../Assets/images/studio-media-9DaOYUYnOls-unsplash.jpg')}
          style={styles.image_view}
        />
      </TouchableOpacity>

      {
        select ?
          <Pressable
            style={{
              position: 'absolute',
              right: 6,
              top: 7

            }}
            onPress={() => handleRemoveFromWishlist(item)}
          >

            <Icon
              name='heart'
              type='AntDesign'
              size={18}
              color={'#d9332e'}
            />
          </Pressable>
          : <Pressable
            style={{
              position: 'absolute',
              right: 6,
              top: 7

            }}
            onPress={() => handleAddToWishlist(item)}>
            <Icon
              name='hearto'
              type='AntDesign'
              size={18}
              color={'#d9332e'}
            />
          </Pressable>
      }

      <View style={styles.textMain_view}>

        <Text numberOfLines={2} style={{
          fontFamily: FONTS.medium,
          fontSize: 12,
          maxWidth: '70%'
        }}>
          {item?.title}
        </Text>

        <Text numberOfLines={2}
          style={{ ...styles.text_details, fontFamily: FONTS.medium }}>
          {item?.authors[0]?.name}
        </Text>
        <Text numberOfLines={2}
          style={styles.text_details}>
          {item?.first_publish_year}
        </Text>

        <Text numberOfLines={2}
          style={styles.text_details}>
          {item.subject}
        </Text>

      </View>
    </Card>
  )
}

export default HomeComp

const styles = StyleSheet.create({
  image_view: {
    height: 120,
    width: 130,
    resizeMode: 'cover',
    borderRadius: 10
  },
  main_card: {
    marginHorizontal: 15,
    marginTop: 20,
    flexDirection: 'row',
    elevation: 2,
    margin: 10
  },
  textMain_view: {
    marginTop: 10,
    paddingHorizontal: 10
  },
  text_details: {
    fontFamily: FONTS.regular,
    fontSize: 10,
    maxWidth: '80%'
  }
})