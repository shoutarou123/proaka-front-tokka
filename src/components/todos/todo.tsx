import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

import localforage from 'localforage';
import { useDay } from '../DayContext';


type Todo = {
  title: string;
  readonly id: number;
  completed_flg: boolean;
  delete_flg: boolean,
  startDate: string;
};

type Filter = 'all' | 'completed' | 'unchecked' | 'delete';
// all: すべてのタスクを表示しますが、削除されたタスクは除外します。通常のタスクリストの表示に使います。
// delete_flgがfalseのタスク以外のタスクを取得
// completed: 完了したタスクだけを表示します。完了したタスクの一覧を確認する時に使います。completed_flgがtrueのタスクを取得
// unchecked: 現在のタスク（未完了タスク）だけを表示します。まだ完了していないタスクを確認する時に使います。completed_flgがfalseかつdelete_flgがfalse(初期値)のタスクを取得
// delete: ごみ箱（削除されたタスク）を表示します。削除されたタスクのリストを確認時と削除したタスクを復元したりする場合に使います。delete_flgがtrueのタスクを取得


// Todoコンポーネントの定義
const Todos: React.FC = () => {
  const { date } = useDay();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]); // Todoの配列を保持するstate
  const [text, setText] = useState(''); // テキスト入力用
  const [nextId, setNextId] = useState(1); // 次のTodoのIDを保持するstate
  const [filter, setFilter] = useState<Filter>('all');

  const [activeTodoId, setActiveTodoId] = useState<number | null>(null);

  const options: { value: string; label: string }[] = [
    { value: '0%', label: '0%' },
    { value: '10%', label: '10%' },
    { value: '20%', label: '20%' },
    { value: '30%', label: '30%' },
    { value: '40%', label: '40%' },
    { value: '50%', label: '50%' },
    { value: '60%', label: '60%' },
    { value: '70%', label: '70%' },
    { value: '80%', label: '80%' },
    { value: '90%', label: '90%' },
    { value: '100%', label: '100%' }
  ]

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      background: '#ff9',
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeigth: '200px',
      overflow: 'auto',
    }),
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
      delete_flg: false,
      startDate: date.toISOString().split("T")[0],
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


  const handleTodo = <K extends keyof Todo, V extends Todo[K]>( // keyはTodoの中のいずれかでなければならない。VはTodoのkeyに対するvalueの型でなければならない。
    id: number,
    key: K, // keyがK
    value: V // valueがV と表記しているだけ
  ) => {
    setTodos((todos) => { // 現在のtodosを受け取り
      const newTodos = todos.map((todo) => { // todosを繰り返し取得し
        if (todo.id === id) { // それのidと引数のidが＝の場合
          return { ...todo, [key]: value }; // todoの全ﾌﾟﾛﾊﾟﾃｨ(ｷｰと値のｾｯﾄ)を取得し、それのkeyに対する値を更新する。
        } else {
          return todo;
        }
      });
      return newTodos;
    });
  };

  // const updateTodo = <T extends keyof Todo>(todos: Todo[], id: number, key: T, value: Todo[T]): Todo[] => {
  // // T extends AでTはAに含まれているものでなければならない。keyof TodoでTodoのｷｰ全て取得。なのでTはTodoのｷｰにあるものでなければならない。
  // // 引数の意味は現在のﾀｽｸ一覧を取得し、更新したいidを取得、そのidのｷｰを取得し、そのｷｰに対する値を取得する。という意味
  // // : Todo[]で、戻り値はTodoの配列であることを指定している。

  //   return todos.map((todo) => { //todos一覧をtodoという任意の変数名で取得
  //     if (todo.id === id) { // 一覧のidと更新対象のid(引数のid)が同じものであれば
  //       return { ...todo,[key]: value }; // todoの全ﾌﾟﾛﾊﾟﾃｨ(ｷｰと値のｾｯﾄ)を取得し、それのkeyに対する値を更新する。
  //     }
  //     return todo; // idが一致しない時はそのままtodo一覧を返す
  //   });
  // };


  // const handleEdit = (id: number, value: string) => {
  //   setTodos((todos) => updateTodo(todos, id, 'title', value)); // titleというｷｰとなる文字列を渡している。titleと書くと変数と認識されてしまう
  // };

  const handleEdit = (id: number) => {
    alert('編集画面です');
  };



  // const handleCheck = (id: number, completed_flg: boolean) => {
  //   setTodos((todos) => updateTodo(todos, id, 'completed_flg', completed_flg)); // 前述の引数にcompleted_flgを受け取っているので、こちらもcompleted_flgと記述することでtrueかfalseが入ってくる
  // };

  // const handleRemove = (id: number, delete_flg: boolean) => {
  //   setTodos((todos) => updateTodo(todos, id, 'delete_flg', delete_flg));
  // };

  const handleFilterChange = (filter: Filter) => { // onChangeｲﾍﾞﾝﾄが発火するとFilter型の変数を受け取り、ｽﾃｰﾄを更新
    setFilter(filter);
  }



  // 物理的に削除する関数 delete_flgがfalseのものだけを返す
  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.delete_flg)); // todoは任意の変数名。todosという現在のタスク一覧を取得し、その1つずつの要素から削除フラグがfalseのものを返す。trueのものは返さない＝表示しない。
  };

  // useEffect フックを使ってコンポーネントのマウント時にデータを取得
  useEffect(() => {
    localforage.getItem('todo-20240622').then((values) => { // thenは非同期処理Promiseが成功したときに実行する。という意味。
      if (values) {
        setTodos(values as Todo[]);
      }
    });
  }, []);

  // useEffect フックを使って todos ｽﾃｰﾄが更新されるたびにﾃﾞｰﾀを保存
  useEffect(() => {
    localforage.setItem('todo-20240622', todos); // todo-20240622というｷｰ名でtodosの配列に保存する
  }, [todos]);

  useEffect(() => {
    console.log("最新の Todo リスト: ", todos);
  }, [todos]);


  return (
    <div className="todo-container">
      < div className="calendar-navigation">
        {/* <button className='previos-day' onClick={previosDay}>前の日</button> */}
        {/* <BackCalendar /> */}
        {/* <button className='next-day'>次の日</button> */}
      </div>
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
        <button onClick={handleEmpty}>
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
              onChange={(e) => setText(e.target.value)} // 入力値が変わった時にステートを更新
              placeholder='タスクを入力してください'
            />
            <button className="insert-btn" type="submit">追加</button>{/* ボタンをクリックしてもonSubmitをトリガーしない */}
          </form>
        )
      )}

      <ul>
        {getFilteredTodos().map((todo) => {
          return (
            <React.Fragment key={todo.id}>
              <li className='task-item'>
                <div className='task-content'>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  <div>進捗率</div>
                  <div>
                    <Select
                      styles={customStyles}
                      options={options} />
                  </div>
                  </div>
                 
                  <p>開始日</p>
                  <p>{todo.startDate}</p>
                  <p>完了予定日</p>


                  <input
                    type="checkbox"
                    disabled={todo.delete_flg}
                    checked={todo.completed_flg}
                    // 呼び出し側で checked フラグを反転させる
                    onChange={() => handleTodo(todo.id, 'completed_flg', !todo.completed_flg)}
                  />
                  <input
                    type="text"
                    value={todo.title}
                    disabled={todo.completed_flg || todo.delete_flg}
                    onChange={(e) => handleTodo(todo.id, 'title', e.target.value)}
                  />
                  <div className="button-group-container">
                    <button className='edit-button' onClick={() => setActiveTodoId(activeTodoId === todo.id ? null : todo.id)}>編集</button>
                    <button className='delete-button' onClick={() => handleTodo(todo.id, 'delete_flg', !todo.delete_flg)}>
                      {todo.delete_flg ? '復元' : '削除'}
                    </button>
                  </div>
                </div>

              </li>

              {/* 編集ﾌｫｰﾑ表示 */}
              {activeTodoId === todo.id && (
                <li className="edit-form-container">
                  <div className="edit-form">
                    <input type="text" />
                  </div>
                </li>
              )}

            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Todos;