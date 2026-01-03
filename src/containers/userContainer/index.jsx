import React, { useEffect } from 'react'
import UserListPage from '../../pages/userlist'
import { useDispatch, useSelector } from 'react-redux'
import { getUserList } from '../../pages/userlist/userThunk'

const UserContainer = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state)
    useEffect(()=>{
        dispatch(getUserList())
    },[])
  return (
    <div><UserListPage/></div>
  )
}

export default UserContainer