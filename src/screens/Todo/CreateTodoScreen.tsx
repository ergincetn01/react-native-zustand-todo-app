import {
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {IMainStackProps} from '../../navigation/types';
import {FC, useState} from 'react';
import Header from '../../components/UI/Header/Header';
import useTodosStore from '../../store/todoStore';
import {Todo} from '../../store/types';
import KeyboardAvoidingArea from '../../components/KeyboardAvoidingArea/KeyboardAvoidingArea';

interface Props extends IMainStackProps<'CreateTodo'> {}

const CreateTodoScreen: FC<Props> = ({navigation}) => {
  const [title, setTitle] = useState<string>('');

  const addTodo = useTodosStore().addTodo;
  const increment = useTodosStore().incrementId;
  const todoId = useTodosStore().id;

  const handleCreate = () => {
    if (title.length > 0) {
      const todo: Todo = {
        id: todoId,
        title,
        isCompleted: false,
      };
      addTodo(todo);
      navigation.goBack();
      increment();
    }
    return;
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingArea>
        <Header title={'Create To Do'} showBack />
        <View style={styles.form}>
          <View
            style={{
              height: 45,
              justifyContent: 'center',
              borderWidth: 0.5,
              borderRadius: 16,
              width: Dimensions.get('screen').width - 40,
            }}>
            <TextInput
              style={{paddingInlineStart: 12}}
              value={title}
              onBlur={() => Keyboard.dismiss}
              onFocus={() => Keyboard.dismiss}
              onChangeText={(text: string) => setTitle(text)}
            />
          </View>
          <Pressable
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2c3e50',
              padding: 10,
              width: 100,
              borderRadius: 12,
            }}
            onPress={handleCreate}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: '400'}}>
              Create
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingArea>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
    rowGap: 20,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
});

export default CreateTodoScreen;
