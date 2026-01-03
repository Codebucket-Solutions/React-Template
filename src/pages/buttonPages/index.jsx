import ButtonContainer from "../../containers/buttonContainer";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/counter/counterSlice';
import TableExample from "../../containers/exampleComponents/table";
import ButtonsExamples from "../../containers/exampleComponents/buttons";
import InputExamples from "../../containers/exampleComponents/input";

const ButtonPage = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.counter);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);
    
    return (
        <>
            <ButtonContainer />
            <div>
                <h3>Posts</h3>
                <ul>
                    {items?.map((p) => (
                        <li key={p.id}>{p.title}</li>
                    ))}
                </ul>
            </div>
            <TableExample/>
            <ButtonsExamples/>
            <InputExamples/>
        </>

    );
};

export default ButtonPage;
