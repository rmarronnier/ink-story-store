/*eslint-disable */

function getGlobalTagValueFromDownloaded(json, tagName) {
  const story = json;
  let objects = story.root[0]
    .flat()
    .filter(element => typeof element === "object" && element !== null);
  let tags = objects.filter(object => object.hasOwnProperty("#"));
  tags = tags.map(tag => tag["#"]);
  let tag = tags.find(tag => tag.includes(tagName));
  let tagValue = tag.slice(tag.indexOf(":") + 1).trim();
  return tagValue;
}

export default getGlobalTagValueFromDownloaded;

/*eslint-enable */

//includes(tagName)
