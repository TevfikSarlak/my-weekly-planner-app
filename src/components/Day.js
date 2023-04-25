import React, { useState, createContext, useEffect } from "react";
import Task from "./Task";
import DateDay from "./DateDay";

export const TasksContext = createContext({
    tasksByDay: {},
    setTasksByDay: () => {} });

export const Day = ({ day, date }) => {

    const defaultTasks = {
      "Mon": ["organize your week", " "," "],
      "Tue": ["write your tasks","hover over","for checking"],
      "Wed": ["have fun", "take your notes"," "],
      "Thu": ["Plan"," "," "],
      "Fri": [" ","enjoy your week "," "],
      "Sat": ["relax"," "," "],
      "Sun": [" "," ","Funday"],
    };
    
    const today = new Date()
    const days = []
    const daysOfWeek = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    const [tasksByDay, setTasksByDay] = useState(defaultTasks[day]);

  
    const handleTaskChange = (taskIndex, value) => {
      const newTasksByDay = [...tasksByDay]; // create a new array copy
      newTasksByDay[taskIndex] = value;
  
      if (taskIndex === newTasksByDay.length - 1 && value !== "") {
        newTasksByDay.push("");
      }
  
      setTasksByDay(newTasksByDay);
  
      console.log("Tasks for " + day + ":", newTasksByDay);
      
    };

    const tasksByDayArray = daysOfWeek.map((day) => ({
        day,
        tasks: tasksByDay[day]
      }));

    useEffect(() => {
        localStorage.setItem("tasks",JSON.stringify(tasksByDayArray))
    },[tasksByDayArray])


    console.log(tasksByDayArray)
    


    

      // Find the date of Monday of the current week
  const mondayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);

  // Push the dates of Monday to Friday
  for (let i = 0; i < 5; i++) {
    const date = new Date(mondayDate.getFullYear(), mondayDate.getMonth(), mondayDate.getDate() + i);
    days.push(date);
  }

  // Push the dates of Saturday and Sunday
  for (let i = 0; i < 2; i++) {
    const date = new Date(mondayDate.getFullYear(), mondayDate.getMonth(), mondayDate.getDate() + 5 + i);
    days.push(date);
  }

    return (
      <TasksContext.Provider value={{ tasksByDay,setTasksByDay }}>
        <div className="mb-12">
          <DateDay date={date} day={day} />
          <ul>
            {tasksByDay&&tasksByDay.map((task, index) => (
              <li key={index}>
                <Task
                  value={task}
                  onChange={(value) => handleTaskChange(index, value)}
                />
              </li>
            ))}
          </ul>
        </div>
      </TasksContext.Provider>
    );
  };
  
