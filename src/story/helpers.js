/*eslint-disable */
function getGlobalTagValue(story, tagName) {
  if (story == null) {
    console.log("story is null")
  }
  let tag = story.globalTags.find(tag => tag.includes(tagName));
  let tagValue = tag.slice(tag.indexOf(":") + 1).trim();
  return tagValue;
}

export default getGlobalTagValue;
