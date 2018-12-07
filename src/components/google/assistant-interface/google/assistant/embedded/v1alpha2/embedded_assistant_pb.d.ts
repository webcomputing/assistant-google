// package: google.assistant.embedded.v1alpha2
// file: google/assistant/embedded/v1alpha2/embedded_assistant.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as google_type_latlng_pb from "../../../../google/type/latlng_pb";

export class AssistRequest extends jspb.Message { 

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): AssistConfig | undefined;
    setConfig(value?: AssistConfig): void;


    hasAudioIn(): boolean;
    clearAudioIn(): void;
    getAudioIn(): Uint8Array | string;
    getAudioIn_asU8(): Uint8Array;
    getAudioIn_asB64(): string;
    setAudioIn(value: Uint8Array | string): void;


    getTypeCase(): AssistRequest.TypeCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssistRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AssistRequest): AssistRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssistRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssistRequest;
    static deserializeBinaryFromReader(message: AssistRequest, reader: jspb.BinaryReader): AssistRequest;
}

export namespace AssistRequest {
    export type AsObject = {
        config?: AssistConfig.AsObject,
        audioIn: Uint8Array | string,
    }

    export enum TypeCase {
        TYPE_NOT_SET = 0,
    
    CONFIG = 1,

    AUDIO_IN = 2,

    }

}

export class AssistResponse extends jspb.Message { 
    getEventType(): AssistResponse.EventType;
    setEventType(value: AssistResponse.EventType): void;


    hasAudioOut(): boolean;
    clearAudioOut(): void;
    getAudioOut(): AudioOut | undefined;
    setAudioOut(value?: AudioOut): void;


    hasScreenOut(): boolean;
    clearScreenOut(): void;
    getScreenOut(): ScreenOut | undefined;
    setScreenOut(value?: ScreenOut): void;


    hasDeviceAction(): boolean;
    clearDeviceAction(): void;
    getDeviceAction(): DeviceAction | undefined;
    setDeviceAction(value?: DeviceAction): void;

    clearSpeechResultsList(): void;
    getSpeechResultsList(): Array<SpeechRecognitionResult>;
    setSpeechResultsList(value: Array<SpeechRecognitionResult>): void;
    addSpeechResults(value?: SpeechRecognitionResult, index?: number): SpeechRecognitionResult;


    hasDialogStateOut(): boolean;
    clearDialogStateOut(): void;
    getDialogStateOut(): DialogStateOut | undefined;
    setDialogStateOut(value?: DialogStateOut): void;


    hasDebugInfo(): boolean;
    clearDebugInfo(): void;
    getDebugInfo(): DebugInfo | undefined;
    setDebugInfo(value?: DebugInfo): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssistResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AssistResponse): AssistResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssistResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssistResponse;
    static deserializeBinaryFromReader(message: AssistResponse, reader: jspb.BinaryReader): AssistResponse;
}

export namespace AssistResponse {
    export type AsObject = {
        eventType: AssistResponse.EventType,
        audioOut?: AudioOut.AsObject,
        screenOut?: ScreenOut.AsObject,
        deviceAction?: DeviceAction.AsObject,
        speechResultsList: Array<SpeechRecognitionResult.AsObject>,
        dialogStateOut?: DialogStateOut.AsObject,
        debugInfo?: DebugInfo.AsObject,
    }

    export enum EventType {
    EVENT_TYPE_UNSPECIFIED = 0,
    END_OF_UTTERANCE = 1,
    }

}

export class DebugInfo extends jspb.Message { 
    getAogAgentToAssistantJson(): string;
    setAogAgentToAssistantJson(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DebugInfo.AsObject;
    static toObject(includeInstance: boolean, msg: DebugInfo): DebugInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DebugInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DebugInfo;
    static deserializeBinaryFromReader(message: DebugInfo, reader: jspb.BinaryReader): DebugInfo;
}

export namespace DebugInfo {
    export type AsObject = {
        aogAgentToAssistantJson: string,
    }
}

export class AssistConfig extends jspb.Message { 

