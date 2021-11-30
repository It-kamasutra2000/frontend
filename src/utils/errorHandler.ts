export class FieldError extends Error {
  errorName;
  constructor(error: string) {
    super(error);
    this.errorName = "FieldError";
  }
}

export class EmailFieldError extends FieldError {
  errorName;
  constructor(error: string) {
    super(error);
    this.errorName = "EmailFieldError";
  }
}

export class PasswordFieldError extends FieldError {
  errorName;
  constructor(error: string) {
    super(error);
    this.errorName = "PasswordFieldError";
  }
}
