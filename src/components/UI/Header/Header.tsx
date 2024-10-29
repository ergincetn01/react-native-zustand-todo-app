import {FC} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
type Props = {
  title: string;
  showBack?: boolean;
};
const Header: FC<Props> = ({showBack, title}) => {
  const nav = useNavigation();
  return (
    <LinearGradient
      start={{x: 0.3, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#C22ED0', '#5FFAE0']}
      style={{
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        columnGap: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {showBack ? (
        <Pressable
          style={{position: 'absolute', left: 20}}
          onPress={() => nav.goBack()}>
          <Icon name="leftcircle" color="#fff" size={30} />
        </Pressable>
      ) : (
        <></>
      )}
      <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
        {title}
      </Text>
    </LinearGradient>
  );
};

export default Header;
