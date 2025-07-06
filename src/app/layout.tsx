import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SQL Injection Lab | Cybersecurity Training',
  description: 'A comprehensive SQL injection testing lab with multiple vulnerability levels for cybersecurity education and penetration testing practice.',
  keywords: 'SQL injection, cybersecurity, penetration testing, security lab, ethical hacking',
  authors: [{ name: 'Security Lab Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body className="cyber-container">
        <div className="matrix-bg" id="matrix-bg"></div>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Matrix rain effect
              function createMatrixRain() {
                const container = document.getElementById('matrix-bg');
                if (!container) return;
                
                const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()';
                
                function createChar() {
                  const char = document.createElement('div');
                  char.className = 'matrix-char';
                  char.textContent = chars[Math.floor(Math.random() * chars.length)];
                  char.style.left = Math.random() * 100 + '%';
                  char.style.animationDuration = (Math.random() * 15 + 10) + 's';
                  char.style.animationDelay = Math.random() * 5 + 's';
                  container.appendChild(char);
                  
                  setTimeout(() => {
                    if (container.contains(char)) {
                      container.removeChild(char);
                    }
                  }, 25000);
                }
                
                // Create initial characters
                for (let i = 0; i < 50; i++) {
                  setTimeout(createChar, Math.random() * 5000);
                }
                
                // Continue creating characters
                setInterval(createChar, 300);
              }
              
              // Start matrix effect after page loads
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', createMatrixRain);
              } else {
                createMatrixRain();
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
