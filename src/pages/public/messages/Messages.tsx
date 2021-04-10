import { RouterLink } from "components/ui/Common/routerlink/RouterLink";
import { EnterpriseList } from "components/ui/Public/messageModule/enterpriseList/EnterpriseList";
import { EnterpriseOffersAndMessages } from "components/ui/Public/messageModule/enterpriseOffersAndMessage/EnterpriseOffersAndMessages";
import { OfferList } from "components/ui/Public/messageModule/offerList/OfferList";
import { SelectedMessages } from "components/ui/Public/messageModule/selectedMessages/SelectedMessages";
import { StudentList } from "components/ui/Public/messageModule/studentList/StudentList";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "hooks/useAuth";
import { usePrivateRoute } from "hooks/usePrivateRoute";
import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Route, Routes } from "react-router-dom";
import "./Messages.scss";
import { useGetCurrentUserType } from "./useGetCurrentUserType";

/**
 * ! For a student
 * Messages are received by users who are linked by the enterprise.
 * The student should see the name of the user, the enterprise for which they work for and a link to the enterprise profile.
 * When the student sends the message, it should be linked to its student profile, not the user profile.
 *
 * ! For an enterprises
 * When a student sends a message, it sends it to the offer, not the enterprise or user.
 * When the user sends a message, it should be sent as the enterprise profile, not the user profile.
 */

export const Messages = () => {
  const { currentUser } = useAuth(); // Get the current user object
  const userType = useGetCurrentUserType(); // Get the type of user (student or enterprise)
  const breadcrumbItems = {
    to: "/messages",
    text: userType === "entreprise" ? "Offres & Étudiants" : "Entreprises",
  };
  const [breadcrumbs] = React.useState([breadcrumbItems]);
  usePrivateRoute();

  /**
   * Object containing the current component that should be shown
   */
  const messageList = {
    etudiant: (
      <EnterpriseList entityId={currentUser?.entiteId} id={currentUser?._id} />
    ),
    entreprise: <OfferList user={currentUser} />,
  };

  return (
    <main className="messages-page my-5">
      <Container>
        <Breadcrumb>
          {breadcrumbs.map((item) => (
            <Breadcrumb.Item
              variant="link"
              href="/"
              to={item.to}
              as={RouterLink}
            >
              {item.text}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <Row className="messages-page">
          <Routes>
            <Route path="/">
              <AnimatePresence>{messageList[userType]}</AnimatePresence>
              <Route path="students/:id">
                <StudentList />
              </Route>
              <Route path="enterprise/:id">
                <EnterpriseOffersAndMessages />
              </Route>
            </Route>
            <Route path=":id/:user">
              <SelectedMessages />
            </Route>
          </Routes>
        </Row>
      </Container>
    </main>
  );
};
