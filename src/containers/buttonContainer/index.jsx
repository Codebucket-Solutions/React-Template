import ButtonPrimary from "../../components/button";
const ButtonContainer = () => {
    return (
        <ButtonPrimary button_text="Click Me" width="150px" height="50px" padding="10px" borderRadius="5px" variant="gradient_btn" onClick={() => alert('Button Clicked!')} />
    );
};

export default ButtonContainer;
