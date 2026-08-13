import "./app.css";

import { useEffect, useState } from "react";

import cursos from "./data/cursos.json";
import estudiante from "./data/estudiante.json";

import CourseCard from "./components/CourseCard";
import EnrollmentSummary from "./components/EnrollmentSummary";
import Login from "./components/Login";

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [mensajeError, setMensajeError] = useState("");
  const [matriculaConfirmada, setMatriculaConfirmada] = useState(false);

  useEffect(() => {
    const matriculaGuardada =
      localStorage.getItem("matricula");

    if (matriculaGuardada) {
      const matricula = JSON.parse(matriculaGuardada);

      setCursosSeleccionados(matricula.cursos);
      setMatriculaConfirmada(true);
    }
  }, []);

  const handleLogin = (id) => {
    const estudianteId = Number(id);

    if (estudianteId === estudiante.id) {
      setUsuarioLogueado(estudiante);
    } else {
      alert("ID de estudiante incorrecto.");
    }
  };



  const cursosDisponibles = cursos.filter(
    (curso) =>
      curso.semestre === estudiante.semestre &&
      curso.limiteCupos > curso.matriculados
  );

  const creditosSeleccionados = cursosSeleccionados.reduce(
    (total, curso) => total + curso.creditos,
    0
  );

  const seleccionarCurso = (curso) => {
    if (matriculaConfirmada) {
      return;
    }
    const cursoYaSeleccionado = cursosSeleccionados.some(
      (cursoSeleccionado) => cursoSeleccionado.id === curso.id
    );

    if (cursoYaSeleccionado) {
      setCursosSeleccionados(
        cursosSeleccionados.filter(
          (cursoSeleccionado) =>
            cursoSeleccionado.id !== curso.id
        )
      );

      setMensajeError("");

      return;
    }

    const cuposDisponibles =
      curso.limiteCupos - curso.matriculados;

    if (cuposDisponibles <= 0) {
      setMensajeError(
        `El curso ${curso.nombre} no tiene cupos disponibles.`
      );

      return;
    }

    const nuevosCreditos =
      creditosSeleccionados + curso.creditos;

    if (nuevosCreditos > estudiante.creditosPermitidos) {
      setMensajeError(
        `No puedes seleccionar ${curso.nombre}. Superarías el límite de ${estudiante.creditosPermitidos} créditos.`
      );

      return;
    }

    setCursosSeleccionados([
      ...cursosSeleccionados,
      curso,
    ]);

    setMensajeError("");
  };

  const confirmarMatricula = () => {
    console.log("Botón confirmar presionado");

    if (!estudiante.matriculado) {
      setMensajeError(
        "El estudiante no está matriculado en el periodo académico."
      );

      return;
    }

    if (cursosSeleccionados.length === 0) {
      setMensajeError(
        "Debes seleccionar al menos un curso."
      );

      return;
    }

    const matricula = {
      estudiante: estudiante.id,
      fecha: new Date().toISOString(),
      cursos: cursosSeleccionados,
      totalCreditos: creditosSeleccionados,
    };

    console.log("Objeto de matrícula:", matricula);

    localStorage.setItem(
      "matricula",
      JSON.stringify(matricula)
    );

    console.log(
      "Matrícula guardada:",
      localStorage.getItem("matricula")
    );

    setMatriculaConfirmada(true);
    setMensajeError("");
  };

  const modificarMatricula = () => {
    setMatriculaConfirmada(false);
    setMensajeError("");
  };

  const cancelarMatricula = () => {
    const confirmarCancelacion = window.confirm(
      "¿Estás seguro de que deseas cancelar la matrícula?"
    );

    if (!confirmarCancelacion) {
      return;
    }

    localStorage.removeItem("matricula");

    setCursosSeleccionados([]);
    setMatriculaConfirmada(false);
    setMensajeError("");
  };

  if (!usuarioLogueado) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <main className="app">
      <header className="header">
        <div className="header-brand">
          <img
            src="/Favicon.png"
            alt="Logo del sistema de matrícula"
            className="header-logo"
          />

          <div>
            <h1>Sistema de Matrícula</h1>
            <p>Gestión de cursos académicos</p>
          </div>
        </div>

        <button
          onClick={() => setUsuarioLogueado(null)}
        >
          Cerrar sesión
        </button>
      </header>

      <section className="student-card">
        <div>
          <span className="label">Estudiante</span>

          <h2>{usuarioLogueado.nombre}</h2>
          <p>{usuarioLogueado.carrera}</p>
        </div>

        <div className="student-info">
          <div>
            <span className="label">Semestre</span>
            <strong>{usuarioLogueado.semestre}</strong>
          </div>

          <div>
            <span className="label">Créditos</span>

            <strong>
              {creditosSeleccionados} /{" "}
              {estudiante.creditosPermitidos}
            </strong>
          </div>
        </div>
      </section>

      <section className="courses-section">
        <div className="section-title">
          <div>
            <h2>Cursos disponibles</h2>

            <p>
              Cursos correspondientes a tu semestre actual
            </p>
          </div>

          <span className="course-count">
            {cursosDisponibles.length} cursos
          </span>
        </div>

        {mensajeError && (
          <div className="error-message">
            ⚠️ {mensajeError}
          </div>
        )}

        {matriculaConfirmada && (
          <div className="success-message">
            ✓ Matrícula confirmada correctamente.
          </div>
        )}

        <div className="courses-grid">
          {cursosDisponibles.map((curso) => {
            const seleccionado = cursosSeleccionados.some(
              (cursoSeleccionado) =>
                cursoSeleccionado.id === curso.id
            );

            return (
              <CourseCard
                key={curso.id}
                curso={curso}
                onSelect={seleccionarCurso}
                seleccionado={seleccionado}
                matriculaConfirmada={matriculaConfirmada}

              />
            );
          })}
        </div>
      </section>

      <EnrollmentSummary
        cursosSeleccionados={cursosSeleccionados}
        creditosSeleccionados={creditosSeleccionados}
        creditosPermitidos={estudiante.creditosPermitidos}
        onConfirm={confirmarMatricula}
        matriculaConfirmada={matriculaConfirmada}
        onModificar={modificarMatricula}
        onCancelar={cancelarMatricula}
      />
    </main>
  );

}

export default App; 