/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {images, colors} from '../constants';
import {CustomButton, CustomInput} from '../Components';

const LogIn = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    let regec = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$';
    if (!inputs.email) {
      handleError('Please input email', 'email');
      valid = false;
    } else if (!inputs.email.match(regec)) {
      handleError('Please input a valid email', 'email');
      valid = false;
    }

    if (!inputs.password) {
      handleError(
        'Please input password \n \nShould contain one letter, one number and be at least 8 characters long',
        'password',
      );
      valid = false;
    } else if (inputs.password < 8) {
      handleError('Min Password length of 8', 'password');
      valid = false;
    }

    if (valid) {
      // register();
      // postLogin();
      navigation.navigate('SignInScreen');
    }
  };

  // const register = () => {
  //   setLoading(true);
  // };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  //   //Login Logic
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(
  //       {
  //         username: 'maemunah',
  //         password: 'Machiavelli09'
  //        })
  // };

  // const postLogin = async () => {
  //     try {
  //         await fetch(
  //             'https://reqres.in/api/posts', requestOptions)
  //             .then(response => {
  //                 response.json()
  //                     .then(data => {
  //                         Alert.alert("Post created at : ",
  //                         data.createdAt);
  //                     });
  //             })
  //     }
  //     catch (error) {
  //         console.log(error);
  //     }
  // }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 20}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{paddingTop: 30, paddingHorizontal: 20}}
          bounces={true}>
          <View>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={styles.Logo}
            />
            <Text style={styles.powered}>Powered by Ecobank Group</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.header}>SetUp Password</Text>
            <Text style={styles.subtitle}>
              Kindly choose a password that you can remember
            </Text>
            <View style={styles.input}>
              <CustomInput
                label="Password"
                onChangeText={text => handleOnChange(text, 'email')}
                error={errors.email}
                onFocus={() => {
                  handleError(null, 'email');
                }}
              />
              {/* <Text>
                Should contain one letter, one number and be at least 8
                characters long
              </Text> */}
              <CustomInput
                label="Password Confirmation"
                error={errors.password}
                onChangeText={text => handleOnChange(text, 'password')}
                onFocus={() => {
                  handleError(null, 'password');
                }}
              />
              <CustomButton title="Submit" onPress={validate} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Logo: {
    height: 200,
    width: '100%',
    maxHeight: 350,
  },
  powered: {
    fontSize: 12,
    color: '#C4C4C4',
    textAlign: 'center',
    paddingTop: 10,
    fontFamily: 'Roboto',
  },
  header: {
    fontSize: 25,
    paddingBottom: 10,
    fontWeight: '500',
    fontFamily: 'Roboto',
    color: colors.blue,
  },
  body: {
    marginTop: 30,
  },
  subtitle: {
    color: colors.subGrey,
    fontSize: 13,
    marginBottom: 20,
  },
  input: {
    marginVertical: 20,
    marginBottom: 30,
  },
});

export default LogIn;
