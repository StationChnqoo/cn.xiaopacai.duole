import { useCaches } from '@src/constants/store';
import { speak, vibrate } from '@src/constants/u';
import React from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyProps {
  onKeyBoardPress?: (key: string) => void; // 可选的键盘按键处理函数
  onDeletePress?: () => void; // 可选的删除按键处理函数
  onClearPress?: () => void;
}

const SoftKeyboard: React.FC<MyProps> = props => {
  const { onKeyBoardPress, onDeletePress, onClearPress } = props;
  const { isKeyboardFeedback, isTTS } = useCaches();

  const nums = '789456123'.split('').map((it, i) => ({
    label: it,
    value: it,
  }));
  const letters = ['0', 'J', 'Q', 'K', 'A']
    .map((item, index) => ({
      label: item,
      value: item,
    }))
    .concat([
      { label: '鹰', value: 'Y' },
      { label: '小王', value: 'X' },
      { label: '大王', value: 'W' },
    ]);
  const actions = [
    { label: 'D.点', value: 'D' },
    { label: 'S.烧', value: 'S' },
    { label: 'M.闷', value: 'M' },
    { label: 'L.落', value: 'L' },
    { label: 'R.让', value: 'R' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={[styles.buttons]}>
          {actions.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onKeyBoardPress?.(item.value);
                isKeyboardFeedback && vibrate();
                isTTS && speak(item.label);
              }}
              key={index}
              style={[styles.button]}
            >
              <Text style={{ fontSize: 12, color: '#333' }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.splite} />
        <View style={[styles.buttons]}>
          {letters.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onKeyBoardPress?.(item.value);
                isKeyboardFeedback && vibrate();
                isTTS && speak(item.value);
              }}
              key={index}
              style={[styles.button]}
            >
              <Text
                style={{
                  fontSize: item.label.length == 1 ? 14 : 12,
                  color: '#333',
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.splite} />
        <View style={[styles.buttons]}>
          {nums.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onKeyBoardPress?.(item.value);
                isKeyboardFeedback && vibrate();
                isTTS && speak(item.value);
              }}
              key={index}
              style={styles.button}
            >
              <Text style={{ fontSize: 16, color: '#333' }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{ height: 10 }} />
      <View style={[styles.buttons, { width: '100%' }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onClearPress();
            isKeyboardFeedback && vibrate();
          }}
          style={[
            styles.button,
            { width: 72, borderColor: 'red', backgroundColor: '#ffe6e6' },
          ]}
        >
          <Text style={{ fontSize: 14, color: 'red' }}>C.重置</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onKeyBoardPress?.('#');
          }}
          style={[
            styles.button,
            { width: 72, borderColor: 'green', backgroundColor: '#e6ffe6' },
          ]}
        >
          <Text style={{ fontSize: 14, color: 'green' }}>N.下一轮</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onDeletePress?.();
            isKeyboardFeedback && vibrate();
          }}
          style={[
            styles.button,
            { width: 72, borderColor: 'orange', backgroundColor: '#ffe6cc' },
          ]}
        >
          <Text style={{ fontSize: 14, color: 'red' }}>D.删除</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  dot: {
    width: 64,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 12,
  },
  button: {
    borderRadius: 5,
    borderWidth: 1,
    height: 28,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#999',
    backgroundColor: '#f5f5f5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    rowGap: 8,
    width: 36 * 3,
  },
  splite: {
    width: 1,
    height: '100%',
    backgroundColor: '#999',
  },
});

export default SoftKeyboard;
