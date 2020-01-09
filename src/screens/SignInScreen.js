import React, {Component} from 'react';
import {
  Button,
  Image,
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStore from '../Utility/AppStore';
import {StackActions, NavigationActions} from 'react-navigation';

const loginAction = () =>
  StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Profile'})],
  });

const signUpAction = () =>
  StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'SignUp'})],
  });

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordHidden: true,
    };
    this.getUser();
  }

  getUser = async () => {
    let user = await AppStore.getCurrentUser();
    console.log({user, test: user.username});
    if (user.username) this.gotoHome();
  };

  static navigationOptions = {
    title: 'Sign In',
  };

  signIn = async () => {
    // this.gotoHome();
    // this.setState({page: 2, nextButtonText: 'Sign Up'});
    // return;

    let username = this.state.username.trim();
    let password = this.state.password.trim();

    if (username === '')
      return this.validationErrorAlert('Username should not be empty!');
    else if (password === '')
      return this.validationErrorAlert('Password should not be empty!');

    // await AppStore.storeUser({
    //     email: 'vinilprabhu@gmail.coma',
    //     firstName: 'A',
    //     lastName: 'A',
    //     password: 'aaa2',
    //     username: 'b',
    // });

    let u2 = [
      {
        email: 'vinilprabhu@gmail.com',
        firstName: 'A',
        lastName: 'A',
        password: 'aaa1',
        username: 'a',
      },
      {
        email: 'vinilprabhu@gmail.coma',
        firstName: 'A',
        lastName: 'A',
        password: 'aaa2',
        username: 'b',
      },
    ];

    let users = await AppStore.getUsers();

    let filteredUsers = users.filter(x => x.username === username);

    if (filteredUsers.length == 0)
      return this.loginErrorAlert('username not found');

    let passwordCorrect = filteredUsers[0].password === password;

    if (!passwordCorrect)
      return this.loginErrorAlert('username or password incorrect');

    this.login(filteredUsers[0]);
  };

  login = async user => {
    console.log({user});
    await AppStore.storeCurrentUser(user);
    // let user = await AppStore.getCurrentUser();
    // console.log({user});
    this.gotoHome();
  };

  gotoHome() {
    this.props.navigation.dispatch(loginAction());
    // this.props.navigation.navigate('Profile', {name: 'Jane'});
  }

  gotoSignUp() {
    this.props.navigation.dispatch(signUpAction());
    // this.props.navigation.navigate('SignUp', {name: 'Jane'});
  }

  loginErrorAlert(text) {
    Alert.alert('SignIn Error!', text, [{text: 'OK'}], {cancelable: true});
  }

  validationErrorAlert(text) {
    Alert.alert('Validation Error!', text, [{text: 'OK'}], {cancelable: true});
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }

  togglePasswordVisibility() {
    let passwordHidden = this.state.passwordHidden;
    this.setState({passwordHidden: !passwordHidden});
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.names}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeader}>USERNAME</Text>
              <TextInput
                ref={ref => {
                  this.usernameRef = ref;
                }}
                autoCapitalize="none"
                keyboardType="default"
                autoCompleteType="username"
                textContentType="username"
                placeholder="Your username"
                style={styles.input}
                onChangeText={text => this.onChangeText('username', text)}
                value={this.state.username}
              />
            </View>
          </View>
          <View style={styles.verticalSeperarator} />
          <View style={styles.names}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeader}>PASSWORD</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  ref={ref => {
                    this.passwordRef = ref;
                  }}
                  keyboardType="default"
                  secureTextEntry={this.state.passwordHidden}
                  autoCapitalize="none"
                  // password={true}
                  // autoCompleteType="password"
                  // textContentType="newPassword"
                  placeholder="Your password"
                  style={styles.inputPassword}
                  onChangeText={text => this.onChangeText('password', text)}
                  value={this.state.password}
                />
                <Icon.Button
                  underlayColor="#00000000"
                  name={this.state.passwordHidden ? 'eye-slash' : 'eye'}
                  backgroundColor="#00000000"
                  color="#000000"
                  onPress={() => this.togglePasswordVisibility()}
                />
              </View>
            </View>
          </View>
          <View style={styles.verticalSeperarator} />
        </View>

        <View style={{height: 20}} />

        <Icon.Button
          underlayColor="#00000040"
          name="sign-in"
          backgroundColor="#A0D468"
          color="white"
          size={25}
          onPress={() => this.signIn()}
          style={styles.continueButton}>
          Sign In
        </Icon.Button>

        <View style={{height: 20}} />

        <Icon.Button
          underlayColor="#00000040"
          name="sign-in"
          backgroundColor="#A0D468"
          color="white"
          size={25}
          onPress={() => this.gotoSignUp()}
          style={styles.continueButton}>
          Sign Up
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  uploadAvatar: {
    width: '40%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  addUploadAvatar: {
    width: 150,
    height: 150,
    margin: 20,
    resizeMode: 'contain',
  },
  names: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    padding: 5,
  },
  inputPassword: {
    fontSize: 16,
    padding: 5,
    flex: 1,
  },
  inputContainer: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  horizontalSeperarator: {
    width: 1,
    height: '90%',
    backgroundColor: 'lightgray',
    marginHorizontal: 5,
  },
  verticalSeperarator: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgray',
  },
  inputHeader: {
    color: '#5C9EFF',
  },
  continueButton: {
    padding: 20,
  },
});

export default SignInScreen;

// darkBlue:#116FFF lightBlue:#5C9EFF green:#A0D468
