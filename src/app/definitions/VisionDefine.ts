export interface FaceRectangle {
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface Celebrity {
    name: string;
    faceRectangle: FaceRectangle;
    confidence: number;
}

export interface Detail {
    celebrities: Celebrity[];
    landmarks?: any;
}

export interface Category {
    name: string;
    score: number;
    detail: Detail;
}

export interface Tag {
    name: string;
    confidence: number;
}

export interface Caption {
    text: string;
    confidence: number;
}

export interface Description {
    tags: string[];
    captions: Caption[];
}

export interface Metadata {
    width: number;
    height: number;
    format: string;
}

export interface FaceRectangle2 {
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface Face {
    age: number;
    gender: string;
    faceRectangle: FaceRectangle2;
}

export interface Color {
    dominantColorForeground: string;
    dominantColorBackground: string;
    dominantColors: string[];
    accentColor: string;
    isBWImg: boolean;
}

export interface ImageType {
    clipArtType: number;
    lineDrawingType: number;
}

export interface VisionData {
    categories: Category[];
    tags: Tag[];
    description: Description;
    requestId: string;
    metadata: Metadata;
    faces: Face[];
    color: Color;
    imageType: ImageType;
}
