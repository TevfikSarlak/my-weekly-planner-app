import React, { useEffect, useState } from "react";
import { Day } from "./Day";
import SaveButton from "../buttons/SaveButton";
import ClearButton from "../buttons/ClearButton";
import Notes from "./Notes";
import UserIcon from "../buttons/UserIcon";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, getDocs, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { defaultTasks, firstTasks } from "../../utils";

export default function UserWeek() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const today = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [savePage, setSavePage] = useState(false);
  const [clearPage, setClearPage] = useState(false);
  const [notes, setNotes] = useState("");
  const defaultTasksRef = doc(db, "weeks", "default");
  const [tasksByDay, setTasksByDay] = useState(firstTasks || {});

  function updateTasksByDay(day, newTasks) {
    setTasksByDay((prevTasksByDay) => ({
      ...prevTasksByDay,
      [day]: newTasks,
    }));
  }

  const [tasksByDayArray, setTasksByDayArray] = useState(
    daysOfWeek.map((day) => ({
      day,
      tasks: tasksByDay[day]?.map((task) => ({
        task: task.task,
        isCompleted: task.isCompleted,
      })) || [],
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

  function handleSaveButton() {
    setSavePage(true);
  }

  // Fetch saved tasks from Firestore
  useEffect(() => {
    const fetchSavedTasks = async () => {
      try {
        const defaultTasksSnapshot = await getDoc(defaultTasksRef);
        if (defaultTasksSnapshot.exists()) {
          const defaultTasksData = defaultTasksSnapshot.data();
          setTasksByDay(defaultTasksData.tasks);
          setNotes(defaultTasksData.notes);
        } else {
          // Use firstTasks as the default if the document doesn't exist
          setTasksByDay(firstTasks);
        }
      } catch (error) {
        console.error("Error fetching saved tasks: ", error);
      }
    };

    fetchSavedTasks();
  }, []);

  // Save tasks and notes to Firestore
  useEffect(() => {
    if (savePage && tasksByDay) {
      const saveTasksToFirestore = async () => {
        try {
          await setDoc(defaultTasksRef, {
            tasks: tasksByDay,
            notes,
          });
          console.log("Week document updated successfully");
        } catch (error) {
          console.error("Error updating week document: ", error);
        }
      };

      saveTasksToFirestore();
      setSavePage(false);
      console.log(tasksByDay);
    }
  }, [tasksByDay, savePage, notes]);

  function handleClearButton() {
    setClearPage(true);
  }

  useEffect(() => {
    if (clearPage) {
      setTasksByDay(defaultTasks);
      setClearPage(false);
      setNotes(" ");
    }
  }, [clearPage, notes, defaultTasks]);

  // Find the date of Monday of the current week
  const mondayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

  const days = [];

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

  function handleNotesChange(e) {
    setNotes(e.target.value);
  }

  return (
    <div>
      <div className="flex flex-row my-4 font-poppins items-center justify-between border-b-4 pb-4 border-slate-500 px-6">
        <div className="text-2xl md:text-4xl text-slate-800 font-bold">{monthYear}</div>

        <div className="flex flex-row space-x-2 md:space-x-4 ">
          <SaveButton onClick={handleSaveButton} />
          <ClearButton onClick={handleClearButton} />
          <UserIcon isLoggedin={isLoggedin} />
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-5 font-poppins mx-4 md:gap-6">
        {tasksByDayArray.length > 0 &&
          tasksByDayArray.map(({ day, tasks }, index) => (
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
            <Notes notes={notes} setNotes={setNotes} handleNotesChange={handleNotesChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
