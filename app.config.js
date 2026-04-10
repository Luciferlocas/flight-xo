import "dotenv/config";

export default {
  "expo": {
    "name": "flight-xo",
    "slug": "flight-xo",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "flightxo",
    "userInterfaceStyle": "automatic",
    "ios": {
      "icon": "./assets/images/favicon.png",
      "supportsTablet": true
    },
    "android": {
      "package": "com.luciferlocas.flightxo",
      "predictiveBackGestureEnabled": false,
      "softwareKeyboardLayoutMode": "pan",
      "adaptiveIcon": {
        "backgroundColor": "#EAEAE2",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "config": {
        "googleMaps": {
          "apiKey": process.env.MAPS_API_KEY
        }
      }
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#EAEAE2",
          "android": {
            "image": "./assets/images/splash-icon.png",
            "imageWidth": 76
          }
        }
      ],
      [
        "react-native-maps",
        {
          "androidGoogleMapsApiKey": process.env.MAPS_API_KEY
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "ad0df582-9ac0-47bb-bcd6-6aaad13ffdff"
      }
    }
  }
};