    hasAudioInConfig(): boolean;
    clearAudioInConfig(): void;
    getAudioInConfig(): AudioInConfig | undefined;
    setAudioInConfig(value?: AudioInConfig): void;


    hasTextQuery(): boolean;
    clearTextQuery(): void;
    getTextQuery(): string;
    setTextQuery(value: string): void;


    hasAudioOutConfig(): boolean;
    clearAudioOutConfig(): void;
    getAudioOutConfig(): AudioOutConfig | undefined;
    setAudioOutConfig(value?: AudioOutConfig): void;


    hasScreenOutConfig(): boolean;
    clearScreenOutConfig(): void;
    getScreenOutConfig(): ScreenOutConfig | undefined;
    setScreenOutConfig(value?: ScreenOutConfig): void;


    hasDialogStateIn(): boolean;
    clearDialogStateIn(): void;
    getDialogStateIn(): DialogStateIn | undefined;
    setDialogStateIn(value?: DialogStateIn): void;


    hasDeviceConfig(): boolean;
    clearDeviceConfig(): void;
    getDeviceConfig(): DeviceConfig | undefined;
    setDeviceConfig(value?: DeviceConfig): void;


    hasDebugConfig(): boolean;
    clearDebugConfig(): void;
    getDebugConfig(): DebugConfig | undefined;
    setDebugConfig(value?: DebugConfig): void;


    getTypeCase(): AssistConfig.TypeCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssistConfig.AsObject;
    static toObject(includeInstance: boolean, msg: AssistConfig): AssistConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssistConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssistConfig;
    static deserializeBinaryFromReader(message: AssistConfig, reader: jspb.BinaryReader): AssistConfig;
}

export namespace AssistConfig {
    export type AsObject = {
        audioInConfig?: AudioInConfig.AsObject,
        textQuery: string,
        audioOutConfig?: AudioOutConfig.AsObject,
        screenOutConfig?: ScreenOutConfig.AsObject,
        dialogStateIn?: DialogStateIn.AsObject,
        deviceConfig?: DeviceConfig.AsObject,
        debugConfig?: DebugConfig.AsObject,
    }

    export enum TypeCase {
        TYPE_NOT_SET = 0,
    
    AUDIO_IN_CONFIG = 1,

    TEXT_QUERY = 6,

    }

}

export class AudioInConfig extends jspb.Message { 
    getEncoding(): AudioInConfig.Encoding;
    setEncoding(value: AudioInConfig.Encoding): void;

    getSampleRateHertz(): number;
    setSampleRateHertz(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AudioInConfig.AsObject;
    static toObject(includeInstance: boolean, msg: AudioInConfig): AudioInConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AudioInConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AudioInConfig;
    static deserializeBinaryFromReader(message: AudioInConfig, reader: jspb.BinaryReader): AudioInConfig;
}

export namespace AudioInConfig {
    export type AsObject = {
        encoding: AudioInConfig.Encoding,
        sampleRateHertz: number,
    }

    export enum Encoding {
    ENCODING_UNSPECIFIED = 0,
    LINEAR16 = 1,
    FLAC = 2,
    }

}

export class AudioOutConfig extends jspb.Message { 
    getEncoding(): AudioOutConfig.Encoding;
    setEncoding(value: AudioOutConfig.Encoding): void;

    getSampleRateHertz(): number;
    setSampleRateHertz(value: number): void;

    getVolumePercentage(): number;
    setVolumePercentage(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AudioOutConfig.AsObject;
    static toObject(includeInstance: boolean, msg: AudioOutConfig): AudioOutConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AudioOutConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AudioOutConfig;
    static deserializeBinaryFromReader(message: AudioOutConfig, reader: jspb.BinaryReader): AudioOutConfig;
}

export namespace AudioOutConfig {
    export type AsObject = {
        encoding: AudioOutConfig.Encoding,
        sampleRateHertz: number,
        volumePercentage: number,
    }

