// Login.jsx
import "./Login.css";

function Login({ onLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const id = formData.get("id").trim();

    onLogin(id);
  };

  return (
    <main className="login-container">
      <div className="login-background">
        <div className="bg-shape shape1"></div>
        <div className="bg-shape shape2"></div>
        <div className="bg-shape shape3"></div>
      </div>
      
      <section className="login-card">
        <div className="login-header">
          <span className="university-badge">Sena University</span>
          <h1>Matriculación Académica</h1>
          <p>Ingresa tu ID de estudiante para continuar</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="studentId">
              ID de estudiante
            </label>
            <input
              id="studentId"
              name="id"
              type="number"
              placeholder="Ej: 101"
              min="1"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Ingresar
            <span className="button-arrow">→</span>
          </button>
        </form>

        <div className="login-footer">
          <span className="footer-line"></span>
          <p className="footer-text">Tu esfuerzo de hoy es tu éxito de mañana.</p>
        </div>
      </section>
    </main>
  );
}

export default Login;