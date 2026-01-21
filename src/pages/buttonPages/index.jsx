import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { fetchPosts } from '../../store/counter/counterSlice';
import TableExample from "../../containers/exampleComponents/table";
import ButtonsExamples from "../../containers/exampleComponents/buttons";
import InputExamples from "../../containers/exampleComponents/input";
import ColorVariables from "../../containers/exampleComponents/colorVariables";
const ButtonPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
    }, [dispatch]);
    
    return (
        <>
            <TableExample/>
            <ButtonsExamples/>
            <InputExamples/>
            <ColorVariables/>
        </>

    );
};

export default ButtonPage;
