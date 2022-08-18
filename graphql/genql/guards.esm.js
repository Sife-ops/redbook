
var Comment_possibleTypes = ['Comment']
export var isComment = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isComment"')
  return Comment_possibleTypes.includes(obj.__typename)
}



var Judge_possibleTypes = ['Judge']
export var isJudge = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isJudge"')
  return Judge_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
export var isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var Prediction_possibleTypes = ['Prediction']
export var isPrediction = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPrediction"')
  return Prediction_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
export var isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var Rating_possibleTypes = ['Rating']
export var isRating = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRating"')
  return Rating_possibleTypes.includes(obj.__typename)
}
