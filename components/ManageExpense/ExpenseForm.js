import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import Input from "./Input";
import MyButton from "../UI/MyButton";
import { getFormattedDate } from "../../util/date";
import GlobalStyles from "../../constants/styles";
import LoadingOverlay from "../UI/LoadingOverlay";
import CustomDateTimePicker from "../UI/CustomDateTimePicker";
function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setDateShowPicker] = useState(false);
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues
        ? getFormattedDate(defaultValues.date)
        : selectedDate,
      isValid: true,
    },
    title: {
      value: defaultValues ? defaultValues.title : "",
      isValid: true,
    },
  });
  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
      setInputs((curInputs) => {
        return {
          ...curInputs,
          ["date"]: { value: convertDate(date), isValid: true },
        };
      });
    }
  };
  const handleDatePickerClose = () => {
    setDateShowPicker(false);
  };
  function convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split("");
    var ddChars = dd.split("");

    return (
      yyyy +
      "-" +
      (mmChars[1] ? mm : "0" + mmChars[0]) +
      "-" +
      (ddChars[1] ? dd : "0" + ddChars[0])
    );
  }
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function submitHandler() {
    // console.log("inputs.amount: " + inputs.amount.value);
    // console.log("inputs.date: " + inputs.date.value);
    // console.log("inputs.title: " + inputs.title.value);
    let expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      title: inputs.title.value,
      // userEmail: defaultValues.userEmail,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const titleIsValid = expenseData.title.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !titleIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          title: {
            value: curInputs.title.value,
            isValid: titleIsValid,
          },
        };
      });
      return;
    }
    // console.log("in submithandler");

    onSubmit(expenseData);
  }
  const formIsInvalid =
    !inputs.amount.isValid || !inputs.date.isValid || !inputs.title.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <View style={styles.rowInput}>
          <Text style={styles.formText}>Date</Text>
          <Pressable
            onPress={() => setDateShowPicker(true)}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.pressed : null,
            ]}
          >
            <View style={styles.input}>
              <Text style={styles.inputText}>{convertDate(selectedDate)}</Text>
            </View>
          </Pressable>
        </View>
        <CustomDateTimePicker
          visible={showDatePicker}
          date={selectedDate}
          onChange={handleDateChange}
          onClose={handleDatePickerClose}
          dateOrTime="date"
        />
      </View>
      <Input
        label="Title"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, "title"),
          value: inputs.title.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <MyButton
          style={styles.button}
          mode="flat"
          onTap={onCancel}
          text="Cancel"
        ></MyButton>
        <MyButton
          style={styles.button}
          onTap={submitHandler}
          text={submitButtonLabel}
        ></MyButton>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 135,
    marginHorizontal: 0,
    // padding: 8,
    borderRadius: 8,
    color: GlobalStyles.colors.primary700,
  },
  singleInputContainer: {
    borderRadius: 1,
    borderColor: "white",
    borderWidth: 1,
    width: "100%",
    //     height: 50,
    marginBottom: 10,
    padding: 10,
    //     color: "white",
  },
  formText: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
    width: "100%",
    color: GlobalStyles.colors.primary700,
  },
  inputText: {
    fontSize: 16,
    color: GlobalStyles.colors.primary700,
  },
});
