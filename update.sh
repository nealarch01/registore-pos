#!/bin/bash
git pull origin main;
cd node_modules/registore-business-logic/ && git pull origin main;
npm run build;
cd ../../;
