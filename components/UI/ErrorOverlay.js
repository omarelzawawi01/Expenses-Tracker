import{ View ,ActivityIndicator, StyleSheet,Text} from 'react-native';
import GlobalStyles from '../../constants/styles';
import MyButton from './MyButton';
function ErrorOverlay({message,onTap}) {
          return (
                    <View style={styles.container} >
                              {/* <ActivityIndicator size="large" color="white" /> */}
                              <Text style={styles.title}>Error</Text>
                              <Text style={styles.text}>{message}</Text>
                              <MyButton text="Try again" onTap={onTap} />
                    </View>
          );
}
export default ErrorOverlay;
const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 24,
                    backgroundColor: GlobalStyles.colors.primary700,
          },
          text: {
                    color: 'white',
                    fontSize: 11,
                    textAlign: 'center',
                    marginBottom: 8,
          },
          title: {
                    color: 'white',
                    fontSize: 24,
                    textAlign: 'center',
                    fontWeight: 'bold',
          },


});