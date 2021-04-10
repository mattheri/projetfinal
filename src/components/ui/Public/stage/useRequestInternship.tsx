import { useAuth } from "hooks/useAuth";
import axios from "axios";

export const useRequestInternship = (to: string | undefined) => {
  const { currentUser } = useAuth();

  const message = `Bonjour, j'aimerais appliquer sur ce stage.`;

  return async () => {
    try {
      const msg = {
        active: true,
        message: message,
        to: to as string,
        from: currentUser?.entiteId as string,
        read: true,
      };
      await axios.post(
        `https://lit-shelf-44437.herokuapp.com/api/message`,
        msg
      );
    } catch (err) {
      console.warn(err);
    }
  };
};
