import CheckBox from '@src/components/CheckBox';
import Flex from '@src/components/Flex';
import MoreButton from '@src/components/MoreButton';
import Switcher from '@src/components/Switcher';
import { useCaches } from '@src/constants/store';
import { dip2px, fs } from '@src/constants/u';
import { h5 } from '@src/constants/c';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStacksProp } from '../Screens';

interface MyProps {
  navigation?: RootStacksProp;
}

const Home: React.FC<MyProps> = props => {
  const { navigation } = props;
  const {
    theme,
    freeUsed,
    setFreeUsed,
    cardSound,
    defaultGame,
    setDefaultGame,
    isKeyboardFeedback,
    setIsKeyboardFeedback,
    games,
    pack,
    setPack,
    isEagle,
    setIsEagle,
    gameArea,
    setGameArea,
    setGames,
  } = useCaches();

  const height = Platform.select({
    ios: useSafeAreaInsets().top,
    android: StatusBar.currentHeight,
  });

  useFocusEffect(
    useCallback(() => {
      let today = dayjs().format('YYYY-MM-DD');
      if (freeUsed.key != today) {
        setFreeUsed({ key: today, value: 0 });
      }
      return () => {};
    }, []),
  );

  const supportedGames = {
    bh: {
      title: '保皇（炸弹 💣 ）',
      page: 'Baohuang',
      message: '潍坊保皇、疯狂保皇',
    },
    gj: {
      title: '够级（鹰 🦅）',
      page: 'Gouji',
      message: '6副牌、4副牌',
    },
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#fff', height }} />
      <ScrollView style={{ flex: 1 }} bounces={false}>
        <View style={styles.card}>
          <Text style={{ color: '#333', fontSize: fs(16), fontWeight: '500' }}>
            选择游戏
          </Text>
          <Flex horizontal style={{ gap: 12 }} align={'flex-end'}>
            {Object.keys(supportedGames).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.item,
                  { borderColor: defaultGame == item ? theme : '#ccc' },
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  // navigation.navigate(item.page as never);
                  setDefaultGame(item);
                }}
              >
                <Text
                  style={{
                    color: item == defaultGame ? theme : '#666',
                    fontSize: fs(14),
                    fontWeight: '500',
                  }}
                >
                  {supportedGames[item].title}
                </Text>
                <View style={{ height: 5 }} />
                <Text
                  style={{
                    fontSize: fs(12),
                    color: item == defaultGame ? theme : '#666',
                  }}
                  numberOfLines={1}
                >
                  {supportedGames[item].message}
                </Text>
              </TouchableOpacity>
            ))}
          </Flex>
          <Flex horizontal justify="flex-end" style={{ marginTop: 12 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.startButton, { backgroundColor: theme }]}
              onPress={() => {
                const pages = {
                  bh: 'Baohuang',
                  gj: 'Gouji',
                };
                navigation.navigate(pages[defaultGame] as never);
              }}
            >
              <Text style={{ color: '#fff', fontSize: fs(14) }}>开始数牌</Text>
            </TouchableOpacity>
          </Flex>
        </View>
        <View style={{ height: 2 }} />
        <View style={styles.card}>
          <Text style={{ color: '#333', fontSize: fs(16), fontWeight: '500' }}>
            游戏设置
          </Text>
          <View style={{ height: 6 }} />
          <View style={styles.settingItem}>
            <Text style={{ fontSize: fs(14), color: '#333' }}>
              按键反馈（震动效果）
            </Text>
            <Switcher
              value={isKeyboardFeedback}
              onValueChange={value => {
                setIsKeyboardFeedback(value);
              }}
              disabled={Platform.OS != 'android'}
              trackColor={{ false: '#ccc', true: theme }}
              thumbColor={cardSound ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>
        <View style={{ height: 2 }} />
        <View style={styles.card}>
          <Text style={{ fontSize: fs(16), color: '#333', fontWeight: '500' }}>
            够级
          </Text>
          <View style={{ height: 10 }} />
          <View style={styles.settingItem}>
            <Text style={{ fontSize: fs(14), color: '#333' }}>是否带鹰🦅</Text>
            <Switcher
              disabled={pack == 4}
              value={isEagle}
              onValueChange={value => {
                setIsEagle(value);
              }}
              trackColor={{ false: '#ccc', true: theme }}
              thumbColor={isEagle ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={{ height: 5 }} />
          <View style={styles.settingItem}>
            <Text style={{ fontSize: fs(14), color: '#333' }}>几副牌</Text>
            <View style={{ height: 10 }} />
            <Flex horizontal style={{ gap: 12 }}>
              <CheckBox
                activeColor={theme}
                checked={pack == 4}
                label={'4副牌'}
                onPress={() => {
                  setPack(4);
                }}
              />
              <CheckBox
                activeColor={theme}
                checked={pack == 6}
                label={'6副牌'}
                onPress={() => {
                  setPack(6);
                }}
              />
            </Flex>
          </View>
        </View>
        <View style={{ height: 1 }} />
        <View style={styles.card}>
          <Text style={{ fontSize: fs(16), color: '#333', fontWeight: '500' }}>
            保皇
          </Text>
          <View style={{ height: 10 }} />
          <View style={styles.settingItem}>
            <Text style={{ fontSize: fs(14), color: '#333' }}>区域玩法</Text>
            <Flex horizontal style={{ gap: 12 }}>
              <CheckBox
                activeColor={theme}
                checked={gameArea == 'wf'}
                label={'潍坊保皇'}
                onPress={() => {
                  setGameArea('wf');
                }}
              />
              <CheckBox
                activeColor={theme}
                checked={gameArea == 'fk'}
                label={'疯狂保皇'}
                onPress={() => {
                  setGameArea('fk');
                }}
              />
            </Flex>
          </View>
        </View>
        <View style={{ height: 2 }} />
        <View style={styles.card}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <Flex horizontal justify="space-between">
              <Text style={{ fontSize: fs(16), color: '#333' }}>用户政策</Text>
              <MoreButton
                onPress={() => {
                  navigation.navigate('Webviewer', {
                    url: h5(
                      `testMarkdown?src=./docs/duole/terms-of-service.md`,
                    ),
                    title: '用户协议',
                  });
                }}
                label=""
              />
            </Flex>
          </TouchableOpacity>
        </View>
        <View style={{ height: 1 }} />
        <View style={styles.card}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <Flex horizontal justify="space-between">
              <Text style={{ fontSize: fs(16), color: '#333' }}>隐私协议</Text>
              <MoreButton
                onPress={() => {
                  navigation.navigate('Webviewer', {
                    url: h5(`testMarkdown?src=./docs/duole/privacy-policy.md`),
                    title: '隐私政策',
                  });
                }}
                label=""
              />
            </Flex>
          </TouchableOpacity>
        </View>
        <View style={{ height: 1 }} />
        <View style={styles.card}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <Flex horizontal justify="space-between">
              <Text style={{ fontSize: fs(16), color: '#333' }}>关于我们</Text>
              <MoreButton
                onPress={() => {
                  navigation.navigate('Webviewer', {
                    url: 'https://www.xiaopacai.cn',
                    title: '关于我们',
                  });
                }}
                label=""
              />
            </Flex>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  item: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 12,
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    padding: 15,
    // borderRadius: 10,
    backgroundColor: '#fff',
  },
  startButton: {
    // borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    height: dip2px(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
