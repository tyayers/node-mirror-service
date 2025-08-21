# Simple Node Mirror Service
A service that simply listens for POST, GET, PUT, or DELETE HTTP messages, and mirrors either the request, or sample data, back as the response.

## Run
```sh
# run locally
npm i
node index.js

# deploy to GCP Cloud Run
PROJECT_ID=YOUR_PROJECT_ID
REGION=YOUR_REGION
gcloud run deploy mirror-service --source . --project $PROJECT_ID --region $REGION --set-env-vars GCLOUD_PROJECT="$PROJECT_ID",GCLOUD_REGION="$REGION" --allow-unauthenticated

## Usage
```sh
# get some basic product data
curl http://0:8080/products

# post some data and get it returned
curl -X POST http://0:8080 \
    -H "Content-Type: application/json" \
    --data-binary @- << EOF
[
    {
    "userId": 123,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
    },
    {
    "userId": 45,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
    },
    {
    "userId": 123,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
    },
    {
    "userId": 22,
    "id": 4,
    "title": "et porro tempora",
    "completed": true
    }
]
EOF
```
