import ButtonPrimary from "../../components/button";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../store/counter/counterSlice';
const ButtonContainer = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <div>
            <p>Count: {count}</p>
            <ButtonPrimary onClick={() => dispatch(increment())} button_text="Add" width="150px" height="50px" padding="10px" borderRadius="5px" variant="gradient_btn" />
            <br />
            <ButtonPrimary onClick={() => dispatch(decrement())} button_text="Subtract" width="150px" height="50px" padding="10px" borderRadius="5px" variant="gradient_btn" />
        </div>
    );
};

export default ButtonContainer;
