# Install next and the app creation tool in the top directory ( here NEXTJS )
npm install next@latest --save
npm install create-next-app@latest --save
# Install a new app named 1.app-router
# Look here https://nextjs.org/docs/app/api-reference/cli/create-next-app
npx create-next-app@latest 1.app-router --js --tailwind --turbopack --eslint --app --src-dir src
#
#
# From the top directory
git init
git commit -m "Initial"
git branch -M main
git remote add origin https://github.com/yves40/NEXTJS.git
git push -u origin main
# Add .gitignore file in the top dir
