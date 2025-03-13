# Simple Node Mirror Service
A service that simply listens for POST messages, and mirrors the request back as the response.

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