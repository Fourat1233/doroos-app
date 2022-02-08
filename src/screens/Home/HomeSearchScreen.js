// import React, { useState, useContext, useEffect } from 'react';
// import { StyleSheet, Text, View, Dimensions, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { observer } from "mobx-react-lite"
// import { colors, fonts, INPUT_HEIGHT } from '../../assets/styles/theme';
// import { SafeAreaView } from 'react-native-safe-area-context';
// const { width } = Dimensions.get('window');
// import { ScrollView } from 'react-native-gesture-handler';
// import { useTranslation } from 'react-i18next';
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { TeacherStoreContext } from '../../stores/TeacherStore';

// export default HomeSearchScreen = observer(({ route }) => {
//   const { t, i18n } = useTranslation();
//   const [text, setText] = useState('');
//   const teacherStore = useContext(TeacherStoreContext);

//   useEffect(() => {
//     (async () => await teacherStore.findTeachers(route.params.text))();
//   }, [])

//   const searchTeachers = async (text) => {
//     setText(text)
//     route.params.text = null
//     if (text) {
//       await teacherStore.findTeachers(text);
//     }
//   }


//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#e74295', '#7f509b']}
//         start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
//         style={styles.gradient}
//       />
//       <SafeAreaView style={styles.body}>
//         <ScrollView>
//           <View style={{ marginBottom: 10 }}>
//             <TextInput
//               placeholder={t('search:key')}
//               placeholderTextColor='#c2c0c8'
//               style={[styles.textInput, i18n.language === 'ar' ? { textAlign: 'right' } : '']}
//               autoCorrect={false}
//               onChangeText={(text) => searchTeachers(text)}
//               value={text ? text : route.params.text}
//               autoCapitalize={'none'}
//               multiline={false}
//               editable={true}
//               autoFocus={false}
//             />
//             <TouchableOpacity style={styles.inputIcon}>
//               <Ionicons style={{ color: colors.base }} name={'md-search'} size={24} />
//             </TouchableOpacity>
//           </View>

//           {
//             (!text && !route.params.text) ? (
//               <View style={{ justifyContent: "center", alignItems: "center" }}>
//                 <Image
//                   source={{
//                     uri: 'https://cdn0.iconfinder.com/data/icons/30-hardware-line-icons/64/Search-512.png',
//                   }}
//                   style={{ width: 100, height: 100, marginTop: 100, marginBottom: 10 }}
//                 />
//                 <Text style={{ ...fonts.light }}>Enter a few words to search.</Text>
//               </View>
//             ) : (
//                 <View>
//                   {
//                     (teacherStore.isLoading) ? (
//                       <View style={{ justifyContent: "center", alignItems: "center" }}>
//                         <Image
//                           source={{
//                             uri: 'https://cdn0.iconfinder.com/data/icons/30-hardware-line-icons/64/Search-512.png',
//                           }}
//                           style={{ width: 100, height: 100, marginTop: 100, marginBottom: 10 }}
//                         />
//                         <Text style={{ ...fonts.medium }}>Searching ...</Text>
//                       </View>
//                     ) : (
//                         <View>
//                           {
//                             (teacherStore.find_teachers.length === 0 && !teacherStore.isLoading && text) ? (
//                               <View style={{ justifyContent: "center", alignItems: "center" }}>
//                                 <Image
//                                   source={{
//                                     uri: 'https://indususedcars.com/assets/theme/images/nothing_to_compare.png',
//                                   }}
//                                   style={{ width: '100%', height: 100, marginTop: 100, marginBottom: 30 }}
//                                 />
//                                 <Text style={{ ...fonts.medium }}>No Results.</Text>
//                                 <Text style={{ ...fonts.light }}>No result found for {text ? text : route.params.text} .</Text>
//                               </View>
//                             ) : (
//                                 <FlatList
//                                   data={teacherStore.find_teachers}
//                                   style={[styles.scene, { paddingHorizontal: 20 }]}
//                                   renderItem={(item) => {
//                                     return (
//                                       <View key={item.item.id} style={styles.card}>
//                                         <Image
//                                           source={{ uri: item.item.userPicture ? item.item.userPicture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQPe03o721SqoUj6zux9wN-Mz357cggdOFzZA&usqp=CAU' }}
//                                           style={{ width: 80, height: 80, borderRadius: 10 }} />
//                                         <View style={{ paddingHorizontal: 10 }}>
//                                           <Text style={{ ...fonts.bold, fontSize: 18 }}>{item.item.full_name}</Text>
//                                           <Text style={{ ...fonts.light, fontSize: 14, marginTop: 5 }}>{item.item.subject_name}</Text>
//                                           <View style={{ flexDirection: 'row', marginTop: 10 }}>
//                                             <FontAwesome name="phone-square" color={colors.base} size={18} />
//                                             <Text style={{ ...fonts.light, fontSize: 16, marginLeft: 5 }}>{item.item.phone_cell}</Text>
//                                           </View>
//                                         </View>
//                                       </View>
//                                     )
//                                   }}
//                                   showsVerticalScrollIndicator={false}
//                                   ListEmptyComponent={
//                                     <View style={{ justifyContent: "center", alignItems: "center" }}>
//                                       <Image
//                                         source={{
//                                           uri: 'https://cdn0.iconfinder.com/data/icons/30-hardware-line-icons/64/Search-512.png',
//                                         }}
//                                         style={{ width: 100, height: 100, marginTop: 100, marginBottom: 10 }}
//                                       />
//                                       <Text style={{ ...fonts.light }}>Enter a few words to search.</Text>
//                                     </View>
//                                   }
//                                   keyExtractor={(item, index) => index.toString()}
//                                 />
//                               )
//                           }
//                         </View>
//                       )
//                   }
//                 </View>
//               )
//           }

//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.base,
//   },
//   body: {
//     flex: 1,
//     borderTopLeftRadius: 35,
//     borderTopRightRadius: 35,
//     backgroundColor: 'white',

//   },
//   button: {
//     backgroundColor: colors.base,
//     padding: 20,
//     borderRadius: 60,
//     width: (width / 2) - 30,
//   },
//   textInput: {
//     ...INPUT_HEIGHT,
//     paddingTop: 0,
//     paddingBottom: 0,
//     paddingHorizontal: 10,
//     textAlignVertical: 'center',
//     backgroundColor: colors.white,
//     borderWidth: 0.25,
//     borderColor: '#eee',
//     ...fonts.cairoRegular,
//     fontSize: 14,
//     marginHorizontal: 20,
//     borderRadius: 5,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 1.84,
//     elevation: 3,
//   },
//   inputIcon: {
//     marginRight: 20,
//     paddingHorizontal: 13,
//     ...INPUT_HEIGHT,
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   gradient: {
//     ...StyleSheet.absoluteFillObject
//   },
//   card: {
//     flexDirection: 'row', borderRadius: 10, padding: 10,
//     backgroundColor: "white",
//     shadowColor: colors.grey.placeholder,
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.5,
//     shadowRadius: 1.84,
//     elevation: 3,
//     marginBottom: 10
//   },
//   scene: {
//     flex: 1,
//     padding: 5,
//     marginTop: 10,
//   },
// });

import React from 'react'
import { View, Text } from 'react-native'

export default HomeSearchScreen = () => {
	return (
		<View>
			<Text>testing</Text>
		</View>
	)
}