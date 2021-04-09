import axios from "axios";

export const queryFn = (
  method: "get" | "post" | "put" | "delete",
  url: string,
  body?: any,
  state?: (v: any) => void
) => {
  return async () => {
    try {
      const response = await (await axios[method](url, { body: body })).data;
      if (state) {
        return state(response);
      }

      return response;
    } catch (err) {
      console.warn(err);
      if (state) {
        return state(err);
      }
      return err;
    }
  };
};
