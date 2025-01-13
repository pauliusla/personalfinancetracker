import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef} from 'react';
import {Button, Text, View, Linking, Alert, StyleSheet} from 'react-native';
import {RootStackParamList} from '../common';
import {
  useCameraDevice,
  useCodeScanner,
  Camera,
} from 'react-native-vision-camera';
import {useIsForeground} from '../hooks/useIsForeground';
import type {Code} from 'react-native-vision-camera';
import type {AlertButton} from 'react-native';
import TextRecognition from '@react-native-ml-kit/text-recognition';

// Define types for recognized text blocks and parsed items
type Props = NativeStackScreenProps<RootStackParamList, 'BarcodeScanner'>;

type ParsedItem = {
  product: string;
  price: string;
};

const showCodeAlert = (value: string, onDismissed: () => void): void => {
  const buttons: AlertButton[] = [
    {
      text: 'Close',
      style: 'cancel',
      onPress: onDismissed,
    },
  ];
  if (value.startsWith('http')) {
    buttons.push({
      text: 'Open URL',
      onPress: () => {
        Linking.openURL(value);
        onDismissed();
      },
    });
  }
  Alert.alert('Scanned Code', value, buttons);
};

export const BarcodeScanner = ({navigation}: Props) => {
  const device = useCameraDevice('back');
  const isForeground = useIsForeground();
  const isActive = isForeground;
  const isShowingAlert = useRef(false);
  const cameraRef = useRef<Camera>(null);

  const onCodeScanned = useCallback((codes: Code[], rawValue: any) => {
    console.log(`Scanned ${codes.length} codes:`, codes);
    console.log({rawValue, codes});
    const value = codes[0]?.value;
    if (value == null) return;
    if (isShowingAlert.current) return;
    showCodeAlert(value, () => {
      isShowingAlert.current = false;
    });
    isShowingAlert.current = true;
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: onCodeScanned,
  });

  const onCapture = async (): Promise<void> => {
    try {
      const photo = await cameraRef?.current?.takePhoto();
      if (!photo?.path) return;

      const imageResponse = await fetch(`file://${photo.path}`);

      if (!imageResponse.ok) {
        console.error('Failed to fetch image:', imageResponse.statusText);
        return;
      }

      const blobData = await imageResponse.blob();
      const base64Data = await blobToBase64(blobData);
      const apiLink = 'to-be-env-value';

      console.log({base64Data});
      const response = await fetch(apiLink, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure content type is JSON
        },
        body: JSON.stringify({image: base64Data}),
      });

      console.log({response, decoded: await response.json()});
    } catch (error) {
      console.error('Error capturing or recognizing text:', error);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          // Log the full result for debugging
          console.log('Base64 result:', result);

          // Extract the Base64 string
          const base64String = result.split(',')[1];
          console.log('Base64 content:', base64String);
          resolve(base64String);
        } else {
          reject(new Error('Failed to convert blob to base64 string'));
        }
      };

      reader.onerror = () => {
        reject(new Error('FileReader failed to read the blob'));
      };

      reader.readAsDataURL(blob);
    });
  };

  // Function to parse text blocks for products and prices
  const parseReceiptBlocks = (
    blocks: {text: string; lines: {text: string}[]}[],
  ): ParsedItem[] => {
    const items: ParsedItem[] = [];

    console.log({blocks});

    blocks.forEach(block => {
      block.lines.forEach(line => {
        const lineText = line.text;
        const priceMatch = lineText.match(/(\d+[,.]\d{2})$/); // Matches prices at the end of the line

        if (priceMatch) {
          const price = priceMatch[0].replace(',', '.'); // Standardize to dot decimal
          const productName = lineText.replace(priceMatch[0], '').trim();
          if (productName && price) {
            items.push({product: productName, price});
          }
        }
      });
    });
    return items;
  };

  return (
    <View style={{display: 'flex', flex: 1, width: '100%', height: '100%'}}>
      <Text>This is a BarcodeScanner</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />

      {device != null && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          codeScanner={codeScanner}
          enableZoomGesture={true}
          ref={cameraRef}
          photo={true}
          pixelFormat="yuv"
        />
      )}
      <Button title="Capture Receipt" onPress={onCapture} />
    </View>
  );
};
