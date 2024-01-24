import { Alert, Text } from "react-native";
import React, { useRef } from "react";
import { useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import GlobalStyles from "../constants/styles";
import { View, StyleSheet } from "react-native";
import MyButton from "../components/UI/MyButton";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
import { expensesContextHandler } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Toast, { BaseToast } from "react-native-toast-message";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
const ToastComponent = React.forwardRef((props, ref) => {
  return <BaseToast {...props} ref={ref} />;
});
function ManageExpense({ navigation, route }) {
  const { expenseId } = route.params;
  console.log("expenseID in beginning of manage expense: "+expenseId);
  const { process } = route.params;
  const toastRef = useRef(null);
  const expensesContext = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: process === "add" ? "Add Expense" : "Edit Expense",
    });
  }, [navigation, process]);
  function deleteExpenseHandler() {
    // add an alert to confirm the deletion
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
        },
        {
          text: "OK",
          onPress: () => {
            async function deleteEx() {
              setIsLoading(true);
              setIsSaving(true);
              console.log("delete id: "+expenseId);
              try {
                await deleteExpense(expenseId);
                expensesContext.deleteExpense(expenseId);
                navigation.goBack();
              } catch (err) {
                setError(err.message);
                setIsLoading(false);
              }
              // setIsSaving(false);
            }
            deleteEx();
          },
        },
      ]
    );

    // console.log(expenseId);
    // if (toastRef.current) {
    //   toastRef.current.show({
    //     type: "success", // You can use 'error', 'info', or 'success' types
    //     text1: "Record Deleted",
    //     visibilityTime: 2000, // Duration of the toast message (in milliseconds)
    //   });
    // }
    // add an alert to indicate that the record has been deleted
    // Alert.alert("Record Deleted", "The record has been deleted", [
    //   {
    //     text: "OK",
    //     onPress: () => {
    //       navigation.goBack();
    //     },
    //   },
    // ]);
    // navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function saveHandler(expense) {
    console.log("IN Manage Expense Save Handler");
    console.log('expenseId'+expenseId);
    console.log("Expense to be edited, manage expense: "+expense);
    // expense.token=expensesContext.token
    // expense.id = expenseId;
    setIsLoading(true);
    try {
      if (process === "add") {
        console.log("adding");
        setIsLoading(true);
        expense.userEmail=expensesContext.email;
        const id = await storeExpense(expense);
        setIsLoading(false);
        console.log("in manage expense, id: "+id);
        expense.id = id;
        expensesContext.addExpense(expense);
      } else {
        console.log("editing : "+expenseId);
        console.log("selectedExpenseEmial:"+selectedExpense.userEmail);
        setIsLoading(true);
        expense.userEmail=selectedExpense.userEmail;
        expense.id=expenseId;
        const id=await updateExpense(expenseId, expense);
        // console.log("ID after Update: "+id);
        setIsLoading(false);
        expensesContext.updateExpense(expense, expenseId);
      }
      navigation.goBack();
    } catch (err) {
      setError('Could not save the expense. Please try again later.');
      setIsLoading(false);
    }
  }
  function errorConfirmedHandler() {
    setError(null);
  }

  if (error && !isLoading) {
    return <ErrorOverlay error={error} onTap={errorConfirmedHandler} />;
  }
  if (isLoading) {
    // console.log("loading");
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      {/* <ExpenseForm /> */}
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={saveHandler}
        submitButtonLabel={process === "add" ? "Add Expense" : "Save Changes"}
        defaultValues={selectedExpense}
      />
      {process === "edit" && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={24}
            color={GlobalStyles.colors.error500}
            onTap={deleteExpenseHandler}
          />
          {selectedExpense && (<Text style={styles.Textbase} >Expense Issued by: {selectedExpense.userEmail}</Text>)}
          {/* <ToastComponent ref={toastRef} /> */}
        </View>
      )}
    </View>
  );
}
export default ManageExpense;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 20,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  Textbase:{
    color:'white',
    fontSize:16,
    fontWeight:"bold",
    textAlign:"center",
  },
});
