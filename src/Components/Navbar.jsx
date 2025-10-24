  import React from 'react'
  import './Navbar.css'
  const Navbar = () => {
    return (
      <div>
        <ul className="nav">
    <li className="logo">tudu</li>
    <li   onClick={()=>{
      window.open('https://github.com/SajalRawat', '_blank');
    }}><i data-feather="github" ></i>Github</li>
    <li onClick={()=>{
       window.open('https://www.linkedin.com/in/sajal-rawat', '_blank');
    }}><i data-feather="LinkedIn" ></i>LinkedIn</li>
  </ul>
      </div>
    )
  }

  export default Navbar
