import { useState } from 'react';

// Estado base para desacoplarlo del cuerpo del componente
const INITIAL_EMAIL = '';

export const NewsletterSection = () => {
  const [email, setEmail] = useState(INITIAL_EMAIL);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validazione di base dell'input prima della modifica dell'interfaccia
    if (!email.trim() || !email.includes('@')) {
      setError('Per favore, inserisci un indirizzo email valido.');
      return;
    }

    // Pulizia degli errori, conferma e reset dell'input
    setError('');
    setIsSubmitted(true);
    setEmail(INITIAL_EMAIL);
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <section className="p-4 border rounded shadow-sm bg-white max-w-md mx-auto my-4">
      <h2 className="h4 mb-3 text-dark">Iscrizione alla newsletter</h2>

      {/* Renderizado condicional: si ya se envió, mostramos el mensaje; si no, el form */}
      {isSubmitted ? (
        <div className="alert alert-success text-center" role="alert">
          <h3 className="h5 alert-heading mb-2">Grazie per l'iscrizione!</h3>
          <p className="mb-3 text-muted">
            Abbiamo registrato la tua email con successo. Riceverai presto le nostre notizie.
          </p>
          <button 
            type="button" 
            className="btn btn-outline-success btn-sm"
            onClick={handleReset}
          >
            Iscriviti a un'altra email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="newsletter-email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              id="newsletter-email"
              name="email"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              placeholder="esempio@dominio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Unirmi ora
          </button>
        </form>
      )}
    </section>
  );
};