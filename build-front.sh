mkdir -p ./dist/public/origin-front-admin
mkdir -p ./dist/public/origin-front-employee

cd ../origin-front-admin
npm install
npm run build
cp -r ./dist/. ../origin-back/dist/public/origin-front-admin

cd ../origin-front-employee
npm install
npm run build
cp -r ./dist/. ../origin-back/dist/public/origin-front-employee
