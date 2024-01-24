import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { login } from "../util/http";
import { useState, useContext } from "react";
import { Alert } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const expensesCtx = useContext(ExpensesContext);
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      expensesCtx.authenticate(token,email);
      // expensesCtx.isAuthenticated=true;
      // console.log(expensesCtx);
      // console.log(expensesCtx.token);
    } catch (error) {
      Alert.alert(
        "Login failed",
        "Please check your credentials and try again."
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
  // return <AuthContent isLogin />;
}

export default LoginScreen;
