const JiraApi = require("js-jira").JiraApi;
const config = require("config");
const crypto = require('crypto');
const { constants } = require('../helpers/constants');

const cipher = crypto.createCipher(constants.encryption.algorithm, constants.encryption.key);
const decipher = crypto.createDecipher(constants.encryption.algorithm, constants.encryption.key);
const decipherPwd = crypto.createDecipher(constants.encryption.algorithm, constants.encryption.key);
const decryptedPwd = decipherPwd.update(config.get('encryptedPwd'), 'hex', 'utf8') + decipherPwd.final('utf8');
const decryptedUserName = decipher.update(config.get('encryptedUserName'), 'hex', 'utf8') + decipher.final('utf8');
const jira = new JiraApi({
  scheme: 'https',                    // Default 'https'
  host: config.get('host'),           // REQUIRED
  port: config.get('port'),           // Default 443
  username: decryptedUserName,        // REQUIRED
  password: decryptedPwd,             // REQUIRED
  version: '3',                       // Default '2'
  base: ''                            // Default '' - The prefix in your install before /rest/api
});

module.exports.getIssue = function (issueId) {
  return new Promise((resolve, reject) => {
    jira.findIssue(issueId, function (error, issue) {
      if(error) {
        console.log(error);
        var err = new Error(`Not Found`);
        err.status = 404;
        reject(err);
      }
      if(issue) {
        resolve(issue)
      }
    });
  })
};

module.exports.getSearchResult = (keyword) => {
  var searchString = 'summary ~ "' + keyword + '"';
  var issueIds = [];
  console.log("Query :" + searchString);
  var response= {};
  return new Promise((resolve, reject) => {
    jira.searchJira(searchString, null, function(error, results) { 
        if(error) {
            console.log(error);
            var err = new Error(`Not Found`);
            err.status = 404;
            reject(err);
        }
        else if(!results.issues){
          resolve('{ errorCode : -1, errorMesssage : "No data Found" }');
        }
        else if(results.issues) {
          console.log("results =", results);
          console.log("result length = ", results.issues.length);
          for(var i = 0; i < results.issues.length; i++) {
            var obj = results.issues[i];    
            issueIds[i]=obj.key;
          }
          response = '{ errorCode : 0,  keyword : "' + keyword + '", issues : ' + JSON.stringify(issueIds) +' }';
          resolve(response); 
        }
    });
  });
    
};
