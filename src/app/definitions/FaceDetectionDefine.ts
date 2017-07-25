export class FaceRectangle {
    left: number;
    top: number;
    width: number;
    height: number;
}

export class Hair {
    bald: number;
    invisible: boolean;
    colors: { color: String, confidence: number }[] = [];
}

export class HeadPose {
    pitch: number;
    roll: number;
    yaw: number;
}

export class FacialHair {
    moustache: number;
    beard: number;
    sideburns: number;
}

export class MakeUp {
    eyeMakeUp: boolean;
    lipMakeUp: boolean;
}

export class FaceAttributes {
    hair: Hair;
    smile: number;
    headPose: HeadPose;
    gender: String;
    age: number;
    facialHair: FacialHair;
    glasses: String;
    makeUp: MakeUp;
    blur: {blurLevel: String, value: number};
    exposure: {level: String, value: number};
    noise: {level: String, value: number};
}

export class FaceDetectionData {
    faceRectangle: FaceRectangle = new FaceRectangle();
    data: FaceAttributes = new FaceAttributes();
}
