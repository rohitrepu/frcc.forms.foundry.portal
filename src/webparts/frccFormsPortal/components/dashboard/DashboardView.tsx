import * as React from "react";
import DashboardHero from "./DashboardHero";
import DashboardRail from "./DashboardRail";
import { IRequestSummaryItem } from "../../../../services/RequestTrackingService";

interface IFormItem {
  id: number;
  title: string;
}

interface IDashboardViewProps {
  recentForms: IFormItem[];
  favoriteForms: IFormItem[];
  popularForms: IFormItem[];
  groupedForms: { [division: string]: IFormItem[] };
  divisionGroupNames: string[];

  recentRequestItems: IRequestSummaryItem[];
  isLoadingRequests: boolean;

  handleSelectFormById: (formId: number) => void;
  handleOpenMyRequestsByFormId: (formId: number) => void;

  searchText: string;
  setSearchText: (value: string) => void;

  divisionFilter: string;
  setDivisionFilter: (value: string) => void;
  divisionOptions: string[];

  formTypeFilter: string;
  setFormTypeFilter: (value: string) => void;
  formTypeOptions: string[];

  audienceFilter: string;
  setAudienceFilter: (value: string) => void;
  audienceOptions: string[];

  resultCount: number;
}

export default function DashboardView(
  props: IDashboardViewProps,
): React.ReactElement {
  const featuredForm =
    props.recentForms[0] ||
    props.favoriteForms[0] ||
    props.popularForms[0] ||
    undefined;

  const recommendedForms =
    props.recentForms.length > 0
      ? props.recentForms
      : props.favoriteForms.length > 0
      ? props.favoriteForms
      : props.popularForms;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "52px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(15,23,42,0.82)",
    color: "#ffffff",
    padding: "0 18px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    backdropFilter: "blur(10px)",
  };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "52px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(15,23,42,0.82)",
    color: "#ffffff",
    padding: "0 16px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    backdropFilter: "blur(10px)",
  };

  return (
    <div
      style={{
        background:
          "radial-gradient(circle at top left, rgba(0,90,158,0.22), transparent 28%), radial-gradient(circle at top right, rgba(96,165,250,0.14), transparent 24%), #020617",
        minHeight: "100vh",
        paddingBottom: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1700px",
          margin: "0 auto",
          padding: "42px 42px 80px 42px",
        }}
      >
        <DashboardHero
          title="FRCC Forms Experience"
          subtitle="Modern enterprise forms discovery platform with favorites, recent forms, categorized browsing, and scalable institutional workflows."
          featuredForm={featuredForm}
          onSelectFeaturedForm={props.handleSelectFormById}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "24px", marginBottom: "42px" }}>
          <div style={{ padding: "24px", borderRadius: "28px", background: "rgba(15,23,42,0.68)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 54px rgba(0,0,0,0.30)", backdropFilter: "blur(18px)" }}>
            <div style={{ fontSize: "13px", fontWeight: 900, letterSpacing: "0.08em", color: "#93c5fd", textTransform: "uppercase", marginBottom: "18px" }}>
              Discovery & Filtering
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(320px, 2.4fr) repeat(3, minmax(210px, 1fr))", gap: "18px", alignItems: "center" }}>
              <input type="text" value={props.searchText} onChange={(event) => props.setSearchText(event.currentTarget.value)} placeholder="Search forms, departments, audiences, workflows..." style={inputStyle} />

              <select value={props.divisionFilter} onChange={(event) => props.setDivisionFilter(event.currentTarget.value)} style={selectStyle}>
                <option value="All">All divisions</option>
                {props.divisionOptions.map((division) => (
                  <option key={division} value={division}>{division}</option>
                ))}
              </select>

              <select value={props.formTypeFilter} onChange={(event) => props.setFormTypeFilter(event.currentTarget.value)} style={selectStyle}>
                <option value="All">All form types</option>
                {props.formTypeOptions.map((formType) => (
                  <option key={formType} value={formType}>{formType}</option>
                ))}
              </select>

              <select value={props.audienceFilter} onChange={(event) => props.setAudienceFilter(event.currentTarget.value)} style={selectStyle}>
                <option value="All">All audiences</option>
                {props.audienceOptions.map((audience) => (
                  <option key={audience} value={audience}>{audience}</option>
                ))}
              </select>
            </div>

            <div style={{ marginTop: "16px", color: "#cbd5e1", fontSize: "13px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {props.resultCount} matching forms
            </div>
          </div>

          <div style={{ padding: "24px", borderRadius: "28px", background: "linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(0,90,158,0.42) 100%)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 54px rgba(0,0,0,0.30)", position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: "13px", fontWeight: 900, letterSpacing: "0.08em", color: "#bfdbfe", textTransform: "uppercase", marginBottom: "16px" }}>
              Recent Requests
            </div>

            {props.isLoadingRequests && (
              <div style={{ color: "#cbd5e1", fontSize: "14px" }}>
                Loading your recent requests...
              </div>
            )}

            {!props.isLoadingRequests && props.recentRequestItems.length === 0 && (
              <div style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.6, marginBottom: "18px" }}>
          You haven’t submitted requests for this workflow yet. Your recent workflow activity will appear here.
              </div>
            )}

            {!props.isLoadingRequests &&
              props.recentRequestItems.slice(0, 3).map((request) => (
                <button
                  key={request.id}
                  type="button"
                  onClick={() => {
                    if (request.displayUrl) {
                      window.open(request.displayUrl, "_blank", "noopener,noreferrer");
                    }
                  }}
                  style={{
                    width: "100%",
                    display: "block",
                    textAlign: "left",
                    marginBottom: "12px",
                    padding: "14px",
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "#ffffff",
                    cursor: request.displayUrl ? "pointer" : "default",
                  }}
                >
                  <div style={{ fontSize: "14px", fontWeight: 900 }}>
                    {request.title}
                  </div>

                  <div style={{ marginTop: "5px", color: "#cbd5e1", fontSize: "12px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        marginRight: "8px",
                        background:
                          (request.status || "").toLowerCase().includes("approved")
                            ? "rgba(34,197,94,0.18)"
                            : (request.status || "").toLowerCase().includes("reject")
                            ? "rgba(239,68,68,0.18)"
                            : "rgba(96,165,250,0.18)",
                        color:
                          (request.status || "").toLowerCase().includes("approved")
                            ? "#86efac"
                            : (request.status || "").toLowerCase().includes("reject")
                            ? "#fca5a5"
                            : "#93c5fd",
                      }}
                    >
                      {request.status || "Submitted"}
                    </span>

                    {request.created
                      ? new Date(request.created).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </div>
                </button>
              ))}

            <button
              type="button"
              disabled={!featuredForm}
              onClick={() => {
                if (featuredForm) {
                  props.handleOpenMyRequestsByFormId(featuredForm.id);
                }
              }}
              style={{
                border: "none",
                borderRadius: "999px",
                padding: "12px 18px",
                background: featuredForm ? "#ffffff" : "#94a3b8",
                color: "#003a63",
                fontWeight: 900,
                cursor: featuredForm ? "pointer" : "not-allowed",
                marginTop: "8px",
              }}
            >
              Open My Requests
            </button>
          </div>
        </div>

        {recommendedForms.length > 0 && (
          <DashboardRail title="Recommended for You" forms={recommendedForms} onSelectForm={props.handleSelectFormById} />
        )}

        {props.recentForms.length > 0 && (
          <DashboardRail title="Continue Working" forms={props.recentForms} onSelectForm={props.handleSelectFormById} />
        )}

        {props.favoriteForms.length > 0 && (
          <DashboardRail title="Favorites" forms={props.favoriteForms} onSelectForm={props.handleSelectFormById} />
        )}

        {props.popularForms.length > 0 && (
          <DashboardRail title="Popular Forms" forms={props.popularForms} onSelectForm={props.handleSelectFormById} />
        )}

        {props.divisionGroupNames.map((divisionName) => (
          <DashboardRail key={divisionName} title={divisionName} forms={props.groupedForms[divisionName]} onSelectForm={props.handleSelectFormById} />
        ))}
      </div>
    </div>
  );
}

