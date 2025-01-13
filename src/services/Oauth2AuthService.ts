import Keycloak from "keycloak-js";
import { environment } from "../config/environment";
import { ConnectedUser } from "../shared/model/user.model"; // Ensure you have the correct model
import axios from "axios"; // Use axios for API communication

class Oauth2AuthService {
  private keycloak: Keycloak;
  private accessToken: string | undefined;
  private fetchUserHttp$: Promise<ConnectedUser>;

  constructor() {
    this.keycloak = new Keycloak({
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    });
    this.fetchUserHttp$ = Promise.resolve({ email: "NOT_CONNECTED" }); // Default value
  }

  public async initAuthentication(): Promise<void> {
    const authenticated = await this.keycloak.init({
      flow: "standard",
      onLoad: "check-sso",
      redirectUri: "http://localhost:3000/", // Change to the appropriate address
      silentCheckSsoRedirectUri:
        window.location.origin + "/assets/silentCheckSsoRedirectUri.html",
    });

    if (authenticated) {
      this.accessToken = this.keycloak.token;
      await this.fetch();
    } else {
      // Logic for opening the login modal
    }
  }

  public async fetchAuthenticatedUser(
    forceResync: boolean,
  ): Promise<ConnectedUser> {
    const params = new URLSearchParams({ forceResync: String(forceResync) });
    const response = await axios.get<ConnectedUser>(
      `${environment.API_URL}/users/get-authenticated-user?${params}`,
    );
    return response.data;
  }

  public async fetch(): Promise<void> {
    try {
      const user = await this.fetchAuthenticatedUser(true);
      console.log("Dane użytkownika:", user);
    } catch (error) {
      console.error("Błąd podczas pobierania użytkownika:", error);
    }
  }

  public isAuthenticated(): boolean {
    return this.keycloak.authenticated!;
  }

  public login(): void {
    this.keycloak.login();
  }

  public logout(): void {
    this.keycloak.logout();
  }

  public goToProfilePage(): void {
    this.keycloak.accountManagement();
  }
}

export default new Oauth2AuthService();
