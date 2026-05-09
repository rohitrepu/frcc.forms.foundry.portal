import * as React from "react";

interface IFormCardProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  onClick: () => void;
}

const iconMap: { [key: string]: string } = {
  IT: "💻",
  Finance: "💰",
  HR: "👥",
  Academic: "🎓",
  Student: "🧑‍🎓",
  Operations: "⚙️",
};

function getBadges(
  title: string,
  subtitle?: string,
): string[] {
  const badges: string[] = [];

  if (subtitle) {
    badges.push(subtitle);
  }

  const lower = title.toLowerCase();

  if (
    lower.includes("approval") ||
    lower.includes("approve")
  ) {
    badges.push("Approval");
  }

  if (
    lower.includes("request")
  ) {
    badges.push("Workflow");
  }

  if (
    lower.includes("student")
  ) {
    badges.push("Student");
  }

  if (
    lower.includes("finance") ||
    lower.includes("budget")
  ) {
    badges.push("Finance");
  }

  if (
    lower.includes("employee") ||
    lower.includes("hr")
  ) {
    badges.push("HR");
  }

  badges.push("Live");

  return badges.slice(0, 4);
}

function getDescription(
  title: string,
): string {
  const lower = title.toLowerCase();

  if (
    lower.includes("approval")
  ) {
    return "Structured approval workflow with governance checkpoints, routing visibility, and institutional decision tracking.";
  }

  if (
    lower.includes("budget") ||
    lower.includes("finance")
  ) {
    return "Financial workflow experience supporting controlled submission, review, and enterprise oversight processes.";
  }

  if (
    lower.includes("student")
  ) {
    return "Student-centered workflow with guided intake, academic processing, and institutional coordination.";
  }

  if (
    lower.includes("employee") ||
    lower.includes("hr")
  ) {
    return "Human resources workflow supporting personnel coordination, operational compliance, and structured review.";
  }

  if (
    lower.includes("request")
  ) {
    return "Operational workflow request experience with lifecycle visibility, routing, and institutional orchestration.";
  }

  return "Modern workflow experience with institutional governance, scalable routing, and intelligent submission orchestration.";
}

export default function FormCard(
  props: IFormCardProps,
): React.ReactElement {
  const accent =
    props.accentColor || "#60a5fa";

  const icon =
    iconMap[props.subtitle || ""] || "📄";

  const badges = getBadges(
    props.title,
    props.subtitle,
  );

  const description =
    getDescription(props.title);

  return (
    <button
      onClick={props.onClick}
      style={{
        position: "relative",
        minWidth: "420px",
        maxWidth: "420px",
        width: "420px",
        minHeight: "280px",
        borderRadius: "28px",
        border: `1px solid ${accent}22`,
        background:
          `radial-gradient(circle at top right, ${accent}55, transparent 38%), linear-gradient(180deg, #1e293b 0%, #0f172a 100%)`,
        color: "#ffffff",
        padding: "28px",
        textAlign: "left",
        cursor: "pointer",
        transition:
          "transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease",
        boxShadow: "0 18px 38px rgba(0,0,0,0.36)",
        overflow: "hidden",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform =
          "translateY(-10px) scale(1.04)";
        event.currentTarget.style.boxShadow =
          `0 32px 72px ${accent}55`;
        event.currentTarget.style.borderColor =
          `${accent}aa`;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform =
          "translateY(0px) scale(1)";
        event.currentTarget.style.boxShadow =
          "0 18px 38px rgba(0,0,0,0.36)";
        event.currentTarget.style.borderColor =
          `${accent}22`;
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-50px",
          top: "-50px",
          width: "180px",
          height: "180px",
          borderRadius: "999px",
          background: `${accent}33`,
          filter: "blur(6px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "24px",
          top: "24px",
          width: "68px",
          height: "68px",
          borderRadius: "22px",
          background: `${accent}22`,
          border: `1px solid ${accent}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "34px",
          backdropFilter: "blur(8px)",
        }}
      >
        {icon}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "18px",
          }}
        >
          {badges.map((badge) => (
            <div
              key={badge}
              style={{
                display: "inline-flex",
                borderRadius: "999px",
                background: `${accent}22`,
                color: accent,
                padding: "7px 12px",
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {badge}
            </div>
          ))}
        </div>

        <div
          style={{
            fontSize: "30px",
            fontWeight: 900,
            lineHeight: 1.08,
            marginBottom: "18px",
            letterSpacing: "-0.03em",
            maxWidth: "300px",
          }}
        >
          {props.title}
        </div>

        <div
          style={{
            fontSize: "15px",
            color: "#cbd5e1",
            lineHeight: 1.7,
            maxWidth: "320px",
          }}
        >
          {description}
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
            fontWeight: 900,
            color: accent,
          }}
        >
          Open Form
          <span style={{ fontSize: "18px" }}>→</span>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 900px) {
            button {
              width: 340px !important;
              min-width: 340px !important;
            }
          }

          @media (max-width: 640px) {
            button {
              width: 300px !important;
              min-width: 300px !important;
            }
          }
        `}
      </style>
    </button>
  );
}