import { SocketIoConfig } from 'ngx-socket-io';

// URL del servidor de sockets
const url = 'http://localhost:3002';

// Opciones de conexión
const options = {
  // Puedes agregar las opciones que quieras, por ejemplo:
  transports: ['websocket'],
  // query: { nameRoom: 'xxxx' }
};

// Objeto de configuración
export const config: SocketIoConfig = { url, options };
