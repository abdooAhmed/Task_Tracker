import logo from './logo.svg';
import './App.css';
import Header from './components/Header' 
import React from 'react';
import Tasks from './components/Tasks';
import { useState,useEffect } from 'react';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

function App() {
  const [ShowTask,setShowTask] = useState(false)
  const [tasks,setTasks] = useState([])


  useEffect(() => {
    const getTasks = async () =>{
      setTasks(await fetchTasks())
      
    }
    
    getTasks()
    console.log(tasks)
  },[])

  const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      
      return data
    }


    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      
      const data = await res.json()
      
      return data
    }


    const addTask = async (task) => {
      // const id = Math.floor(Math.random() * 10000) +1
      // const newTask = {id,...task}
      // setTasks([...tasks,newTask])
      const res = await fetch('http://localhost:5000/tasks',{
        method:'POST',
        headers : {
          'Content-type':'application/json',
        },
        body : JSON.stringify(task)
      })
      const data = await res.json()
      console.log(data)
      setTasks([...tasks,data])
    }
    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE',})
      setTasks(tasks.filter((task) => task.id !== id))
    }
    const Toggle = async (id) =>{
      var task =await fetchTask(id)
      task.reminder = !task.reminder
      const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method:'PUT',
        headers:{
          'Content-type' : 'application/json',
        },
        body:JSON.stringify(task),
    })
    const data = await res.json()
      setTasks(tasks.map((task)=> task.id===id?{...task,reminder:data.reminder}:task))
    }

    const ToggleShowTask =() =>{
      setShowTask(!ShowTask)
    }

  return (
    <Router>
    <div className="container">
      <Header onToggle={ToggleShowTask} showAdd={ShowTask} />
      <Routes>
      <Route path='/' element={
        <>
        {ShowTask && <AddTask onAdd={addTask}/>}
      { tasks.length >0 ? (<Tasks onToggle={Toggle} deleteTask={deleteTask} tasks={tasks}/>)
      :('No Tasks To Show')
      }
        </>
      }/>
       <Route path='/about' element={<About />} />
       </Routes>
      <Footer/>
    </div>
    </Router>
  );
}



export default App;
