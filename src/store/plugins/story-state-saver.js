const storyStateSaver = store => {
  store.subscribeAction({
    after: (action, state) => {
      if (
        [
          "processTagsAndTextMarkup",
          "changeChoices",
          "submitInput",
          "buyStory"
        ].includes(action.type)
      ) {
        // console.log("action type : " + action.type);
        // console.log("Saving state via plugin");
        const engineState = state.stories.currentStory.state.ToJson();
        const uiState = state.stories.ui;
        const storyState = {
          id: state.stories.storyId,
          data: {
            engineState: engineState,
            uiState: uiState
          }
        };
        //store.commit("saveCurrentStoryState", storyState);
        // if (localStorage[state.stories.storyId] == null) {
        //   const startingPoint = {
        //     storyStates: {}
        //   };
        //   startingPoint.storyStates[storyState.id] = storyState.data
        //   localStorage.setItem("user2", JSON.stringify(startingPoint));
        // }
        localStorage[storyState.id] = JSON.stringify(storyState.data);
        // if (localStorage.user2.storyStates[storyState.id] == null) {
        //   const startingPoint = { storyStates: {} }
        //   localStorage.setItem("user2", JSON.stringify(startingPoint));
        // }

        // if (localStorage.user2.storyStates != null) {
        //   localStorage.user2.storyStates[storyState.id] = JSON.stringify(storyState.data)

        // }
        // else {
        //   const startingPoint = { storyStates: {} }
        //   localStorage.setItem("user2", JSON.stringify(startingPoint));
        // }

        //localStorage.setItem('my_site_cart', JSON.stringify(storyState));
        //localStorage.storyStates.storyState = storyState
      }
    }
  });
};
export default storyStateSaver;
/////////
// store.subscribe(mutation => {
//   // engineState is modified
//   if (
//     ["changeVariable", "makeChoice", "continueStory"].includes(
//       mutation.type
//     )
//   ) {
//     //store.commit()
//     // save engineState
//   }
//   // uiState is modified
//   if (
//     [
//       "changeBackgroundImage",
//       "changeBackgroundSound",
//       "changeParagraph",
//       "changeCover",
//       "changeSpeech",
//       "changePortrait",
//       "updateTags"
//     ].includes(mutation.type)
//   ) {
//     // save uiState
//   }
// });

//https://vuejs.org/v2/api/#vm-watch
// immediate + deep
// store.watch(
//   (state, getters) => getters.status,
//   (newValue, oldValue) => {
//     console.log(`Updating from ${oldValue} to ${newValue}`);

//     // Do whatever makes sense now
//     if (newValue === 'success') {
//       this.complex = {
//         deep: 'some deep object',
//       };
//     }
//   },
// );

// store.watch(
//   function (state) {
//     return state.my_state;
//   },
//   function () {
//     //do something on data change
//   },
//   {
//     deep: true //add this if u need to watch object properties change etc.
//   }
// );
