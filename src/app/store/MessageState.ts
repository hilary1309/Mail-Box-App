import { inject, Injectable } from '@angular/core';
import { IMessage } from '../core/models/common.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MessageService } from '../core/services/message.service';
import { tap } from 'rxjs';

export class GetAllMessage {
  static readonly type = '[Message] Get All';
}

export interface MessageStateModel {
  messages: IMessage[] | undefined;
}

@State<MessageStateModel>({
  name: 'Message',
  defaults: {
    messages: [],
  },
})
@Injectable()
export class MessageState {
  private messageService = inject(MessageService);

  @Action(GetAllMessage)
  getAllMessage(ctx: StateContext<MessageStateModel>) {
    return this.messageService.getAllMessages().pipe(
      tap((response) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          messages: response.data,
        });
      })
    );
  }

  @Selector([MessageState])
  static selectMessages(state: MessageStateModel): IMessage[] | undefined {
    return state.messages;
  }
}
