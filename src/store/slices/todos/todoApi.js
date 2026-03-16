import { baseApi } from '../../../apiCall/rtkBaseApi/baseApi';
import { demoTodos as initialDemoTodos } from '../../../shared/mockData/demoData';
import { recordRuntimeEvent } from '../../../shared/observability/runtimeSignals';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let demoTodos = [...initialDemoTodos];

const shouldUseMockApi = () =>
  import.meta.env.VITE_ENABLE_MOCK_API !== 'false' || !import.meta.env.VITE_API_BASE_URL;

export const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDemoTodos: builder.query({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        if (shouldUseMockApi()) {
          await sleep(120);
          recordRuntimeEvent('todo.query', {
            mode: 'mock',
            count: demoTodos.length,
          });
          return { data: [...demoTodos] };
        }

        const response = await baseQuery({ url: '/sample-data', method: 'GET' });
        if (response.error) {
          return { error: response.error };
        }

        const items = Array.isArray(response.data?.data) ? response.data.data : [];
        return {
          data: items.map((item) => ({
            id: String(item.id),
            title: item.title,
            completed: Boolean(item.completed),
            owner: 'API',
          })),
        };
      },
      providesTags: (result = []) => [
        'todos',
        ...result.map((todo) => ({ type: 'todos', id: todo.id })),
      ],
    }),
    addDemoTodo: builder.mutation({
      async queryFn(title) {
        await sleep(120);

        const newTodo = {
          id: crypto.randomUUID(),
          title,
          completed: false,
          owner: 'You',
        };

        demoTodos = [newTodo, ...demoTodos];
        recordRuntimeEvent('todo.add', {
          mode: shouldUseMockApi() ? 'mock' : 'live',
          todoId: newTodo.id,
        });

        return { data: newTodo };
      },
      invalidatesTags: ['todos'],
    }),
    toggleDemoTodo: builder.mutation({
      async queryFn(todoId) {
        await sleep(120);

        demoTodos = demoTodos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo,
        );

        recordRuntimeEvent('todo.toggle', {
          mode: shouldUseMockApi() ? 'mock' : 'live',
          todoId,
        });

        return {
          data: demoTodos.find((todo) => todo.id === todoId),
        };
      },
      invalidatesTags: (_result, _error, todoId) => [
        'todos',
        { type: 'todos', id: todoId },
      ],
    }),
  }),
});

export const {
  useAddDemoTodoMutation,
  useGetDemoTodosQuery,
  useToggleDemoTodoMutation,
} = todoApi;
