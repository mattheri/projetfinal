import { useAuth } from "hooks/useAuth";
import Button from "react-bootstrap/Button";

export const ContactButton = ({ ...props }) => {
  const { currentUser } = useAuth();

  return (
    <Button
      disabled={currentUser?.premiereConnexion === true || currentUser === null}
      {...props}
    >
      {props.children || "Contacter"}
    </Button>
  );
};
