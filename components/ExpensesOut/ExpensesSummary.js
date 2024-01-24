import { View, Text, StyleSheet } from "react-native";
import GlobalStyles from "../../constants/styles";
function ExpensesSummary(props) {
  const expensesSum = props.expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.period}>{props.period} </Text>
        <Text style={styles.amount}>${expensesSum.toFixed(2)}</Text>
      </View>
    </View>
  );
}
export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  period: {
    fontSize: 14,
    color: GlobalStyles.colors.primary400,
    fontWeight: "bold", 
  },
  amount: {
    fontSize: 16,
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
