import React, {FC} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: ViewProps['style'];
};
const Background: FC<Props> = ({children, style}) => {
  return <View style={[styles.main, style]}>{children}</View>;
};
const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(225, 228, 234, 1)',
    flex: 1,
  },
});
export default Background;
