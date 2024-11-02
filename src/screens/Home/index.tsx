import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IMainStackProps} from '../../navigation/types';
import Header from '../../components/UI/Header/Header';
import useTodosStore from '../../store/todoStore';
import {Todo} from '../../store/types';
import TodoItem from '../../components/UI/TodoItem/TodoItem';
import {Modalize} from 'react-native-modalize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Background from '../../components/UI/Background/Background';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';

interface Props extends IMainStackProps<'Home'> {}

const Home: FC<Props> = ({navigation}) => {
  const todos = useTodosStore().todos;
  const currentTodo = useTodosStore().currentTodo;
  const notCompletedTodos = todos.filter((t: Todo) => t.isCompleted === false);
  const completedTodos = todos.filter((t: Todo) => t.isCompleted === true);
  const changeStatus = useTodosStore().changeStatus;
  const removeTodo = useTodosStore().deleteTodo;
  const getDetails = useTodosStore().getTodoDetails;
  const modalizeRef = useRef<Modalize>(null);

  type ModalData = {
    id: number;
    type: 'delete' | 'view';
    title?: string;
    isCompleted: boolean;
  };
  const [modalData, setModalData] = useState<ModalData>({
    id: 0,
    type: 'view',
    title: '',
    isCompleted: false,
  });
  const onDelete = (item: Todo) => {
    setModalData({
      id: item.id,
      type: 'delete',
      title: item.title,
      isCompleted: false,
    });
    modalizeRef.current?.open();
  };

  const confirmDelete = () => {
    removeTodo(modalData.id);
    resetModalData();
    modalizeRef.current?.close();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const resetModalData = () => {
    setModalData({id: 0, title: '', type: 'view', isCompleted: false});
  };

  const onDetail = (item: Todo) => {
    getDetails(item.id);
    modalizeRef.current?.open();
  };
  useEffect(() => {
    setModalData({
      id: currentTodo.id,
      type: 'view',
      title: currentTodo.title,
      isCompleted: currentTodo.isCompleted,
    });
  }, [currentTodo]);

  return (
    <Background>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <GestureHandlerRootView style={styles.main}>
          <Header title={'Home Screen'} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 6,
              marginLeft: 20,
              alignSelf: 'flex-start',
            }}>
            <FontAwesome5 name="tasks" size={21} />
            <Text style={{textDecorationLine: 'underline'}}>NOT COMPLETED</Text>
          </View>

          {notCompletedTodos.length > 0 ? (
            <View style={{rowGap: 10}}>
              {notCompletedTodos.map((t: Todo) => {
                return (
                  <TodoItem
                    onStatusChange={() => changeStatus(t)}
                    isCompleted={t.isCompleted}
                    title={t.title}
                    key={t.id}
                    onDelete={() => onDelete(t)}
                    onDetail={() => onDetail(t)}
                  />
                );
              })}
            </View>
          ) : (
            <></>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 6,
              marginLeft: 20,
              alignSelf: 'flex-start',
            }}>
            <Material name="task-alt" size={24} />
            <Text style={{textDecorationLine: 'underline'}}>COMPLETED</Text>
          </View>
          {completedTodos.length > 0 ? (
            <View style={{rowGap: 10, paddingBottom: 20}}>
              {completedTodos.map((t: Todo) => {
                return (
                  <TodoItem
                    onStatusChange={() => changeStatus(t)}
                    isCompleted={t.isCompleted}
                    title={t.title}
                    key={t.id}
                    onDelete={() => onDelete(t)}
                    onDetail={() => onDetail(t)}
                  />
                );
              })}
            </View>
          ) : (
            <></>
          )}
          <Pressable
            style={{
              marginTop: 20,
              borderRadius: 8,
              width: 60,
              height: 60,
              padding: 4,
              position: 'absolute',
              bottom: 20,
              right: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#060433',
            }}
            onPress={() => navigation.navigate('CreateTodo')}>
            <FontAwesome5 name="plus-square" size={50} color={'#0ff0e2'} />
          </Pressable>

          <Modalize
            modalStyle={{
              width: '80%',
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              overflow: 'hidden',
              marginBottom: Dimensions.get('window').height / 2,
            }}
            handleStyle={{display: 'none'}}
            ref={modalizeRef}
            overlayStyle={{
              backgroundColor: 'rgba(106, 106, 168, 0.5)',
            }}
            adjustToContentHeight={true}
            handlePosition="inside"
            modalTopOffset={Dimensions.get('window').height / 2}>
            <View
              style={{
                padding: 20,
                alignItems: 'center',
                width: '100%',
              }}>
              {modalData.type === 'delete' ? (
                <View style={{flexDirection: 'column', rowGap: 15}}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 17}}>
                      Are you sure you want to delete
                    </Text>
                    <Text
                      style={{color: 'red', fontWeight: '500', fontSize: 18}}>
                      {modalData.title} ?
                    </Text>
                  </View>
                  <View
                    style={{
                      columnGap: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Pressable
                      onPress={onClose}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 12,
                        backgroundColor: '#ee3923',
                        paddingHorizontal: 10,
                        paddingVertical: 12,
                      }}>
                      <Text style={{fontWeight: '500', color: 'white'}}>
                        CANCEL
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={confirmDelete}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 12,
                        backgroundColor: '#1de467',
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                      }}>
                      <Text style={{fontWeight: '500', color: 'white'}}>
                        OK
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <View>
                  <Text>Title: {modalData.title}</Text>
                  <Text>
                    Completed status:
                    {modalData.isCompleted ? 'COMPLETED' : 'NOT COMPLETED'}
                  </Text>
                </View>
              )}
            </View>
          </Modalize>
        </GestureHandlerRootView>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    rowGap: 20,
    alignItems: 'center',
  },
});
export default Home;
