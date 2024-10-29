import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParams = {
  Home: undefined;
  CreateTodo: undefined;
  TodoDetailScreen: {id: number};
};

export type IMainStackProps<T extends keyof MainStackParams> =
  NativeStackScreenProps<MainStackParams, T>;
