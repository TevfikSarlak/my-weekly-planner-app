import React, { useEffect, useState } from "react";
import { Day } from "./Day";
import SaveButton from "./SaveButton";
import { useContext } from "react";
import { TasksContext } from './Day';

export default function Week() {
  const today = new Date();
  const daysOfWeek = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = [];
  const {tasks, setTasks} = useContext(TasksContext)
  const [savePage, setSavePage] = useState(false)

  function handleSaveButton(){
    setSavePage(true)
  }

  useEffect(()=>{
    if (savePage && tasks !== undefined) {
      localStorage.setItem('tasks',JSON.stringify({tasks}));
    }
  },[savePage, tasks]);

  

  console.log(tasks)

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks !== undefined) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(null)
    }
  }, []);
  
  
  



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

  const monthYear = mondayDate.toLocaleString("en-EN", { month: "long", year: "numeric" });

  return (
    <div>
      <div className="flex flex-row  my-4 font-poppins items-center justify-between border-b-4 pb-4 border-slate-500 px-6">
        <div className="text-2xl md:text-4xl text-slate-800 font-bold">{monthYear}</div>
        <SaveButton onClick={handleSaveButton}/> 
      </div>
      <div className="flex flex-col md:grid md:grid-cols-5 font-poppins mx-4 md:gap-6">
        {days.map((day) => (
          <Day key={day.getTime()} day={daysOfWeek[day.getDay()]} date={day.toLocaleString("fr-FR", { day: "2-digit", month: "2-digit" })} />
        ))}
      </div>
    </div>
  );
}
