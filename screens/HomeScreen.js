import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Dimensions,
  SafeAreaView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { songsData, featuredAlbums } from '../data/songsData';
import { 
  LiquidGlassCard, 
  LiquidGlassListItem, 
  LiquidGlassButton 
} from '../components/iOSNativeComponents';

const { width } = Dimensions.get('window');

export default function HomeScreen({ currentSong, isPlaying, playSong, togglePlayPause }) {
  const navigation = useNavigation();

  const handleHaptic = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const renderFeaturedAlbums = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.carouselContainer}
      contentContainerStyle={styles.carouselContent}
    >
      {featuredAlbums.map((album) => (
        <LiquidGlassCard
          key={album.id}
          style={styles.albumCard}
          blurIntensity={25}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleHaptic();
            }}
          >
            <Image source={{ uri: album.coverImage }} style={styles.albumImage} />
            <Text style={styles.albumTitle} numberOfLines={1}>{album.title}</Text>
            <Text style={styles.albumArtist} numberOfLines={1}>{album.artist}</Text>
          </TouchableOpacity>
        </LiquidGlassCard>
      ))}
    </ScrollView>
  );

  const renderSongItem = (song, index) => (
    <LiquidGlassListItem
      key={song.id}
      title={song.title}
      subtitle={song.artist}
      image={song.coverImage}
      onPress={() => {
        handleHaptic();
        playSong(song);
        navigation.navigate('NowPlaying');
      }}
      style={styles.songItem}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* iOS 26 Dynamic Island-style Header */}
      <BlurView intensity={40} tint="dark" style={styles.headerBlur}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Tunely</Text>
            <LiquidGlassButton
              style={styles.profileButton}
              gradientColors={['#8B5CF6', '#EC4899']}
              onPress={() => handleHaptic()}
            >
              <View style={styles.profileCircle} />
            </LiquidGlassButton>
          </View>
        </LinearGradient>
      </BlurView>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Albums</Text>
          {renderFeaturedAlbums()}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Most Played</Text>
          <View style={styles.songsList}>
            {songsData.slice(0, 5).map((song, index) => renderSongItem(song, index))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Releases</Text>
          <View style={styles.songsList}>
            {songsData.slice(5, 10).map((song, index) => renderSongItem(song, index + 5))}
          </View>
        </View>
      </ScrollView>

      {/* iOS 26 Liquid Glass Mini Player */}
      {currentSong && (
        <LiquidGlassCard
          style={styles.miniPlayer}
          blurIntensity={30}
        >
          <TouchableOpacity
            style={styles.miniPlayerContent}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('NowPlaying')}
          >
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.3)', 'rgba(236, 72, 153, 0.3)']}
              style={styles.miniPlayerGradient}
            >
              <Image source={{ uri: currentSong.coverImage }} style={styles.miniPlayerCover} />
              <View style={styles.miniPlayerInfo}>
                <Text style={styles.miniPlayerTitle} numberOfLines={1}>{currentSong.title}</Text>
                <Text style={styles.miniPlayerArtist} numberOfLines={1}>{currentSong.artist}</Text>
              </View>
              <LiquidGlassButton
                style={styles.miniPlayerPlayButton}
                gradientColors={['#8B5CF6', '#EC4899']}
                onPress={(e) => {
                  e.stopPropagation();
                  handleHaptic();
                  togglePlayPause();
                }}
              >
                <Text style={styles.miniPlayerPlayIcon}>
                  {isPlaying ? '⏸' : '▶'}
                </Text>
              </LiquidGlassButton>
            </LinearGradient>
          </TouchableOpacity>
        </LiquidGlassCard>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerBlur: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  carouselContainer: {
    paddingLeft: 20,
  },
  carouselContent: {
    paddingRight: 20,
  },
  albumCard: {
    width: width * 0.4,
    marginRight: 15,
  },
  albumImage: {
    width: '100%',
    height: width * 0.4,
    borderRadius: 20,
    marginBottom: 10,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  albumArtist: {
    fontSize: 14,
    color: '#888888',
  },
  songsList: {
    paddingHorizontal: 20,
  },
  songItem: {
    marginBottom: 8,
  },
  miniPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    margin: 16,
    borderRadius: 20,
  },
  miniPlayerContent: {
    flex: 1,
  },
  miniPlayerGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  miniPlayerCover: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 15,
  },
  miniPlayerInfo: {
    flex: 1,
  },
  miniPlayerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  miniPlayerArtist: {
    fontSize: 14,
    color: '#cccccc',
  },
  miniPlayerPlayButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  miniPlayerPlayIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
});
