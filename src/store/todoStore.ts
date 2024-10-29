import {create} from 'zustand';
import {Todo} from './types';

interface TodoState {
  id: number;
  incrementId: () => void;
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  getTodoDetails: (id: number) => Todo | undefined;
  changeStatus: (todo: Todo) => void;
}
const useTodosStore = create<TodoState>((set, get) => ({
  id: 1,
  incrementId: () => set(state => ({id: state.id + 1})),
  todos: [],
  addTodo: (todo: Todo) => set(state => ({todos: [...state.todos, todo]})),
  deleteTodo: (id: number) =>
    set(state => ({todos: state.todos.filter((t: Todo) => t.id !== id)})),
  getTodoDetails: id => {
    const state = get();
    return state.todos.find(t => t.id === id);
  },
  changeStatus: (todo: Todo) => {
    const state = get();
    const item = state.todos.find(t => t.id === todo.id);
    if (!item) return;
    const updatedItem = {...item, isCompleted: !item.isCompleted};
    const updatedTodos = state.todos.map(t =>
      t.id === updatedItem.id ? updatedItem : t,
    );
    set(() => ({todos: updatedTodos}));
  },
}));

export default useTodosStore;
