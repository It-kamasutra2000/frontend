import { makeAutoObservable } from "mobx";
import usersService from "../api/users_service";
import { EmailFieldError, PasswordFieldError } from "../utils/errorHandler";

class Userstore {
  isFetching: boolean = false;
  emailError: string = "";
  passwordError: string = "";
  nameError: string = "";
  error: string = "";
  isAuth: boolean = false;
  userName: string = "";
  email: string = "";
  isAuthFetching: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setFieldError(fieldName: string, error: string) {
    if (fieldName === "email") {
      return (this.emailError = error);
    }
    this.passwordError = error;
  }

  login = async (email: string, password: string) => {
    try {
      this.isFetching = true;
      this.passwordError = "";
      this.emailError = "";
      if (!email) {
        return (this.emailError = "field is required");
      }
      if (!password) {
        return (this.passwordError = "field is required");
      }
      const result = await usersService.login(email, password);
      if (!result.data.success) {
        if (result.data.message.includes("password")) {
          throw new PasswordFieldError(result.data.message);
        }
        throw new EmailFieldError(result.data.message);
      }
      this.isAuth = result.data.data.isAuth;
      this.userName = result.data.data.name;
      this.email = result.data.data.email;
      localStorage.setItem("token", result.data.token);
    } catch (e: any) {
      if (e instanceof PasswordFieldError) {
        return this.setFieldError("password", e.message);
      }
      this.setFieldError("email", e.message);
    } finally {
      this.isFetching = false;
    }
  };

  logout = async () => {
    try {
      this.isFetching = true;
      const result = await usersService.logout();
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      await this.auth();
    } catch ({ message }) {
      this.error = message as string;
    } finally {
      this.isFetching = false;
    }
  };

  registration = async (email: string, password: string, name: string) => {
    try {
      this.nameError = "";
      if (!name) {
        return (this.nameError = "field is required");
      }
      if (!email) {
        return (this.emailError = "field is required");
      }
      if (!password) {
        return (this.passwordError = "field is required");
      }
      this.isFetching = true;
      const result = await usersService.registration(email, password, name);
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      this.isAuth = result.data.data.isAuth;
      this.email = result.data.data.email;
      this.userName = result.data.data.name;
      localStorage.setItem("token", result.data.token);
    } catch ({ message }) {
      this.emailError = message as string;
    } finally {
      this.isFetching = false;
    }
  };

  auth = async () => {
    try {
      this.isAuthFetching = true;
      const result = await usersService.auth();
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      this.isAuth = result.data.data.isAuth;
      this.email = result.data.data.email;
      this.userName = result.data.data.name;
    } catch ({ message }) {
      this.error = message as string;
    } finally {
      this.isAuthFetching = false;
    }
  };
}

export default new Userstore();
