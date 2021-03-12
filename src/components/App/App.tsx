import { useLocation, Routes, Route, Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { Public } from "../../pages/public/Public";
import { Admin } from "../../pages/admin/Admin";
import { Stages } from "../../pages/public/stages/Stages";
import React from "react";
import { Stagiaires } from "../../pages/public/stagiaires/Stagiaires";
import { Connexion } from "../../pages/public/connexion/Connexion";
import { Inscription } from "../../pages/public/inscription/Inscription";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Public />}>
          <Route path="stages" element={<Stages />} />
          <Route path="stagiaires" element={<Stagiaires />} />
          <Route path="connexion" element={<Connexion />} />
          <Route path="inscription" element={<Inscription />} />
        </Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
