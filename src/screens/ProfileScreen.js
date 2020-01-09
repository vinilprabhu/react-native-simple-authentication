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
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStore from '../Utility/AppStore';
import { StackActions, NavigationActions } from 'react-navigation';

const loginAction = () => StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
  });

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.getUser();
  }

  getUser = async () => {
    let user = await AppStore.getCurrentUser();
    this.setState({user});
  };

  logOut = async () => {
    await AppStore.logOut();
    this.gotoSignIn();
  };

  gotoSignIn() {
    this.props.navigation.dispatch(loginAction());
    // this.props.navigation.navigate('SignIn', {name: 'Jane'});
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Home',
    };
  };
  render() {
    return (
      <View style={styles.root}>
        <Image source={this.state.user.image} style={styles.uploadAvatar} />

        <View style={styles.names}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>FIRST NAME</Text>
            <Text style={styles.value}>{this.state.user.firstName}</Text>
          </View>
        </View>

        <View style={styles.verticalSeperarator} />

        <View style={styles.names}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>LAST NAME</Text>
            <Text style={styles.value}>{this.state.user.lastName}</Text>
          </View>
        </View>

        <View style={styles.verticalSeperarator} />

        <View style={styles.names}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>USERNAME</Text>
            <Text style={styles.value}>{this.state.user.username}</Text>
          </View>
        </View>

        <View style={styles.verticalSeperarator} />

        <View style={styles.names}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>EMAIL ADDRESS</Text>
            <Text style={styles.value}>{this.state.user.email}</Text>
          </View>
        </View>

        <View style={styles.verticalSeperarator} />

        <View style={{height: 20}} />

        <Icon.Button
          underlayColor="#00000040"
          name="sign-out"
          backgroundColor="#A0D468"
          color="white"
          size={25}
          onPress={() => this.logOut()}
          style={styles.continueButton}>
          Logout
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
  value: {
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

export default ProfileScreen;
{
  /* <Button
        title="Logout"
        onPress={() => navigate('SignUp', {name: 'Jane'})}
      /> */
}
