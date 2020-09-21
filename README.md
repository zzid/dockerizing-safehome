# Dockerize frontend of the first project

<pre>
npm start : .env.development
npm run build : .env.production

usage : process.env.REACT_APP_API_HOST
</pre>

### docker-compose
<pre>
version: "3.3"

services:
  frontend:
    image: zzid/safehome-fe
    ports:
      - "80:80"
    restart: always
  backend:
    image: likeyu96/django-docker
    ports:
      - "8000:8000"
    restart: always
</pre>