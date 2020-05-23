// import { isNil } from "lodash";
import getGlobalTagValueFromDownloaded from "./downloaded";
//import Gorgias from "@/assets/stories/gorgias/gorgias.json";
// import EventsTome1 from "@/assets/stories/events-tome-1/events-tome-1.json";
// import EventsTome2 from "@/assets/stories/events-tome-2/events-tome-2.json";
// DIRTY AND WRONG : we should hard import stories.
//var storyIds = ["gorgias", "events-tome-1"];





var stories = {}
// Get all js files under the stories folder

let requireContext = require.context("@/assets/stories/", true, /\.json$/);
// requireContext.keys() returns an array that matches the name of the successful module
requireContext.keys().forEach((key) => {
  // Export file content through requireContext(key)
  const story = requireContext(key)
  stories[getGlobalTagValueFromDownloaded(story, "storyId")] = story
})



// var stories = {};
// // storyIds.forEach(storyId => {
// //   stories[storyId] = require("@/assets/stories/" +
// //     storyId +
// //     "/" +
// //     storyId +
// //     ".json");
// // });

// //import * as events from "@/assets/stories/events-tome-1/events-tome-1.ink";
// //stories[getGlobalTagValueFromDownloaded(Gorgias, "storyId")] = Gorgias;
// stories[getGlobalTagValueFromDownloaded(EventsTome1, "storyId")] = EventsTome1;
// stories[getGlobalTagValueFromDownloaded(EventsTome2, "storyId")] = EventsTome2;

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
