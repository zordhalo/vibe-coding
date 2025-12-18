# Vibe Landing - Next.js with Resend Email Integration

This is a Next.js project for the Vibe Coding Framework landing page with email subscription functionality powered by [Resend](https://resend.com).

## Getting Started

### 1. Install Dependencies

```bash
cd vibe-landing
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and add your Resend API key:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Resend API key:

```env
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=Vibe Coding <noreply@yourdomain.com>
```

### 3. Get Your Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys** in the dashboard
3. Create a new API key
4. Add a verified domain (or use Resend's test domain for development)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deploying to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Add Next.js with Resend integration"
git push
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `RESEND_API_KEY`: Your Resend API key
   - `FROM_EMAIL`: Your verified sender email (e.g., `Vibe Coding <noreply@yourdomain.com>`)
4. Deploy!

### 3. Configure Domain on Resend

For production, you need to verify your domain on Resend:

1. Go to Resend Dashboard → Domains
2. Add your domain
3. Add the DNS records Resend provides
4. Update `FROM_EMAIL` to use your verified domain

## Project Structure

```
vibe-landing/
├── app/
│   ├── api/
│   │   └── lead/
│   │       └── route.ts    # Resend email API endpoint
│   ├── globals.css         # All styling
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main landing page
├── .env.example            # Environment variables template
├── .gitignore
├── next.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

## API Endpoint

**POST `/api/lead`**

Accepts form data with an `email` field and sends a welcome email using Resend.

Request:
```
Content-Type: multipart/form-data
email: user@example.com
```

Response:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Resend Documentation](https://resend.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
