var commonTerms = [
  ["May use users content for exiting and future related services", "not-good"],
  ["Tracks user's activities on other websites", "not-good"],
  ["May share personal information with third parties", "not-good"],
  ["Stop providing services at any time", "not-good"],
  ["Limited copyright for users' content", "good"],
  ["Allows users to download their content if they wish", "good"],
  ["Keep rights for user's content even if users stop using the product", "good"],
  ["Can remove user's content anytime without their knowledge", "not-good"],
  ["Deleted contents are not really deleted", "not-good"],
  ["User's solely responsible for the content", "good"],
  ["User's own the copyright", "good"],
  ["Collects personal data for the limited use", "good"],
  ["Users can terminate their accounts at anytime", "good"],
  ["Users can't terminate their accounts at anytime", "not-good"],
  ["Cookies will be used to identify the session", "good"],
  ["Takes credit for users content", "not-good"],
  ["Does not track user activities", "good"],
  ["Users must be older than 13", "good"],
  ["Users must be older than 18", "good"],
];

db.terms.remove({
  type: "global"
});

commonTerms.forEach(function(terms) {
  db.terms.insert({
    _id: getUUID(),
    term: terms[0],
    type: "global",
    category: terms[1]
  });
});

function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}