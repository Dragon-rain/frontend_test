import { Button, Divider } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { IToDo } from "../../models/Itodo";
import { dateAPI } from "../../service/DateService";
import { toDoAPI } from "../../service/ToDoService";
import TodoItem from "./TodoItem";

const TodoContaner = () => {

    const [title, setTitle] = useState('');

    const {data: date, isLoading: isDateLoading, isError: isDateError} = dateAPI.useFetchSeoulDateQuery();
    const {data: todos, isLoading, isError } = toDoAPI.useFetchAllToDosQuery(10);
    const [createTodo, {}] = toDoAPI.useCreateToDoMutation();
    const [uspdateTodo, {}] = toDoAPI.useUpdateToDoMutation();
    const [deleteTodo, {}] = toDoAPI.useDeleteToDoMutation();

    const handleRemove = async (todo: IToDo) => {
        await deleteTodo(todo)
    }

    const handleUpdate = async (todo: IToDo) => {
        await uspdateTodo(todo)
    }

    const handleEnerKeyDown = async (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            if(title.length === 0) return alert("please input title");
            const date = new Date();
            await createTodo({title: title, completed: false, created: date.toLocaleTimeString('en-US')} as IToDo);
            setTitle('');
        }
    };

    const createDateTitle = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {  day: 'numeric', weekday: 'long' });
    }
    
    const getMonth = (date:string) => {
        return new Date(date).toLocaleDateString('en-US', { month: 'long' });
    }

    return (
        <div>
            {isDateLoading && <div>Loading date...</div>}
            {isDateError && <div>Fail load date</div>}
            {date && <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <h3>{createDateTitle(date.datetime)}</h3>
                    <p>{getMonth(date.datetime)}</p>
                </div>
                <div style={{marginTop: '0.3em'}}>
                    <p>{todos?.length} Tasks</p>
                </div>
            </div>}
            <Divider plain></Divider>
            <TextArea rows={2} value={title} placeholder="add todo" onChange={(e) => setTitle(e.target.value)} onKeyDown={(e:any) => handleEnerKeyDown(e)}/>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Fail load todo list</div>}
            {todos && todos.map(todo =>
                <TodoItem key={todo.id} todo={todo} remove={handleRemove} update={handleUpdate}/>
            )}
        </div>
    )
}

export default TodoContaner;