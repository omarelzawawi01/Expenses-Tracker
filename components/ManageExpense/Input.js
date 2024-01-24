import { View, Text, TextInput ,StyleSheet} from 'react-native';
import GlobalStyles from '../../constants/styles';
function Input(props){
          let inputStyles=[styles.input];
          if(props.textInputConfig.multiline){
                    inputStyles.push(styles.inputMutliLine);
          }
          if (props.invalid) {
                    inputStyles.push(styles.invalidInput);
          }
          return(
                    <View style={[styles.inputContainer,props.style]} >
                              <Text style={[styles.label , props.invalid && styles.invalidLabel] } >
                                        {props.label}
                              </Text>
                              <TextInput style={inputStyles}  {...props.textInputConfig}  />
                    </View>
          );

}

export default Input;
const styles = StyleSheet.create({
          inputContainer: {
                    marginHorizontal: 10,
                    marginVertical: 5,
                    padding: 10,
                    // borderRadius: 10,
                    // backgroundColor: 'white',
                    // borderWidth: 1,
                    // borderColor: 'white',
                    // shadowColor: 'black',
                    // shadowOpacity: 0.26,
                    // shadowOffset: { width: 0, height: 2 },
                    // shadowRadius: 8,
                    // elevation: 5,
                    // flexDirection: 'row',
                    // alignItems: '',
                    // justifyContent: 'space-between',
          },
          label: {
                    fontSize: 12,
                    color: GlobalStyles.colors.primary100,
                    marginBottom: 4,
          },
          input: {
                    backgroundColor: GlobalStyles.colors.primary100,
                    padding: 8,
                    borderRadius: 8,
                    fontSize: 16,
                    color: GlobalStyles.colors.primary700,
          },
          inputMutliLine: {
                    minHeight: 100,
                    textAlignVertical: 'top',
          },
          invalidLabel: {
                    color: GlobalStyles.colors.error500,
          },
          invalidInput: {
                    backgroundColor: GlobalStyles.colors.error50,
          },

});
