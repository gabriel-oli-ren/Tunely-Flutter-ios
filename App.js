import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import NowPlayingScreen from './screens/NowPlayingScreen';
import { songsData } from './data/songsData';

const Stack = createStackNavigator();

export default function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const youTubeRef = useRef(null);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!currentSong) return;
    const currentIndex = songsData.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songsData.length;
    playSong(songsData[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSong) return;
    const currentIndex = songsData.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songsData.length) % songsData.length;
    playSong(songsData[prevIndex]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { 
              backgroundColor: '#000000',
              shadowColor: 'transparent',
              elevation: 0 
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: { fontWeight: 'bold' },
            cardStyle: { backgroundColor: '#000000' },
            gestureEnabled: Platform.OS === 'ios',
            presentation: Platform.OS === 'ios' ? 'card' : 'card',
          }}
        >
          <Stack.Screen 
            name="Home" 
            options={{ headerShown: false }}
          >
            {(props) => (
              <HomeScreen 
                {...props}
                currentSong={currentSong}
                isPlaying={isPlaying}
                playSong={playSong}
                togglePlayPause={togglePlayPause}
              />
            )}
          </Stack.Screen>
          <Stack.Screen 
            name="NowPlaying"
            options={{ headerShown: false, gestureEnabled: true }}
          >
            {(props) => (
              <NowPlayingScreen
                {...props}
                currentSong={currentSong}
                isPlaying={isPlaying}
                progress={progress}
                setProgress={setProgress}
                youTubeRef={youTubeRef}
                togglePlayPause={togglePlayPause}
                playNext={playNext}
                playPrevious={playPrevious}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
