import React, { useState, useEffect } from "react";

const url = "https://jsonplaceholder.typicode.com/users";

const UseEffect = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({status: false, msg: ""});

  const userDetails = async (url) => {
    setLoading(true);
    setIsError({status: false, msg: ""})
   
   try {
    const promise = await fetch(url);
    const data = await promise.json();
    setUser(data);
    setLoading(false)
    setIsError({status: false, msg: ""})
   } catch (error) {
        setLoading(false);
        setIsError({status: true, msg: "Something went wrong please try again"})
   }
  }
    

  useEffect(() => {
    userDetails(url);
  }, []);

  if(loading){
    return(
        <div>
        <h1>
            Loading...
        </h1>
    </div>
    )
   
  };

  if(isError?.status){
    return(
        <div>
            <h3>{isError?.msg}</h3>
        </div>
    )
  }

 

  return (
    <div>
      <ul>
        {user.map((eachUser) => {
          const { id, name, email, address, username } = eachUser;
          return (
            <li key={id}>
              <div>{id}</div>
              <div>{name}</div>
              <div>{email}</div>
              <div>{username}</div>
              <div>{address.street}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UseEffect;
