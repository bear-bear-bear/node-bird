module.exports = (api) => {
  api.cache(true);

  return {
    presets: [["next/babel"]],
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          style: true
        }
      ],
      [
        'babel-plugin-styled-components',
        {
          ssr: true,
          displayName: true
        }
      ]
    ]
  };
};