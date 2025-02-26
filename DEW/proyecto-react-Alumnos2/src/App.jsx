import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layoutlet from "./Layoutlet";
import ListarAlumnos from "./ListarAlumnos";
import AgregarAlumno from "./AgregarAlumno";
import EditarAlumno from "./EditarAlumno";
import Centro from "./Centro";
import Inicio from "./Inicio"
import { AlumnosProvider } from "./AlumnosContext";
import "./App.css";

const App = () => {
  return (
    <AlumnosProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layoutlet />}>
            <Route index element={<Inicio />} />
            <Route path="/Centro" element={<Centro />} />
            <Route path="GestionarAlumnos" element={<ListarAlumnos />} />
            <Route path="AgregarAlumno" element={<AgregarAlumno />} />
            <Route path="EditarAlumno/:id" element={<EditarAlumno />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      </Router>
    </AlumnosProvider>
  );
};

export default App;