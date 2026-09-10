import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  Animated,
  PanResponder,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import YoutubeIframe from 'react-native-youtube-iframe';
import * as Haptics from 'expo-haptics';
import { 
  LiquidGlassButton, 
  LiquidGlassSlider, 
  LiquidGlassCard 
} from '../components/iOSNativeComponents';

const { width, height } = Dimensions.get('window');

export default function NowPlayingScreen({
  currentSong,
  isPlaying,
  progress,
  setProgress,
  youTubeRef,
  togglePlayPause,
  playNext,
  playPrevious
}) {
  const [duration, setDuration] = useState(0);
  const slideAnim = React.useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11
    }).start();
  }, []);

  useEffect(() => {
    if (youTubeRef.current && currentSong) {
      if (isPlaying) {
        youTubeRef.current.play();
      } else {
        youTubeRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const handleHaptic = (style = Haptics.ImpactFeedbackStyle.Medium) => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(style);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value) => {
    setProgress(value);
    handleHaptic(Haptics.ImpactFeedbackStyle.Light);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dy > 0) {
        slideAnim.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dy > 100) {
        handleHaptic(Haptics.ImpactFeedbackStyle.Heavy);
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  if (!currentSong) return null;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
      {...panResponder.panHandlers}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Hidden YouTube Player */}
      <View style={styles.hiddenYouTube}>
        <YoutubeIframe
          ref={youTubeRef}
          videoId={currentSong.youtubeId}
          height={1}
          width={1}
          play={isPlaying}
          onChangeState={(event) => {
            if (event === 'ended') {
              playNext();
            }
          }}
          onProgress={(event) => {
            const newProgress = event.currentTime / event.duration;
            setProgress(newProgress);
            setDuration(event.duration);
          }}
        />
      </View>

      {/* iOS 26 Dynamic Background with Liquid Glass Effect */}
      <Image
        source={{ uri: currentSong.coverImage }}
        style={styles.backgroundImage}
        blurRadius={100}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.85)', '#000000']}
        style={styles.gradientOverlay}
      />

      {/* Content */}
      <View style={styles.content}>
        {/* iOS 26 Style Header */}
        <BlurView intensity={50} tint="dark" style={styles.headerBlur}>
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
            style={styles.headerGradient}
          >
            <View style={styles.header}>
              <LiquidGlassButton
                style={styles.headerButton}
                gradientColors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                onPress={() => {
                  handleHaptic();
                  // navigation.goBack();
                }}
              >
                <Text style={styles.headerIcon}>↓</Text>
              </LiquidGlassButton>
              <Text style={styles.headerTitle}>Now Playing</Text>
              <LiquidGlassButton
                style={styles.headerButton}
                gradientColors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                onPress={() => handleHaptic()}
              >
                <Text style={styles.headerIcon}>⋯</Text>
              </LiquidGlassButton>
            </View>
          </LinearGradient>
        </BlurView>

        {/* iOS 26 Album Art with Liquid Glass Container */}
        <View style={styles.albumArtContainer}>
          <LiquidGlassCard
            style={styles.albumArtCard}
            blurIntensity={30}
          >
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              style={styles.albumArtGlow}
            />
            <Image
              source={{ uri: currentSong.coverImage }}
              style={styles.albumArt}
            />
          </LiquidGlassCard>
        </View>

        {/* Song Info */}
        <View style={styles.songInfo}>
          <Text style={styles.songTitle} numberOfLines={2}>{currentSong.title}</Text>
          <Text style={styles.songArtist}>{currentSong.artist}</Text>
        </View>

        {/* iOS 26 Liquid Glass Progress Slider */}
        <View style={styles.progressContainer}>
          <LiquidGlassSlider
            value={progress}
            onValueChange={handleProgressChange}
            gradientColors={['#8B5CF6', '#EC4899']}
            style={styles.customSlider}
          />
          <View style={styles.progressTimes}>
            <Text style={styles.progressTime}>{formatTime(progress * duration)}</Text>
            <Text style={styles.progressTime}>{currentSong.duration}</Text>
          </View>
        </View>

        {/* iOS 26 Liquid Glass Controls */}
        <View style={styles.controls}>
          <LiquidGlassButton
            style={styles.controlButton}
            gradientColors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
            onPress={() => {
              handleHaptic();
              playPrevious();
            }}
          >
            <Text style={styles.controlIcon}>⏮</Text>
          </LiquidGlassButton>
          
          <LiquidGlassButton
            style={styles.playButton}
            gradientColors={['#8B5CF6', '#EC4899']}
            onPress={() => {
              handleHaptic(Haptics.ImpactFeedbackStyle.Heavy);
              togglePlayPause();
            }}
          >
            <Text style={styles.playIcon}>
              {isPlaying ? '⏸' : '▶'}
            </Text>
          </LiquidGlassButton>
          
          <LiquidGlassButton
            style={styles.controlButton}
            gradientColors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
            onPress={() => {
              handleHaptic();
              playNext();
            }}
          >
            <Text style={styles.controlIcon}>⏭</Text>
          </LiquidGlassButton>
        </View>

        {/* iOS 26 Additional Controls */}
        <View style={styles.additionalControls}>
          <LiquidGlassButton
            style={styles.additionalControlButton}
            gradientColors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
            onPress={() => handleHaptic()}
          >
            <Text style={styles.additionalControlIcon}>🔀</Text>
          </LiquidGlassButton>
          <LiquidGlassButton
            style={styles.additionalControlButton}
            gradientColors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
            onPress={() => handleHaptic()}
          >
            <Text style={styles.additionalControlIcon}>🔁</Text>
          </LiquidGlassButton>
          <LiquidGlassButton
            style={styles.additionalControlButton}
            gradientColors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
            onPress={() => handleHaptic()}
          >
            <Text style={styles.additionalControlIcon}>♥</Text>
          </LiquidGlassButton>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  hiddenYouTube: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
  },
  gradientOverlay: {
    position: 'absolute',
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
  },
  headerBlur: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
  },
  headerGradient: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  headerIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  albumArtContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  albumArtCard: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 24,
  },
  albumArtGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    opacity: 0.4,
  },
  albumArt: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  songTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  songArtist: {
    fontSize: 18,
    color: '#888888',
  },
  progressContainer: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  customSlider: {
    marginBottom: 10,
  },
  progressTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressTime: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  controlButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  controlIcon: {
    fontSize: 32,
    color: '#ffffff',
  },
  playButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginHorizontal: 24,
  },
  playIcon: {
    fontSize: 36,
    color: '#ffffff',
  },
  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 60,
  },
  additionalControlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  additionalControlIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
});
