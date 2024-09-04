import React from 'react' 
import {Card, CardHeader, CardTitle,CardContent} from '@/components/ui/card'
import { Label } from './ui/label'
import { Select, SelectTrigger,SelectContent,SelectValue,SelectItem } from './ui/select'
import { Input } from './ui/input' 
import { Button } from './ui/button' 
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'




const Loginpage = () => { 

// const handleLogin = async (e)=>{
//   e.preventDefault();
//   try{
//     const response = await axios.post('http://testapi',{
//       username,
//       password
//     })
//     if(response.data.status === 'success'){
//       sessionStorage.setItem('username',username);
//       sessionStorage.setItem('password',password);
//       useNavigate('/Dashboard')
//     }
//     } catch(error) {
//       console.log(error);
//     }
// }

  return (
    <>
     <div className='container min-w-screen h-screen flex justify-center items-center '>
     <Card className="card min-w-96">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        
          <div className="cardcontentcontainer flex flex-col gap-4">
            <div className="usernamecontainer ">
              <Label htmlFor="name">Username</Label>
              <Input id="username" placeholder="Enter username" 
              
              />
            </div>
            <div className="passwordcontainer ">
              <Label htmlFor="framework">Password</Label>
              <Input type='password' placeholder='Enter Password' ></Input>
            </div>
            <div className='logincontainer'>
                <NavLink to='/Dashboard'><Button 
                // onclick={handleLogin()}
                >Login</Button></NavLink>
            </div>
          </div>
        
      </CardContent>
    </Card>
    </div>
    </>
  )
}

export default Loginpage