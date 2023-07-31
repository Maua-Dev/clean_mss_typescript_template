# Clean Architecure Typescript + Express API REST 🧙‍♂️⚠

This project was made by myself, together with a lot of researches. This is a project Typescript for you that  want to learn more about clean 
architecture without a lot of problems that a lot of frameworks provides to us developers. You can use this project as a template to yours projects,
I hope you like!

| :placard: Clean Arch Typescript + Express API REST |     |
| -------------  | --- |
| :sparkles: Name        | **Clean Arch API Rest**
| :label: Tecnologies | Typescript, Jest, MongoDB, Express, Clean Architecture, SOLID 
| :rocket: URL         | Comming soon...⁉⁉⁉


## How can I run the project in my machine??

It's simple, you'll need this little requirements


| REQUIREMENTS |     |
| -------------  | --- |
| Node.js | (12+ version) |
| Yarn or npm | (npm you'll need to delete 'yarn.lock' file) |

### Now you're done ✅✅ Let's run it!!

- This first command that you'll need to run it on your terminal is about ☢ Git ☢

```zsh
git clone https://github.com/Rodrigosiq03/clean_mss_typescript_template.git
```

- Now you're with the project in your machine 🔥🔥 Let's enter there and install all the dependencies!!

```zsh
cd clean_mss_typescript_template
yarn
```

⚠ OR ⚠

```zsh
cd clean_mss_typescript_template
npm i
```

- Before you run the project you need to <span style="color: green">CREATE</span> a file called 🧙‍♂️ <span style="color: yellow">.env</span> 🧙‍♂️
- After creating you'll set a environment variable called <span style="color: red">STAGE</span>👽

```.env
STAGE=TEST
```

- Now you're <span style="color: purple">TOTALLY</span> prepáred to run the project, so let's run it!!

```zsh
yarn start
```

⚠ OR ⚠

```zsh
npm start
```

## If you see your terminal with this message


<span style="color: red">Server running on port</span> <span style="color: green">3333</span>⚡

## You're done ✔

#### Above I'll put the routes to be used

| ROUTES |     |
| -------------  | --- |
| <span style="color: red">Create (POST)</span> | <span style="color: yellow">/create-user</span> |
| <span style="color: red">Delete (DELETE)</span> | <span style="color: yellow">/delete-user?id=0</span> |
| <span style="color: red">Get All (GET)</span> | <span style="color: yellow">/get-all-users</span> |
| <span style="color: red">Get (GET)</span> | <span style="color: yellow">/get-user?id=0</span> |
| <span style="color: red">Update (PUT)</span> | <span style="color: yellow">/update-user?id=0</span> |

- Routes that need a body on the request are <span style="color: yellow">/create-user</span> and <span style="color: yellow">/update-user?id=0</span>

## What kind of body⁉⁉⁉

- For the both you can use this example...

```json
{
  "name": "Rodrigo Diana Siqueira",
  "email": "rodrigo.dsiqueira1@gmail.com",
  "state": "PENDING"
}
```




