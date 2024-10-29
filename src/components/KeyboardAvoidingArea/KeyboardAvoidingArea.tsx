import React, {FC} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
type Props = {
  children: React.ReactNode;
};
const KeyboardAvoidingArea: FC<Props> = ({children}) => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default KeyboardAvoidingArea;
