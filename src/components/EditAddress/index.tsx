import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {NavigationProps} from '../../interfaceTypes';
import {ThemColors} from '../../App';
import ButtonComp from '../Button';
import {RootScreenEnum} from '../../constants';

function EditAddress({navigation}: NavigationProps): JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [text, onChangeText] = React.useState('');

  return (
    <View style={{flex: 1, position: 'relative'}}>
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
          <Text style={{color: colors.text, fontSize: 16, fontWeight: '600'}}>
          {t('address.title')}
          </Text>
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{marginBottom: 58}}>
          <View style={styles(colors).container}>
            <TextInput
              style={styles(colors).input}
              onChangeText={onChangeText}
              value={text}
              keyboardType="numeric"
              placeholder={t('address.title_1')}
            />
            <TextInput
              style={styles(colors).input}
              onChangeText={onChangeText}
              value={text}
              placeholder={t('address.title_2')}
            />
            <TextInput
              style={styles(colors).input}
              onChangeText={onChangeText}
              value={text}
              placeholder={t('address.title_3')}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 14,
              }}>
              <View style={{width: '48%'}}>
                <TextInput
                  style={styles(colors).input}
                  onChangeText={onChangeText}
                  value={text}
                  placeholder={t('address.title_4')}
                />
              </View>
              <View style={{width: '48%'}}>
                <TextInput
                  style={styles(colors).input}
                  onChangeText={onChangeText}
                  value={text}
                  keyboardType="numeric"
                  placeholder={t('address.title_5')}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles(colors).menumain}>
        <ButtonComp
          title={t('address.button')}
          disabled={false}
          onPress={() => navigation.navigate(RootScreenEnum.PROFILE_SCREEN)}
        />
      </View>
    </View>
  );
}

export default EditAddress;

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
      marginBottom: 14,
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 16,
    },
    input: {
      color: colors.card,
      fontSize: 16,
      borderWidth: 1,
      paddingHorizontal: 12,
      paddingVertical: 9,
      borderColor: colors.border,
      borderRadius: 8,
      marginBottom: 14,
      backgroundColor: '#FAFAFA',
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
