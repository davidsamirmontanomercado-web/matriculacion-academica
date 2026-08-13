function EnrollmentSummary({
  cursosSeleccionados,
  creditosSeleccionados,
  creditosPermitidos,
  onConfirm,
  matriculaConfirmada,
  onModificar,
  onCancelar,
}) {
  return (
    <section className="summary-card">
      <div>
        <h2>Resumen de matrícula</h2>

        {cursosSeleccionados.length === 0 ? (
          <p>
            Aún no has seleccionado ningún curso.
          </p>
        ) : (
          <ul className="selected-courses">
            {cursosSeleccionados.map((curso) => (
              <li key={curso.id}>
                <span>{curso.nombre}</span>

                <strong>
                  {curso.creditos} créditos
                </strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="summary-actions">
        <div className="summary-credits">
          <span>Créditos</span>

          <strong>
            {creditosSeleccionados} / {creditosPermitidos}
          </strong>
        </div>

        {!matriculaConfirmada ? (
          <button
            className="confirm-button"
            onClick={onConfirm}
            disabled={cursosSeleccionados.length === 0}
          >
            Confirmar matrícula
          </button>
        ) : (
          <div className="enrollment-actions">
            <button
              className="edit-button"
              onClick={onModificar}
            >
              Modificar matrícula
            </button>

            <button
              className="cancel-button"
              onClick={onCancelar}
            >
              Cancelar matrícula
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default EnrollmentSummary;