module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@screens': './frontend/src/screens',
            '@components': './frontend/src/components',
            '@context': './frontend/src/context',
            '@assets': './frontend/src/assets',
            '@utils': './frontend/src/utils',
            '@services': './frontend/src/services',
            '@hooks': './frontend/src/hooks',
          },
        },
      ],
    ],
  };
};
