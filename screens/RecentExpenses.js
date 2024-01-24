import { Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOut/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext, useEffect,useState } from "react";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading,setIsLoading]=useState(true);
  const [error,setError]=useState(null);
  // const [fetchedExpenses,setFetchedExpenses]=useState([]);
  const today = new Date();
  // console.log(today);
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  // console.log(lastWeek);
  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try{
        const expenses=await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      }catch(error){
        setError(error.message);
        // setIsLoading(false);
      }
      setIsLoading(false);
    }
    getExpenses();
  }, []);
  function errorHandler(){
    setError(null);
  }


  if(error && !isLoading){
    return <ErrorOverlay message={error} onTap={errorHandler} />
  }
  if(isLoading){
    return <LoadingOverlay/>
  }
  const expensesLastWeek = expensesCtx.expenses.filter(
    (expense) => expense.date >= lastWeek
  );
  return (
    //     <View>
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={expensesLastWeek}
      returnS="Recent Expenses"
    />
    /* <Text>{today.toString()}</Text> */
    /* console.log(today); */
    /* <Text>{lastWeek.toString()}</Text> */
    /* console.log(lastWeek); */
    //     </View>
  );
}
export default RecentExpenses;
