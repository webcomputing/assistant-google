// package: google.assistant.embedded.v1alpha2
// file: google/assistant/embedded/v1alpha2/embedded_assistant.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as google_assistant_embedded_v1alpha2_embedded_assistant_pb from "../../../../google/assistant/embedded/v1alpha2/embedded_assistant_pb";
import * as google_type_latlng_pb from "../../../../google/type/latlng_pb";

interface IEmbeddedAssistantService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    assist: IEmbeddedAssistantService_IAssist;
}

interface IEmbeddedAssistantService_IAssist extends grpc.MethodDefinition<google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistRequest, google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistResponse> {
    path: string; // "/google.assistant.embedded.v1alpha2.EmbeddedAssistant/Assist"
    requestStream: boolean; // true
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistRequest>;
    requestDeserialize: grpc.deserialize<google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistRequest>;
    responseSerialize: grpc.serialize<google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistResponse>;
    responseDeserialize: grpc.deserialize<google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistResponse>;
}

export const EmbeddedAssistantService: IEmbeddedAssistantService;

export interface IEmbeddedAssistantServer {
    assist: grpc.handleBidiStreamingCall<google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistRequest, google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistResponse>;
}

export interface IEmbeddedAssistantClient {
    assist(): grpc.ClientDuplexStream<google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistRequest, google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistResponse>;
    assist(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistRequest, google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistResponse>;
    assist(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistRequest, google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistResponse>;
}

export class EmbeddedAssistantClient extends grpc.Client implements IEmbeddedAssistantClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public assist(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistRequest, google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistResponse>;
    public assist(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistRequest, google_assistant_embedded_v1alpha2_embedded_assistant_pb.AssistResponse>;
}
