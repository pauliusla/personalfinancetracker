export type RootStackParamList = {
  Home: undefined;
  Profile: {userId: string};
  BarcodeScanner: undefined;
  Devices: undefined;
  PermissionsPage: undefined;
  CameraPage: undefined;
  CodeScannerPage: undefined;
  MediaPage: {
    path: string;
    type: 'video' | 'photo';
  };
};
