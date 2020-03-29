// const xsolla = store => {
//     store.subscribeAction({
//         after: (action, state) => {
//             if (["changeStory", "startOver"].includes(action.type)) {
//                 const storyState = JSON.parse(
//                     localStorage.getItem(state.stories.storyId)
//                 );
//                 //const storyState = state.user.storyStates[state.stories.storyId];
//                 if (storyState != null) {
//                     // console.log("action type : " + action.type);
//                     // console.log("Loading state via plugin");
//                     store.commit("loadEngineState", storyState.engineState);
//                     store.commit("loadUIState", storyState.uiState);
//                 } else {
//                     store.dispatch("continueStory");
//                 }
//                 if (state.user.storiesBought.includes(state.stories.storyId)) {
//                     store.dispatch("changeVariable", {
//                         name: "storyBought",
//                         value: true
//                     });
//                 }
//             }
//         }
//     });
// };
// export default storyStateLoader;