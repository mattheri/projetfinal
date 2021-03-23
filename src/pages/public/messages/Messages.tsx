import { SideMenu } from "../../../components/ui/Common/sidemenu/SideMenu";
import { OfferList } from "../../../components/ui/Public/messageModule/offerList/OfferList";
import "./Messages.scss";

export const Messages = () => {
  return (
    <main className="messages-page">
      <SideMenu toggle children={<OfferList />} />
    </main>
  );
};
