import { useState } from 'react';
import Button from '../../components/ui/button';
import InputField from '../../components/ui/input';
import {
  useAddDemoTodoMutation,
  useGetDemoTodosQuery,
  useToggleDemoTodoMutation,
} from '../../store/slices/todos/todoApi';
import styles from './styles.module.scss';

const TodoWorkspaceContainer = () => {
  const [draftTitle, setDraftTitle] = useState('');
  const { data: todos = [], isLoading, isFetching } = useGetDemoTodosQuery();
  const [addDemoTodo, { isLoading: isAdding }] = useAddDemoTodoMutation();
  const [toggleDemoTodo, { isLoading: isToggling }] = useToggleDemoTodoMutation();

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedValue = draftTitle.trim();
    if (!trimmedValue) {
      return;
    }

    await addDemoTodo(trimmedValue).unwrap();
    setDraftTitle('');
  };

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>RTK Query reference</p>
          <h1>Todo Workspace</h1>
          <p>
            This route demonstrates a mock-first RTK Query flow. Teams can replace the mock branch
            with live endpoints once a backend contract exists, without changing the page/container
            structure.
          </p>
        </div>

        <dl className={styles.metrics}>
          <div>
            <dt>Total</dt>
            <dd>{todos.length}</dd>
          </div>
          <div>
            <dt>Remaining</dt>
            <dd>{remainingTodos}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{isLoading || isFetching ? 'Syncing' : 'Ready'}</dd>
          </div>
        </dl>
      </header>

      <form className={styles.composer} onSubmit={handleSubmit}>
        <InputField
          type="text"
          title="New todo"
          name="todo-title"
          placeholder="Write the next task for this feature branch"
          value={draftTitle}
          onChange={(event) => setDraftTitle(event.target.value)}
        />
        <Button
          type="submit"
          variant="primary"
          button_text={isAdding ? 'Adding…' : 'Add todo'}
          disabled={isAdding}
        />
      </form>

      <div className={styles.todoList}>
        {todos.map((todo) => (
          <article key={todo.id} className={styles.todoCard}>
            <div>
              <span className={styles.owner}>{todo.owner}</span>
              <h2>{todo.title}</h2>
            </div>

            <Button
              type="button"
              variant={todo.completed ? 'primary_outline' : 'button_success'}
              button_text={todo.completed ? 'Mark active' : 'Mark done'}
              disabled={isToggling}
              onClick={() => toggleDemoTodo(todo.id)}
            />
          </article>
        ))}
      </div>
    </section>
  );
};

export default TodoWorkspaceContainer;
