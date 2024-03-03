import React from 'react'

const Header = () => {

    const handelSignout = () => {
        alert('User Logout')
    }
  return (
    <>
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
 <div class="container-fluid">
          

            <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Services</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contact</a>
                </li>
            </ul>

       
            <div class="d-flex">
                <button type="button" class="btn btn-danger" onClick={handelSignout}>Signout</button>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Header