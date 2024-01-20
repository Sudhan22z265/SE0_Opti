import fetch from "isomorphic-fetch";
import {API} from '../config'

import React from 'react'

const signupauth = (user) => {
  return fetch(`${API}/signup`,{
    method:'POST',
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
    },
    body:JSON.stringify(user)
  })
  .then(response=>{
    return response.json();
  })
  .catch(err=>console.log(err))
}
const signinauth = (user) => {
  return fetch(`${API}/signin`,{
    method:'POST',
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
    },
    body:JSON.stringify(user)
  })
  .then(response=>{
    return response.json();
  })
  .catch(err=>console.log(err))
}

export {signupauth,signinauth}