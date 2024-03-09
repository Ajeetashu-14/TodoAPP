import { useState } from "react";

export function Todos({ todo }) {
    const [completedIds, setCompletedIds] = useState(new Set()); // Track completed TODOs by ID

    const markAsComplete = (id) => {
        fetch("http://localhost:3000/completed", {
            method: "PUT", // Make sure this matches your backend
            body: JSON.stringify({
                id: id // Sending the correct data
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if (res.ok) {
                    setCompletedIds(prev => new Set(prev.add(id))); // Update state to reflect the completed item
                }
            })
            .catch((error) => {
                console.error("Error marking todo as complete:", error);
            });
    };

    return <div>
        {todo.map((item) => (
            <div key={item._id}>
                <h2>{item.title}</h2>
                <h3>{item.description}</h3>
                <button onClick={() => markAsComplete(item._id)}>
                    {completedIds.has(item._id) ? "Completed" : "Mark as complete"}
                </button>
            </div>
        ))}
    </div>;
}



// export function Todos({ todo }) {
//     const [complete, setComplete] = useState(new Set())

//     return <div>
//         {todo.map(function (item) {
//             return <div>
//                 <h2>{item.title}</h2>
//                 <h3>{item.description}</h3>
//                 <button onClick={{
//                     function() {
//                         fetch("http://localhost:3000/completed", {
//                             method: "PUT",
//                             body: JSON.stringify({
//                                 completed: true
//                             }),
//                             headers: {
//                                 "Content-type": "application/json"
//                             }
//                         })
//                             .then(async function (res) {
//                                 setComplete(true)
//                             })
//                     }
//                 }}>{item.completed == true ? "Completed" : "Mark as complete"}</button>
//             </div>
//         })}
//     </div>
// }