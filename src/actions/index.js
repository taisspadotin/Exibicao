import { CLICK_UPDATE_VALUE } from './actionTypes';

export const clickButton = value => ({
  type: CLICK_UPDATE_VALUE,
  newValue: value
});

export const showTable = value =>({
	type: CLICK_UPDATE_VALUE,
	showTb: value
})