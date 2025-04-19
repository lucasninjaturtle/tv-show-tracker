<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


# Dev

1. Clone the project
2. Copy ```env.template``` and rename to ```.env```
3. Run
```
yarn install
```
4. Install the image (Docker desktop)
```
docker compose up -d
```

5. Raise the Nest backend
```
yarn start:dev
```

6. Visit the site
```
localhost:3000/graphql
```
7.  Test - run
```
yarn test
```


# Notes

- SOLID Principles & Folder structure recommended by NestJs
- Pagination & Filters on "Shows": offset : number (startsAt) | limit : number (takesMany) || Genre, type, Sorts.
- RGPD: Right to Access & Right to be Forgotten + export CSV
