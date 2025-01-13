// src/config/environment.ts
console.log("Keycloak URL:", import.meta.env.VITE_KEYCLOAK_URL);
console.log("Keycloak Realm:", import.meta.env.VITE_KEYCLOAK_REALM);
console.log("Keycloak Client ID:", import.meta.env.VITE_KEYCLOAK_CLIENT_ID);
console.log("API URL:", import.meta.env.VITE_API_URL);

export const environment = {
  keycloak: {
    url: "http://localhost:9080/auth",
    realm: "chat-app",
    clientId: "chat-app",
  },
  API_URL: "http://localhost:4200/api",
};
