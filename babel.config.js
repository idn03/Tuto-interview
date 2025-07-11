module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': ['./app/components'],
            '@screens': ['./app/screens'],
            '@mock': ['./app/mock'],
            '@dictionaries': ['./app/dictionaries'],
            '@contexts': ['./app/contexts'],
            '@utils': ['./app/utils'],
            '@app': ['./app']
          }
        }
      ]
    ]
  };
}; 