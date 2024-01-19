const fs = require("node:fs");
fs.readFile(process.argv[2], (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  if (
    data.buffer[0] === 0xef &&
    data.buffer[1] === 0xbb &&
    data.buffer[2] === 0xbf
  ) {
    data = data.buffer.slice(3);
  }
  let manifest = data.toString("utf-8");
  manifest = manifest.replace(
    `<Package xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10" xmlns:mp="http://schemas.microsoft.com/appx/2014/phone/manifest" xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10" xmlns:uap5="http://schemas.microsoft.com/appx/manifest/uap/windows10/5" xmlns:uap4="http://schemas.microsoft.com/appx/manifest/uap/windows10/4" IgnorableNamespaces="uap uap4 uap5 mp build" xmlns:build="http://schemas.microsoft.com/developer/appx/2015/build">`,
    `<Package xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10" xmlns:mp="http://schemas.microsoft.com/appx/2014/phone/manifest" xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10" xmlns:uap5="http://schemas.microsoft.com/appx/manifest/uap/windows10/5" xmlns:uap4="http://schemas.microsoft.com/appx/manifest/uap/windows10/4" IgnorableNamespaces="uap uap4 uap5 mp build" xmlns:build="http://schemas.microsoft.com/developer/appx/2015/build" xmlns:desktop4="http://schemas.microsoft.com/appx/manifest/desktop/windows10/4">`
  );
  manifest = manifest.replace(
    `<Application Id="App" Executable="Minecraft.Windows.exe" EntryPoint="Minecraft_Win10.App">`,
    `<Application Id="App" Executable="Minecraft.Windows.exe" EntryPoint="Minecraft_Win10.App" desktop4:SupportsMultipleInstances="true">`
  );
  let buf = Buffer.from(manifest, "utf-8");
  buf.buffer = [0xef, 0xbb, 0xbf] + buf.buffer;
  fs.writeFile(process.argv[2], buf, (err) => {
    if (err) console.error(err);
  });
});
