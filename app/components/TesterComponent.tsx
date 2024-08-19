'use client'
import React, { useState } from 'react'
import Button from './Button'
import axios from 'axios'
import toast from 'react-hot-toast'

const TesterComponent = () => {

    const [results, setResults] = useState<string>('no data yet!');
  return (
    <div>
        <Button label="test" onClick={async ()=>{
            //alert('tester');
            try{
            const response = await axios.post("/api/posts/create", {
                content: 'content from tester component'
              });
        
              if (response.status == 201){
                toast.success("Post Created");
                setResults(JSON.stringify(response.data));
              }else{
                toast.error("Registration failed with error code: "+response.status);
              }
        
            } catch (e:any) {
              console.log(e);
              toast.success('test');
            }
        }}/>

        <h1 className='text-white'>{results}</h1>
    </div>
  )
}

export default TesterComponent