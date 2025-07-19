export interface IChatProps {
    wsConnection: WebSocket;
}

export type TWsData = {
    event: string;
    message: string;
};
