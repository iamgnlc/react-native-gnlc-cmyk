import { Alert, Linking } from 'react-native';

import { GITHUB_PROFILE } from '../config';

const openProfile = () => {
  Linking.canOpenURL(`github:${GITHUB_PROFILE}`)
    .then((supported) => {
      if (supported) Linking.openURL(`github:${GITHUB_PROFILE}`);
      else Linking.openURL(`https:${GITHUB_PROFILE}`);
    })
    .catch((err) => console.error('An error occurred', err));
};

export default about = () =>
  Alert.alert(
    'About',
    `https:${GITHUB_PROFILE}`,
    [{ text: 'OK' }, { text: 'Open', onPress: () => openProfile() }],
    { cancelable: false },
  );
