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
gcloud run deploy mirror-service --source . --project $PROJECT_ID --region $REGION --allow-unauthenticated
```