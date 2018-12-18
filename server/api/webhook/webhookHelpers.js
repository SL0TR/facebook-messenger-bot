"use strict";
const axios = require("axios"),
  handlers = require("./webhookHandlers.js");

// Check the type of intent the user sent in message
exports.intentResponse = function(type, conf, userInfo, greet) {
  let response;

  if (greet && greet === "true") {
    response = {
      text: `Hi, ${
        userInfo && userInfo.gender === "male"
          ? "Mr. " + userInfo.first_name
          : "Mrs. " + userInfo.first_name
      }! Thank you for messaging us. How can we assist you?`
    };
  } else if (type === "compliment") {
    response = {
      text: `Thanks, we are glad to you liked it!`
    };
  } else if (type === "criticism") {
    response = {
      text: `Thank you for sharing your point of view, we are always open to constructive feedbacks`
    };
  } else if (type === "insult") {
    response = {
      text: `That's not a very nice thing to say!`
    };
  } else if (type === "services") {
    response = this.btnListResponse(type);
  } else if (type === "instagram") {
    response = this.urlButtonResponse(
      "Thank you for getting in touch with us! We will get back to you soon, in the meantime you can stalk us on our Instagram",
      "https://www.instagram.com/helloboomerang",
      "Boomerang Instagram"
    );
  } else if (type === "job") {
    response = this.jobResponse();
  } else if (type === "leave") {
    response = {
      text: `Goodbye and take care ${
        userInfo && userInfo.gender === "male"
          ? "Mr. " + userInfo.first_name
          : "Mrs. " + userInfo.first_name
      }`
    };
  } else if (type === "marketing") {
    response = {
      text: `description about marketing`
    };
  } else if (type === "vidProd") {
    response = {
      text: `description about ${type}`
    };
  } else if (type === "branding") {
    response = {
      text: `description about ${type}`
    };
  } else if (type === "mobWebDev") {
    response = {
      text: `description about ${type}`
    };
  } else if (type === "uxUi") {
    response = {
      text: `description about ${type}`
    };
  } else if (type === "content") {
    response = {
      text: `description about ${type}`
    };
  } else if (type === "portfolio") {
    response = this.btnListResponse(type);
  } else if (type === "assistance") {
    response = this.callBtnResponse(
      "Need further assistance? Talk to a representive",
      "Call representitive",
      "0123213232"
    );
  } else if (type === "boomerang") {
    response = this.btnListResponse(type);
  } else if (type === "blog") {
    response = this.urlButtonResponse(
      "Go ahead and read out blog!",
      "https://www.boomerangbd.com/blog/",
      "Our Blog"
    );
  } else {
    response = {
      text: ` I'm sorry ${
        userInfo && userInfo.gender === "male"
          ? "Mr. " + userInfo.first_name
          : "Mrs. " + userInfo.first_name
      }, I didn't get that, can you rephrase?`
    };
  }

  return response;
};

// An Image and associated text response
exports.imgResponse = function() {
  let response;

  response = {
    text: `Please send a text message instead of an image`
  };
  return response;
};

// URL Button response
exports.urlButtonResponse = function(text, url, title) {
  let response;

  response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text,
        buttons: [
          {
            type: "web_url",
            url,
            title
          }
        ]
      }
    }
  };

  return response;
};

// Slider or Carousel response in Messenger
exports.sliderResponse = function(psid, category) {
  if (
    category === "marketing-portfolio" ||
    category === "mobWebDev-portfolio" ||
    category === "vidProd-portolio" ||
    category === "case-portfolio" ||
    category === "branding-portfolio"
  ) {
    this.sliderMaker(
      psid,
      category,
      "https://boomerangbd.com/wp-json/bot-api/v2/portfolio"
    );
  } else if (category === "clients") {
    this.sliderMaker(
      psid,
      category,
      "https://boomerangbd.com/wp-json/bot-api/v2/clients"
    );
  }
};

// make slide according to intent type
exports.sliderMaker = (psid, category, url) => {
  let slides;

  (async () => {
    try {
      var { data } = await axios.get(url);
    } catch (e) {
      console.log(e);
    }

    if (category === "marketing-portfolio") {
      slides = data.filter(el => el.cat === "Digital Marketing");
    } else if (category === "vidProd-portolio") {
      slides = data.filter(el => el.cat === "Video &amp; Photography");
    } else if (category === "mobWebDev-portfolio") {
      slides = data.filter(el => el.cat === "Web &amp; Mobile Apps");
    } else if (category === "case-portfolio") {
      slides = data.filter(el => el.cat === "Case Studies");
    } else if (category === "branding-portfolio") {
      slides = data.filter(el => el.cat === "Branding &amp; Print");
    } else if (category === "clients") {
      slides = data;
    }

    let elements = slides.map(el => {
      let { title, img: image_url, url, subtitle } = el;

      if (title.search("&#8217;") > -1) {
        title = title = title.replace("&#8217;", "'");
      } else if (title.search("&#038;") > -1) {
        title = title.replace("&#038;", "&");
      }

      return {
        title,
        image_url,
        subtitle: subtitle || "Boomerang Digital Clients",
        default_action: {
          type: "web_url",
          url: url || "https://www.boomerangbd.com"
        },
        buttons: [
          {
            type: "web_url",
            url: url || "https://www.boomerangbd.com",
            title: "View Details"
          }
        ]
      };
    });

    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements
        }
      }
    };

    handlers.callSendAPI(psid, response);
  })();
};

