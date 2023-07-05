# Assignment 2

## ExpressJS

**api/**

40% of the requests will fail intentionally!

```bash
cd api/
npm install
npm run build
npm run start
npm run lint
npm run test
```

Serving on port 8080 http://localhost:8080

- /countries

- /continents

**Docker Image:**

```bash
docker build -t <API_IMAGE_NAME> .
docker run -p 8080:8080 <API_IMAGE_NAME>
```

## NextJS

**my-app/**

40% of the requests will return errors intentionally, but they are handled user friendly!

```bash
cd my-app/
npm install
npm run dev
```

http://localhost:3000

**Docker Image:**

```bash
docker build -t <APP_IMAGE_NAME> .
docker run -p 3000:3000 <APP_IMAGE_NAME>
```
