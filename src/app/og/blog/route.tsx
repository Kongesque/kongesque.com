import { ImageResponse } from "next/og"
import { COLORS } from "@/lib/theme"

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text
  )}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error("failed to load font data")
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const title = searchParams.get("title") ?? "Kongesque's Blog"

  // Try to find a matching cover image
  const slug = slugify(title)
  const imageUrl = `${origin}/cover/${slug}.jpg`

  let hasImage = false
  try {
    const res = await fetch(imageUrl, { method: "HEAD" })
    hasImage = res.status === 200
  } catch (e) {
    // Ignore error, fallback to default
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.background,
          fontFamily: "JetBrains Mono",
          position: "relative",
        }}
      >
        {hasImage && (
          <img
            src={imageUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* Overlay */}
        {hasImage && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          />
        )}
        <img
          src="https://www.kongesque.com/echo-3.svg"
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            width: "80px",
            height: "80px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              maxWidth: "90%",
            }}
          >
            <h1
              style={{
                fontSize: 48,
                color: COLORS.primary,
                margin: 0,
                lineHeight: 1.2,
                wordBreak: "break-word",
                overflowWrap: "break-word",
                maxWidth: "100%",
                textShadow: hasImage ? "0 2px 10px rgba(0,0,0,0.5)" : "none",
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "JetBrains Mono",
          data: await loadGoogleFont("JetBrains Mono", title),
          style: "normal",
        },
      ],
    }
  )
}