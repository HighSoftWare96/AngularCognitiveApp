// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url_cognitive: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
  subscription_key: 'ee7e4d6c84fe4be89220d3fb0c7c9999',
  url_face: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false\
  &returnFaceAttributes=age,gender,smile,headPose,facialHair,glasses,makeup,acessories,hair',
  subscription_key_face: 'f6e0f77b46884a5cad9bdb75654ec94b'
};
