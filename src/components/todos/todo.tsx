import React, { useState } from 'react';

type Todo = {
  title: string;
  readonly id: number;
  completed_flg: boolean;
  delete_flg: boolean
};

type Filter = 'all' | 'completed' | 'unchecked' | 'delete';
// all: すべてのタスクを表示しますが、削除されたタスクは除外します。通常のタスクリストの表示に使います。
// delete_flgがfalseのタスク以外のタスクを取得
// completed: 完了したタスクだけを表示します。完了したタスクの一覧を確認する時に使います。completed_flgがtrueのタスクを取得
// unchecked: 現在のタスク（未完了タスク）だけを表示します。まだ完了していないタスクを確認する時に使います。completed_flgがfalseかつdelete_flgがfalse(初期値)のタスクを取得
// delete: ごみ箱（削除されたタスク）を表示します。削除されたタスクのリストを確認時と削除したタスクを復元したりする場合に使います。delete_flgがtrueのタスクを取得


// Todoコンポーネントの定義
const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Todoの配列を保持するstate
  const [text, setText] = useState(''); // テキスト入力用
  const [nextId, setNextId] = useState(1); // 次のTodoのIDを保持するstate
  const [filter, setFilter] = useState<Filter>('all');

  const handleEdit = (id: number, value: string) => {
    console.log('handleEdit called:', id, value);
    setTodos((todos) => {
      /**
    * 引数として渡された todo の id が一致する
    * 更新前の todos ステート内の
    * value(プロパティ)を引数 value (= e.target.value) に書き換える
    */
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          console.log('Updating todo:', todo);
          // todo.title = value;
          return { ...todo, title: value };
        }
        return todo;
      });

      // todos ステートが書き換えられていないかチェック
      console.log('=== Original todos ===');
      todos.map((todo) => {
        console.log(`id: ${todo.id}, title: ${todo.title}`);
      });

      // todosステートを更新
      return newTodos;
    });
  };


  // todos ステートを更新する関数
  const handleSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return;


    // 新しい Todo を作成
    const newTodo: Todo = {
      title: text, // text ステートの値を content プロパティへ
      id: nextId,
      completed_flg: false,
      delete_flg: false
    };


    /**
     * 更新前の todos ステートを元に
     * スプレッド構文で展開した要素へ
     * newTodo を加えた新しい配列でステートを更新
     **/
    setTodos((prevTodos) => [newTodo, ...prevTodos]); //新しいTodoを追加
    setNextId(nextId + 1); // 次のIDを更新

    // フォームへの入力をクリアする
    setText('');
  };

  const handleCheck = (id: number, completed_flg: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed_flg };
        }
        return todo;
      });
      return newTodos;
    });
  }

  const handleRemove = (id: number, delete_flg: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, delete_flg };
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleFilterChange = (filter: Filter) => { // onChangeｲﾍﾞﾝﾄが発火するとFilter型の変数を受け取り、ｽﾃｰﾄを更新
    setFilter(filter);
  }

  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
        // 完了済 かつ 削除されていないタスクを返す
        return todos.filter((todo) => todo.completed_flg && !todo.delete_flg);
      case 'unchecked':
        // 未完了 かつ 削除されていないタスクを返す
        return todos.filter((todo) => !todo.completed_flg && !todo.delete_flg);
      case 'delete': // deleteだったら
        // 削除されたタスクを返す
        return todos.filter((todo) => todo.delete_flg);
      default:
        // 削除されていないすべてのタスクを返す
        return todos.filter((todo) => !todo.delete_flg);
    }
  };

  return (
    <div className="todo-container">
      <select
        defaultValue="all"
        onChange={(e) => handleFilterChange(e.target.value as Filter)} // e.target.valueは本来stringになるので、Filterの4つの文字だけ使うようにルールを設定している
        >
        <option value="all">すべてのタスク</option>
        <option value="completed">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="delete">ごみ箱</option>
      </select>
      {/* ﾌｨﾙﾀｰが`delete`のときは「ごみ箱を空にする」ボタンを表示 */}
      {filter === 'delete' ? (
        <button onClick={() => console.log('remove all')}>
          ごみ箱を空にする
        </button>
      ) : (
        // ﾌｨﾙﾀｰが`completed`でなければTodo入力フォームを表示
        filter !== 'completed' && (
          <form
            onSubmit={(e) => {
              e.preventDefault(); // フォームのデフォルト動作を防ぐ
              handleSubmit(); // handleSubmit 関数を呼び出す
            }}
          >
            <input
              type="text"
              value={text} // フォームの入力値をステートにバインド
              disabled={['completed', 'delete'].includes(filter)} // 完了または削除で入力不可にする
              // filterの値がcompletedまたはdeleteであれば true

              onChange={(e) => setText(e.target.value)} // 入力値が変わった時にステートを更新
            />
            <button className="insert-btn" type="submit">追加</button>{/* ボタンをクリックしてもonSubmitをトリガーしない */}
          </form>
        )
      )}

      <ul>
        {getFilteredTodos().map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed_flg}
                // 呼び出し側で checked フラグを反転させる
                onChange={() =>handleCheck(todo.id, !todo.completed_flg)}
              />
              <input
                type="text"
                value={todo.title}
                disabled={todo.completed_flg}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleRemove(todo.id, !todo.delete_flg)}>
                {todo.delete_flg ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todos;