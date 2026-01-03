import React from 'react'
import { useGetSampleDataQuery } from '../todoApi'

const TodoListPage = () => {

    const { data, isLoading } = useGetSampleDataQuery(); // Fetching sample data using the query hook
    // isLoading: true when the request is in progress
    // isFetching: true when the request is in progress, but data may already be cached

    // use error data to handle errors or toast error messages
    // if (error) {
    //     return <p>Error: {error.message}</p>
    // }

    return (
        <div>
            <h1>Todo List</h1>

            {isLoading && <p>Loading...</p>}
            {data && (
                <ul>
                    {data.map(item => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TodoListPage
