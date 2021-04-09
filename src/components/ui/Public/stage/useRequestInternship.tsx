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
      const res = await axios.post(
        `${process.env.REACT_APP_API}${process.env.REACT_APP_MESSAGES}`,
        msg
      );
    } catch (err) {
      console.warn(err);
    }
  };
};