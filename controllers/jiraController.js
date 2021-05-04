const {getIssue, getSearchResult}  = require('../services/jiraService');

module.exports.issue = (req, res, next) => {
    getIssue(req.params.issueId).then((issue)=>{
        res.send(issue);
    }).catch((error)=>{
        next(error);    
    });
}

module.exports.search = (req, res, next) => {
    getSearchResult(req.params.keyword).then((fiDetails)=>{
        res.send(fiDetails);
    }).catch((error)=>{
        next(error);    
    });
}