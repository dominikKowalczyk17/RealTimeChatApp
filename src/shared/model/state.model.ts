export type StatusNotification = "OK" | "ERROR" | "INIT";

export class State<T = Record<string, unknown>, V extends Error = Error> {
  value?: T;
  error?: V;
  status: StatusNotification;

  constructor(status: StatusNotification, value?: T, error?: V) {
    this.value = value;
    this.error = error;
    this.status = status;
  }

  static Builder<T = Record<string, unknown>, V extends Error = Error>() {
    return new StateBuilder<T, V>();
  }
}

class StateBuilder<T = Record<string, unknown>, V extends Error = Error> {
  private status: StatusNotification = "INIT";
  private value?: T;
  private error?: V;

  public getStatus(): StatusNotification {
    return this.status;
  }

  public forSuccess(value: T): State<T, V> {
    this.value = value;
    return new State<T, V>("OK", this.value, this.error);
  }

  public forSuccessEmpty(): State<T, V> {
    return new State<T, V>("OK", this.value, this.error);
  }

  public forError(
    error: V = new Error("Unknown Error") as V,
    value?: T,
  ): State<T, V> {
    this.value = value;
    this.error = error;
    return new State<T, V>("ERROR", this.value, this.error);
  }

  public forInit(): State<T, V> {
    return new State<T, V>("INIT", this.value, this.error);
  }
}
