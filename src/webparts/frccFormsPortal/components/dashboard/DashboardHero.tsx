import * as React from "react";

interface IFormItem {
  id: number;
  title: string;
}

interface IDashboardHeroProps {
  title: string;
  subtitle: string;
  featuredForm?: IFormItem;
  onSelectFeaturedForm?: (formId: number) => void;
}

export default function DashboardHero(
  props: IDashboardHeroProps,
): React.ReactElement {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "28px",
        padding: "48px",
        marginBottom: "34px",
        minHeight: "280px",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 80% 20%, rgba(96,165,250,0.45) 0%, rgba(15,23,42,0) 35%), linear-gradient(135deg, #00111f 0%, #003a63 48%, #005a9e 100%)",
        color: "#ffffff",
        boxShadow: "0 24px 60px rgba(0,0,0,0.38)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(2,6,23,0.15) 0%, rgba(2,6,23,0.35) 55%, rgba(2,6,23,0.75) 100%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "820px" }}>
        <div
          style={{
            display: "inline-flex",
            border: "1px solid rgba(255,255,255,0.28)",
            borderRadius: "999px",
            padding: "7px 12px",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            marginBottom: "18px",
            background: "rgba(255,255,255,0.10)",
          }}
        >
          V5 EXPERIENCE ENGINEERING
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "46px",
            lineHeight: 1.03,
            fontWeight: 900,
          }}
        >
          {props.title}
        </h1>

        <p
          style={{
            marginTop: "18px",
            maxWidth: "760px",
            fontSize: "17px",
            lineHeight: 1.7,
            opacity: 0.94,
          }}
        >
          {props.subtitle}
        </p>

        {props.featuredForm && (
          <div style={{ marginTop: "28px" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#bfdbfe",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Featured form
            </div>

            <div
              style={{
                fontSize: "26px",
                fontWeight: 900,
                marginBottom: "16px",
              }}
            >
              {props.featuredForm.title}
            </div>

            <button
              type="button"
              onClick={() =>
                props.onSelectFeaturedForm &&
                props.onSelectFeaturedForm(props.featuredForm!.id)
              }
              style={{
                border: "none",
                borderRadius: "999px",
                padding: "12px 20px",
                background: "#ffffff",
                color: "#003a63",
                fontWeight: 900,
                cursor: "pointer",
                boxShadow: "0 10px 24px rgba(0,0,0,0.28)",
              }}
            >
              Open Featured Form
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
