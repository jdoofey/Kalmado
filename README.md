<img src=./react-app/src/assets/logo/Kalmado-1.png>

# 🔰 Project Summary
[Kalmado](https://kalmado.herokuapp.com/) is a project organization application that takes inspiration from Asana/Trello (styling inspo: Spotify). Increase productivity levels by using Kalmado in which you can create projects and tasks. Check it out [here](https://kalmado.herokuapp.com/)

# 🔗 Wiki Links

- [Database Schema](https://github.com/jdoofey/Kalmado/wiki/Database-Schema)
- [Feature List](https://github.com/jdoofey/Kalmado/wiki/Feature-List)
- [User Stories](https://github.com/jdoofey/Kalmado/wiki/User-Stories)

# 💻 Technologies
### Frameworks, Platforms, Libraries:
[![My Skills](https://skillicons.dev/icons?i=py,flask,js,react,redux,postgres,docker,sqlite,css,html,heroku)](https://kalmado.herokuapp.com/)

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Jinja](https://img.shields.io/badge/jinja-white.svg?style=for-the-badge&logo=jinja&logoColor=black)

# Features

## 🌊 Splash
### Sign up, log in, or try out the application with a convenient demo-user button!

![Imgur](https://i.imgur.com/EQGizx9.gif)
![Imgur](https://i.imgur.com/lwXvAGF.png)

## Home
### Users are redirected on log in to their home page, which displays their projects.

![Imgur](https://i.imgur.com/dH5J2QH.gif)
![Imgur](https://i.imgur.com/119OiE2.png)

## Sign up or log in

![Imgur](https://i.imgur.com/U3gWQjF.png)
![Imgur](https://i.imgur.com/Kxo9y6J.png)

## Create a project

![Imgur](https://i.imgur.com/yn3nBw3.png)

## Project Details
### Users can view project details and tasks associated with their projects through this page.

![Imgur](https://i.imgur.com/HRrxTS2.gif)

# ▶️ Get Started

### Clone repository.

- SSH:

```
git@github.com:jdoofey/Kalmado.git
```

- HTTPS:

```
https://github.com/jdoofey/Kalmado
```

- CLI:
```
gh repo clone jdoofey/Kalmado
```

### Install dependencies & Prep database.
- In the project directory you will run:

```
pipenv install
```

This command will install packages into the pipenv virtual environment and update your Pipfile.

- Create a .env file in said current directory.
- Paste in SECRET_KEY and DATABASE_URL configurations.

```
SECRET_KEY=<<SECRET_KEY>>
DATABASE_URL=sqlite:///dev.db
```

The .env file contains the individual user environment variables that override the variables set in the /etc/environment file. You can customize your environment variables as desired by modifying your .env file. In this case we are setting the SECRET_KEY and the DATABASE_URL.

- While in your root directory run:

```
pipenv shell
```

This will create a new active pip environment for  you to run your backend.

- Followed by:

```
flask db upgrade
flask seed all
pipenv run flask run
```

Because this application uses SQLite, the upgrade command will detect that a database does not exist and will create it.

- Navigate to your /Kalmado/react-app/ folder and create another .env file.
- Paste in the REACT_APP_BASE_URL

```
REACT_APP_BASE_URL=http://localhost:5000
```
We'll be pasting in the path to server for frontend into this newly created environment file.

- All there is to do is:

```
npm install
```
This command installs a package and any packages that it depends on. Since the package has a package-lock the installation of dependencies will be driven by that. If you take a peak into your package.json file you can see all the dependencies our project is installing.

```
npm start
```
This runs a predefined command specified in the "start" property of a package's "scripts" object in our case it is:

```
"start": "react-scripts start"
```
DO NOT paste this anywhere. The code above is already provided in our package.json file!

*et voilà! You're good to go!*

# 📱 Contact the Creator

| Jake Matillano |
|----------------|
|<img src=https://i.imgur.com/2ffGJqj.png width=20> [LinkedIn](https://www.linkedin.com/in/jake-matillano-b141811a3/) |
|<img src=https://i.imgur.com/w9xwrCT.png width=20> [GitHub](https://github.com/jdoofey) |
