export const environment = {
  baseUrl: 'https://health-app-portal-dev',
  production: false,
  API: 'https://health-app-api-dev.cfapps.io',
  INGESTION_API: 'https://health-app-offloads-ingestion-service-dev.cfapps.io',
  OKTA_REDIRECT_URI: 'https://health-app-portal-dev.cfapps.io/implicit/callback',
  OKTA_CLIENT_ID: '0oafnbd9qkEb6IBDB0h7',
  IDLE_DURATION: 1800, // show idle dialog 30 minutes after user inactivity
  IDLE_TIMEOUT_DURATION: 120, // close idle dialog 2 minutes after opening it
};
