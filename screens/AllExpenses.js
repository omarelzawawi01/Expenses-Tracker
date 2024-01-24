import { Text, View,Button } from "react-native";
import ExpensesOutput from "../components/ExpensesOut/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext, useState } from "react";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { Alert } from "react-native";
import { deleteExpense } from "../util/http";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading,setIsLoading]=useState(true);
  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      const expenses=await fetchExpenses();
      setIsLoading(false);
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
    console.log("useffect");
  }, []);
  if(isLoading){
    return <LoadingOverlay/>
  }
  return (
    <ExpensesOutput expensesPeriod={"Total"} expenses={expensesCtx.expenses} returnS="All Expenses" />
  );
}
export default AllExpenses;
