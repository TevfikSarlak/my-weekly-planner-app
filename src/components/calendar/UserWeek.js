import React, { useEffect, useState } from "react";
import { Day } from "./Day";
import SaveButton from "../buttons/SaveButton";
import ClearButton from "../buttons/ClearButton";
import Notes from "./Notes";
import UserIcon from "../buttons/UserIcon";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firstTasks } from "../../utils";
import LoadingPage from "../common/LoadingPage";

export default function UserWeek({ userInitial }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const today = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [savePage, setSavePage] = useState(false);
  const [clearPage, setClearPage] = useState(false);
  const [notes, setNotes] = useState("");
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const userTasksRef = doc(db, "users", userId);
  const [tasksByDay, setTasksByDay] = useState(firstTasks || []);
  const [showAlert, setShowAlert] = useState(false);

  const defaultTasks = {
    Mon: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Tue: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Wed: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Thu: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Fri: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Sat: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
    Sun: [{ task: "", isCompleted: false }, { task: "", isCompleted: false }, { task: "", isCompleted: false }],
  };

  

  function updateTasksByDay(day, newTasks) {
    setTasksByDay((prevTasksByDay) => ({
      ...prevTasksByDay,
      [day]: newTasks,
    }));
  }

  const [tasksByDayArray, setTasksByDayArray] = useState(
    daysOfWeek.map((day) => ({
      day,
      tasks:
        tasksByDay[day]?.map((task) => ({
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
        if (userId) {
          const userTasksSnapshot = await getDoc(userTasksRef);
          if (userTasksSnapshot.exists()) {
            const userTasksData = userTasksSnapshot.data();
            setTasksByDay(userTasksData.tasks);
            setNotes(userTasksData.notes);
          } else {
            // Use firstTasks as the default if the document doesn't exist
            setTasksByDay(firstTasks);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching saved tasks: ", error);
      }
    };

    fetchSavedTasks();
  }, [userId]);

  // Save tasks and notes to Firestore
  useEffect(() => {
    let timeoutId;

    if (savePage && tasksByDay && userId) {
      const saveTasksToFirestore = async () => {
        try {
          await setDoc(userTasksRef, {
            tasks: tasksByDay,
            notes,
          });
          console.log("Week document updated successfully");
          setShowAlert(true);
          timeoutId = setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        } catch (error) {
          console.error("Error updating week document: ", error);
        }
      };

      saveTasksToFirestore();
      setSavePage(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [savePage, userId]);


  // Clear tasks and notes
  const handleClearButton = () => {
    setClearPage(true);
  };

  useEffect(() => {
    if(clearPage){
      setTasksByDay(defaultTasks);
      setClearPage(false);
      setNotes("");
    }  
  },[clearPage, userId])


  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

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

  const monthYear = today.toLocaleString("en-EN", {
    month: "long",
    year: "numeric",
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      {showAlert ? (
        <div className="flex flex-row pt-6 md:pt-4 mb-4 font-poppins items-center justify-center border-b-4 pb-4 border-slate-500 px-6 font-thin text-sm md:text-4xl text-indigo-800 bg-green-50" role="alert">
          You saved your weekly tasks successfully.
        </div>
      ) : (
        <div className="flex flex-row mt-4 mb-4 font-poppins items-center justify-between border-b-4 pb-4 border-slate-500 px-6">
          <div className="text-2xl md:text-4xl text-slate-800 font-bold">
            {monthYear}
          </div>
          <div className="flex flex-row space-x-2 md:space-x-4">
            <SaveButton onClick={handleSaveButton} />
            <ClearButton onClick={handleClearButton} />
            <UserIcon
              isLoggedin={isLoggedin}
              userInitial={userInitial}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col md:grid md:grid-cols-5 font-poppins mx-4 md:gap-6">
        {daysOfWeek.map((day, index) => (
          <Day
            key={day}
            day={day}
            date={days[index].toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
            })}
            tasksByDay={tasksByDay}
            setTasksByDay={setTasksByDay}
            defaultTasks={defaultTasks}
            updateTasksByDay={updateTasksByDay}
            setTasksByDayArray={setTasksByDayArray}
          />
        ))}

        <div className="flex flex-col md:grid md:col-start-3 md:col-end-6 md:col-span-2 h-48 font-poppins">
          <div className="col-span-2"></div>
          <div className="col-span-2 col-end-6">
            <Notes
              notes={notes}
              setNotes={setNotes}
              handleNotesChange={handleNotesChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
