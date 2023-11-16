# registrapp2
prueba de la original para ver que fallo





































descargar repo
//registrapp2



--inicializamos el proyecto con el siguiente comando para que inicialice los node_modules
npm install --force

--luego de installar los node_modules seguimos con el siguiente codigo
npx cap add android

--nos dara un error de que ya esta instalado por lo que seguimos con el siguiente comando
npm run build

-- luego seguimos con el siguiente
npx cap sync

--nos preguntara si queremos ayudar a ionic a mejorar ponemos que no y seguimos con el siguiente comando
ionic capacitor build

--seleccionamos android y por ultimo se abrira automaticamente el proyecto (pero para abrirlo desde consola usamos el siguiente comando)
npx cap open android




**si da problemas con el SDK instalar, en caso que no deje volver a emular el celular

//Cambiar Icono

Carpeta: res click derecho/ new / image asset.
seleccionar imagen , fondo aceptar y  reiniciar ejecucion

//Aplicar permisos

Carpeta: manifest / AndroidManifest.xml

pegar el siguiente codigo en :

   <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-feature android:name="android.hardware.camera" />
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-feature android:name="android.hardware.camera.autofocus" />
  <uses-feature android:name="android.hardware.camera.flash" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

Firmar APK

