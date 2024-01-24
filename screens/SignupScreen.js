import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { createUser } from "../util/http";
import { useState, useContext } from "react";
import { Alert } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const expensesCtx = useContext(ExpensesContext);
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      expensesCtx.authenticate(token,email);
    } catch (error) {
      Alert.alert(
        "Signup failed",
        "Could not create user. Please try again later."
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
