import React from 'react';

const GoogleReviews = () => {
  const iframeContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            background-color: transparent;
            overflow: hidden;
          }

          .elfsight-container {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
          }

          @media (max-width: 768px) {
            .elfsight-container {
              padding: 0;
            }
          }
        </style>
        <script src="https://static.elfsight.com/platform/platform.js" defer></script>
      </head>
      <body>
        <div class="elfsight-container">
          <div class="elfsight-app-f93a321a-12e8-4626-b676-f5a3d3d03212" data-elfsight-app-lazy></div>
        </div>
      </body>
    </html>
  `;

  return (
    <section
      className="kdh-reviews-section"
      style={{
        backgroundColor: '#e1aeb0',
        padding: '3rem 1rem',
        display: 'flex',
        maxWidth: '1100px'
        ,
      }}
    >
      <div
        className="kdh-google-reviews-widget"
        style={{
          width: '100%',
          maxWidth: '1100px',
          height: '520px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          background: '#fff',
        }}
      >
        <iframe
          title="Google Reviews"
          srcDoc={iframeContent}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
          }}
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default GoogleReviews;
