import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'


function App() {


  const [currentTodo, setcurrentTodo] = useState("")
  const [todolist, settodolist] = useState([])
  const [showCompleted, setshowCompleted] = useState(true)

  useEffect(() => {
    let localTodo = localStorage.getItem('todolist')
    if (localTodo) {
      let parsedLocalTodo = JSON.parse(localTodo);
      settodolist([...parsedLocalTodo]);
    }


  }, [])


  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(todolist))
    let localTodo = localStorage.getItem('todolist')
    let parsedLocalTodo = JSON.parse(localTodo)
  })


  return (
    <div >
      <Navbar />
      <div className='flex flex-col items-center justify-center  w-[80%] m-auto'>
        <div className='todoEntry flex justify-center gap-1  w-[80%] max-sm:w-[100%]  p-3 m-3'>
          <input type="text" autoComplete="off" name="text" className="input rounded-[50px]" value={currentTodo} onChange={(e) => {
            setcurrentTodo(e.target.value)
          }} onKeyDown={(e)=>{
            if (e.key=='Enter'){
              if (currentTodo) {
              settodolist([...todolist, { title: (currentTodo), state: false }])
              setcurrentTodo("")
            }
            }
          }} placeholder="EnterTodo"></input>

          <button className="addBtn sm:text-[6px]" onClick={(e) => {
            if (currentTodo) {
              settodolist([...todolist, { title: (currentTodo), state: false }])
              setcurrentTodo("")
            }
          }}>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Add Todo</span>
          </button>

        </div>


        <div className="todoList w-[70%] max-sm:w-[90%] flex items-center flex-col ">
          <div className='flex gap-2'>
            <span>
              Show Completed Tasks
            </span>
            <div class="toggle-wrapper">
              <input class="toggle-checkbox" type="checkbox" checked={`${showCompleted?'checked':''}`} onChange={(e)=>{
                if (showCompleted!=e.target.checked){
                  setshowCompleted(e.target.checked)
                }
              }}/>
              <div class="toggle-container">
                <div class="toggle-button">
                  <div class="toggle-button-circles-container">
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {todolist.map((todo, index) => {
            return (
              <div key={index} className={` ${(todo.state) ? 'bg-green-200' : ""} todoItem flex justify-between items-center m-1 max-sm:w-[70vw] w-[98%] `} style={{display:`${(()=>{
                if (todo.state){
                if ((todo.state)!=showCompleted){
                  return('none')}
                  else{
                    return('flex')
                    
                  }}
                })()
              }`}}>
                <p  className='overflow-x-auto' >{todo.title}</p>
                <div className='flex items-center gap-4 justify-center'>
                  <label class="container">
                    <input type="checkbox" checked={`${(todo.state) ? 'checked' : ''}`} onChange={(e) => {
                      if (e.target.checked != todo.state) {
                        todolist[index].state = e.target.checked
                        settodolist([...todolist])
                      }
                      

                    }} />
                    <div className="checkmark"></div>
                  </label>
                  <button className="Btn" style={{ display: `${todo.state ? 'none' : 'flex'}` }} onClick={() => {
                    let changedArray = todolist.filter((elem, ind) => {
                      if (ind == index) {
                        return (false)
                      }
                      else {
                        return (true)
                      }
                    })
                    settodolist([...changedArray])
                    setcurrentTodo(todo.title)
                  }}>
                    <svg className="svg" viewBox="0 0 512 512">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                  </button>
                  <button class="bin-button" onClick={()=>{
                    let changedArray = todolist.filter((elem,ind)=>{
                      if (ind == index){
                        return (false)
                      }
                      else{
                       return (true)
                      }
                    })
                    settodolist([...changedArray])
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 39 7"
                      class="bin-top"
                    >
                      <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                      <line
                        stroke-width="3"
                        stroke="white"
                        y2="1.5"
                        x2="26.0357"
                        y1="1.5"
                        x1="12"
                      ></line>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 33 39"
                      class="bin-bottom"
                    >
                      <mask fill="white" id="path-1-inside-1_8_19">
                        <path
                          d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                        ></path>
                      </mask>
                      <path
                        mask="url(#path-1-inside-1_8_19)"
                        fill="white"
                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                      ></path>
                      <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                      <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 89 80"
                      class="garbage"
                    >
                      <path
                        fill="white"
                        d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                      ></path>
                    </svg>
                  </button>


                </div>

              </div>
            )
          })}
        </div>
      </div>

    </div>)

}

export default App
