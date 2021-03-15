import Button from "react-bootstrap/Button";
import { ButtonProps } from "react-bootstrap";
import classnames from "classnames";
import "./SquareButton.scss";

type SquareButtonProps = ButtonProps;

export const SquareButton = ({
  children,
  ...rest
}: React.PropsWithChildren<SquareButtonProps>) => {
  return (
    <Button {...rest} className={classnames("sqr-btn", rest.className)}>
      {children}
    </Button>
  );
};
