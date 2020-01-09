import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignUpScreen from './src/screens/SignUpScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignInScreen from './src/screens/SignInScreen';

const MainNavigator = createStackNavigator({
  SignIn: {screen: SignInScreen},
  SignUp: {screen: SignUpScreen},
  Profile: {screen: ProfileScreen},
});

const App = createAppContainer(MainNavigator);

export default App;