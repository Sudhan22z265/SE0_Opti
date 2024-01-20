import fetch from "isomorphic-fetch";
import {API} from '../config'
import cookie from 'js-cookie'
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

const setCookie = (key, value) => {
  if (typeof window !== 'undefined') {
    // Update the cookie.set call to pass options as an object
    cookie.set(key, value, { expires: 60 * 60 * 24 });
  }
}


const removeCookie = (key) =>{
  if(typeof window !== 'undefined')
  {
    cookie.remove(key,{expiresIn:60*60*24})
  }
}

const getCookie = (key) =>{
  if(typeof window !== 'undefined')
  {
    cookie.get(key)
  }
}
const setLocalStorage = (key,value) =>{
  if(typeof window !== 'undefined'){
    localStorage.setItem(key,JSON.stringify(value))
  }
}
const removeLocalStorage = (key) =>{
  if(typeof window !== 'undefined'){
    localStorage.removeItem(key)
  }
}
const authenticate = (data,next) => {
  setCookie('token',data.token)
  setLocalStorage('user',data.user)
  next();
}
const isAuth = () => {
  if(typeof window !== 'undefined'){
    const cook = getCookie('token')
      if(cook){
        if(localStorage.getItem('user'))
        return localStorage.getItem('user');
      }
      else{
        return false
      }
    }
  }

export {signupauth,signinauth,authenticate,isAuth}