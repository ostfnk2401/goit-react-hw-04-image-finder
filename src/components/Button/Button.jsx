import { useState } from "react";
import { ButtonClass } from "./Button.styled";

export const Button = ({ onClick = null }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  };

  return (
    <ButtonClass type="button" className={Button} onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Load more'}
    </ButtonClass>
  );
};
