// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url_cognitive: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
  subscription_key: 'ee7e4d6c84fe4be89220d3fb0c7c9999',
  // tslint:disable-next-line:max-line-length
  url_face: 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=smile,glasses,facialHair,age,gender,hair',
  subscription_key_face: 'f6e0f77b46884a5cad9bdb75654ec94b',
  // tslint:disable-next-line:max-line-length
  url_vision: 'https://westeurope.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories,Tags,Description,Color&details=Landmarks,Celebrities&language=en',
  subscription_key_vision: 'd029fe3a6edf40a6a3146dc97ae4837d'
};
