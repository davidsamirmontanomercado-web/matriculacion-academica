function CourseCard({
  curso,
  onSelect,
  seleccionado,
  matriculaConfirmada,
}) {
  const cuposDisponibles =
    curso.limiteCupos - curso.matriculados;

  const sinCupos = cuposDisponibles <= 0;

  return (
    <article
      className={`course-card ${
        seleccionado ? "selected" : ""
      }`}
    >
      <div className="course-header">
        <div>
          <h3>{curso.nombre}</h3>

          <span className="course-code">
            {curso.codigo}
          </span>
        </div>

        {seleccionado && (
          <span className="selected-badge">
            ✓ Seleccionado
          </span>
        )}
      </div>

      <div className="course-info">
        <div className="info-item">
          <span>Créditos</span>
          <strong>{curso.creditos}</strong>
        </div>

        <div className="info-item">
          <span>Cupos disponibles</span>

          <strong
            className={
              sinCupos ? "no-seats" : "available-seats"
            }
          >
            {cuposDisponibles}
          </strong>
        </div>
      </div>

      <div className="course-footer">
        {sinCupos ? (
          <span className="no-seats-message">
            Sin cupos disponibles
          </span>
        ) : matriculaConfirmada ? (
          <span className="enrolled-message">
            ✓ Matriculado
          </span>
        ) : (
          <button
            className={`course-button ${
              seleccionado ? "remove" : ""
            }`}
            onClick={() => onSelect(curso)}
            disabled={matriculaConfirmada}
          >
            {seleccionado
              ? "Quitar curso"
              : "Matricular"}
          </button>
        )}
      </div>
    </article>
  );
}

export default CourseCard;