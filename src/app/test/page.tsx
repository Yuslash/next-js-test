'use client'

import { useState } from "react"

interface User {
    id : string
    name : string
    email :string
}

export default function Test() {

    const [users, setUsers] = useState<User[]>([])
    const [name ,setName] = useState('')
    const [email ,setEmail] = useState('') 

    const fetchUsers = async () =>
    {
        const res = await fetch('/api/users')
        
        const data = await res.json()

        setUsers(data)
    }

    const addUsers = async () =>
    {
        await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            
            },
            
            body : JSON.stringify({name , email}),
        })

        fetchUsers()
    }

    return (
        <div>
            <h1>Test API</h1>
            <input 
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <input 
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={addUsers}>addusers</button>
            <button className="pl-3" onClick={fetchUsers}>fetchusers</button>

            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name} ({user.email})</li>
                ))}
            </ul>

        </div>
    )

}

