/*
const withTM =  require("next-transpile-modules")(["@madzadev/audio-player"]);
module.exports = withTM();
*/

const withImages = require("next-images")

const withTM = require("next-transpile-modules")(["@madzadev/audio-player"]);

module.exports = {
  images: {
    disableStaticImages: true
  }
}
module.exports = withImages(withTM());

/*

module.exports = {
  images: {
    disableStaticImages: true,
  },
}


/*
const webpack = require('webpack')
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const path = require('path');

module.exports = withPlugins([
        optimizedImages
    ],
{
    webpack: (config, { dev }) => {
        config.plugins.push(
            new webpack.EnvironmentPlugin(process.env),
        );
        
        // Config to have absolute imports instead of relative imports 
        config.resolve.alias['components'] = path.join(__dirname, 'components')
        config.resolve.alias['static'] = path.join(__dirname, 'static')

        return config;
    },
});
*/