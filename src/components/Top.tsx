import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const Top = () => {
  const navigate = useNavigate(); // ナビゲーション関数を取得


  const goToTodos = () => {
    // 条件に応じて移動先を変更することも可能
    navigate('/todos');
  };


  return (
    <div>
      <h1>トップページ</h1>
      <Button onClick={goToTodos}>
        Todoリストへ
      </Button>
    </div>
  );
};


export default Top;