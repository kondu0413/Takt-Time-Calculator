import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: "-0.03em" }}>
          Takt Time Calc
        </div>
        <div style={{ marginTop: 24, fontSize: 34, color: "#dbeafe" }}>
          Fast takt time calculation for production lines
        </div>
      </div>
    ),
    size
  );
}
