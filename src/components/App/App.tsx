import React from "react";
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
import { useAuth } from "../../hooks/useAuth";
import { New } from "../../pages/public/new/New";
import { NouvelEtudiant } from "../../pages/public/nouvelEtuditant/NouvelEtudiant";
import { NouvelleEntreprise } from "../../pages/public/nouvelleEntreprise/nouvelleEntreprise";

const queryClient = new QueryClient();

function App() {
  const { currentUser, onSignIn } = useAuth();

  React.useEffect(() => {
    if (currentUser) {
      onSignIn(currentUser);
    }
  }, []);

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
          <Route path="new" element={<New />}>
            <Route path="etudiant" element={<NouvelEtudiant />} />
            <Route path="entreprise" element={<NouvelleEntreprise />} />
          </Route>
        </Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
      <Outlet />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