exports.jobResponse = function(psid) {
  (async () => {
    try {
      var { data } = await axios.get(
        "https://boomerangbd.com/wp-json/bot-api/v2/jobs"
      );
      // console.log(data);
      let jobs = data.filter(el => el.title !== "Apply Now");

      let response = {
        text: `There's ${jobs.length > 0 ? jobs.length : "no"} ${
          jobs.length > 1 ? "vacanvies" : "vacancy"
        } availble`
        // "attachment":{
        //   "type":"template",
        //   "payload":{
        //     template_type: "button",
        //     text: `There's ${  jobs.length > 0 ? jobs.length : 'no'   } ${ jobs.length > 1 ? 'vacanvies': 'vacancy' } availble`,
        //     buttons:[
        //       {
        //         "type":"web_url",
        //         "url":"https://www.messenger.com",
        //         "title":"Visit Messenger"
        //       }
        //     ]
        //   }
        // }
      };
      handlers.callSendAPI(psid, response);

      // let response = this.urlButtonResponse(
      //   "Visit our site to see available vacancies. If you can't find anything, you can also apply your CV nonetheless.",
      //   "https://www.boomerangbd.com/join-our-team/",
      //   "Join Our Team!"
      // );
    } catch (e) {
      console.log(e);
    }
  })();
};

// Call Button Response
exports.callBtnResponse = function(text, title, payload) {
  let response;

  response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text,
        buttons: [
          {
            type: "phone_number",
            title,
            payload
          }
        ]
      }
    }
  };

  return response;
};

// List of button response(goes to postback in handlers)
exports.btnListResponse = function(type) {
  let response;

  if (type === "services") {
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Marketing",
              buttons: [
                {
                  type: "postback",
                  title: "Marketing",
                  payload: "marketing"
                },
                {
                  type: "postback",
                  title: "Video Prduction",
                  payload: "vidProd"
                },
                {
                  type: "postback",
                  title: "Branding",
                  payload: "branding"
                }
              ]
            },
            {
              title: "Tech",
              buttons: [
                {
                  type: "postback",
                  title: "Mobile App and Web Development",
                  payload: "mobWebDev"
                },
                {
                  type: "postback",
                  title: "UX / UI Design",
                  payload: "uxUi"
                },
                {
                  type: "postback",
                  title: "Content",
                  payload: "content"
                }
              ]
            }
          ]
        }
      }
    };
  } else if (type === "portfolio") {
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Digital Marketing",
              buttons: [
                {
                  type: "postback",
                  title: "Digital Marketing",
                  payload: "marketing-portfolio"
                },
                {
                  type: "postback",
                  title: "Video Production",
                  payload: "vidProd-portolio"
                },
                {
                  type: "postback",
                  title: "Branding",
                  payload: "branding-portfolio"
                }
              ]
            },
            {
              title: "Tech",
              buttons: [
                {
                  type: "postback",
                  title: "Mobile App and Web Development / Design",
                  payload: "mobWebDev-portfolio"
                },
                {
                  type: "postback",
                  title: "Case Studies",
                  payload: "case-portfolio"
                },
                {
                  type: "web_url",
                  url: "https://www.boomerangbd.com/our-work/all/",
                  title: "View All"
                }
              ]
            }
          ]
        }
      }
    };
  } else if (type === "boomerang") {
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Click on the section you would like to know more about",
              buttons: [
                {
                  type: "postback",
                  title: "Our Services",
                  payload: "services"
                },
                {
                  type: "postback",
                  title: "Our Portfolio",
                  payload: "portfolio"
                },
                {
                  type: "postback",
                  title: "Our Clients",
                  payload: "clients"
                }
              ]
            },
            {
              title: "Click on the section you would like to know more about",
              buttons: [
                {
                  type: "postback",
                  title: "Available Jobs",
                  payload: "job"
                },
                {
                  type: "postback",
                  title: "Need Assistance?",
                  payload: "assistance"
                },
                {
                  type: "web_url",
                  url: "https://www.boomerangbd.com",
                  title: "Visit Our Site"
                }
              ]
            }
          ]
        }
      }
    };
  }

  return response;
};
