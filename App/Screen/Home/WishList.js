import { Button, FlatList, Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Container, Icon, StatusBar, Text } from 'react-native-basic-elements'
import { FONTS } from '../../Constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formToJSON } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../Redux/reducer/WishlistSlice';

const WishList = ({ item, index }) => {

     const navigation = useNavigation()
     const wishlist = useSelector(state => state.wishlist.items);
     const [select, setSelect] = useState(false);
     const wishlistItems = useSelector(state => state.wishlist.items);
     const dispatch = useDispatch();


     const handleRemoveFromWishlist = (item) => {
          dispatch(removeItem(item));
          setSelect(!select)
     };

     return (

          <Container>
               <StatusBar
                    translucent={true}
                    backgroundColor={'transparent'}
                    barStyle='dark-content'
               />

               <Pressable onPress={() => navigation.goBack()}
                    style={styles.fav_text_icon}>
                    <Icon
                         type='AntDesign'
                         name='arrowleft'
                         style={{
                              right: 80
                         }}
                    />
                    <Text style={{
                         fontFamily: FONTS.bold,
                         fontSize: 16,
                    }}>
                         Favorites  List
                    </Text>
               </Pressable>

               <ScrollView showsVerticalScrollIndicator={false}>
                    {
                         wishlist?.map((item) => {
                              return (
                                   <Card
                                        style={styles.main_card}
                                   >
                                        <TouchableOpacity>
                                             <Image
                                                  source={require('../../Assets/images/studio-media-9DaOYUYnOls-unsplash.jpg')}
                                                  style={styles.image_view}
                                             />
                                        </TouchableOpacity>

                                      
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
                         })
                    }
               </ScrollView>





          </Container>

     )
}

export default WishList

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
     },
     fav_text_icon: {
          marginTop: 40,
          alignSelf: 'center',
          flexDirection: 'row',
          marginHorizontal: 20,
          justifyContent: 'space-evenly'
     }
})