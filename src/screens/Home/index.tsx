import CheckBox from '@src/components/CheckBox';
import Flex from '@src/components/Flex';
import Switcher from '@src/components/Switcher';
import { useCaches } from '@src/constants/store';
import { dip2px, fs } from '@src/constants/u';
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
      <View style={[styles.statusBar, { height }]} />
      <ScrollView
        style={styles.scrollView}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* 选择游戏 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>选择游戏</Text>
          <Flex horizontal style={styles.gameRow}>
            {Object.keys(supportedGames).map((key, index) => {
              const isActive = defaultGame == key;
              const game = supportedGames[key];
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  style={[
                    styles.gameCard,
                    isActive && { borderColor: theme, backgroundColor: theme + '10' },
                  ]}
                  onPress={() => setDefaultGame(key)}
                >
                  <Text style={[styles.gameEmoji, isActive && { opacity: 1 }]}>
                    {key === 'bh' ? '💣' : '🦅'}
                  </Text>
                  <Text style={[styles.gameTitle, isActive && { color: theme }]}>
                    {key === 'bh' ? '保皇' : '够级'}
                  </Text>
                  <Text style={[styles.gameDesc, isActive && { color: theme }]} numberOfLines={1}>
                    {game.message}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </Flex>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.startButton, { backgroundColor: theme }]}
            onPress={() => {
              const pages: Record<string, string> = { bh: 'Baohuang', gj: 'Gouji' };
              navigation.navigate(pages[defaultGame] as never);
            }}
          >
            <Text style={styles.startButtonText}>开始数牌</Text>
          </TouchableOpacity>
        </View>

        {/* 游戏设置 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>游戏设置</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>按键反馈（震动效果）</Text>
            <Switcher
              value={isKeyboardFeedback}
              onValueChange={setIsKeyboardFeedback}
              disabled={Platform.OS != 'android'}
              trackColor={{ false: '#ccc', true: theme }}
              thumbColor={cardSound ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.divider} />

          <Text style={styles.subTitle}>够级</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>是否带鹰</Text>
            <Switcher
              disabled={pack == 4}
              value={isEagle}
              onValueChange={setIsEagle}
              trackColor={{ false: '#ccc', true: theme }}
              thumbColor={isEagle ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>几副牌</Text>
            <Flex horizontal style={styles.checkGroup}>
              <CheckBox activeColor={theme} checked={pack == 4} label="4副牌" onPress={() => setPack(4)} />
              <CheckBox activeColor={theme} checked={pack == 6} label="6副牌" onPress={() => setPack(6)} />
            </Flex>
          </View>

          <View style={styles.divider} />

          <Text style={styles.subTitle}>保皇</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>区域玩法</Text>
            <Flex horizontal style={styles.checkGroup}>
              <CheckBox activeColor={theme} checked={gameArea == 'wf'} label="潍坊保皇" onPress={() => setGameArea('wf')} />
              <CheckBox activeColor={theme} checked={gameArea == 'fk'} label="疯狂保皇" onPress={() => setGameArea('fk')} />
            </Flex>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  statusBar: {
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  // Card
  card: {
    marginHorizontal: 12,
    marginTop: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  cardTitle: {
    fontSize: fs(16),
    fontWeight: '500',
    color: '#333',
    marginBottom: 14,
  },
  subTitle: {
    fontSize: fs(12),
    fontWeight: '500',
    color: '#999',
    marginBottom: 8,
    marginTop: 4,
  },
  // Game cards
  gameRow: {
    gap: 12,
  },
  gameCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#e8e8e8',
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  gameEmoji: {
    fontSize: 28,
    opacity: 0.4,
    marginBottom: 6,
  },
  gameTitle: {
    fontSize: fs(14),
    fontWeight: '500',
    color: '#999',
  },
  gameDesc: {
    fontSize: fs(12),
    color: '#bbb',
    marginTop: 4,
  },
  // Start button
  startButton: {
    marginTop: 16,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  startButtonText: {
    color: '#fff',
    fontSize: fs(16),
    fontWeight: '600',
  },
  // Settings
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#f0f0f0',
    marginVertical: 14,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  settingLabel: {
    fontSize: fs(14),
    color: '#444',
    flex: 1,
  },
  checkGroup: {
    gap: 12,
  },
  bottomSpacer: {
    height: 32,
  },
});

export default Home;
