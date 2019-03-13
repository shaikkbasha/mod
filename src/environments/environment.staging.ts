export const environment = {
  baseUrl: 'https://health-app-portal-staging',
  production: false,
  API: 'https://health-app-api-staging.cfapps.io',
  INGESTION_API: 'https://health-app-offloads-ingestion-service-staging.cfapps.io',
  OKTA_REDIRECT_URI: 'https://health-app-portal-staging.cfapps.io/implicit/callback',
  OKTA_CLIENT_ID: '0oafnbd9qkEb6IBDB0h7',
  IDLE_DURATION: 1800, // show idle dialog 30 minutes after user inactivity
  IDLE_TIMEOUT_DURATION: 120, // close idle dialog 2 minutes after opening it
};
