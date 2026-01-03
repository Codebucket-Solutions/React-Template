
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../store/counter/counterSlice';
import Button from '../../components/ui/button';
const ButtonContainer = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <div>
            <p>Count: {count}</p>
            <Button onClick={() => dispatch(increment())} button_text="Add" width="150px" height="50px" padding="10px" borderRadius="5px" variant="gradient_btn" />
            <br />
            <Button onClick={() => dispatch(decrement())} button_text="Subtract" width="150px" height="50px" padding="10px" borderRadius="5px" variant="gradient_btn" />
        </div>
    );
};

export default ButtonContainer;
