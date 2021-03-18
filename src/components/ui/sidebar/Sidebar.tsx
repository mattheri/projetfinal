import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useQuery } from "react-query";
import Button from "react-bootstrap/Button";
import { Loading } from "../Common/loading/Loading";
import { SecteurActivite } from "../../../react-app-env";
import { useLocation } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import "./Sidebar.scss";
import { useRecoilState } from "recoil";
import { filter } from "../../../state/filterState";

export const Sidebar = () => {
  const [filterState, setFilterState] = useRecoilState(
    filter(process.env.REACT_APP_INTERNSHIP_OFFER as string)
  );
  const queryFn = async () => {
    try {
      const response = await (
        await axios.get(
          `${process.env.REACT_APP_API}${process.env.REACT_APP_ACTIVITY}`
        )
      ).data;
      return response;
    } catch (err) {
      return err;
    }
  };

  const { data, isLoading } = useQuery("secteurs", {
    queryFn: queryFn,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <motion.aside layout>
      <div className="position-relative d-flex">
        {filterState.filter && (
          <Button
            className="bg-white z1 mb-2 clear-filter-btn"
            variant="link"
            onClick={() =>
              setFilterState((state) =>
                Object.assign({}, state, { filter: "" })
              )
            }
          >
            Enlever filtre: {filterState.filter}
          </Button>
        )}
        <motion.h3 layout className="sidebar-title">
          Secteurs d'activité
        </motion.h3>
      </div>
      {isLoading && <Loading />}
      {data && (
        <ListGroup>
          {(data as SecteurActivite[]).map((secteur) => (
            <ListGroup.Item active={secteur.nom === filterState.filter}>
              <Button
                onClick={() =>
                  setFilterState((state) =>
                    Object.assign({}, state, { filter: secteur.nom })
                  )
                }
                variant="link"
                block
                active={secteur.nom === filterState.filter}
              >
                {secteur.nom}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </motion.aside>
  );
};
