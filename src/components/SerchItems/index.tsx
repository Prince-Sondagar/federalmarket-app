import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemColors } from '../../App';
import SearchBar from '../SearchBar';
import { NavigationProps } from '../../interfaceTypes';

function SearchItems({ route, navigation }: NavigationProps): JSX.Element {
  const { colors } = useTheme();
  const params = route?.params;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles(colors).container}>
          <SearchBar backIcon={true} closeIcon={true} handleSelect={(selectedList) => route?.params?.handleSelect(selectedList)} navigation={navigation} options={params?.options} />
        </View>
      </ScrollView>
    </View>
  );
}
export default SearchItems;

const styles = (colors: ThemColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 12,
    }
  });
