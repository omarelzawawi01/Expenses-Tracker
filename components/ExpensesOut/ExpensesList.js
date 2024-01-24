import { View, Text, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { ExpensesContext } from "../../store/expenses-context";
import { useContext } from "react";
function ExpensesList(props) {
  const expensesCtx=useContext(ExpensesContext);
  function renderExpenseItem(itemData) {
    console.log("id in render: "+itemData.item.id)
    return (
      <View>
        <ExpenseItem
          title={itemData.item.title}
          date={itemData.item.date}
          amount={itemData.item.amount}
          id={itemData.item.id}
          returnS={props.returnS}
        />
      </View>
    );
  }
  let currentExpenses=props.expenses;
  console.log(props.expenses);
  // console.log("Current token: "+expensesCtx.token);
  console.log("Current email: "+expensesCtx.email);
  if (props.person)
  {
    currentExpenses = props.expenses.filter(
      (expense) => expense.userEmail == expensesCtx.email
    );
    console.log("omar is personalized");
  }
  return (
    <FlatList
      data={currentExpenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  );
}

export default ExpensesList;
