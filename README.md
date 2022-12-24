# Registore
Open Source POS System Software Engineering (CS 441) project

## Technology Stack
Frontend: JavaScript, Node.js, Electron
Backend: TypeScript, Node.js, PostgreSQL, GraphQL, PostGraphile

## Image
<img width="1680" alt="Screenshot 2022-12-23 at 12 04 38 AM" src="https://user-images.githubusercontent.com/73256760/209297581-ec22a759-f020-4923-9d43-80055298b7e8.png">

## Videos
[Google Drive](https://drive.google.com/drive/folders/17ou2XJcI_9u1nk9TplU7rjnNtz1bx3NY?usp=share_link)

## Dependencies
1. Node.js
2. TypeScript (tsc)
3. PostgreSQL (Preferrably v15+)


## Installation
To run our current software, first set up a postgres database, with the user 'development' and the password 'password' on port 5432. 
Here's a video tutorial : https://csusm-my.sharepoint.com/:v:/g/personal/butle065_csusm_edu/ERKV1lgJOPhNtciDpP5NvMoBAMZyTNtRJPb_xMdPD0SsBw?e=Y85ti9

Then, import our test database so you have the required tables.
Test database: https://github.com/CS-441-Group-8/database-scripts/blob/main/tables.sql


Following this, you are ready for installation.
1. Clone this repository: 
```
git clone https://github.com/CS-441-Group-8/registore-electron.git
```

2. Run <b>setup.sh</b> this shell file will download the backend
```
./setup.sh
```

## Link to organization repo:
https://github.com/CS-441-Group-8/registore-electron

## Link to backend repo:
https://github.com/CS-441-Group-8/registore-business-logic
