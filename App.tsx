import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Profile} from './src/screens';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BarcodeScanner} from './src/screens/Scanner';
import {RootStackParamList} from './src/common';
import {PermissionsPage} from './src/screens/PermissionsPage';
import {Camera} from 'react-native-vision-camera';
import {Button, PermissionsAndroid} from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const cameraPermission = Camera.getCameraPermissionStatus();

  console.log(`Re-rendering Navigator. Camera: ${cameraPermission}`);

  const showPermissionsPage = cameraPermission !== 'granted';

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const storageGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Storage Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const writeGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Storage Permission Write',
          message:
            'Cool Photo App needs access to your camera write ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }

      if (storageGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('Storage permission denied');
      }

      if (writeGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage write');
      } else {
        console.log('Storage write permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Button title="request permissions" onPress={requestCameraPermission} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={showPermissionsPage ? 'PermissionsPage' : 'Home'}>
          <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Home'}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{title: 'Profile'}}
          />
          <Stack.Screen
            name="BarcodeScanner"
            component={BarcodeScanner}
            options={{title: 'Scanner'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
