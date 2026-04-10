import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 96,
        }}
      >
        <div
          style={{
            fontSize: 160,
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
            fontSize: 72,
            fontWeight: 700,
            color: "#FAF6EE",
            fontFamily: "Georgia, serif",
            letterSpacing: 16,
            marginTop: -10,
          }}
        >
          MAHJ
        </div>
      </div>
    ),
    { ...size }
  );
}
