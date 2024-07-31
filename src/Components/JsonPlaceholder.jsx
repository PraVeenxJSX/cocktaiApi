import React, { useEffect, useState } from 'react'

const APIurl = "https://jsonplaceholder.typicode.com/photos"

const JsonPlaceholder = () => {
    const[data, setData] = useState([])
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState({status:false, msg:""})
  
  const fetchData = async(APIurl) =>{
    setLoading(true)
    setError({status:false, msg:""})
    try {
      const response = await fetch(APIurl)
    const data = await response.json()
    setData(data)
    setLoading(false)
    setError({status: false, msg:""})
    } catch (error) {
      setLoading(false)
      setError({status: true, msg:"Something went wrong"})
    }
  }
  
  useEffect(() =>{
   fetchData(APIurl)
  },[])
  
  if(loading){
    return <div><h2>Loading...</h2></div>
  }
  
  if(error?.status){
    return <div><h2>{error.msg}</h2></div>
  }
  
    return (  
      <ul   className="list-container">
      {
        data.map((user) =>{
          const{id, title, url, thumbnailUrl} = user
          return < >
            <li className="list-item">
            <div>{title}</div>
            <div>{url}</div>
            <div>{thumbnailUrl}</div>
            <hr />
            </li>
          </>
        })
      }
      </ul>
    )
}

export default JsonPlaceholder