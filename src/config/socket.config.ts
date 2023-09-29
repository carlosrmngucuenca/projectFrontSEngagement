import { SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';

// URL del servidor de sockets
const url = environment.socketUrl;

// Opciones de conexión
const options = {
  // Puedes agregar las opciones que quieras, por ejemplo:
  transports: ['websocket'],
  // query: { nameRoom: 'xxxx' }
};

// Objeto de configuración
export const config: SocketIoConfig = { url, options };
