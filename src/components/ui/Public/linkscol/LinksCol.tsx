import _chunk from "lodash/chunk";
import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { Formation } from "react-app-env";
import { filter } from "state/filterState";
import { queryFn } from "utils/queryFn";
import { Error } from "components/ui/Common/error/Error";
import { Loading } from "components/ui/Common/loading/Loading";
import { RouterLink } from "components/ui/Common/routerlink/RouterLink";

export const LinksCol = () => {
  const [filterState, setFilterState] = useRecoilState(filter("formation"));
  const query = queryFn(
    "get",
    `https://lit-shelf-44437.herokuapp.com/api/formation`
  );
  const { data, isLoading, isError } = useQuery("formation", query);

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
