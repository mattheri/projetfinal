import axios from "axios";
import { Formulaire } from "components/ui/Common/form/Form";
import { message } from "forms/message/message";
import { Message } from "react-app-env";
import { useQuery } from "react-query";

type MessageObject = Omit<Message, "_id" | "date">;
type MessageProps = {
  message: string;
};
export const useMessages = (
  from: string | undefined,
  to: string | undefined
) => {
  const validateFromTo = () => {
    if (from && to) {
      return true;
    }

    return false;
  };
  const handleSubmit = async ({ message }: MessageProps) => {
    try {
      if (validateFromTo()) {
        const msg: MessageObject = {
          active: true,
          message: message,
          to: to as string,
          from: from as string,
          read: false,
        };
        const res = await axios.post(
          `https://lit-shelf-44437.herokuapp.com/api/message`,
          msg
        );
        refetch();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const queryFn = async () => {
    try {
      const response = await (
        await axios.get(
          `https://lit-shelf-44437.herokuapp.com/api/message?from=${from}&to=${to}`
        )
      ).data;
      return response;
    } catch (e) {
      console.warn(e);
      return e;
    }
  };

  const { data, isLoading, isError, refetch } = useQuery([from, to], queryFn, {
    enabled: validateFromTo(),
  });

  const formulaireProps = {
    formInputs: message,
    onSubmit: handleSubmit,
    submitButtonValue: "Envoyer",
    resetFormFields: true,
  };

  return {
    Submit: Formulaire.call(this, formulaireProps),
    data: data as Message[],
    isLoading,
    isError,
    refetch: refetch,
  };
};
