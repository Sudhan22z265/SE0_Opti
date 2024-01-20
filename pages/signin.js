import React from 'react'
import Header from '../components/Header'
import SigninCompo from '../auth/SigninCompo'

const signin = () => {
  return (
    <React.Fragment>
      <Header/>
      <h2 className='text-center'>SignIn</h2>
      <div className='container'>
          <SigninCompo/>
      </div>
    </React.Fragment>

  )
}

export default signin