import React, { useEffect, useState } from "react";
import { Day } from "./Day";
import SaveButton from "../buttons/SaveButton";
import ClearButton from "../buttons/ClearButton";
import Notes from "./Notes";
import UserIcon from "../buttons/UserIcon";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function Week() {

  const defaultTasks = {
    Mon: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Tue: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Wed: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Thu: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Fri: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Sat: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Sun: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
  };
  
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false)
  const today = new Date();
  const daysOfWeek = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [savePage, setSavePage] = useState(false);
  const [clearPage, setClearPage] = useState(false);
  const [notes, setNotes] = useState("")

  const [tasksByDay, setTasksByDay] = useState({
    Mon: [{ task: "organize your week😊", isCompleted: false }, { task: " ", isCompleted: false }, { task: " ", isCompleted: false }],
    Tue: [{ task: "write your tasks", isCompleted: false }, { task: "hover over for checking", isCompleted: false }, { task: "", isCompleted: false }],
    Wed: [{ task: "have fun", isCompleted: false }, { task: "take your notes📕", isCompleted: false }, { task: "", isCompleted: false }],
    Thu: [{ task: "Plan", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Fri: [{ task: "Save&Clear", isCompleted: false }, { task: "Not forget to save ", isCompleted: false }, { task: "", isCompleted: false }],
    Sat: [{ task: "relax", isCompleted: false }, { task: "Enjoy your week", isCompleted: false }, { task: "", isCompleted: false }],
    Sun: [{ task: "Funday🌞", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
  });
 
  

  function updateTasksByDay(day, newTasks) {
    setTasksByDay((prevTasksByDay) => ({
      ...prevTasksByDay,
      [day]: newTasks,
    }));
  }

  const [tasksByDayArray, setTasksByDayArray] = useState(
    daysOfWeek.map((day) => ({
      day,
      tasks: tasksByDay[day].map((task) => ({
        task: task.task,
        isCompleted: task.isCompleted
      })),
    }))
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    });
  }, []);


  useEffect(() => {
    const savedTasksForWeek = JSON.parse(localStorage.getItem("savedTasksForWeek"));
    const savedNotes = JSON.parse(localStorage.getItem("savedNotes"))
    if (savedTasksForWeek) {
      setTasksByDay(savedTasksForWeek);
    }
    if (savedNotes) {
      setNotes(savedNotes)
    }
  }, []); 

  function handleSaveButton() {
    setSavePage(true);
  }

  useEffect(() => {
    if (savePage) {
      localStorage.setItem("savedTasksForWeek", JSON.stringify(tasksByDay));
      localStorage.setItem("savedNotes",JSON.stringify(notes))
      setSavePage(false);
    }
  },[tasksByDay, savePage, notes])

  function handleClearButton () {
     setClearPage(true)
  }

  useEffect(() => {
    if (clearPage) {
      localStorage.removeItem("savedTasksForWeek")
      localStorage.removeItem("savedNotes")
      setTasksByDay(defaultTasks)
      setClearPage(false)
      setNotes(" ")
    }
  },[clearPage, notes, defaultTasks])
  
 

   // Find the date of Monday of the current week
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
 
  const monthYear = today.toLocaleString("en-EN", { month: "long", year: "numeric" });

  function handleNotesChange(e) {
      setNotes(e.target.value)
  }

 
  return (
    
    <div>
      <div className="flex flex-row my-4 font-poppins items-center justify-between border-b-4 pb-4 border-slate-500 px-6">
        <div className="text-2xl md:text-4xl text-slate-800 font-bold">{monthYear}</div>

        <div className="flex flex-row space-x-2 md:space-x-4 ">
          <SaveButton onClick={handleSaveButton} />
          <ClearButton onClick={handleClearButton} />
          <UserIcon isLoggedin={isLoggedin}/>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-5 font-poppins mx-4 md:gap-6">
        {tasksByDayArray.map(({ day, tasks }, index) => (
          <Day
          key={day}
          day={day}
          date={days[index].toLocaleString("fr-FR", { day: "2-digit", month: "2-digit" })}
          tasks={tasks}
          tasksByDay={tasksByDay}
          setTasksByDay={setTasksByDay}
          updateTasksByDay={updateTasksByDay}
          tasksByDayArray={tasksByDayArray} 
          setTasksByDayArray={setTasksByDayArray}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
        />
        ))}

        <div className="flex flex-col md:grid md:col-start-3 md:col-end-6 md:col-span-2 h-48 font-poppins">
            <div className="col-span-2"></div>
            <div className="col-span-2 col-end-6">
              <Notes
                notes={notes}
                setNotes={setNotes}
                handleNotesChange={handleNotesChange} />
            </div>
        </div>
        
      </div>
    </div>
    
  );
}