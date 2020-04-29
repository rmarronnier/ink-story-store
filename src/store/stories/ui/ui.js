export default {
  state: {
    ready: false,
    background: { image: "default.jpg", sound: null },
    cover: null,
    paragraph: null,
    speech: null,
    portrait: null,
    choices: null,
    input: null,
    style: null,
    tags: []
  },
  mutations: {
    loadUIState(state, UIState) {
      // To be replaced by replaceState vuex method
      //console.log(UIState.background.image);
      Object.assign(state, UIState);
      //console.log(state.background.image);
    },
    storyUIready(state, UIReadiness) {
      state.ready = UIReadiness;
    },
    changeBackgroundImage(state, filename) {
      state.background.image = filename;
    },
    changeBackgroundSound(state, filename) {
      state.background.sound = filename;
    },
    changeParagraph(state, paragraph) {
      state.paragraph = paragraph;
    },
    changeCover(state, cover) {
      state.cover = cover;
    },
    changeSpeech(state, speech) {
      state.speech = speech;
    },
    changePortrait(state, portrait) {
      state.portrait = portrait;
    },
    changeChoices(state, choices) {
      if (choices != null) {
        state.choices = choices.map(choice => choice.text); //state.currentStory.currentChoices
      }
    },
    changeInput(state, input) {
      state.input = input;
    },
    changeStyle(state, style) {
      state.style = style;
    },
    updateTags(state, tags) {
      state.tags = tags;
    },
    clearParagraph(state) {
      state.paragraph = null;
    },
    clearSpeech(state) {
      state.speech = null;
    },
    clearPortrait(state) {
      state.portrait = null;
    },
    clearBackgroundImage(state) {
      state.background.image = "default.jpg";
    },
    clearBackgroundSound(state) {
      state.background.sound = null;
    },
    clearChoices(state) {
      state.choices = null;
    },
    clearInput(state) {
      state.input = null;
    },
    clearStyle(state) {
      state.style = null;
    },
    clearCover(state) {
      state.cover = null;
    },
    clearTags(state) {
      state.tags = [];
    }
  },
  actions: {
    clearUI({ commit }) {
      commit("clearParagraph");
      commit("clearSpeech");
      commit("clearPortrait");
      commit("clearBackgroundImage");
      commit("clearBackgroundSound");
      commit("clearChoices");
      commit("clearInput");
      commit("clearCover");
      commit("clearStyle");
      commit("clearTags");
    },
    changeChoices({ commit }, choices) {
      commit("changeChoices", choices);
    },
    processSpeech({ commit }, paragraph) {
      let speechCharacter = paragraph.slice(0, paragraph.indexOf("::")).trim();
      let speechContent = paragraph.slice(paragraph.indexOf(":::") + 3).trim();
      commit("clearParagraph");
      commit("changeSpeech", {
        character: speechCharacter,
        content: speechContent
      });
    },
    processCover({ commit }, paragraph) {
      let coverContent = paragraph.slice(paragraph.indexOf("[!!!]") + 5).trim();
      commit("clearParagraph");
      commit("clearInput");
      commit("clearSpeech");
      commit("clearPortrait");
      commit("changeCover", coverContent);
    },
    processInput({ commit }, paragraph) {
      let variableName = paragraph.slice(0, paragraph.indexOf(">>")).trim();
      let question = paragraph.slice(paragraph.indexOf(">>>") + 3).trim();
      commit("changeInput", {
        variable: variableName,
        question: question
      });
    },
    processTags({ commit, state }) {
      const tags = state.tags;
      if (tags.length > 0) {
        tags.forEach(tag => {
          let tagPropertyName = tag.slice(0, tag.indexOf(":")).trim();
          let tagValue = tag.slice(tag.indexOf(":") + 1).trim();
          let tagObject = { propertyName: tagPropertyName, value: tagValue };

          if (tagObject.propertyName.includes("background")) {
            if (tagObject.propertyName.includes("image")) {
              commit("changeBackgroundImage", tagObject.value);
            }
            if (tagObject.propertyName.includes("sound")) {
              commit("changeBackgroundSound", tagObject.value);
            }
          }
          if (tagObject.propertyName.includes("portrait")) {
            commit("changePortrait", tagObject.value);
          } else {
            commit("clearPortrait"); // to avoid a wrong portrait picturing a portrait less speaker
          }
          if (tagObject.propertyName.includes("style")) {
            tagObject["value"] = tagObject.value.replace("{", "");
            tagObject["value"] = tagObject.value.replace("}", "");
            commit("changeStyle", tagObject.value);
          }
        });
        commit("updateTags", tags);

        //dispatch("uploadStoryStates");
      }
    }
  },
  getters: {
    isStoryUIready: state => state.ready,
    background: state => state.background,
    backgroundImageURL: state =>
      "/images/backgrounds/" + state.background.image,
    backgroundSoundURL: state => "/sounds/" + state.background.sound,
    portraitURL: state => "/images/characters/" + state.portrait,
    backgroundSound: state => state.background.sound,
    backgroundImage: state => state.background.image,
    inputModalData: state => state.input,
    paragraph: state => state.paragraph,
    speech: state => state.speech,
    hasText: state => state.paragraph || state.speech,
    portrait: state => state.portrait,
    choices: state => state.choices,
    //input: state => state.input,
    style: state => state.style,
    cover: state => state.cover,
    tags: state => state.tags
  }
};
