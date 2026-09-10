import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

// iOS 26 Liquid Glass Button Component
export const LiquidGlassButton = ({ 
  children, 
  onPress, 
  style, 
  gradientColors = ['#8B5CF6', '#EC4899'],
  ...props 
}) => {
  const handlePress = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={[styles.liquidGlassButton, style]}
      {...props}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.liquidGlassGradient}
      >
        <BlurView intensity={20} style={styles.liquidGlassBlur}>
          {children}
        </BlurView>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// iOS 26 Liquid Glass Card Component
export const LiquidGlassCard = ({ 
  children, 
  style, 
  blurIntensity = 20,
  ...props 
}) => {
  return (
    <View style={[styles.liquidGlassCard, style]} {...props}>
      <BlurView 
        intensity={blurIntensity} 
        tint="dark"
        style={styles.liquidGlassCardBlur}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.liquidGlassCardGradient}
        >
          {children}
        </LinearGradient>
      </BlurView>
    </View>
  );
};

// iOS 26 Native Slider Component
export const LiquidGlassSlider = ({ 
  value, 
  onValueChange, 
  style,
  gradientColors = ['#8B5CF6', '#EC4899'],
  ...props 
}) => {
  return (
    <View style={[styles.sliderContainer, style]} {...props}>
      <View style={styles.sliderTrack}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.sliderFill, { width: `${value * 100}%` }]}
        />
      </View>
      <TouchableOpacity
        style={[styles.sliderThumb, { left: `${value * 100}%` }]}
        onPressIn={() => {
          if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        }}
      >
        <View style={styles.sliderThumbInner} />
      </TouchableOpacity>
    </View>
  );
};

// iOS 26 Tab Bar Component
export const LiquidGlassTabBar = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={styles.tabBar}>
      <BlurView intensity={30} tint="dark" style={styles.tabBarBlur}>
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
          style={styles.tabBarGradient}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabItem,
                activeTab === index && styles.tabItemActive
              ]}
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                onTabChange(index);
              }}
            >
              <Text style={[
                styles.tabIcon,
                activeTab === index && styles.tabIconActive
              ]}>
                {tab.icon}
              </Text>
              <Text style={[
                styles.tabLabel,
                activeTab === index && styles.tabLabelActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </LinearGradient>
      </BlurView>
    </View>
  );
};

// iOS 26 Sheet/Modal Component
export const LiquidGlassSheet = ({ 
  visible, 
  onClose, 
  children, 
  height = height * 0.7 
}) => {
  const translateY = React.useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill}>
      <TouchableOpacity
        style={styles.sheetOverlay}
        activeOpacity={1}
        onPress={onClose}
      />
      <Animated.View
        style={[
          styles.sheetContainer,
          { height, transform: [{ translateY }] }
        ]}
      >
        <BlurView intensity={40} tint="dark" style={styles.sheetBlur}>
          <LinearGradient
            colors={['rgba(30,30,30,0.9)', 'rgba(0,0,0,0.95)']}
            style={styles.sheetGradient}
          >
            <View style={styles.sheetHandle} />
            {children}
          </LinearGradient>
        </BlurView>
      </Animated.View>
    </View>
  );
};

// iOS 26 List Item Component
export const LiquidGlassListItem = ({ 
  title, 
  subtitle, 
  image, 
  onPress, 
  style,
  ...props 
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress();
      }}
      activeOpacity={0.7}
      style={[styles.listItem, style]}
      {...props}
    >
      <BlurView intensity={15} tint="dark" style={styles.listItemBlur}>
        <LinearGradient
          colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
          style={styles.listItemGradient}
        >
          {image && <Image source={{ uri: image }} style={styles.listItemImage} />}
          <View style={styles.listItemContent}>
            <Text style={styles.listItemTitle}>{title}</Text>
            {subtitle && <Text style={styles.listItemSubtitle}>{subtitle}</Text>}
          </View>
        </LinearGradient>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Liquid Glass Button
  liquidGlassButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  liquidGlassGradient: {
    flex: 1,
  },
  liquidGlassBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Liquid Glass Card
  liquidGlassCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  liquidGlassCardBlur: {
    flex: 1,
  },
  liquidGlassCardGradient: {
    flex: 1,
    padding: 16,
  },

  // Liquid Glass Slider
  sliderContainer: {
    height: 24,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginLeft: -10,
  },
  sliderThumbInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8B5CF6',
    position: 'absolute',
    top: 4,
    left: 4,
  },

  // Tab Bar
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    paddingBottom: 20,
  },
  tabBarBlur: {
    flex: 1,
  },
  tabBarGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  tabItemActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  tabIcon: {
    fontSize: 24,
    color: '#888',
    marginBottom: 4,
  },
  tabIconActive: {
    color: '#fff',
  },
  tabLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#fff',
    fontWeight: '600',
  },

  // Sheet/Modal
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  sheetBlur: {
    flex: 1,
  },
  sheetGradient: {
    flex: 1,
    paddingTop: 12,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },

  // List Item
  listItem: {
    marginBottom: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  listItemBlur: {
    flex: 1,
  },
  listItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  listItemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 12,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#888',
  },
});
