import React, {useEffect, useState} from 'react'
import { GetStaticProps } from 'next'
import { Button, Input } from 'src/components'
import { useApi } from 'src/hooks'
import { api } from 'src/constants/api'


export default function Login() {
  const {request} = useApi()

  const onLogin = async () => {
    const res = await request(api.auth.login)
    console.log('res', res)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className="text-3xl font-bold underline">LOGIN</h1>
      <Input />
      <Button onClick={onLogin} label="Login"/>
    </div>
  )
}