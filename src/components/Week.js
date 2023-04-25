import React, { useEffect, useState, useContext } from "react";
import { Day } from "./Day";
import SaveButton from "./SaveButton";
import { TasksContext } from "./Day";

export default function Week() {
  const today = new Date();
  const daysOfWeek = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [savePage, setSavePage] = useState(false);
  const { tasksByDay,setTasksByDay } = useContext(TasksContext);

  const days = []

 

  const defaultTasks = {
    "Mon": ["organize your week", " "," "],
    "Tue": ["write your tasks","hover over","for checking"],
    "Wed": ["have fun", "take your notes"," "],
    "Thu": ["Plan"," "," "],
    "Fri": [" ","enjoy your week "," "],
    "Sat": ["relax"," "," "],
    "Sun": [" "," ","Funday"],
  };


  
  function handleSaveButton() {
    setSavePage(true);
    
  }

  console.log(tasksByDay)

  

  // Combine default tasks and saved tasks into an array of objects
  const tasksByDayArray = daysOfWeek.map((day) => ({
    day,
    tasks: tasksByDay[day]
  }));

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
  
 
  


  const monthYear = today.toLocaleString("en-EN", { month: "long", year: "numeric" });

  return (
    <div>
      <div className="flex flex-row my-4 font-poppins items-center justify-between border-b-4 pb-4 border-slate-500 px-6">
        <div className="text-2xl md:text-4xl text-slate-800 font-bold">{monthYear}</div>
        <SaveButton onClick={handleSaveButton} />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-5 font-poppins mx-4 md:gap-6">
        {tasksByDayArray.map(({ day, tasks }, index) => (
          <Day
          key={day}
          day={day}
          date={days[index].toLocaleString("fr-FR", { day: "2-digit", month: "2-digit" })}
          tasks={tasks}
        
        />
        ))}
      </div>
    </div>
  );
}
