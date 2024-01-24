import { View, Text, StyleSheet, Pressable } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import GlobalStyles from "../../constants/styles";
import Button from "../UI/Button";
import { useState } from "react";
import { useContext } from "react";
import { ExpensesContext } from "../../store/expenses-context";

function ExpensesOutput(props) {
  let content = <Text style={styles.text}>No expenses found</Text>;
  const expensesCtx = useContext(ExpensesContext);
  // let Presonalized=false;
  const [personalized, setPersonalized] = useState(false);
  return (
    <View style={styles.container}>
      {props.expenses.length === 0 ? (
        content
      ) : (
        <>
          <Text style={styles.textBase}>logged-in:</Text>
          <Text style={styles.textBase}>{expensesCtx.email}</Text>
          <ExpensesSummary
            period={props.expensesPeriod}
            expenses={props.expenses}
          />
          <Button
            onPress={() => {
              setPersonalized(!personalized);
            }}
            red={personalized && { backgroundColor: "red" }}
          >
            {!personalized && "Click to show your expenses"}
            {personalized && "Click to show all expenses"}
          </Button>
          <ExpensesList
            expenses={props.expenses}
            returnS={props.returnS}
            person={personalized}
          />
        </>
      )}
    </View>
  );
}

export default ExpensesOutput;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginTop: 24,
  },
  textBase: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
    fontWeight:'bold',
  },
});
