import React from 'react'
import SignupCompo from '../auth/SignupCompo'
import Header from '../components/Header'

const signup = () => {
  return (
    <div>
        <Header/>
        <h2 className='text-center'>SignUp</h2>
        <div className='container  '>
        <SignupCompo/>

        </div>
        

    </div>
  )
}

export default signup