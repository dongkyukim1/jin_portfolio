import { ImageResponse } from "next/og";

export const alt = "진정한 — UI/UX Designer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#f3f3ef",
          padding: "76px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 4,
            color: "#8d8d85",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 20,
                height: 20,
                background: "#ff5a3c",
                borderRadius: 5,
              }}
            />
            <span>JEONG HAN</span>
          </div>
          <span>PORTFOLIO — 2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              letterSpacing: 6,
              color: "#ff5a3c",
              marginBottom: 20,
            }}
          >
            UI / UX DESIGNER · PRODUCT DESIGN
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 100,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            Product design,
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 100,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            <span>made&nbsp;</span>
            <span style={{ color: "#ff5a3c" }}>clear.</span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#8d8d85" }}>
          Seoul, KR · hello@jeonghan.design
        </div>
      </div>
    ),
    { ...size },
  );
}
