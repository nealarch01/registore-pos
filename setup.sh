#!bin/bash 
npm install;
cd node_modules;
git clone https://github.com/CS-441-Group-8/registore-business-logic.git;
cd registore-business-logic;
npm install; 
npm run build;

echo "Setup complete.";

