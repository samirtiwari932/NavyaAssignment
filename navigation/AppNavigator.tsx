import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { color } from '../component/utilis/color';
import TabNavigator from './TabNavigator';

interface Props {}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: color.primary,
    primary: color.contrast,
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer theme={AppTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
