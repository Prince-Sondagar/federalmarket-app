import React from 'react';
import {StyleSheet, Text, Modal, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { ThemColors } from '../../App';
interface Props {
  isVisible: boolean;
  hideModal: () => void;
  title1: string;
  title2: string;
  icon: boolean;
}

export default function FilterModal({isVisible, hideModal, title1, title2, icon}: Props) {
  const { colors } = useTheme();
  const {t} = useTranslation();
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onDismiss={hideModal}>
      <View style={styles(colors).modalContainer}>
        <View style={styles(colors).modalcontent}>
          <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
            <Text style={styles(colors).modalText}>{t('home.title_4')}</Text>
            <AntDesign onPress={hideModal} name="close" color={'#000'} size={20} />
          </View>
         <View style={[styles(colors).filtertitle]}>
         <Text style={styles(colors).title}>{title1}</Text>
         {icon && <Feather name="arrow-down-left" color='#67C265' size={20} />}
         </View>
          <View style={[styles(colors).filtertitle, styles(colors).filtertitle1]}>
          <Text style={[styles(colors).title]}>{title2}</Text>
          {icon && <Feather name="arrow-up-right" color='#FA5247' size={20} />}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = (colors:ThemColors) => StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.card + '60',
  },
  modalcontent: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#20222F',
    fontWeight: '600'
  },
  title: {
    paddingVertical: 10,
    color: colors.card,
    fontSize: 16,
    lineHeight: 24,
  },
  filtertitle:{
    borderBottomWidth:1,
    borderBottomColor: colors.border,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  filtertitle1:{
    borderBottomWidth: 0,
  }
});
