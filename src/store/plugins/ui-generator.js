export default function UiGenerator() {
  return store => {
    // socket.on('data', data => {
    //   store.commit('receiveData', data)
    // })
    store.subscribe(mutation => {
      // engineState is modified
      if (
        ["changeVariable", "makeChoice", "continueStory"].includes(
          mutation.type
        )
      ) {
        //store.commit()
        // save engineState
      }
      // uiState is modified
      if (
        [
          "changeBackgroundImage",
          "changeBackgroundSound",
          "changeParagraph",
          "changeCover",
          "changeSpeech",
          "changePortrait",
          "updateTags"
        ].includes(mutation.type)
      ) {
        // save uiState
      }
    });
  };
}

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
