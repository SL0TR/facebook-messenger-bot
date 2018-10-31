module.exports = {

  intentType: function (type, conf) {
    let response;
  
    if (conf > 0.8) {
      response = {
        "text": `Hi! I am ${Math.round(conf * 100)}% confident that your intent type is '${type}' :)`
      }
    } else {
      response = {
        "text": `You have no defined type of intent :(`
      }
    }
  
    return response;

  }

}