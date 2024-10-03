import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { ThemColors } from '../../App';
import ButtonComp from '../Button';
import { RootScreenEnum } from '../../constants';
import { NavigationProps } from '../../interfaceTypes';
import useRetailers from '../../store/hooks/useRetailers';
import Loader from '../Loader';
import { Retailer } from '../../store/types/stateTypes';

function AreaInfo({ navigation }: NavigationProps): JSX.Element {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const {
    getLandmark,
    landMarksTypes,
    isLoading,
    retailerInfo,
    setRetailersShopInfoData,
  } = useRetailers();
  const [landmarkTypes, setLandmarkTypes] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    const isSelected = landmarkTypes?.includes(id);
    if (isSelected) {
      setLandmarkTypes(landmarkTypes?.filter(item => item !== id));
    } else {
      setLandmarkTypes([...landmarkTypes, id]);
    }
  };

  const isSelected = (id: number) => landmarkTypes.includes(id);

  useEffect(() => {
    getLandmark();
  }, []);

  useEffect(() => {
    const landmarkIds = retailerInfo?.landmarkTypes.map((ldm: any) =>
      ldm.id ? ldm.id : ldm,
    );
    setLandmarkTypes(landmarkIds ?? []);
  }, []);

  const saveAreaInfoHandler = () => {
    setRetailersShopInfoData({
      ...retailerInfo,
      landmarkTypes: landmarkTypes,
    } as Retailer);
    navigation.navigate(RootScreenEnum.SHOP_SCREEN);
  };
  //  navigation.navigate(RootScreenEnum.ADD_AREA_INFO)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1, position: 'relative' }}>
          <View style={styles(colors).header}>
            <View style={[styles(colors).headerRow]}>
              <Feather
                onPress={() => {
                  navigation.goBack();
                }}
                name="arrow-left"
                color={colors.card}
                size={24}
              />
              <Text
                style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>
                {t('proximity.heading')}
              </Text>
            </View>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ marginBottom: 85 }}>
              <View style={styles(colors).container}>
                <View style={[styles(colors).galleryView, styles(colors).flex]}>
                  {landMarksTypes?.map((list, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles(colors).galleryCard}
                      onPress={() => toggleSelection(list?.id)}>
                      <View
                        style={[
                          styles(colors).cardImg,
                          isSelected(list.id) && styles(colors).selectedCard,
                        ]}>
                        {list.imageUrl && (
                          <Image
                            source={{ uri: list.imageUrl }}
                            style={{ width: '100%', height: '100%' }}
                          />
                        )}
                        {isSelected(list.id) && (
                          <Ionicons
                            name="checkmark-circle"
                            style={styles(colors).checkIcon}
                            color={colors.primary + '80'}
                            size={26}
                          />
                        )}
                      </View>
                      <Text style={styles(colors).cardTitle}>{list?.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles(colors).menumain}>
            <ButtonComp
              title={t('proximity.button')}
              disabled={false}
              onPress={saveAreaInfoHandler}
            />
          </View>
        </View>
      )}
    </>
  );
}

export default AreaInfo;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    header: {
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 16,
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 16,
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    galleryView: {
      rowGap: 16,
      columnGap: 14,
    },
    galleryCard: {
      width: '30.87%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
    },
    cardImg: {
      height: 117,
      borderRadius: 8,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: '#FAFAFA',
    },
    selectedCard: {
      backgroundColor: colors.primary + '20',
      borderColor: colors.primary,
      borderWidth: 2,
    },
    checkIcon: {
      position: 'absolute',
      top: 2,
      right: 2,
    },
    cardTitle: {
      marginTop: 6,
      textAlign: 'center',
      color: colors.card + '90',
      fontSize: 12,
      lineHeight: 16,
    },
    menumain: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#FAFAFA',
      zIndex: 10,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
  });
