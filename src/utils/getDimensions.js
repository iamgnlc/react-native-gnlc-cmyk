import { Dimensions } from 'react-native';

function getDimensions() {
  const { width, height } = Dimensions.get('window');
  return { width, height };
}

export default getDimensions;
