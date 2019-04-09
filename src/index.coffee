{ninvoke} = require('q')
Jimp = require('jimp')
splitText = require('split-text-middle')

module.exports = ({path, text, color, quality, fontSize, blackFont, whiteFont, isCenter,maxHeight,maxWidth}) ->
  quality ?= 60
  color ?= 'white'
  fontSize ?= 64
  isCenter ?= true
  maxHeight ?= 240
  maxWidth ?= 426

  blackFont ?= Jimp["FONT_SANS_#{fontSize}_BLACK"]
  whiteFont ?= Jimp["FONT_SANS_#{fontSize}_WHITE"]

  font =
    if color is 'white'
      whiteFont
    else
      blackFont

  ninvoke(Jimp, 'loadFont', font)
    .then (font) ->
      Jimp.read(path).then (image) -> {image, font}
    .then ({image, font}) ->

      if(!isCenter)
        y = image.bitmap.height - 200
        x = 30
        {first, last} = splitText(text)

        chain = image
          .print(font, x, y, first)
          .print(font, x, (y + fontSize), last)
          .quality(quality)
      else
        x = 0
        y = 0
        chain = image.print(font,x,y,{
          text: text,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        },maxWidth,maxHeight).quality(quality)
      
      ninvoke(chain, 'getBuffer', Jimp.MIME_JPEG)
