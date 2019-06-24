(function() {
  var Jimp, ninvoke, splitText;

  ninvoke = require('q').ninvoke;

  Jimp = require('jimp');

  splitText = require('split-text-middle');

  module.exports = function(arg) {
    var blackFont, color, font, fontSize, isCenter, maxHeight, maxWidth, path, quality, text, whiteFont;
    path = arg.path, text = arg.text, color = arg.color, quality = arg.quality, fontSize = arg.fontSize, blackFont = arg.blackFont, whiteFont = arg.whiteFont, isCenter = arg.isCenter, maxHeight = arg.maxHeight, maxWidth = arg.maxWidth;
    if (quality == null) {
      quality = 60;
    }
    if (color == null) {
      color = 'white';
    }
    if (fontSize == null) {
      fontSize = 64;
    }
    if (isCenter == null) {
      isCenter = true;
    }
    if (maxHeight == null) {
      maxHeight = 240;
    }
    if (maxWidth == null) {
      maxWidth = 426;
    }
    if (blackFont == null) {
      blackFont = Jimp["FONT_SANS_" + fontSize + "_BLACK"];
    }
    if (whiteFont == null) {
      whiteFont = Jimp["FONT_SANS_" + fontSize + "_WHITE"];
    }
    font = color === 'white' ? whiteFont : blackFont;
    return ninvoke(Jimp, 'loadFont', font).then(function(font) {
      return Jimp.read(path).then(function(image) {
        return {
          image: image,
          font: font
        };
      });
    }).then(function(arg1) {
      var chain, first, font, image, last, ref, x, y;
      image = arg1.image, font = arg1.font;
      if (!isCenter) {
        y = image.bitmap.height - 200;
        x = 30;
        ref = splitText(text), first = ref.first, last = ref.last;
        chain = image.print(font, x, y, first).print(font, x, y + fontSize, last).quality(quality);
      } else {
        x = 0;
        y = 0;
        chain = image.print(font, x, y, {
          text: text,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
        }, maxWidth, maxHeight).quality(quality);
      }
      return ninvoke(chain, 'getBuffer', Jimp.MIME_JPEG);
    });
  };

}).call(this);
