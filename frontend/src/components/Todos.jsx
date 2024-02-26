
export function Todos({ todo }) {
    return <div>
        {todo.map(function (item) {
            return <div>
                <h2>{item.title}</h2>
                <h3>{item.description}</h3>
                <button>{item.completed == true ? "Completed" : "Mark as complete"}</button>
            </div>
        })}
    </div>
}
