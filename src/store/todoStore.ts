import {create} from 'zustand';
import {Todo} from './types';

interface TodoState {
  currentTodo: Todo;
  id: number;
  incrementId: () => void;
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  getTodoDetails: (id: number) => void;
  changeStatus: (todo: Todo) => void;
}
const useTodosStore = create<TodoState>((set, get) => ({
  currentTodo: {id: 1, isCompleted: false, title: ''},
  id: 1,
  incrementId: () => set(state => ({id: state.id + 1})),
  todos: [],
  addTodo: (todo: Todo) => set(state => ({todos: [...state.todos, todo]})),
  deleteTodo: (id: number) =>
    set(state => ({todos: state.todos.filter((t: Todo) => t.id !== id)})),
  getTodoDetails: id => {
    if (!id) return;
    set(state => ({currentTodo: state.todos.find(t => t.id === id)}));
  },
  changeStatus: (todo: Todo) => {
    if (!todo) return;
    set(state => ({
      todos: state.todos.map(t =>
        t.id === todo.id ? {...t, isCompleted: !t.isCompleted} : t,
      ),
    }));
  },
}));

export default useTodosStore;
