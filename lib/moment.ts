import moment, { MomentInput } from "moment";

export function monthAndYear(date: MomentInput) {
  return moment(date).format("MMM YYYY");
}

export function timeAgo(date: MomentInput) {
  return moment(date).fromNow();
}

export function onlyTimeAgo(date: MomentInput) {
  return moment(date).fromNow().replace(" ago", "").replace("a ", "1 ");
}

export function dateFormat(date: MomentInput) {
  return moment(date).format("MMM Do YY");
}

export function dateLongFormat(date: MomentInput) {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
}
