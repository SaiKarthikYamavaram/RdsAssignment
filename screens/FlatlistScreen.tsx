import React, {useState} from 'react';
import {LayoutAnimation, Platform, UIManager, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import MailItem from '../components/ContactItem';
import GmailDetails, {gmailDetails} from '../data/mockdata/GmailDetails';

const layoutAnimConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FlatlistScreen: React.FC<{}> = () => {
  const [data, setData] = useState(GmailDetails);

  const removeElement = (index: number) => {
    const newData = data.filter((item, ind) => index !== ind);
    setData(newData);
    LayoutAnimation.configureNext(layoutAnimConfig);
  };
  const renderItem = ({item, index}: {item: gmailDetails; index: number}) => (
    <MailItem item={item} index={index} onSlide={removeElement} />
  );
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        renderToHardwareTextureAndroid
      />
    </View>
  );
};

export default FlatlistScreen;
