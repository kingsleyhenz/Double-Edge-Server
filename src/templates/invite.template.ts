export const generateInviteEmailHtml = (inviterName: string, workspaceName: string, inviteUrl: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You've been invited to join Double Edge</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #FDFBF7;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(20, 15, 5, 0.08);
      border: 1px solid #E8E2D9;
    }
    .header {
      background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      width: 48px;
      height: 48px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      border: 1px solid rgba(255, 255, 255, 0.4);
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 40px 30px;
      color: #44403C;
      line-height: 1.6;
    }
    .content p {
      margin-bottom: 20px;
      font-size: 16px;
    }
    .workspace-box {
      background-color: #FDFBF7;
      border: 1px solid #E8E2D9;
      border-radius: 12px;
      padding: 20px;
      margin: 30px 0;
      text-align: center;
    }
    .workspace-name {
      font-size: 20px;
      font-weight: 700;
      color: #1C1917;
      margin-bottom: 8px;
    }
    .btn {
      display: inline-block;
      background-color: #1C1917;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 16px;
      margin-top: 10px;
      transition: background-color 0.2s;
    }
    .btn:hover {
      background-color: #292524;
    }
    .footer {
      padding: 30px;
      text-align: center;
      background-color: #F5F5F4;
      border-top: 1px solid #E8E2D9;
      color: #A8A29E;
      font-size: 13px;
    }
    .footer p {
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 3v5l-2.29 2.29a2 2 0 0 1-2.82 0l-3.6-3.6a2 2 0 0 1 0-2.82L14.59 1.59a2 2 0 0 1 2.82 0L21 3z"></path>
          <line x1="3" y1="21" x2="8.5" y2="15.5"></line>
          <line x1="9" y1="16" x2="16" y2="9"></line>
          <line x1="8" y1="15" x2="15" y2="8"></line>
        </svg>
      </div>
      <h1>Double Edge</h1>
    </div>
    
    <div class="content">
      <p>Hi there,</p>
      <p><strong>${inviterName}</strong> has invited you to collaborate with them on Double Edge, the modern platform for unified task and project management.</p>
      
      <div class="workspace-box">
        <div class="workspace-name">${workspaceName}</div>
        <p style="margin: 0; font-size: 14px; color: #78716C;">Join the workspace to start collaborating</p>
      </div>

      <div style="text-align: center;">
        <a href="${inviteUrl}" class="btn">Accept Invitation</a>
      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #78716C;">
        If you don't recognize this invitation or didn't expect it, you can safely ignore this email. The link will expire in 7 days.
      </p>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Double Edge App. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
