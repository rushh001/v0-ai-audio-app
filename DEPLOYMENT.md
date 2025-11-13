# Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- A GitHub account with your repository
- A Vercel account (free tier works great)
- Your Groq API key

## Step-by-Step Deployment

### 1. Prepare Your Repository

\`\`\`bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: VEXA AI Audio Agent"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/vexa-ai-agent.git

# Push to GitHub
git branch -M main
git push -u origin main
\`\`\`

### 2. Connect to Vercel

1. Visit [vercel.com](https://vercel.com) and sign up/log in
2. Click "New Project"
3. Select "Import Git Repository"
4. Find and select your GitHub repository
5. Vercel will auto-detect Next.js configuration

### 3. Configure Environment Variables

1. After selecting your repository, you'll see "Environment Variables"
2. Add: `GROQ_API_KEY` = Your Groq API key from console.groq.com
3. Click "Add"

### 4. Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

## Post-Deployment

### Verify Deployment
- Test text input and audio recording on your live URL
- Check browser console for any errors
- Test on mobile devices

### Monitor Performance
- Use Vercel Analytics to track performance
- Monitor error logs in Vercel dashboard
- Check Groq API usage in console.groq.com

### Custom Domain (Optional)
1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting Deployment

### Build Fails
- Check Node.js version requirement (18+)
- Verify all environment variables are set
- Check build logs in Vercel dashboard

### App Crashes After Deploy
- Review error logs in Vercel dashboard
- Verify GROQ_API_KEY is correctly set
- Check browser console for client-side errors

### Audio Not Working in Production
- Ensure your domain uses HTTPS
- Check browser microphone permissions
- Verify API routes are accessible

## CI/CD with GitHub Actions

The included `.github/workflows/deploy.yml` provides automatic deployment:

1. Set these secrets in GitHub (Settings → Secrets):
   - `VERCEL_TOKEN`: From Vercel dashboard
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

2. Every push to main will automatically deploy to Vercel

## Performance Optimization

After deployment, optimize further:

1. Enable Vercel Analytics for insights
2. Use Vercel Edge Cache for static assets
3. Monitor API usage and optimize endpoints
4. Set up uptime monitoring

For more help, visit [Vercel Docs](https://vercel.com/docs)
