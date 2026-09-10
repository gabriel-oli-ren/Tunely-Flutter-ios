# Tunely - Premium Music Streaming App

A beautiful, premium music streaming application built with React Native and Expo, featuring YouTube audio integration and iOS 26 native Liquid Glass components.

## Features

- **iOS 26 Liquid Glass UI**: Native iOS components with glassmorphism effects and haptic feedback
- **Premium Dark Mode UI**: Pure black (#000000) and dark gray (#121212) palette optimized for OLED screens
- **Gradient Accents**: Electric purple to neon pink gradients for active elements
- **YouTube Audio Streaming**: Hidden YouTube player integration for music playback
- **Fluid Animations**: Smooth transitions and glassmorphism effects
- **Native Haptic Feedback**: iOS haptic feedback integration for enhanced user experience
- **Featured Albums Carousel**: Horizontal scrolling album showcase
- **Most Played & New Releases**: Curated song lists
- **Now Playing Screen**: Full-screen modal with playback controls
- **Progress Tracking**: Real-time progress bar and time display
- **Background Blur Effects**: Dynamic glassmorphism backgrounds
- **GitHub Actions CI/CD**: Automated iOS IPA building

## Setup Instructions

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (LTS version recommended)
2. Install [Expo Go](https://apps.apple.com/app/expo-go/id982107779) on your iPhone

### Installation

1. Navigate to the project directory:
   ```bash
   cd tunely
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. On your iPhone:
   - Open the Expo Go app
   - Scan the QR code displayed in your terminal
   - The app will load and you can start listening to music

## Project Structure

```
tunely/
├── App.js                      # Main application component
├── app.json                    # Expo configuration
├── package.json                # Dependencies and scripts
├── babel.config.js             # Babel configuration
├── data/
│   └── songsData.js           # Song data with YouTube IDs
├── screens/
│   ├── HomeScreen.js          # Main home screen
│   └── NowPlayingScreen.js    # Full-screen player
└── assets/                     # App assets (icons, splash)
```

## Key Technologies

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform for React Native
- **React Navigation**: Screen navigation
- **react-native-youtube-iframe**: YouTube integration
- **expo-linear-gradient**: Gradient effects
- **expo-blur**: Glassmorphism blur effects
- **React Native Reanimated**: Smooth animations
- **expo-haptics**: Native haptic feedback
- **EAS Build**: Automated iOS/Android builds
- **GitHub Actions**: CI/CD automation

## Data Architecture

The app uses a local static data file (`songsData.js`) containing:
- 12+ real songs with metadata
- High-quality Unsplash cover images
- YouTube video IDs for audio streaming
- Featured albums for the carousel

## Customization

### Adding Songs

Edit `data/songsData.js` to add more songs:

```javascript
{
  id: 13,
  title: "Your Song",
  artist: "Artist Name",
  coverImage: "https://images.unsplash.com/...",
  youtubeId: "YouTubeVideoID",
  duration: "3:45"
}
```

### Color Scheme

Modify the gradient colors in the screens:
- Primary gradient: `#8B5CF6` (purple) to `#EC4899` (pink)
- Background: `#000000` (pure black)
- Text: `#ffffff` (white) and `#888888` (gray)

## GitHub Actions CI/CD

The project includes automated iOS IPA building via GitHub Actions.

### Setup Required Secrets

To enable automated builds, add these secrets to your GitHub repository:

1. **EXPO_TOKEN**: Your Expo account token (get from https://expo.dev/accounts)
2. **EXPO_APPLE_ID**: Your Apple ID email
3. **EXPO_APPLE_APP_SPECIFIC_PASSWORD**: App-specific password from Apple ID
4. **EXPO_APPLE_TEAM_ID**: Your Apple Developer Team ID

### Build Profiles

- **development**: Development builds with Expo Dev Client
- **preview**: Internal distribution builds
- **production**: App Store ready builds

### Manual Builds

You can trigger builds manually from the Actions tab by choosing the build profile.

## Troubleshooting

### Dependencies Issues
If you encounter dependency errors, try:
```bash
rm -rf node_modules
npm install
```

### Metro Bundler Issues
Clear the cache:
```bash
npx expo start -c
```

### YouTube Playback
- Ensure you have a stable internet connection
- Some YouTube videos may have regional restrictions
- The hidden player approach works best with music videos

### Build Issues
- Ensure all GitHub secrets are properly configured
- Verify your Apple Developer account is active
- Check that your bundle identifier is unique

## Future Enhancements

- Search functionality
- Favorites/playlist system
- Local storage for preferences
- Background audio support
- Lyrics display
- Social sharing features
- User accounts and cloud sync

## License

This project is for educational purposes.
