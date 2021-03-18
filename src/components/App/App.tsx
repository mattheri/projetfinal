import { Routes, Route, Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { Public } from "../../pages/public/Public";
import { Admin } from "../../pages/admin/Admin";
import { Stages } from "../../pages/public/stages/Stages";
import { Stagiaires } from "../../pages/public/stagiaires/Stagiaires";
import { Connexion } from "../../pages/public/connexion/Connexion";
import { Inscription } from "../../pages/public/inscription/Inscription";
import { Index } from "../../pages/public/index/Index";
import { NouvelUtilisateur } from "../../pages/public/nouvelUtilisateur/NouvelUtilisateur";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Public />}>
          <Route path="/" element={<Index />} />
          <Route path="stages" element={<Stages />} />
          <Route path="stagiaires" element={<Stagiaires />} />
          <Route path="connexion" element={<Connexion />} />
          <Route path="inscription" element={<Inscription />} />
          <Route path="newuser" element={<NouvelUtilisateur />} />
        </Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
      <Outlet />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
