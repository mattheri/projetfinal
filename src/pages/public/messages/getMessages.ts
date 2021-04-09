import axios from "axios";

export const getMessagesPerStudentOrEnterpriseId = (id: string) => {
  return async () => {
    try {
      const response = await (
        await axios.get(
          `https://lit-shelf-44437.herokuapp.com/api/message/${id}`
        )
      ).data;
      return response;
    } catch (err) {
      console.warn(err);
    }
  };
};
