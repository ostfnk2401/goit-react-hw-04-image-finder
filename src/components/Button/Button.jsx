import { ButtonClass } from "./Button.styled";

export const Button = ({ onClick = null }) => {
    return (
      <ButtonClass type="button" className={Button} onClick={onClick}>
        Load more
      </ButtonClass>
    );
  };