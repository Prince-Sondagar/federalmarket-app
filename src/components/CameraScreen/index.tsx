import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationProps} from '../../interfaceTypes';
import {RootParamList, RootScreenEnum} from '../../constants';
import {RouteProp, useRoute} from '@react-navigation/native';
import useRetailers from '../../store/hooks/useRetailers';
import {
  ProductCategoryImages,
  RetailStoreImage,
} from '../../store/types/stateTypes';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScrollView} from 'react-native-gesture-handler';

const CameraScreen = ({navigation}: NavigationProps) => {
  const device = useCameraDevice('back');
  const {t} = useTranslation();
  const camera: any = useRef(null);
    const [selectedImage, setSelectedImage] = useState<any>([]);
  const { hasPermission, requestPermission } = useCameraPermission();
  const route =
    useRoute<RouteProp<RootParamList, RootScreenEnum.CAMERA_SCREEN>>();
  const setShopInfo = route?.params?.setShopInfo as any;
  const prevRoute = route?.params?.prevRoute as any;
  const setSelectedCategoryImage = route?.params
    ?.setSelectedCategoryImage as any;
  const { retailerInfo } = useRetailers();

  useEffect(() => {
    const checkCameraPermission = async () => {
      if (!hasPermission) {
        try {
          await requestPermission();
        } catch (error) {
          console.error('Camera permission denied:', error);
        }
      }
    };

    checkCameraPermission();
  }, [hasPermission, requestPermission]);

  // Function to convert file to binary data
  const fileToBinary = (file: Blob): Promise<string | null> => {
    return new Promise(resolve => {
      const reader = new FileReader();

      reader.onload = function (event: any) {
        const binaryData = event.target.result;
        const base64String = binaryData.split(',')[1];

        const formattedBase64 = base64String.match(/.{1,2}/g).join(' ');

        resolve(`data:image/jpeg;base64,${formattedBase64}`);
      };

      reader.onerror = function (error) {
        console.error('Error reading file:', error);
        resolve(null);
      };

      reader.readAsDataURL(file);
    });
  };

  const convertImageToBinary = async (imagePath: string): Promise<any> => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const binaryData = await fileToBinary(blob);

      return binaryData;
    } catch (error) {
      console.error('Error reading image file:', error);
      return null;
    }
  };

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        let imageUris = response.assets;
        setSelectedImage([
          ...selectedImage,
          ...[imageUris?.length ? imageUris?.[0]?.uri : []],
        ]);
        // setSelectedImage(prevImages => [
        //   ...prevImages,
        //   {
        //     name: `Image_${new Date().getTime()}`,
        //     data: binaryImage,
        //     format: imageUris?.[0]?.type ?? '',
        //   },
        // ]);
      }
    });
  };

  const ClickaPhoto = async () => {
    const photo = await camera.current.takePhoto();

    // const lastDotIndex = photo.path.lastIndexOf('.');
    // const pathFormat =
    //   lastDotIndex !== -1 ? photo.path.substring(lastDotIndex + 1) : '';
    // const binaryImage: string = await convertImageToBinary(
    //   `file://${photo.path}`,
    // );
    setSelectedImage([...selectedImage, `file://${photo.path}`]);

    // setSelectedImage(prevImages => [
    //   ...prevImages,
    //   {
    //     name: `Image_${new Date().getTime()}`,
    //     data: binaryImage,
    //     format: pathFormat,
    //   },
    // ]);
  };

  if (!hasPermission) {
    return <Text>{t('camera.heading')}</Text>;
  }

  if (!device) {
    return <Text>{t('camera.heading_1')}</Text>;
  }

  const handleRemoveImage = (removingImage: string) => {
    setSelectedImage(selectedImage.filter((img:string) => img !== removingImage));
  };


  const handleSelectAllImage = () => {
    if (prevRoute == RootScreenEnum.BATH_SCREEN) {
      setSelectedCategoryImage(selectedImage);
    } else {
      setShopInfo((prevShopInfo: any) => ({
        ...prevShopInfo,
        storeImages: [...(prevShopInfo?.storeImages || []), ...selectedImage],
      }));
    }

    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'relative',
      }}>
      <Camera
        ref={camera}
        isActive={true}
        style={{ flex: 1 }}
        device={device}
        photo={true}></Camera>
      <View style={styles.captureimg}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {selectedImage?.map((img:string, index: number) => (
            <View key={index} style={styles.images}>
              <Image
                source={{ uri: img }}
                style={{ width: 70, height: 70, borderRadius: 4 }}
              />
              <Feather
                style={{
                  position: 'absolute',
                  left: 60,
                  top: -5,
                  width: 15,
                  height: 16,
                  borderRadius: 50,
                  textAlign: 'center',
                  lineHeight: 16,
                  backgroundColor: 'rgba(255,255,255, 0.3)',
                }}
                name="x"
                size={13}
                color={'rgb(255,255,255)'}
                onPress={() => handleRemoveImage(img)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      {selectedImage.length ? (
        <Feather
          style={{
            backgroundColor: 'rgba(32, 34, 47, 0.8)',
            width: 70,
            textAlign: 'center',
            lineHeight: 100,
            height: 100,
            position: 'absolute',
            right: 0,
            bottom: 95,
          }}
          size={24}
          color={'#FFFFFF'}
          name="check"
          onPress={handleSelectAllImage}
        />
      ) : (
        <></>
      )}
      {/* {selectedImage?.map((selectedImagePath: string, index: number) => (
        <View key={index}>
          <Image
            source={{uri: selectedImagePath}}
            style={{width: 200, height: 200}}
          />
          <Button
            color={'#FAFAFA'}
            title="Select"
            onPress={handleSelectAllImage}
          />
          <Button
            color={'#FAFAFA'}
            title="Close"
            onPress={() => handleRemoveImage(selectedImagePath)}
          />
        </View>
      ))} */}
      <View style={styles.flex}>
        <Feather
          name="image"
          color={'#FAFAFA'}
          size={24}
          onPress={openImagePicker}
        />
        <TouchableOpacity style={styles.scanCamera} onPress={ClickaPhoto}>
          <Feather
            name="camera"
            color={'#288cd5'}
            style={styles.camera}
            size={24}
          />
        </TouchableOpacity>
        <Feather name="zap" color={'#FAFAFA'} size={24} />
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  flex: {
    backgroundColor: '#20222f',
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 56,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  camera: {
    width: 50,
    height: 50,
    backgroundColor: '#FAFAFA',
    borderRadius: 50,
    textAlign: 'center',
    lineHeight: 50,
    margin: 7,
  },
  scanCamera: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FAFAFA',
    lineHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureimg: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'rgba(32, 34, 47, 0.6)',
    bottom: 40,
    width: '100%',
  },
  images: {
    marginTop: 15,
    marginRight: 5,
    marginBottom: 70,
    marginLeft: 10,
  },
});
