import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Nguyen Van Thanh — Senior Backend & Cloud Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#030712',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Availability badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22c55e',
            }}
          />
          <span style={{ color: '#6b7280', fontSize: '14px', fontFamily: 'monospace' }}>
            Available for freelance & contract
          </span>
        </div>

        {/* Name */}
        <div style={{ color: '#f3f4f6', fontSize: '56px', fontWeight: 700, lineHeight: 1.1, marginBottom: '16px' }}>
          Nguyen Van Thanh
        </div>

        {/* Title */}
        <div style={{ color: '#6b7280', fontSize: '24px', fontFamily: 'monospace', marginBottom: '24px' }}>
          Senior Backend & Cloud Engineer
        </div>

        {/* Bio */}
        <div style={{ color: '#9ca3af', fontSize: '18px', lineHeight: 1.6, maxWidth: '800px' }}>
          10+ years · Spring Boot · AWS · Payments & Remittance · Microservices
        </div>

        {/* Bottom border line */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: '#374151',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
