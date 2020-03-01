// import { isNil } from "lodash";
import getGlobalTagValueFromDownloaded from "./downloaded";
import Gorgias from "@/assets/stories/gorgias/gorgias.json";

//var storyIds = ["gorgias", "events-tome-1"];
var stories = {};
// storyIds.forEach(storyId => {
//   stories[storyId] = require("@/assets/stories/" +
//     storyId +
//     "/" +
//     storyId +
//     ".json");
// });

//import * as events from "@/assets/stories/events-tome-1/events-tome-1.ink";
stories[getGlobalTagValueFromDownloaded(Gorgias, "storyId")] = Gorgias;

export default stories;

// let asyncFirestore = null;

// // Lazy load firestore with async import is important for performance

// export default () => {
//   if (isNil(asyncFirestore)) {
//     asyncFirestore = import(
//       /* webpackChunkName: "chunk-firestore" */ "firebase/firestore"
//     ).then(() => {
//       firebase.firestore().settings({});
//       // firebase.firestore().enablePersistence({ synchronizeTabs: true });
//       return firebase.firestore();
//     });
//   }
//   return asyncFirestore;
// };
