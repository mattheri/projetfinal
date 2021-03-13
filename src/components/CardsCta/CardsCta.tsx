import axios from "axios";
import { useQuery } from "react-query";
import Container from "react-bootstrap/Container";
import { Loading } from "../ui/loading/Loading";
import { Error } from "../ui/error/Error";

type CardsCtaProps = {
  resource: "stagiaires" | "stages";
};

export const CardsCta = ({ resource }: CardsCtaProps) => {
  const queryFn = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}${
          resource === "stagiaires"
            ? process.env.REACT_APP_INTERNSHIP
            : process.env.REACT_APP_INTERNSHIP_OFFER
        }`
      );

      return await response.data;
    } catch (err) {
      return err;
    }
  };

  const { isLoading, error, isError, data } = useQuery({
    queryFn,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    console.warn(error);
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  console.log(data);
  return <Error />;
};
