declare module "socket" {
  type socket = {
    connect: (host: string, port: number) => socket;
    receive: (pattern?: string, prefix?: string) => string;
    setsockname: (host: string, port: number) => void;
    settimeout: (time: number) => void;
    accept: () => connection;
  };

  type connection = {};

  function bind(host: string, port: number): socket;
  function select(
    receivers?: socket[],
    senders?: socket[],
    timeout?: number
  ): [socket[], socket[], "timeout" | "select failed" | undefined];
  function udp(): socket;
}
