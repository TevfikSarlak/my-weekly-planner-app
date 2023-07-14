import React, { useEffect } from "react";
import Task from "./Task";
import DateDay from "./DateDay";


export const Day = ({ day, date,
                      tasksByDay, setTasksByDay, 
                      updateTasksByDay ,setTasksByDayArray,
                    }) => {
  
  const defaultTasks = {
    "Mon": ["organize your week", " ", " "],
    "Tue": ["write your tasks", "hover over", "for checking"],
    "Wed": ["have fun", "take your notes", " "],
    "Thu": ["Plan", " ", " "],
    "Fri": [" ", "enjoy your week ", " "],
    "Sat": ["relax", " ", " "],
    "Sun": [" ", " ", "Funday"],
  };

  const daysOfWeek = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


  useEffect(() => {
    if (tasksByDay) {
      const updatedTasksByDayArray = daysOfWeek.map((day) => ({
        day,
        tasks: tasksByDay[day],
      
      }));
  
      setTasksByDayArray(updatedTasksByDayArray);
      
    }
  }, [tasksByDay]);
  
  
  

  const handleTaskChange = (taskIndex, value) => {
    setTasksByDay(prevTasksByDay => {
      const newTasksByDay = { ...prevTasksByDay }; // create a new object copy
      newTasksByDay[day][taskIndex] = { task: value, isCompleted: false }; // create a new task object
    
      if (taskIndex === newTasksByDay[day].length - 1 && value !== "") {
        newTasksByDay[day].push({ task: "", isCompleted: false }); // add a new empty task object
      }
  
      return newTasksByDay;
    });
  
    updateTasksByDay(day, tasksByDay[day]); // call the updateTasksByDay function
  };
  

  const handleComplete = (taskIndex) => {
    setTasksByDay(prevTasksByDay => {
      const newTasksByDay = { ...prevTasksByDay }; // create a new object copy
      newTasksByDay[day][taskIndex].isCompleted = !newTasksByDay[day][taskIndex].isCompleted;
      return newTasksByDay;
    });
  }
  
  


  // Find the date of Monday of the current week
  const today = new Date();
  const mondayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() 
  );

  const days = [];

  // Push the dates of Monday to Friday
  for (let i = 0; i < 5; i++) {
    const date = new Date(
      mondayDate.getFullYear(),
      mondayDate.getMonth(),
      mondayDate.getDate() + i
    );
    days.push(date);
  }

  // Push the dates of Saturday and Sunday
  for (let i = 0; i < 2; i++) {
    const date = new Date(
      mondayDate.getFullYear(),
      mondayDate.getMonth(),
      mondayDate.getDate() + 5 + i
    );
    days.push(date);
  }

  

  

  return (
   
        <div className="mb-12">
          <DateDay date={date} day={day} />
          <ul>
          {tasksByDay[day] && tasksByDay[day].map((task, index) => (
            <li key={index}>
              <Task 
                value={task.task}
                onChange={(updateTasksByDay) => handleTaskChange(index, updateTasksByDay)}
                onComplete={() => handleComplete(index)}
                isCompleted={task.isCompleted}
              />
            </li>
          ))}
          </ul>
        </div>
      
    );
  };
