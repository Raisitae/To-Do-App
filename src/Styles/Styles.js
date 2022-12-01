import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
  containerEnd: {
    flex: 1,
    margin: 'auto',
    justifyContent: 'flex-end',
    backgroundColor: '#EDEDEE',
  },
  button: {
    backgroundColor: '#8482D6',
    width: '85%',
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  secondaryText: {
    color: 'grey',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 75,
    textAlign: 'center',
  },

  loginText: {
    color: '#A7A5FF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  elipse: {
    position: 'absolute',
    top: -100,
    left: '-24%',
    zIndex: 100,
  },

  input: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 50,
    marginBottom: 15,
    paddingLeft: 40,
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    width: '90%',
  },

  inputGroup: {
    width: '95%',
    alignItems: 'center',
  },

  imgTitle: {
    height: 200,
    width: 200,
    marginBottom: 30,
  },
  textDescription: {
    color: 'dark-grey',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainOnboarding: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    height: '80%',
    paddingBottom: 60,
  },
  center: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
    fontFamily: 'notoserif',
    color: 'black',
    fontSize: 20,
    marginBottom: 15,
  },
  containerTextLink: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
  },
  /* Modal */
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalCard: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 7,
    padding: 50,
    width: '80%',
  },
});
