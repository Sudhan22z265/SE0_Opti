import React, { useState,useEffect } from 'react'
import {signupauth,isAuth} from '../actions/auth'
import { useRouter } from 'next/router';

const SignupCompo = () => {
    const router = useRouter()
    const [values,setValues] = useState({name:'',email:'',password:'',loading:false,error:'',message:'',showForm:true});
    const handleSubmit = (e) =>{
        e.preventDefault()
         const {name,email,password} = values
        const user = {name,email,password}

        signupauth(user)
        .then((data)=>{
            console.log(data.error)
            if(data.error){
                setValues ({...values,loading:false,error:data.error})
            }
            else{
                setValues ({...values,name:'',email:'',password:'',loading:false,error:'',message:data.message,showForm:false})
            }
        }
        )
        
    }
    useEffect(() => {
        isAuth() && router.push('/')
      }, [])
    
    const showLoading = () => (values.loading? <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>:'')
    const showMessage = () => (values.message? <div class="alert alert-success" role="alert">{values.message}</div>:'')
    const showError = () => (values.error? <div class="alert alert-danger" role="alert">{values.error}</div>:'')
  return (
    <div>
        {showLoading()}
        {showMessage()}
        {showError()}
        {values.showForm && <form onSubmit={handleSubmit}>
        <div className="row mb-3">
        <label htmlFor="inputName3" className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
            <input type="text" className="form-control" id="inputName3" placeholder='Enter your name'value={values.name} onChange={(e)=>setValues({...values,name:e.target.value})}/>
        </div>
        </div>
        <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3" placeholder='Enter the email' value={values.email} onChange={(e)=>setValues({...values,email:e.target.value})}/>
        </div>
        </div>
        <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
        <input type="password" className="form-control" id="inputPassword3" placeholder='Enter password' value = {values.password} onChange={(e)=>setValues({...values,password:e.target.value})}/>
        </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
        </form>}
    </div>
  )
}

export default SignupCompo