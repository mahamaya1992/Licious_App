import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS } from '../../Constants/Fonts'
import HomeComp from '../../Component/HomeComp';
import axios from 'axios';

const SearchList = () => {
     const [query, setQuery] = useState('');
     const [books, setBooks] = useState([]);
     // const navigation = useNavigation()

     function convertString(inputString) {
          // Replace spaces with a plus sign
          return inputString.replace(/\s+/g, '+');
     }

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

     const searchData = async (vl) => {
          setQuery(vl)
          try {
               console.log('response', convertString(vl))
               const response = await axios.get('https://openlibrary.org/search.json?title=' + convertString(vl));
               console.log('response', response)
               const booksData = response.data.docs;
               setBooks(booksData);
          } catch (error) {
               console.error('Error fetching books:', error);
          }
     }

     return (
          <View style={{
               marginTop: 30
          }}>
               <View
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
                         onChangeText={(v) => searchData(v)}
                    />

               </View>
               <FlatList
                    data={books}
                    renderItem={({ item, index }) => (
                         <HomeComp item={item} index={index} />
                    )}
                    keyExtractor={item => item.key}
               />
          </View>
     )
}

export default SearchList

const styles = StyleSheet.create({
     input_textView: {
          marginHorizontal: 15,
          elevation: 2,
          height: 50,
          backgroundColor: '#fff',
          borderRadius: 10,
     }
})