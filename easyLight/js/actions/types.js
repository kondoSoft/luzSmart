
export type Action =
  { type: 'PUSH_NEW_ROUTE', route: string }
    | { type: 'POP_ROUTE' }
    | { type: 'POP_TO_ROUTE', route: string }
    | { type: 'REPLACE_ROUTE', route: string }
    | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
    | { type: 'OPEN_DRAWER'}
    | { type: 'CLOSE_DRAWER'}
    | { type: 'SET_USER', name: string}
    | { type: 'SET_LIST', list: string}
    | { type: 'SET_CONTRACT', list: string}
    | { type: 'SET_BILL', list: string}
    | { type: 'GET_STATES', list: string}
    | { type: 'GET_MUNICIPALITY', list: string}
    | { type: 'GET_RATE', list: string}
    | { type: 'GET_RATE_UNIQUE', list: string}
    | { type: 'LOGOUT'}
    | { type: 'PRINT_RATE_PERIOD'}
    | { type: 'PRINT_RECEIPTS'}
    | { type: 'GET_TIPS' }
    | { type: 'PRINT_USER' }
    | { type: 'UPDATE_USER' }
    | { type: 'GET_DATA_USER' }
    | { type: 'GET_CONTRACT_UPDATE'}
    | { type: 'OPEN_SWIPER' }
    | { type: 'CLOSE_SWIPER' }
    | { type: 'PRINT_REGISTER_USER' }
    | { type: 'PICKER_CONTRACT'}
    | { type: 'EMAIL_VERIFICATION'}
    | { type: 'PRINT_RECORD'}
    
export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
