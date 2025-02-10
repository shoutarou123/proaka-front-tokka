import React, { useState } from 'react';

type Todo = {
  title: string;
};

// Todoコンポーネントの定義
const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Todoの配列を保持するstate
  const [text, setText] = useState('');

   // todos ステートを更新する関数
   const handleSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return;


    // 新しい Todo を作成
    const newTodo: Todo = {
      title: text, // text ステートの値を content プロパティへ
    };


    /**
     * 更新前の todos ステートを元に
     * スプレッド構文で展開した要素へ
     * newTodo を加えた新しい配列でステートを更新
     **/
    setTodos((prevTodos) => [newTodo, ...prevTodos]);

    // フォームへの入力をクリアする
    setText('');
  };

  return (
    <div>
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
        />
        <button className="insert-btn" type="submit">追加</button>{/* ボタンをクリックしてもonSubmitをトリガーしない */}
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.title}</li> // todoのリストを表示
        ))}
      </ul>
    </div>
  );
};

export default Todos;