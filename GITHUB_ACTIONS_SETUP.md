# GitHub Actions Setup Guide for Tunely

This guide will help you set up GitHub Actions to automatically build iOS IPA files for Tunely.

## Prerequisites

1. **Expo Account**: Create an account at https://expo.dev
2. **Apple Developer Account**: You need an Apple Developer account ($99/year)
3. **GitHub Repository**: Your project should be on GitHub

## Step 1: Get Your Expo Token

1. Go to https://expo.dev/accounts
2. Log in to your Expo account
3. Go to Settings → Access Tokens
4. Create a new token with "Build" permissions
5. Copy the token - you'll need it for GitHub secrets

## Step 2: Configure Apple Developer Account

1. Go to https://developer.apple.com/account
2. Log in with your Apple ID
3. Navigate to "Certificates, Identifiers & Profiles"
4. Create an App ID with bundle identifier: `com.tunely.app`
5. Enable "Audio, AirPlay, and Picture in Picture" capability
6. Note your Team ID from the membership details

## Step 3: Generate App-Specific Password

1. Go to https://appleid.apple.com
2. Sign in with your Apple ID
3. Go to Security → App-Specific Passwords
4. Generate a new password for "Expo EAS"
5. Copy this password - you'll need it for GitHub secrets

## Step 4: Setup EAS Project

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Login to EAS:
   ```bash
   eas login
   ```

3. Configure your project:
   ```bash
   eas build:configure
   ```

4. This will create a project ID and update your `app.json`

## Step 5: Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

### Required Secrets:

- **EXPO_TOKEN**: Your Expo account token from Step 1
- **EXPO_APPLE_ID**: Your Apple ID email (e.g., yourname@example.com)
- **EXPO_APPLE_APP_SPECIFIC_PASSWORD**: App-specific password from Step 3
- **EXPO_APPLE_TEAM_ID**: Your Apple Developer Team ID (10-character string)

### Optional Secrets:

- **EXPO_ANDROID_KEYSTORE_PASSWORD**: For Android builds
- **EXPO_ANDROID_KEY_PASSWORD**: For Android builds

## Step 6: Test the Workflow

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Setup GitHub Actions for iOS builds"
   git push origin main
   ```

2. Go to the Actions tab in your GitHub repository
3. You should see the "Build iOS IPA" workflow
4. Click "Run workflow" to manually trigger a build
5. Or push to `main` branch to trigger automatic builds

## Step 7: Download the IPA

Once the build completes:

1. Go to the Actions tab
2. Click on the completed workflow run
3. Scroll down to "Artifacts" section
4. Download the `tunely-ios-ipa-{commit-hash}.zip` file
5. Extract the `.ipa` file

## Installing the IPA

### Option 1: AltStore (Free)
1. Install AltStore on your iPhone
2. Connect your iPhone to your computer
3. Open AltStore and install the IPA file

### Option 2: Sideloadly (Free)
1. Download Sideloadly for your computer
2. Connect your iPhone to your computer
3. Drag and drop the IPA file to Sideloadly
4. Enter your Apple ID and password

### Option 3: Apple Configurator (Mac only)
1. Connect your iPhone to your Mac
2. Open Apple Configurator
3. Drag and drop the IPA file to your device

## Build Profiles

The workflow supports three build profiles:

### Development
- Includes Expo Dev Client
- Fast builds
- For testing and development

### Preview
- Internal distribution
- For beta testing
- No App Store submission

### Production
- App Store ready
- Requires all configurations
- For App Store submission

## Troubleshooting

### Build fails with authentication error
- Verify EXPO_TOKEN is correct
- Check that the token has "Build" permissions
- Ensure EXPO_APPLE_ID and password are correct

### Build fails with bundle identifier error
- Verify the bundle identifier is unique
- Check that it matches your Apple Developer App ID
- Update `app.json` if needed

### Build fails with Team ID error
- Verify your Team ID is correct
- Check your Apple Developer membership
- Ensure you have an active Developer account

### Timeout during build
- iOS builds can take 10-30 minutes
- Check the EAS dashboard for build status
- Build logs are available in the Actions run

## Advanced Configuration

### Custom Build Configurations

Edit `.github/workflows/build-ios.yml` to customize:

- Build profiles
- Node.js version
- Artifact retention
- Notification settings

### Automated App Store Submission

Update the workflow to include App Store submission:

```yaml
- name: Submit to App Store
  run: eas submit --platform ios --latest
  env:
    EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

### Multiple Environments

Create separate workflows for:
- Development builds
- Staging builds
- Production builds

## Best Practices

1. **Keep secrets secure**: Never commit secrets to the repository
2. **Use separate profiles**: Use different profiles for different environments
3. **Monitor build times**: Optimize build configuration for faster builds
4. **Test before production**: Always test preview builds before production
5. **Version management**: Use semantic versioning for releases

## Support

- GitHub Actions Documentation: https://docs.github.com/actions
- EAS Build Documentation: https://docs.expo.dev/build/introduction
- Expo Support: https://forums.expo.dev/

## Cost Considerations

- **GitHub Actions**: Free for public repositories, limited for private
- **EAS Build**: Free tier includes limited builds per month
- **Apple Developer**: $99/year for individual accounts
- **Build time**: Can accumulate costs for large projects

Enjoy automated iOS builds for Tunely! 🚀
