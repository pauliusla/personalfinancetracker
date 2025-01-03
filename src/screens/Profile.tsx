import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackParamList} from '../common';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const Profile = ({navigation, route}: Props) => {
  return (
    <View>
      <Text>This is a Profile</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};
