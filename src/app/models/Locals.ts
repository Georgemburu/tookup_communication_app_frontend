import { GNotification } from "./GNotification";
import { ONotification } from './ONotification';

export interface  NotificationClickedButtonCheckerObject {
    notification:GNotification|ONotification,
    declineIsClicked: boolean,
    acceptIsClicked: boolean
  }