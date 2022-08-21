import { Card, Space } from 'antd';
import React from 'react';
import './App.css';
import TodoContaner from './components/todos/ToDoContaner';

function App() {
  return (
    <div className="App" style={{backgroundColor: '#2f54eb', height:'100vh'}}>
      <Space direction="horizontal" style={{width: '100%', justifyContent: 'center', marginTop: '3em'}}>
        <Card style={{ width: 400 }}>
          <TodoContaner/>
        </Card>
      </Space>
    </div>
  );
}

export default App;
