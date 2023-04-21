import React from "react";
import Task from "./Task";
import DateDay from "./DateDay";

export const Day = ({ day, date }) => {
    return (
        <div className="mb-8"> 
            <DateDay date={date} day={day} />
            <Task />
            <Task />
            <Task />
        </div>
    )
}
