import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, Text, View, StyleSheet, Linking} from 'react-native';
import {RootStackParamList} from '../common';
import {CameraPermissionStatus} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';

type Props = NativeStackScreenProps<RootStackParamList, 'PermissionsPage'>;

export const PermissionsPage = ({navigation, route}: Props) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    if (cameraPermissionStatus === 'granted') navigation.replace('Home');
  }, [cameraPermissionStatus, navigation]);

  return (
    <View>
      <Text>This is a PermissionsPages</Text>
      {cameraPermissionStatus !== 'granted' && (
        <Text style={styles.permissionText}>
          Vision Camera needs <Text style={styles.bold}>Camera permission</Text>
          .{' '}
          <Text style={styles.hyperlink} onPress={requestCameraPermission}>
            Grant
          </Text>
        </Text>
      )}
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  banner: {
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  permissionsContainer: {},
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});
