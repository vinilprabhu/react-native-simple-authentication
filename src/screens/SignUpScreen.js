import React, {Component} from 'react';
import {
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

const signInAction = () =>
  StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'SignIn'})],
  });

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      page: 1,
      nextButtonText: 'Continue',
      passwordHidden: true,
    };
  }

  static navigationOptions = {
    title: 'Sign Up',
  };

  getImage = async () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
      storageOptions: {
        path: 'test',
      },
    };

    ImagePicker.launchCamera(options, response => {
      //   console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        console.log('URI', response.uri);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password) {
    var letter = /[a-zA-Z]/;
    var number = /[0-9]/;
    return !(
      password.length < 4 ||
      !letter.test(password) ||
      !number.test(password)
    );
  }

  goBack = async()=>{
    this.setState({page: 1, nextButtonText: 'Continue'});
  }

  next = async () => {
    // await AppStore.clearData()
    // this.gotoHome();
    // // this.setState({page: 2, nextButtonText: 'Sign Up'});
    // return;

    let image = this.state.avatarSource;
    let firstName = this.state.firstName.trim();
    let lastName = this.state.lastName.trim();
    let username = this.state.username.trim();
    let email = this.state.email.trim();
    let password = this.state.password.trim();

    if (this.state.page == 1) {
      let checkUsernameResult = await AppStore.checkUsername(username);
      console.log({checkUsernameResult});

      if (!image) this.validationErrorAlert('Profile Image not selected!');
      else if (firstName === '')
        this.validationErrorAlert('First Name should not be empty!');
      else if (lastName === '')
        this.validationErrorAlert('Last Name should not be empty!');
      else if (username === '')
        this.validationErrorAlert('Username should not be empty!');
      else if (!checkUsernameResult.success)
        this.validationErrorAlert('Username already present!');
      else this.setState({page: 2, nextButtonText: 'Sign Up'});
    } else {
      // this.setState({page: 1, nextButtonText: 'Continue'});
      // return

      let checkEmailResult = await AppStore.checkEmail(email);

      if (email === '')
        this.validationErrorAlert('Email Adress should not be empty!');
      else if (!this.validateEmail(email))
        this.validationErrorAlert('Email Adress is invalid!');
      else if (!checkEmailResult.success)
        this.validationErrorAlert('Email already present!');
      else if (password === '')
        this.validationErrorAlert('Password should not be empty!');
      else if (!this.validatePassword(password))
        this.validationErrorAlert('Password is invalid!');
      else this.login({image, firstName, lastName, username, email, password});
    }
  };

  login = async user => {
    console.log({user});
    await AppStore.storeUser(user);
    let users = await AppStore.getUsers();
    console.log({users});
    this.gotoHome();
  };

  gotoHome() {
    this.props.navigation.dispatch(loginAction());
    // this.props.navigation.navigate('Profile', {name: 'Jane'});
  }

  gotoSignIn() {
    this.props.navigation.dispatch(signInAction());
    // this.props.navigation.navigate('SignIn', {name: 'Jane'});
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
        {this.state.page == 1 ? (
          <View style={styles.container}>
            {this.state.avatarSource ? (
              <Image
                source={this.state.avatarSource}
                style={styles.uploadAvatar}
              />
            ) : (
              <TouchableOpacity onPress={() => this.getImage()}>
                <Image
                  source={require('../assets/images/addImage.png')}
                  style={styles.addUploadAvatar}
                />
              </TouchableOpacity>
            )}
            <View style={styles.names}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputHeader}>FIRST NAME</Text>
                <TextInput
                  ref={ref => {
                    this.firstNameRef = ref;
                  }}
                  onSubmitEditing={() => {
                    this.lastNameRef.focus();
                  }}
                  blurOnSubmit={false}
                  keyboardType="default"
                  autoCompleteType="name"
                  textContentType="name"
                  placeholder="Your First Name"
                  style={styles.input}
                  onChangeText={text => this.onChangeText('firstName', text)}
                  value={this.state.firstName}
                />
              </View>
              <View style={styles.horizontalSeperarator} />
              <View style={styles.inputContainer}>
                <Text style={styles.inputHeader}>LAST NAME</Text>
                <TextInput
                  ref={ref => {
                    this.lastNameRef = ref;
                  }}
                  onSubmitEditing={() => {
                    this.usernameRef.focus();
                  }}
                  blurOnSubmit={false}
                  keyboardType="default"
                  autoCompleteType="name"
                  textContentType="name"
                  placeholder="Your Last Name"
                  style={styles.input}
                  onChangeText={text => this.onChangeText('lastName', text)}
                  value={this.state.lastName}
                />
              </View>
            </View>
            <View style={styles.verticalSeperarator} />
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
                  placeholder="Choose a username"
                  style={styles.input}
                  onChangeText={text => this.onChangeText('username', text)}
                  value={this.state.username}
                />
              </View>
            </View>
            <View style={styles.verticalSeperarator} />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.names}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputHeader}>EMAIL ADRESS</Text>
                <TextInput
                  ref={ref => {
                    this.emailRef = ref;
                  }}
                  onSubmitEditing={() => {
                    this.passwordRef.focus();
                  }}
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  placeholder="Your Email Address"
                  style={styles.input}
                  onChangeText={text => this.onChangeText('email', text)}
                  value={this.state.email}
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
                    placeholder="Choose a password"
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
        )}

        <View style={{height: 20}} />

        <Icon.Button
          underlayColor="#00000040"
          name={this.state.page == 1 ? 'forward' : 'sign-in'}
          backgroundColor="#A0D468"
          color="white"
          size={25}
          onPress={() => this.next()}
          style={styles.continueButton}>
          {this.state.nextButtonText}
        </Icon.Button>

        <View style={{height: 20}} />

        {this.state.page == 1 ? (
          <Icon.Button
            underlayColor="#00000040"
            name="sign-in"
            backgroundColor="#A0D468"
            color="white"
            size={25}
            onPress={() => this.gotoSignIn()}
            style={styles.continueButton}>
            Sign In
          </Icon.Button>
        ) : (
          <Icon.Button
            underlayColor="#00000040"
            name="backward"
            backgroundColor="#A0D468"
            color="white"
            size={25}
            onPress={() => this.goBack()}
            style={styles.continueButton}>
            Go Back
          </Icon.Button>
        )}
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

export default SignUpScreen;

// darkBlue:#116FFF lightBlue:#5C9EFF green:#A0D468
