import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, type OnGatewayConnection, type OnGatewayDisconnect, type OnGatewayInit, type WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import type { Book, BookStockCount } from '../../types/book';
import { StockService } from './stock.service';

export interface Websocket_LowStockAlert {
  books: BookStockCount[];
}
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
  export class StockGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(public stockService: StockService){}
  
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');


  @SubscribeMessage('get low stock alert')
  async handleLowStockRequest(
    @MessageBody() _data: unknown,
    @ConnectedSocket() _client: Socket,
    ): Promise<WsResponse<Book[]>> {
    const event = 'low stock alert';
      const data = await this.stockService.checkStockCounts();
    return { event, data };
  }
  
  afterInit(server: Server) {
    this.stockService.socket = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ..._args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

}