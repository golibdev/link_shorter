import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { LinkCard } from "../components/LinkCard"
import { Loader } from "../components/Loader"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hooks"

export const DetailPage = () => {
   const { token } = useContext(AuthContext)
   const { request, loading } = useHttp()
   const [link, setLink] = useState({})
   const linkId = useParams().id

   console.log(loading)

   const getLink = useCallback(async () => {
      try {
         const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
         })

         setLink(fetched)
      } catch (er) {}
   }, [token, linkId, request])

   useEffect(() => {
      getLink()
   }, [getLink])

   if(!loading) {
      return <Loader />
   } 

   return (
      <>
         { loading && <LinkCard link={link} /> }
      </>
   )
}