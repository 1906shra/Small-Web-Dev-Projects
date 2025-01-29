"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


import {toast} from "react-hot-toast"

export default function ProfilePage(){
      const router = useRouter()
      const [data,setData] = useState("nothing")
    const logout= async()=>{
            try {
                axios.get('/api/users/logout')
                toast.success('Logout Successfull')
                router.push('/')
            } catch (error:any) {
                console.log(error.message);
                toast.error(error.message)
            }
    }

    const getUserDetails = async ()=>{
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }
    return(
        <div>
            <h1>Profile Page</h1>
            <hr/>
            <p>This is a profile page</p>
           <h2
            className="p- padding rounded bg-green-500"
           >{data === 'nothing' ? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              
            >Logout</button>

<button
            onClick={getUserDetails}
            className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              
            >getUserDetails
            </button>
            </div>
           

    )
}