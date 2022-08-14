import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView, RectButton} from 'react-native-gesture-handler';

export const ContactTeacherComponent = () => {
  return (
    <ScrollView style={{marginTop: 20}} showsVerticalScrollIndicator={false}>
      <Text style={{color: 'black'}}>Contact</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
