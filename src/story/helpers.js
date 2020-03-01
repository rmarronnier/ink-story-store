function getGlobalTagValue(story, tagName) {
  let tag = story.globalTags.find(tag => tag.includes(tagName));
  let tagValue = tag.slice(tag.indexOf(":") + 1).trim();
  return tagValue;
}

export default getGlobalTagValue;
