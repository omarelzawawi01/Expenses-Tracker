import { createContext, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ExpensesContext = createContext({
  token:"",
  isAuthenticated:false,
  email:'',
  expenses: [],
  addExpense: ({ title, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, title, amount, date) => {},
  setExpenses: (expenses) => {},
  authenticate: () => {},
  logout: () => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.payload];
    case "DELETE_EXPENSE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE_EXPENSE":
      const expenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = action.payload;
      return updatedExpenses;
    case "SET_EXPENSES":
      return action.payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider(props) {
  const [expenses, setExpenses] = useState([]);
  const [expensesState, dispatch] = useReducer(expenseReducer, []);
  const [authToken, setAuthToken] = useState(null);
  const [Email,setEmail]=useState(null);
  function addExpense(expense) {
    dispatch({ type: "ADD_EXPENSE", payload: expense });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE_EXPENSE", payload: id });
  }
  function updateExpense(id, title, amount, date) {
    dispatch({ type: "UPDATE_EXPENSE", payload: { id, title, amount, date } });
  }
  function setExpensesH(expenses) {
    dispatch({ type: "SET_EXPENSES", payload: expenses });
  }
  function setExpensesHandler(expenses) {
    const invertedExpenses = expenses.reverse();
    setExpenses(invertedExpenses);
  }
  function addExpenseHandler(expense) {
    // const expense = {
    //   id: Math.random().toString(),
    //   title: title,
    //   amount: amount,
    //   date: date,
    // };
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  }
  function deleteExpenseHandler(id) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }
  function updateExpenseHandler(updatedExpense,expenseId) {
    // updateExpense.id = Math.random().toString();
    setExpenses((prevExpenses) => {
      const expenseIndex = prevExpenses.findIndex(
        (expense) => expense.id === expenseId
      );
      // console.log(expenseIndex);
      // console.log(updatedExpense.id);
      const updatedExpenses = [...prevExpenses];
      updatedExpenses[expenseIndex] = updatedExpense;
      return updatedExpenses;
    });
  }
  function authenticate(token,email) {
    setAuthToken(token);
    setEmail(email);
    AsyncStorage.setItem("token", token);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }
  const value = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    updateExpense: updateExpenseHandler,
    setExpenses: setExpensesHandler,
    setExpenses2: setExpensesH,
    token: authToken,
    email:Email,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {props.children}
    </ExpensesContext.Provider>
  );
}
export default ExpensesContextProvider;
