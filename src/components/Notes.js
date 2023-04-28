import React from "react";

export default function Notes({notes, setNotes, handleNotesChange}) {
    return (
        <div >
        
            <textarea
                placeholder="Enter your Notes here..."
                type="text"
                value={notes}
                onChange={handleNotesChange}
                className="rounded-sm  bg-amber-100 w-full focus:outline-none focus:border-none p-3
                           text-slate-800 h-60 mb-12 shadow-lg">
            </textarea>
        </div>
    )
}