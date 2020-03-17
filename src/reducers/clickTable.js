import { CLICK_UPDATE_VALUE } from '../actions/actionTypes';


const estadoInicial = {
	showTb: false
};

export const mostraTable = (state = estadoInicial, action)=>{
	switch(action.type){
		case CLICK_UPDATE_VALUE:
      return {
        ...state,
        showTb: action.showTb
      };
    default:
      return state;
	}
}

