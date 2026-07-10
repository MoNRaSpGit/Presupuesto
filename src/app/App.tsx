import { useState } from "react";

type BudgetFeature = {
  id: string;
  name: string;
  monthlyPrice: number;
  detail: string;
};

const MAIN_FEATURES: BudgetFeature[] = [
  {
    id: "scanner",
    name: "Scanner laser",
    monthlyPrice: 200,
    detail: "Registrar productos mediante scanner laser para agilizar la caja."
  },
  {
    id: "accounts",
    name: "Cuenta corriente",
    monthlyPrice: 200,
    detail: "Registrar montos de clientes y seguir pagos o deudas desde la aplicacion."
  },
  {
    id: "stock",
    name: "Stock",
    monthlyPrice: 200,
    detail: "Controlar el stock actual del local y ordenar mejor la mercaderia."
  },
  {
    id: "tickets",
    name: "Historial de boletas",
    monthlyPrice: 100,
    detail: "Consultar ventas anteriores para revisar movimientos, cobros y tickets guardados."
  },
  {
    id: "legacy-service",
    name: "Servicio anterior",
    monthlyPrice: 250,
    detail: "Mantener el servicio ya usado anteriormente con soporte y continuidad."
  }
];

const EQUIPMENT_OPTIONS = {
  monthly: 250,
  onetime: 2500,
  detail: "Equipamiento para dejar el sistema funcionando en el local si el cliente todavia no lo tiene."
};

const MONTHLY_TOTAL = MAIN_FEATURES.reduce((total, feature) => total + feature.monthlyPrice, 0);
const SIX_MONTH_TOTAL = 5000;
const ONE_TIME_TOTAL_USD = 650;

function formatCurrency(value: number, currency = "$") {
  return `${currency} ${value}`;
}

export function App() {
  const [expandedFeatureId, setExpandedFeatureId] = useState<string | null>(null);
  const [showEquipmentDetail, setShowEquipmentDetail] = useState(false);

  return (
    <main className="presupuesto-shell">
      <section className="presupuesto-layout">
        <article className="presupuesto-intro">
          <p className="presupuesto-kicker">SaaS Pro</p>
          <h1>Presupuesto</h1>
          <p className="presupuesto-intro__note">Valores de referencia para revisar el plan y los extras disponibles.</p>
        </article>

        <article className="presupuesto-card">
          <div className="presupuesto-card__header">
            <div />
            <div className="presupuesto-total-pill">
              <span>Total del sistema por mes</span>
              <strong>{formatCurrency(MONTHLY_TOTAL)}</strong>
            </div>
          </div>

          <div className="presupuesto-section-label">
            <span>Incluye</span>
          </div>

          <div className="presupuesto-feature-list">
            {MAIN_FEATURES.map((feature) => {
              const isExpanded = expandedFeatureId === feature.id;
              return (
                <section key={feature.id} className="presupuesto-feature-row">
                  <div className="presupuesto-feature-row__main">
                    <div>
                      <strong>{feature.name}</strong>
                      <span>+ {formatCurrency(feature.monthlyPrice)}</span>
                    </div>
                    <button
                      type="button"
                      className="presupuesto-detail-button"
                      onClick={() => setExpandedFeatureId(isExpanded ? null : feature.id)}
                    >
                      {isExpanded ? "Ocultar" : "Detalle"}
                    </button>
                  </div>
                  {isExpanded ? <p className="presupuesto-feature-detail">{feature.detail}</p> : null}
                </section>
              );
            })}
          </div>

          <div className="presupuesto-pricing-grid">
            <article className="presupuesto-price-card is-primary">
              <span>Mensual</span>
              <strong>{formatCurrency(MONTHLY_TOTAL)}</strong>
              <small>Por mes</small>
            </article>

            <article className="presupuesto-price-card">
              <span>6 meses</span>
              <strong>{formatCurrency(SIX_MONTH_TOTAL)}</strong>
              <small>Pago por 6 meses</small>
            </article>

            <article className="presupuesto-price-card">
              <span>Precio unico</span>
              <strong>{formatCurrency(ONE_TIME_TOTAL_USD, "USD")}</strong>
              <small>Pago unico</small>
            </article>
          </div>
        </article>

        <article className="presupuesto-card presupuesto-card--secondary">
          <div className="presupuesto-card__header">
            <div>
              <p className="presupuesto-card__eyebrow">Aparte</p>
              <h2>Equipamiento</h2>
            </div>
            <button
              type="button"
              className="presupuesto-detail-button"
              onClick={() => setShowEquipmentDetail((current) => !current)}
            >
              {showEquipmentDetail ? "Ocultar" : "Detalle"}
            </button>
          </div>

          <div className="presupuesto-equipment-grid">
            <article className="presupuesto-equipment-card">
              <span>Con plan mensual</span>
              <strong>+ {formatCurrency(EQUIPMENT_OPTIONS.monthly)}</strong>
              <small>Se suma al abono si el cliente no tiene equipamiento.</small>
            </article>
            <article className="presupuesto-equipment-card">
              <span>Compra unica</span>
              <strong>{formatCurrency(EQUIPMENT_OPTIONS.onetime)}</strong>
              <small>Pago unico por el equipamiento completo.</small>
            </article>
          </div>

          {showEquipmentDetail ? <p className="presupuesto-feature-detail">{EQUIPMENT_OPTIONS.detail}</p> : null}
        </article>
      </section>
    </main>
  );
}
