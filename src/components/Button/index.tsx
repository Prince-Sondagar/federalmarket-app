import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Loader from '../Loader';

interface Props extends React.ComponentProps<typeof TouchableOpacity> {
  title?: string;
  disabled?: boolean;
  icon?: ReactNode;
  loading?: boolean;
}

export default function ButtonComp({ title, disabled, icon, loading, ...props }: Props,) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={styles(colors, disabled).button} disabled={disabled} {...props}>
      <Text style={styles(colors).text}>{loading ? <Loader /> : title}</Text>
      <Text>{icon}</Text>
    </TouchableOpacity>
  );
}

const styles = (colors: any, disabled?: boolean) =>
  StyleSheet.create({
    button: {
      width: '100%',
      backgroundColor: disabled ? "#BBD9EF" : colors.primary,
      padding: 14,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      gap: 10
    },
    text: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
  });
