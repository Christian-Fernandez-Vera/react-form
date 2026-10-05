import { useState } from "react";

// Dizionario dei buoni validi disaccoppiato dal ciclo di vita del componente
const CODICI_DISPONIBILI = {
  REACT10: 10,
  BOOLEAN20: 20,
  DEV50: 50,
  MENTOR100: 100,
};

export const PromoCodeValidator = () => {
  // Stato per il controllo dell'input di testo
  const [codiceInput, setCodiceInput] = useState("");

  // Stato consolidato per il risultato della convalida
  const [risultato, setRisultato] = useState({
    stato: "idle", // 'idle' | 'valid' | 'invalid'
    sconto: 0,
    codiceAplicato: "",
  });

  const handleValidare = (e) => {
    e.preventDefault();

    // Normalizzazione: rimuoviamo gli spazi vuoti e forziamo le lettere maiuscole
    const codicePulito = codiceInput.trim().toUpperCase();

    if (!codicePulito) {
      setRisultato({
        stato: "invalid",
        sconto: 0,
        codiceAplicato: "",
      });
      return;
    }

    // Comprobación de existencia en el diccionario
    if (
      Object.prototype.hasOwnProperty.call(CODICI_DISPONIBILI, codicePulito)
    ) {
      setRisultato({
        stato: "valid",
        sconto: CODICI_DISPONIBILI[codicePulito],
        codiceAplicato: codicePulito,
      });
    } else {
      setRisultato({
        stato: "invalid",
        sconto: 0,
        codiceAplicato: codicePulito,
      });
    }
  };

  const handlePulire = () => {
    setCodiceInput("");
    setRisultato({ stato: "idle", sconto: 0, codiceAplicato: "" });
  };

  return (
    <section className="p-4 border rounded shadow-sm bg-white max-w-md mx-auto my-4">
      <h2 className="h4 mb-3 text-dark">Convalida il codice promozionale</h2>

      <form onSubmit={handleValidare}>
        <div className="mb-3">
          <label
            htmlFor="promo-input"
            className="form-label text-secondary fw-semibold"
          >
            Inserisci il tuo coupon
          </label>
          <div className="input-group">
            <input
              type="text"
              id="promo-input"
              name="promoCode"
              className="form-control"
              placeholder="Ej. REACT10, BOOLEAN20"
              value={codiceInput}
              onChange={(e) => {
                setCodiceInput(e.target.value);
                // Se l'utente scrive di nuovo, torniamo a 'idle' per cancellare i messaggi obsoleti
                if (risultato.stato !== "idle") {
                  setRisultato((prev) => ({ ...prev, stato: "idle" }));
                }
              }}
            />
            <button type="submit" className="btn btn-primary">
              Aplicar
            </button>
          </div>
        </div>
      </form>

      {/* Feedback condizionale basato sullo stato di convalida */}
      {risultato.stato === "valid" && (
        <div
          className="alert alert-success d-flex justify-content-between align-items-center mt-3"
          role="alert"
        >
          <div>
            <strong>Codice applicato!</strong> hai un{" "}
            <strong>{risultato.sconto}% di sconto</strong> con il coupon{" "}
            <code>{risultato.codiceAplicato}</code>.
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar"
            onClick={handlePulire}
          />
        </div>
      )}

      {risultato.stato === "invalid" && (
        <div className="alert alert-danger mt-3" role="alert">
          <strong>Codice non valido:</strong> Il coupon che stai cercando di
          riscattare non esiste o è scaduto. Controlla l'ortografia.
        </div>
      )}
    </section>
  );
};
