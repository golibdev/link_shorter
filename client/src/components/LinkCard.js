export const LinkCard = ({ link }) => {
   return (
      <>
         <h2>Link</h2>

         <p>
            This link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
         </p>
         <p>
            From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
         </p>
         <p>
            Count clicked links: <strong>{link.clickLinks}</strong>
         </p>
         <p>Created date: <stron>{new Date(link.date).toLocaleDateString()}</stron></p>
      </>
   )
}