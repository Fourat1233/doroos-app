import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {colors, fonts} from '../../../assets/styles/theme';
import {AirbnbRating} from 'react-native-ratings';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import AvatarImage from '../../../assets/images/profile_icons/4.png';
import ImagePlaceholder from '../../../components/ImagePlaceholder';

const {width} = Dimensions.get('window');

const Avatar = ({path, image}) => {
  return (
    // <FastImage
    //   style={styles.avatar}
    //   source={{
    //     uri:
    //       image === 'default.png'
    //         ? 'https://www.joyonlineschool.com/static/emptyuserphoto.png'
    //         : `http://143.110.210.169:8000/${path}/${image}`,
    //     headers: {Authorization: 'someAuthToken'},
    //     priority: FastImage.priority.normal,
    //   }}
    //   resizeMode={FastImage.resizeMode.contain}
    // />
    <ImagePlaceholder
      style={styles.avatar}
      source={{
        uri: `http://143.110.210.169:8000/${path}/${image}`,
      }}
      placeholderSource={AvatarImage}
      // placeholderSource={{
      //   uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
      // }}
    />
  );
};

export const Teachers = React.memo(({teachers, loading}) => {
  const {navigate} = useNavigation();
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {teachers.map(teacher => (
        <View key={teacher.teacher_id}>
          <TouchableOpacity
            style={styles.cardTop}
            key={teacher.teacher_id}
            onPress={() => navigate('Profile', {teacherId: teacher.user_id})}>
            <Image
              source={{
                uri: 'https://cdn.dnaindia.com/sites/default/files/styles/third/public/2019/09/15/868152-education-istock-091119.jpg',
              }}
              style={{
                width: (width / 5) * 3,
                height: 120,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <Avatar
              path={`uploads/teachers/${teacher.user_id}`}
              image={teacher.profile_image}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{padding: 10}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{fontSize: 12, ...fonts.bold, color: 'black'}}>
                  {teacher.full_name}
                </Text>

                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: 12,
                    ...fonts.regular,
                    color: colors.grey.placeholder,
                    marginTop: 5,
                  }}>
                  Subject
                </Text>
              </View>
              <View style={{paddingTop: 7, paddingRight: 5}}>
                <AirbnbRating
                  showRating={false}
                  size={16}
                  count={4}
                  selectedColor="#F5A623"
                />
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 7,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Feather name="calendar" color={colors.base} size={14} />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  color: colors.grey.placeholder,
                }}>
                MON-FRI
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <AntDesign name="clockcircleo" color={colors.base} size={14} />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  color: colors.grey.placeholder,
                }}>
                09:00-16:00
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  cardTop: {
    marginHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: (width / 5) * 3,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 3,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1.5,
    borderColor: 'white',
    position: 'absolute',
    top: 15,
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: 600,
    paddingTop: 10,
  },
});
