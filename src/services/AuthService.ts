import Keycloak from "keycloak-js";
import { environment } from "../config/environment";
import { ConnectedUser } from "../shared/model/user.model";

class AuthService {
  private keycloak: Keycloak;
  private accessToken: string | undefined;
  private isInitialized: boolean = false;

  constructor() {
    this.keycloak = new Keycloak({
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    });
  }

  public async initAuthentication(): Promise<void> {
    if (this.isInitialized) return;

    const authenticated = await this.keycloak.init({
      flow: "standard",
      onLoad: "check-sso",
      redirectUri: window.location.origin,
    });

    if (authenticated) {
      this.accessToken = this.keycloak.token;
      this.isInitialized = true;
      // Możesz dodać logikę do pobierania użytkownika
    } else {
      // Logika otwierania modala logowania
    }
  }

  public async fetchAuthenticatedUser(): Promise<ConnectedUser> {
    const response = await fetch(
      `${environment.API_URL}/users/get-authenticated-user`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Błąd podczas pobierania użytkownika");
    }
    return await response.json();
  }

  public login(): void {
    this.keycloak.login();
  }

  public logout(): void {
    this.keycloak.logout();
  }

  public isAuthenticated(): boolean {
    return this.keycloak.authenticated!;
  }
}

export default new AuthService();
