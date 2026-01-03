import React, { useEffect } from 'react'
import UserListPage from '../../pages/userlist'
import { useDispatch, useSelector } from 'react-redux'
import { getUserList } from '../../pages/userlist/userThunk'

const UserContainer = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state)
    useEffect(() => {
        dispatch(getUserList())
    }, [])
    return (
        <div><UserListPage />
            {data?.map((d) => {
                return (
                    <div key={d.id}>{d.name}</div>
                )
            })}
        </div>
    )
}

export default UserContainer