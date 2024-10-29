import {NavigationContainer} from '@react-navigation/native';
import {MainStackParams} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import CreateTodoScreen from '../screens/Todo/CreateTodoScreen';

const Stack = createNativeStackNavigator<MainStackParams>();
const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="CreateTodo"
          options={{
            animation: 'slide_from_bottom',
            presentation: 'formSheet',
          }}
          component={CreateTodoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStack;
