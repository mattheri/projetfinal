import axios from "axios";

export const getMessagesPerStudentOrEnterpriseId = (id: string) => {
  return async () => {
    try {
      const response = await (
        await axios.get(
          `${process.env.REACT_APP_API}${process.env.REACT_APP_MESSAGES}/${id}`
        )
      ).data;
      return response;
    } catch (err) {
      console.warn(err);
    }
  };
};
