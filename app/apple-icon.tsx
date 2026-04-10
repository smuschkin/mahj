import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#334155",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#6594C0",
            fontFamily: "Georgia, serif",
            lineHeight: 1,
          }}
        >
          M
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#FAF6EE",
            fontFamily: "Georgia, serif",
            letterSpacing: 6,
            marginTop: -4,
          }}
        >
          MAHJ
        </div>
      </div>
    ),
    { ...size }
  );
}
