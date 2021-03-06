import { CapacitorConfig } from '@capacitor/cli';


const config: CapacitorConfig = {
  appId: 'com.SuperCompras.Deliver',
  appName: 'SuperCompras Delivery',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#4169e1",
      sound: "beep.wav",
    },
  },
};

export default config;
