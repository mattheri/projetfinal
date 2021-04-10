import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { queryFn } from "utils/queryFn";
import { v4 as uuidv4 } from "uuid";
import { filter } from "../../../../state/filterState";
import { Error } from "../../Common/error/Error";
import { Loading } from "../../Common/loading/Loading";
import "./Sidebar.scss";
const queryKey = uuidv4();

type SidebarProps = {
  title: string;
  resource: string;
};

export const Sidebar = ({ title, resource }: SidebarProps) => {
  const lgBreakpoint = 992;
  const matchesMediaBreakpoint = window.matchMedia(
    `(min-width: ${lgBreakpoint}px)`
  ).matches;
  const [show, setShow] = React.useState(matchesMediaBreakpoint);
  const [filterState, setFilterState] = useRecoilState(filter(resource));
  const query = queryFn(
    "get",
    `https://lit-shelf-44437.herokuapp.com/api/${resource}`
  );

  const { data, isLoading, isError } = useQuery(`${queryKey}`, {
    queryFn: query,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const handleToggle = () => setShow(!show);

  return (
    <AnimatePresence>
      <Button
        key="button"
        variant="link"
        className="toggle-btn"
        onClick={handleToggle}
      >
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-filter-right"
            viewBox="0 0 16 16"
          >
            <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z" />
          </svg>
        )}
      </Button>
      {show && (
        <motion.aside
          key="sidebar"
          className="sidebar"
          layout
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 500, opacity: 0 }}
        >
          <div className="position-relative d-flex">
            {filterState.filter && (
              <Button
                className="bg-white z1 mb-2 clear-filter-btn"
                variant="link"
                onClick={() => {
                  setFilterState((state) =>
                    Object.assign({}, state, { filter: "" })
                  );
                }}
              >
                Enlever filtre: {filterState.filter}
              </Button>
            )}
            <motion.h3 layout className="sidebar-title">
              {title}
            </motion.h3>
          </div>
          {isLoading && <Loading />}
          {isError && <Error />}
          {data && (
            <ListGroup>
              {(data as any[]).map((resource) => (
                <ListGroup.Item
                  key={resource._id}
                  active={resource.nom === filterState.filter}
                >
                  <Button
                    onClick={() => {
                      setFilterState((state) =>
                        Object.assign({}, state, { filter: resource.nom })
                      );
                      !matchesMediaBreakpoint && handleToggle();
                    }}
                    variant="link"
                    block
                    active={resource.nom === filterState.filter}
                  >
                    {resource.nom}
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
