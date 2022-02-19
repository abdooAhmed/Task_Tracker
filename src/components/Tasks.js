import { useState } from "react"
import Task from "./Task"


const Tasks = ({tasks,deleteTask,onToggle}) => {
    
  return (
    <>
    {tasks.map((task) => (<Task key={task.id} onToggle={onToggle} deleteTask={deleteTask} task={task} />)
    )}
    </>
    
  )
}

export default Tasks