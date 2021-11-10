import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hooks'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
   const auth = useContext(AuthContext)
   const message = useMessage()
   const { loading, request, error, clearErr } = useHttp()
   const [ form, setForm ] = useState({
      email: '', password: ''
   })

   useEffect(() => {
      message(error)
      clearErr()
   }, [error, message, clearErr])

   useEffect(() => {
      window.M.updateTextFields()
   }, [])

   const changeHandler = e => {
      setForm({ ...form, [e.target.name]: e.target.value })
   }

   const regiterHandler = async () => {
      try {
         const data = await request('/api/auth/register', 'POST', {...form})
         message(data.message)
      } catch (err) {
         
      }
   }

   const loginHandler = async () => {
      try {
         const data = await request('/api/auth/login', 'POST', {...form})
         // message(data.message)
         auth.login(data.token, data.userId)
      } catch (err) {
         
      }
   }

   return (
      <div classNameName="row">
         <div classNameName="col s6 offset-s3">
            <h1>Abbreviated link</h1>
            <div className="card blue darken-1">
               <div className="card-content white-text">
                  <span className="card-title">Register and Login</span>
                  <div>

                     <div class="input-field">
                        <input 
                           placeholder="Enter the email" 
                           id="email" 
                           type="text" 
                           name="email"
                           className="yellow-input"
                           value={form.email}
                           onChange={changeHandler}
                        />
                        <label htmlFor="email">Email</label>
                     </div>

                     <div class="input-field">
                        <input 
                           placeholder="Enter the password" 
                           id="password" 
                           type="password"
                           name="password" 
                           className="yellow-input"
                           value={form.password}
                           onChange={changeHandler}
                        />
                        <label htmlFor="password">Password</label>
                     </div>

                  </div>
               </div>
               <div className="card-action">
                  <button 
                     className="btn yellow darken-4" 
                     style={{marginRight: 10}} 
                     onClick={loginHandler}
                     disabled={loading}
                  >
                     Login
                  </button>
                  <button 
                     className="btn grey lighten-1 black-text"
                     onClick={regiterHandler}
                     disabled={loading}
                  >
                     Register
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}