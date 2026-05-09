import * as React from "react";
import FormCard from "../cards/FormCard";

interface IFormItem {
  id: number;
  title: string;
}

interface IDashboardRailProps {
  title: string;
  forms: IFormItem[];
  onSelectForm: (formId: number) => void;
}

const divisionThemes: { [key: string]: string } = {
  IT: "#38bdf8",
  Finance: "#22c55e",
  HR: "#f59e0b",
  Academic: "#8b5cf6",
  Student: "#ec4899",
  Operations: "#14b8a6",
};

export default function DashboardRail(
  props: IDashboardRailProps,
): React.ReactElement | null {
  const railRef =
    React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const handleWheel = (
      event: WheelEvent,
    ): void => {
      if (Math.abs(event.deltaY) < 4) {
        return;
      }

      event.preventDefault();

      rail.scrollBy({
        left: event.deltaY,
        behavior: "smooth",
      });
    };

    rail.addEventListener(
      "wheel",
      handleWheel,
      { passive: false },
    );

    return () => {
      rail.removeEventListener(
        "wheel",
        handleWheel,
      );
    };
  }, []);

  if (!props.forms || props.forms.length === 0) {
    return null;
  }

  const accent =
    divisionThemes[props.title] || "#60a5fa";

  return (
    <div
      style={{
        marginBottom: "68px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-20px",
          top: "10px",
          width: "180px",
          height: "180px",
          borderRadius: "999px",
          background: `${accent}11`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "18px",
          marginBottom: "22px",
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "38px",
              borderRadius: "999px",
              background: accent,
              boxShadow: `0 0 28px ${accent}`,
            }}
          />

          <h2
            style={{
              color: "#ffffff",
              fontSize: "30px",
              fontWeight: 900,
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            {props.title}
          </h2>
        </div>

        <div
          style={{
            color: "#94a3b8",
            fontSize: "12px",
            fontWeight: 900,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {props.forms.length} forms
        </div>
      </div>

      <div
        ref={railRef}
        style={{
          display: "flex",
          gap: "26px",
          overflowX: "auto",
          overflowY: "hidden",
          padding: "10px 8px 28px 8px",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          position: "relative",
          zIndex: 1,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {props.forms.map((form, index) => (
          <div
            key={form.id}
            style={{
              scrollSnapAlign: "start",
              transition:
                "transform 220ms ease, opacity 320ms ease",
              opacity: 0,
              animation:
                `fadeInUp 500ms ease forwards`,
              animationDelay:
                `${index * 60}ms`,
            }}
          >
            <FormCard
              title={form.title}
              subtitle={props.title}
              accentColor={accent}
              onClick={() =>
                props.onSelectForm(form.id)
              }
            />
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }

            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }
        `}
      </style>
    </div>
  );
}