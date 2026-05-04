@echo off
echo ========================================
echo DEPLOYING FIREBASE FIX TO VERCEL
echo ========================================
echo.

echo Step 1/3: Adding files to git...
git add .

echo.
echo Step 2/3: Committing changes...
git commit -m "EMERGENCY FIX: Embed Firebase config - ready for KU hackathon"

echo.
echo Step 3/3: Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo DEPLOYMENT STARTED!
echo ========================================
echo.
echo Vercel is now building and deploying your app.
echo This will take 2-3 minutes.
echo.
echo Check deployment status at:
echo https://vercel.com/dashboard
echo.
echo Your app will be live at:
echo https://card-main-drab.vercel.app
echo.
echo ========================================
echo DONE! Wait 2-3 minutes then test your app.
echo ========================================
pause
