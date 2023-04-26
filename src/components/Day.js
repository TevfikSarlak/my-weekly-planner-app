import React, { useState, useEffect } from "react";
import Task from "./Task";
import DateDay from "./DateDay";


export const Day = ({ day, date,
                      tasksByDay, setTasksByDay, 
                      updateTasksByDay ,
                      tasksByDayArray,setTasksByDayArray}) => {
  
  const defaultTasks = {
    "Mon": ["organize your week", " ", " "],
    "Tue": ["write your tasks", "hover over", "for checking"],
    "Wed": ["have fun", "take your notes", " "],
    "Thu": ["Plan", " ", " "],
    "Fri": [" ", "enjoy your week ", " "],
    "Sat": ["relax", " ", " "],
    "Sun": [" ", " ", "Funday"],
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


  useEffect(() => {
    if (tasksByDay) {
      const updatedTasksByDayArray = daysOfWeek.map((day) => ({
        day,
        tasks: tasksByDay[day],
      }));
  
      setTasksByDayArray(updatedTasksByDayArray);
      console.log("Tasks by day array:", updatedTasksByDayArray);
    }
  }, [tasksByDay]);
  
  
  

  const handleTaskChange = (taskIndex, value) => {
    setTasksByDay(prevTasksByDay => {
      const newTasksByDay = { ...prevTasksByDay }; // create a new object copy
      newTasksByDay[day][taskIndex] = value;
  
      if (taskIndex === newTasksByDay[day].length - 1 && value !== "") {
        newTasksByDay[day].push("");
      }
  
      return newTasksByDay;
    });
  
    console.log("Tasks for " + day + ":", tasksByDay);
    updateTasksByDay(day, tasksByDay[day]); // call the updateTasksByDay function
  };
  


  // Find the date of Monday of the current week
  const today = new Date();
  const mondayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1
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

  console.log(tasksByDayArray)

  

  return (
   
        <div className="mb-12">
          <DateDay date={date} day={day} />
          <ul>
          {tasksByDay[day] && tasksByDay[day].map((task, index) => (
            <li key={index}>
              <Task
                value={task}
                onChange={(value) => handleTaskChange(index, value)}
              />
            </li>
          ))}

          </ul>
        </div>
      
    );
  };
