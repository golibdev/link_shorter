import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hooks'

export const CreatePage = () => {
   // const history = useHistory()
   const auth = useContext(AuthContext)
   const { request } = useHttp()
   const [link, setLink] = useState('')

   useEffect(() => {
      window.M.updateTextFields()
   }, [])

   const pressHandler = async (e) => {
      if(e.key === 'Enter') {
         try {
            await request('/api/link/generate', "POST", {from: link}, {
               Authorization: `Bearer ${auth.token}`
            })
         } catch (err) {}
      }
   }
   return (
      <div className="row">
         <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <div class="input-field">
               <input 
                  placeholder="Paste the link" 
                  id="links" 
                  type="text"
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  onKeyPress={pressHandler}
               />
               <label htmlFor="link">Enter the link</label>
            </div>
         </div>
      </div>
   )
}