    export enum Encoding {
    ENCODING_UNSPECIFIED = 0,
    LINEAR16 = 1,
    MP3 = 2,
    OPUS_IN_OGG = 3,
    }

}

export class ScreenOutConfig extends jspb.Message { 
    getScreenMode(): ScreenOutConfig.ScreenMode;
    setScreenMode(value: ScreenOutConfig.ScreenMode): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ScreenOutConfig.AsObject;
    static toObject(includeInstance: boolean, msg: ScreenOutConfig): ScreenOutConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ScreenOutConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ScreenOutConfig;
    static deserializeBinaryFromReader(message: ScreenOutConfig, reader: jspb.BinaryReader): ScreenOutConfig;
}

export namespace ScreenOutConfig {
    export type AsObject = {
        screenMode: ScreenOutConfig.ScreenMode,
    }

    export enum ScreenMode {
    SCREEN_MODE_UNSPECIFIED = 0,
    OFF = 1,
    PLAYING = 3,
    }

}

export class DialogStateIn extends jspb.Message { 
    getConversationState(): Uint8Array | string;
    getConversationState_asU8(): Uint8Array;
    getConversationState_asB64(): string;
    setConversationState(value: Uint8Array | string): void;

    getLanguageCode(): string;
    setLanguageCode(value: string): void;


    hasDeviceLocation(): boolean;
    clearDeviceLocation(): void;
    getDeviceLocation(): DeviceLocation | undefined;
    setDeviceLocation(value?: DeviceLocation): void;

    getIsNewConversation(): boolean;
    setIsNewConversation(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DialogStateIn.AsObject;
    static toObject(includeInstance: boolean, msg: DialogStateIn): DialogStateIn.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DialogStateIn, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DialogStateIn;
    static deserializeBinaryFromReader(message: DialogStateIn, reader: jspb.BinaryReader): DialogStateIn;
}

export namespace DialogStateIn {
    export type AsObject = {
        conversationState: Uint8Array | string,
        languageCode: string,
        deviceLocation?: DeviceLocation.AsObject,
        isNewConversation: boolean,
    }
}

export class DeviceConfig extends jspb.Message { 
    getDeviceId(): string;
    setDeviceId(value: string): void;

    getDeviceModelId(): string;
    setDeviceModelId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeviceConfig.AsObject;
    static toObject(includeInstance: boolean, msg: DeviceConfig): DeviceConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeviceConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeviceConfig;
    static deserializeBinaryFromReader(message: DeviceConfig, reader: jspb.BinaryReader): DeviceConfig;
}

export namespace DeviceConfig {
    export type AsObject = {
        deviceId: string,
        deviceModelId: string,
    }
}

export class AudioOut extends jspb.Message { 
    getAudioData(): Uint8Array | string;
    getAudioData_asU8(): Uint8Array;
    getAudioData_asB64(): string;
    setAudioData(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AudioOut.AsObject;
    static toObject(includeInstance: boolean, msg: AudioOut): AudioOut.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AudioOut, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AudioOut;
    static deserializeBinaryFromReader(message: AudioOut, reader: jspb.BinaryReader): AudioOut;
}

export namespace AudioOut {
    export type AsObject = {
        audioData: Uint8Array | string,
    }
}

export class ScreenOut extends jspb.Message { 
    getFormat(): ScreenOut.Format;
    setFormat(value: ScreenOut.Format): void;

    getData(): Uint8Array | string;
    getData_asU8(): Uint8Array;
    getData_asB64(): string;
    setData(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ScreenOut.AsObject;
    static toObject(includeInstance: boolean, msg: ScreenOut): ScreenOut.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ScreenOut, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ScreenOut;
    static deserializeBinaryFromReader(message: ScreenOut, reader: jspb.BinaryReader): ScreenOut;
}

export namespace ScreenOut {
    export type AsObject = {
        format: ScreenOut.Format,
        data: Uint8Array | string,
    }

