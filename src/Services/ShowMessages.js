import {showMessage} from 'react-native-flash-message';

export default function showMessages(message, color) {
  showMessage({
    message: message,
    type: 'info',
    autoHide: true,
    duration: 3000,
    icon: 'info',
    backgroundColor: color,
    statusBarHeight: 30,
  });
}
