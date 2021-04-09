import { SmallCard } from "components/ui/Common/card/SmallCard/SmallCard";
import { Loading } from "components/ui/Common/loading/Loading";
import { RouterLink } from "components/ui/Common/routerlink/RouterLink";
import { Message, OffreStage, Student, User } from "react-app-env";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import { useQuery } from "react-query";
import { queryFn } from "utils/queryFn";

type OfferListProps = {
  user: User | null;
};

export const OfferList = ({ user }: OfferListProps) => {
  const query = queryFn(
    "get",
    `https://lit-shelf-44437.herokuapp.com/api/stage/entreprise/${user?.entiteId}`
  );
  const offres = useQuery([user?.entiteId], query, {
    enabled: !!user?.entiteId,
  });
  const messageQuery = async (id: string) => {
    return queryFn(
      "get",
      `https://lit-shelf-44437.herokuapp.com/api/message/${id}`
    )();
  };
  const messageQueryByOffers = async () => {
    return Promise.all(
      (offres.data as OffreStage[]).map((offre) => messageQuery(offre._id))
    );
  };
  const messages = useQuery([user?.entiteId, user?._id], messageQueryByOffers, {
    enabled: !!offres.data,
  });
  const filterMessagesByOffer = (id: string): Message[] => {
    const msg = messages.data as Message[][];

    return msg.flatMap((msg) =>
      msg.filter((msg) => {
        if (msg.from === id || msg.to === id) {
          return msg;
        }
      })
    );
  };
  const messagesByEnterpriseId = async (): Promise<Message[]> => {
    return messageQuery(user?.entiteId as string);
  };
  const enterpriseMessages = useQuery([user?._id], messagesByEnterpriseId, {
    enabled: !!user?.entiteId,
  });
  const studentsWithMessages = async (): Promise<Student[]> => {
    const studentsIds = (enterpriseMessages.data as Message[]).map((msg) => {
      if (msg.from !== user?.entiteId) {
        return msg.from;
      }

      if (msg.to !== user?.entiteId) {
        return msg.to;
      }
    });

    const uniqueStudentIds = [...new Set(studentsIds)];

    console.log(uniqueStudentIds);

    return Promise.all(
      (uniqueStudentIds as string[]).map((studentId) =>
        queryFn(
          "get",
          `https://lit-shelf-44437.herokuapp.com/api/etudiant/${studentId}`
        )()
      )
    );
  };
  const students = useQuery([user?._id, "students"], studentsWithMessages, {
    enabled: !!enterpriseMessages.data,
  });

  return (
    <>
      {offres.isLoading && <Loading />}
      {offres.data &&
        (offres.data as OffreStage[]).map((offre) => (
          <Col key={offre._id} lg={4} className="mb-4">
            <SmallCard
              title={offre.titre}
              body={offre.description}
              subtitle="Offre"
              footer={
                <>
                  <RouterLink to={`stage/${offre._id}`}>
                    Voir l'offre
                  </RouterLink>
                  <RouterLink to={`students/${offre._id}`} variant="link">
                    Messages{" "}
                    <Badge>
                      {messages.data
                        ? filterMessagesByOffer(offre._id).length
                        : 0}
                    </Badge>
                  </RouterLink>
                </>
              }
            />
          </Col>
        ))}
      {students.isLoading && <Loading />}
      {students.data &&
        students.data.map(
          (student) =>
            student && (
              <Col key={student._id} lg={4}>
                <SmallCard
                  title={`${student.prenom} ${student.nom}`}
                  body={student.formations.join(" ")}
                  subtitle="Étudiant"
                  footer={
                    <>
                      <RouterLink to={`stagiaire/${student._id}`}>
                        Voir le profil
                      </RouterLink>
                      <RouterLink
                        variant="link"
                        to={`/messages/${student._id}/${user?.entiteId}`}
                      >
                        Messages
                      </RouterLink>
                    </>
                  }
                />
              </Col>
            )
        )}
    </>
  );
};
