declare namespace socket {
  type socket = {
    connect: (host: string, port: number) => server;
  };

  type server = {
    settimeout: (time: number) => void;
    accept: () => connection;
  };

  type connection = {};
}
