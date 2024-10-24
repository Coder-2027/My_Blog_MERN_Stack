import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Label, TextInput, Button, Alert, Spinner} from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

function Signin() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.password || !formData.email){
      // setError("Please enter all fields")
      return dispatch(signInFailure("Please enter all fields"))
    }

    try {
      dispatch(signInStart())
      const res = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      // console.log(data.user);
      if(data && data.success === false){
        // console.log("data.messege ", data.messege);
        return dispatch(signInFailure(data.messege))
      }

      if(data){
        dispatch(signInSuccess(data.user));
        navigate('/')
      }
    } catch (error) {
      return dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className='min-h-screen mt-20 '>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to="/" className="text-4xl font-semibold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Mojij's
            </span>
            Blog
          </Link>

          <p className='text-sm mt-5'>
            This is a demo project. You can sign in with your email and password or with Google.
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email'/>
              <TextInput type='email' placeholder='name@gmail.com' id='email' onChange={handleChange} value={formData.email}/>
            </div>

            <div>
              <Label value='Your Password'/>
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} value={formData.password}/>
            </div>

            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {
                loading ? (<><Spinner size='sm'/>
                <span className='pl-3'>Loading...</span></>) : ('Sign In')
              }
            </Button>
            <OAuth/>
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't Have an account? </span>
            <Link to={'/signup'} className='text-blue-500'>
              Sign up
            </Link>
          </div>

          {
            error && <Alert className='mt-5' color='failure'>
              {error}
            </Alert>
          }
        </div>
      </div>
    </div>
  )
}

export default Signin