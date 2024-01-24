import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "./components/UI/IconButton";
import GlobalStyles from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { ExpensesContext } from "./store/expenses-context";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ExpensesContextProvider from "./store/expenses-context";
import AppLoading from "expo-app-loading";
// import { ExpensesContext } from "./store/expenses-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState, useEffect } from "react";
// import GlobalStyles from "./constants/styles";
const Tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

function logout() {
  ExpensesContext.logout();
}

function MyTabs() {
  expensesCtx = useContext(ExpensesContext);
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onTap={() => {
              navigation.navigate("Manage Expense", {
                expenseId: null,
                process: "add",
              });
            }}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="log-out"
            size={24}
            color={"red"}
            onTap={() => expensesCtx.logout()}
          />
        ),
      })}
    >
      <Tab.Screen
        name="All Expenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Recent Expenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function AuthStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <stack.Screen name="Login" component={LoginScreen} />
      <stack.Screen name="Signup" component={SignupScreen} />
    </stack.Navigator>
  );
}
function AuthenticatedStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "#fff",
      }}
    >
      <stack.Screen
        name="Home"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Manage Expense"
        component={ManageExpense}
        options={{
          presentation: "modal",
          // headerShown: false,
        }}
      />
    </stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(ExpensesContext);
  // console.log("AuthContext in Navigation.js: ", authCtx);
  return (
    <NavigationContainer>
      {authCtx.isAuthenticated && <AuthenticatedStack />}
      {!authCtx.isAuthenticated && <AuthStack />}
      {/* <AuthStack/> */}
    </NavigationContainer>
  );
}
function Root() {
  const authCtx = useContext(ExpensesContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        authCtx.authenticate(token);
      }
      setIsReady(true);
    });
  }, []);
  if (!isReady) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  // console.log("omar");
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <Root />
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
