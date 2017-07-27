export interface Category {
    name: string;
    score: number;
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

export interface Color {
    dominantColorForeground: string;
    dominantColorBackground: string;
    dominantColors: string[];
    accentColor: string;
    isBWImg: boolean;
}

export interface VisionData {
    categories: Category[];
    description: Description;
    requestId: string;
    metadata: Metadata;
    color: Color;
}
