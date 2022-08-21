import { Button, Checkbox } from 'antd';
import React, {FC} from 'react';
import { IToDo } from '../../models/Itodo';
import { Typography } from 'antd';

interface TodoItemProps {
    todo: IToDo;
    remove: (post: IToDo) => void;
    update: (post: IToDo) => void;
}

const TodoItem: FC<TodoItemProps> = ({todo, remove, update}) => {

    const { Text } = Typography;

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation()
        remove(todo)
    }

    const handleUpdate = (event: React.MouseEvent) => {
        update({...todo, completed: !todo.completed})
    }

    return (
        <div style={{marginTop: '2em'}}>
            <Checkbox defaultChecked={todo.completed} onChange={(e:any) => handleUpdate(e)}> 
                {todo.completed? <Text delete>{todo.title}</Text>: todo.title}
            </Checkbox> 
            <span style={{float: 'right'}}>{todo.created}</span>
            <Button style={{float: 'right', marginRight: '1em'}} type="primary" onClick={(e:any) => handleRemove(e)}>
                Delete
            </Button>
        </div>
    );
};

export default TodoItem;