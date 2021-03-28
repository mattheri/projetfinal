import axios from "axios";
import _chunk from "lodash/chunk";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { Formation } from "../../../../react-app-env";
import { filter } from "../../../../state/filterState";
import { queryFn } from "../../../../utils/queryFn";
import { Error } from "../../Common/error/Error";
import { Loading } from "../../Common/loading/Loading";
import { RouterLink } from "../../Common/routerlink/RouterLink";

export const LinksCol = () => {
  const [filterState, setFilterState] = useRecoilState(filter("formation"));
  const query = queryFn(
    "get",
    `${process.env.REACT_APP_API}${process.env.REACT_APP_FORMATION}`
  );
  const { data, isLoading, isError } = useQuery("formation", query);

  React.useEffect(() => {
    console.log(filterState);
  }, [filterState.filter]);

  return (
    <Row>
      {isLoading && <Loading />}
      {isError && <Error />}
      {data &&
        (_chunk(data, 4) as Formation[][]).map((col, index) => (
          <Col sm={12} md={6} lg={3} key={index}>
            <Nav className="flex-column align-items-start">
              {col.map((link) => (
                <Nav.Item
                  to="stagiaires"
                  key={link.slug}
                  variant="link"
                  active={filterState.filter === link.nom}
                  onClick={() =>
                    setFilterState((state) =>
                      Object.assign({}, state, { filter: link.nom })
                    )
                  }
                  as={RouterLink}
                >
                  {link.nom}
                </Nav.Item>
              ))}
            </Nav>
          </Col>
        ))}
    </Row>
  );
};
