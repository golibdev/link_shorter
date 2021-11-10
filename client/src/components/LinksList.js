import { Link } from 'react-router-dom'
export const LinksList = ({ links }) => {

   if (!links.length) {
      return <p className="center">Link not found</p>
   }

   return (
      <table style={{ marginTop: '2rem' }}>
         <thead>
            <tr>
               <th style={{ border: '1px solid #000' }}>№</th>
               <th style={{ border: '1px solid #000' }}>Original</th>
               <th style={{ border: '1px solid #000' }}>Abbreviated</th>
               <th style={{ border: '1px solid #000' }}>Open</th>
            </tr>
         </thead>

         <tbody>
            { links.map((link, index)=> (
               <tr key={link._id}>
                  <td style={{ border: '1px solid #000' }}>{index + 1}</td>
                  <td style={{ border: '1px solid #000' }}>{link.from}</td>
                  <td style={{ border: '1px solid #000' }}>{link.to}</td>
                  <td style={{ border: '1px solid #000' }}>
                     <Link to={`/detail/${link._id}`}>Open</Link>
                  </td>
               </tr>
            )) }
         </tbody>
      </table>
   )
}
