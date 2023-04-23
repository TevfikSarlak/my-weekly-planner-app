import React, { useState, createContext } from "react";
import Task from "./Task";
import DateDay from "./DateDay";


export const TasksContext = createContext({
    tasks: [],
    setTasks: () => {},
  });

export const Day = ({ day, date }) => {
  const [tasks, setTasks] = useState(Array(3).fill(""));
  

  const handleTaskChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;

    if (index === tasks.length - 1 && value !== "") {
      newTasks.push("");
    }

    setTasks(newTasks);
  };

  return (
    
    <TasksContext.Provider value={{tasks, setTasks}}>
      <div className="mb-12">
        <DateDay date={date} day={day} />
            <ul>
                {tasks.map((task, index) => (
                <li key={index}>
                    <Task    
                        value={task} 
                        onChange={(value) => handleTaskChange(index, value)} />
                </li>
                ))}
            </ul>
      </div>
      
    </TasksContext.Provider>
  );
};
