"use client"
import { ChangeEvent, FormEvent, useState } from "react";

export default function LoginPage() {

  const [credentials, setCredentials] = useState<{ user: string, password: string }>({ user: "", password: "" });

  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { user, password } = credentials;
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: user, password })
    })
    console.log({ user, password })
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value })
  }

  return <div className="flex justify-center items-center min-h-[75vh]">
    <form className="flex flex-col h-[20vh] justify-between w-1/3 rounded-2xl bg-slate-400 p-5" onSubmit={signIn} autoComplete="off" >
      <input autoComplete="username" className="h-10 rounded-sm p-2 bg-slate-300 text-black" type="text" name="user" value={credentials.user} placeholder="Username" onChange={handleChange} />
      <input autoComplete="current-password" className="h-10 rounded-sm p-2 bg-slate-300 text-black" type="password" name="password" value={credentials.password} placeholder="Password" onChange={handleChange} />
      <button className="h-10 bg-slate-800 text-white rounded-sm p-2 " type="submit">Login</button>
    </form>
  </div>
}