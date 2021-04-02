import React, { useState, useEffect } from "react";
import Task from "./Task";
import Header from "./TasksHeader";
import "./Tasks.css";

function Tasks(props) {
    const [tasks, setTasks] = useState({
        items: [],
        currId: 0,
    });

    useEffect(() => {
        let tasks = GetFromStorage("Tasks");
        setTasks(tasks);
    }, []);

    useEffect(() => {
        AddToStorage("Tasks", tasks);
    }, [tasks]);

    function addTask(taskName) {
        taskName = taskName.trim();
        if (!taskName) return;

        let newTasks = { ...tasks };
        newTasks.items.push({
            id: newTasks.currId,
            taskName,
            checked: false,
        });

        newTasks.currId++;

        setTasks(newTasks);
    }

    function deleteTask(id) {
        let newTasks = { ...tasks };

        for (let i = 0; i < newTasks.items.length; i++) {
            if (newTasks.items[i].id == id) {
                newTasks.items.splice(i, 1);
                break;
            }
        }

        setTasks(newTasks);
    }

    function checkTask(id) {
        let newTasks = { ...tasks };

        for (let i = 0; i < newTasks.items.length; i++) {
            if (newTasks.items[i].id == id) {
                newTasks.items[i].checked = !newTasks.items[i].checked;
                break;
            }
        }

        setTasks(newTasks);
    }

    const taskElements = tasks.items.map((item) => (
        <Task
            key={item.id}
            task={item}
            updateTask={checkTask}
            deleteTask={deleteTask}
        />
    ));

    return (
        <div className="tasks">
            <Header addItem={addTask} />
            {taskElements}
        </div>
    );
}

function AddToStorage(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
}

function GetFromStorage(key) {
    let tasks = localStorage.getItem(key);

    if (tasks) return JSON.parse(tasks);
    else return {};
}

export default Tasks;
