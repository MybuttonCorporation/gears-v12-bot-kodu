# GearsModuleExports-v12
###### Bu sistem v12.5.1 ve v12.5.3 için kurulmuştur.

## Kullanım
__Öncelikle bu repodaki 'index.js' dosyasının içindeki herşeyi kopyala ve MAİN DOSYANA yapıştır.__
(bundan sonra kodu ara ve değiştirmen gereken şeyleri değiştir, prefix vb.)
__Sonra, MAİN DOSYANIN BULUNDUĞU KLASÖRDE `komutlar` isimli bir dosya oluştur.__

##### Komut oluşturma

`./komutlar` dosyasının içine `istediğin-isimde-bir-dosya.js` oluştur.
Sonra, şunları gir:
```js
const discord = require('discord.js')
module.exports = {
config: {name: 'komutun adı', desc: 'komutun açıklaması'} // NOT: komut adında boşluk olamaz.
async run (client, message, args) { 
//buraya kodunu gir!
//message: 'message' adındaki variable
//client: 'client' adındaki variable
//args: 'args' adındaki variable
}
}
```

© GearsCode.
