import React, { useEffect, useState } from "react";
import { Day } from "./Day";
import SaveButton from "../buttons/SaveButton";
import ClearButton from "../buttons/ClearButton";
import Notes from "./Notes";
import UserIcon from "../buttons/UserIcon";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { defaultTasks, firstTasks } from "../../utils";


export default function UserWeek({ userInitial }) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const today = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [savePage, setSavePage] = useState(false);
  const [clearPage, setClearPage] = useState(false);
  const [notes, setNotes] = useState("");
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const userTasksRef = doc(db, "users", userId);
  const [tasksByDay, setTasksByDay] = useState(firstTasks || {});
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false); // Set loading state to false after fetching tasks
      } catch (error) {
        console.error("Error fetching saved tasks: ", error);
      }
    };

    fetchSavedTasks();
  }, [userId, userTasksRef]);

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
      console.log(tasksByDay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [tasksByDay, savePage, notes, userId, userTasksRef]);

  // Clear tasks and notes
  useEffect(() => {
    if (clearPage && userId) {
      const clearTasksAndNotes = async () => {
        try {
          await setDoc(userTasksRef, {
            tasks: defaultTasks,
            notes: "",
          });
          console.log("Week document cleared successfully");
          setTasksByDay(defaultTasks);
          setNotes("");
        } catch (error) {
          console.error("Error clearing week document: ", error);
        }
      };

      clearTasksAndNotes();
      setClearPage(false);
    }
  }, [clearPage, userId, userTasksRef]);

  const handleClearButton = () => {
    setClearPage(true);
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

  function handleNotesChange(e) {
    setNotes(e.target.value);
  }

  if (isLoading) {
    return (  
    <div role="status"
         className="font-poppins flex flex-row justify-center items-center text-slate-700 h-screen font-bold text-lg"
    >
        <svg aria-hidden="true" 
             className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-indigo-800 " 
             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span>Loading...</span>
    </div>)
  }

  return (
    <div>
      {showAlert ? (
        <div className="flex flex-row pt-6  md:pt-4 mb-4 font-poppins items-center justify-center border-b-4 pb-4 border-slate-500 px-6 font-thin text-sm md:text-4xl  text-indigo-800  bg-green-50" role="alert">
          You saved your weekly tasks successfully.
        </div>
      ) : (
        <div className="flex flex-row mt-4 mb-4 font-poppins items-center justify-between border-b-4 pb-4 border-slate-500 px-6">
          <div className="text-2xl md:text-4xl text-slate-800 font-bold">
            {monthYear}
          </div>

          <div className="flex flex-row space-x-2 md:space-x-4 ">
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
        {tasksByDayArray.length > 0 &&
          tasksByDayArray.map(({ day, tasks }, index) => (
            <Day
              key={day}
              day={day}
              date={days[index].toLocaleString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
              })}
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
              handleNotesChange={handleNotesChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
