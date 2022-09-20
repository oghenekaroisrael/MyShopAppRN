/* eslint-disable react-hooks/rules-of-hooks */
import {format, parseISO, formatDistance} from 'date-fns';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/configureStore';
import {IShop, IUser} from '../types';

export function caps(str: string) {
  if (!str) {
    return 'NA';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capsWords(str: string) {
  if (!str) {
    return 'NA';
  }
  return str.split(' ').map(caps).join(' ');
}

/**
 * Gives you a mysql standard formatted datetime
 * e.g., 2018-08-08 23:00:00
 */
export function formatDate(date: string) {
  if (!date) {
    return 'NA';
  }
  return format(parseISO(date), 'iii, dd MMM');
}

export function timeAgo(date: string) {
  if (!date) {
    return '';
  }
  return formatDistance(parseISO(date), new Date(), {
    addSuffix: true,
  });
}

export function getCurrentShop() {
  const selected = useSelector((rootState: RootState) => {
    rootState.shops.selectedShop;
  }) as unknown as number;

  const shops = useSelector((rootState: RootState) => {
    rootState.shops.shops;
  }) as unknown as IShop[];

  return shops.filter(item => item.id === selected);
}

export function getSelectedShop() {
  const selected = useSelector((rootState: RootState) => {
    rootState.shops.selectedShop;
  }) as unknown as number;
  return selected;
}

export function getCurrentUser() {
  const user = useSelector((rootState: RootState) => {
    rootState.auth.user;
  }) as unknown as IUser;

  return user;
}
