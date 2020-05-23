// var backgroundsPaths = ["@/assets/stories/events-tome-1/images/backgrounds/", "@/assets/stories/events-tome-2/images/backgrounds/"]
// var stories = ["events-tome-1", "events-tome-2"]
var backgrounds = {}



var filenames = []
let requireContext = require.context("@/assets/stories/events-tome-1/images/backgrounds/", false, /.$/);
requireContext.keys().forEach((key) => {
  // Export file content through requireContext(key)
  filenames.push(key.slice(2))

})
backgrounds["events-tome-1"] = filenames;

// filenames = []
// requireContext = require.context("@/assets/stories/events-tome-2/images/backgrounds/", false, /.$/);
// requireContext.keys().forEach((key) => {
//   // Export file content through requireContext(key)
//   filenames.push(key)

// })
// backgrounds["events-tome-2"] = filenames;

// backgroundsPaths.forEach((path) => {
//   var filenames = []
//   let requireContext = require.context(path, false, /.$/);
//   requireContext.keys().forEach((key) => {
//     // Export file content through requireContext(key)
//     filenames.push(key)

//   })
//   var storyId = stories.find(story => path.includes(story));
//   backgrounds[storyId] = filenames;
// })

// backgrounds = {
//   "events-tome-1": [require("@/assets/stories/events-tome-1/images/backgrounds/Spencers.jpg")]
// }

export default backgrounds;