    export enum Format {
    FORMAT_UNSPECIFIED = 0,
    HTML = 1,
    }

}

export class DeviceAction extends jspb.Message { 
    getDeviceRequestJson(): string;
    setDeviceRequestJson(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeviceAction.AsObject;
    static toObject(includeInstance: boolean, msg: DeviceAction): DeviceAction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeviceAction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeviceAction;
    static deserializeBinaryFromReader(message: DeviceAction, reader: jspb.BinaryReader): DeviceAction;
}

export namespace DeviceAction {
    export type AsObject = {
        deviceRequestJson: string,
    }
}

export class SpeechRecognitionResult extends jspb.Message { 
    getTranscript(): string;
    setTranscript(value: string): void;

    getStability(): number;
    setStability(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SpeechRecognitionResult.AsObject;
    static toObject(includeInstance: boolean, msg: SpeechRecognitionResult): SpeechRecognitionResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SpeechRecognitionResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SpeechRecognitionResult;
    static deserializeBinaryFromReader(message: SpeechRecognitionResult, reader: jspb.BinaryReader): SpeechRecognitionResult;
}

export namespace SpeechRecognitionResult {
    export type AsObject = {
        transcript: string,
        stability: number,
    }
}

export class DialogStateOut extends jspb.Message { 
    getSupplementalDisplayText(): string;
    setSupplementalDisplayText(value: string): void;

    getConversationState(): Uint8Array | string;
    getConversationState_asU8(): Uint8Array;
    getConversationState_asB64(): string;
    setConversationState(value: Uint8Array | string): void;

    getMicrophoneMode(): DialogStateOut.MicrophoneMode;
    setMicrophoneMode(value: DialogStateOut.MicrophoneMode): void;

    getVolumePercentage(): number;
    setVolumePercentage(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DialogStateOut.AsObject;
    static toObject(includeInstance: boolean, msg: DialogStateOut): DialogStateOut.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DialogStateOut, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DialogStateOut;
    static deserializeBinaryFromReader(message: DialogStateOut, reader: jspb.BinaryReader): DialogStateOut;
}

export namespace DialogStateOut {
    export type AsObject = {
        supplementalDisplayText: string,
        conversationState: Uint8Array | string,
        microphoneMode: DialogStateOut.MicrophoneMode,
        volumePercentage: number,
    }

    export enum MicrophoneMode {
    MICROPHONE_MODE_UNSPECIFIED = 0,
    CLOSE_MICROPHONE = 1,
    DIALOG_FOLLOW_ON = 2,
    }

}

export class DebugConfig extends jspb.Message { 
    getReturnDebugInfo(): boolean;
    setReturnDebugInfo(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DebugConfig.AsObject;
    static toObject(includeInstance: boolean, msg: DebugConfig): DebugConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DebugConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DebugConfig;
    static deserializeBinaryFromReader(message: DebugConfig, reader: jspb.BinaryReader): DebugConfig;
}

export namespace DebugConfig {
    export type AsObject = {
        returnDebugInfo: boolean,
    }
}

export class DeviceLocation extends jspb.Message { 

    hasCoordinates(): boolean;
    clearCoordinates(): void;
    getCoordinates(): google_type_latlng_pb.LatLng | undefined;
    setCoordinates(value?: google_type_latlng_pb.LatLng): void;


    getTypeCase(): DeviceLocation.TypeCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeviceLocation.AsObject;
    static toObject(includeInstance: boolean, msg: DeviceLocation): DeviceLocation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeviceLocation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeviceLocation;
    static deserializeBinaryFromReader(message: DeviceLocation, reader: jspb.BinaryReader): DeviceLocation;
}

export namespace DeviceLocation {
    export type AsObject = {
        coordinates?: google_type_latlng_pb.LatLng.AsObject,
    }

    export enum TypeCase {
        TYPE_NOT_SET = 0,
    
    COORDINATES = 1,

    }

}
