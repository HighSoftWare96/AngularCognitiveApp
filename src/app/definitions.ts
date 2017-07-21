export class FaceRectangle {
    left: number;
    top: number;
    width: number;
    height: number;
}

export class Scores {
    anger = 0;
    contempt = 0;
    disgust = 0;
    fear = 0;
    happiness = 0;
    neutral = 0;
    sadness = 0;
    surprise = 0;
}

export class ResultData {
    faceRectangle: FaceRectangle = new FaceRectangle();
    scores: Scores = new Scores();
}