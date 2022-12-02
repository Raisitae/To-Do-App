import {hideMessage, showMessage} from 'react-native-flash-message';
import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export default function showMessages(message, color, position, floating) {
  showMessage({
    message: message,
    type: 'info',
    autoHide: true,
    duration: 3000,
    icon: 'info',
    backgroundColor: color,
    statusBarHeight: 30,
    floating: floating ? true : false,
    position: position ? position : 'top',
  });
}
