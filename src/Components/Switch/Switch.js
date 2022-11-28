import react, {useState} from 'react';
import {Switch} from 'react-native';

const SwitchCompleted = complete => {
  const handleSwitch = () => {
    setIsCompleted(!isCompleted);
  };

  const [isCompleted, setIsCompleted] = useState(completed);

  return <Switch onValueChange={handleSwitch} value={complete.value} />;
};

export default SwitchCompleted;
