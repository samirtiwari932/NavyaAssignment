import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ListRenderItem,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from '../@types/navigation';

interface Company {
  name: string;
  symbol: string;
  imageUrl: string;
}
type HomeScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

const HomeScreen = () => {
  const companies: Company[] = [
    {
      name: 'IBM',
      symbol: 'IBM',
      imageUrl: 'https://logo.clearbit.com/ibm.com',
    },
    {
      name: 'MSFT',
      symbol: 'MSFT',
      imageUrl: 'https://logo.clearbit.com/msft.com',
    },
  ];

  const [selectedSymbol, setSelectedSymbol] = useState<string>('IBM');

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const renderCompany: ListRenderItem<Company> = ({item}) => (
    <Pressable
      style={styles.companyCard}
      onPress={() => {
        setSelectedSymbol(item.symbol);
        navigation.navigate('ChartScreen', {symbol: item.symbol});
      }}>
      <Image source={{uri: item.imageUrl}} style={styles.companyImage} />
      <View style={styles.companyInfo}>
        <Text style={styles.companyName}>{item.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={companies}
        renderItem={renderCompany}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    paddingVertical: 10,
  },
  companyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  companyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;
