export function getChapterDescById(chapList, chapterId) {
  console.log('chap from utils', chapList);
  const chapters = chapList.map((chap) => ({
    chapterId: chap.chapterId,
    chapterDesc: chap.chapterDesc,
  }));
  const matchedChapter = chapters.filter((chapter) => chapter.chapterId === chapterId);
  return matchedChapter.length > 0 ? matchedChapter[0].chapterDesc : null;
}

export function getTopicDescById(chapList, topicId) {
  const topicsArrays = chapList.map((chap) => chap.topics);
  const allTopics = [].concat(...topicsArrays);
  const matchedTopic = allTopics.filter((topic) => topic.topicId === topicId);
  return matchedTopic.length > 0 ? matchedTopic[0].topicDesc : null;
}

export function getSubTopicDescById(chapList, subTopicId) {
  const topicsArrays = chapList.map((chap) => chap.topics);
  const allTopics = [].concat(...topicsArrays);
  const subTopicsArrays = allTopics.map((topic) => topic.subTopics || []);
  const allSubTopics = [].concat(...subTopicsArrays);
  const matchedSubTopic = allSubTopics.filter((subTopic) => subTopic.subTopicId === subTopicId);
  return matchedSubTopic.length > 0 ? matchedSubTopic[0].subTopicDesc : null;
}
