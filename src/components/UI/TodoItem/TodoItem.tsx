import React, {FC} from 'react';
import {
  Button,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  onDetail: () => void;
  onDelete: () => void;
  title: string;
  isCompleted: boolean;
  onStatusChange: () => void;
};

const TodoItem: FC<Props> = ({
  onDetail,
  onDelete,
  title,
  isCompleted,
  onStatusChange,
}) => {
  return (
    <Pressable style={style.main} onPress={onStatusChange}>
      <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 4}}>
        {isCompleted ? (
          <FontAwesome5 name="tasks" size={22} color={'rgb(97,97,97)'} />
        ) : (
          <MaterialIcons
            name="work-history"
            size={22}
            color={'rgb(97,97,97)'}
          />
        )}
        <Text
          style={{textDecorationLine: isCompleted ? 'line-through' : 'none'}}>
          {title}
        </Text>
      </View>
      <View style={style.buttons}>
        <Pressable
          onPress={onDetail}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Fontisto name="preview" size={24} />
        </Pressable>
        <Pressable
          onPress={onDelete}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            padding: 8,
          }}>
          <Icon name="delete" color="#ff0000" size={24} />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default TodoItem;

const style = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: 'grey',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 3,
    width: Dimensions.get('screen').width - 30,
    backgroundColor: 'white',
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    columnGap: 4,
  },
});
