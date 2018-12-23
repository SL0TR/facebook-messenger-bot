"use strict";
const axios = require("axios"),
  handlers = require("./webhookHandlers.js");

// Check the type of intent the user sent in message
exports.intentResponse = function(type, conf, userInfo, greet, psid) {
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
    this.jobResponse(psid);
    return;
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

// make slide according to Slider Response
exports.sliderMaker = async (psid, category, url) => {
  let slides;

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
        },
        {
          type: "postback",
          title: "Go back to portfolio",
          payload: "portfolio"
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
};

// Generate url button
exports.urlBtnMaker = (arr, type) => {
  let btnList = arr.map(el => {
    let { url, title } = el;
    return {
      title,
      url,
      type
    };
  });

  return btnList;
};

// Generate a custom response according to the jobs rest api from wordpress.
exports.jobResponse = async function(psid) {
  let response, buttons, text;

  const dropCvBtn = [
    {
      type: "web_url",
      url: "https://www.boomerangbd.com/drop-your-cv/",
      title: "Drop Your CV"
    }
  ];

  try {
    var { data } = await axios.get(
      "https://boomerangbd.com/wp-json/bot-api/v2/jobs"
    );

    let jobs = data.filter(el => el.title !== "Apply Now");

    if (jobs.length > 0) {
      let jobBtns = this.urlBtnMaker(jobs, "web_url");
      buttons = [...jobBtns, ...dropCvBtn];
      text = `There's ${jobs.length > 0 ? jobs.length : "no"} ${
        jobs.length > 1 ? "vacanvies" : "vacancy"
      } availble. If you don't find the appropriate position on the vacancy you can still apply with drop your CV/Resume by clicking 'Drop Your CV' at the bottom.`;
    } else {
      text = `There's no job oppenings availble currently but you can still drop your CV/Resume by clicking 'Drop Your CV' at the bottom.`;
      buttons = [...dropCvBtn];
    }

    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text,
          buttons
        }
      }
    };

    handlers.callSendAPI(psid, response);
  } catch (e) {
    console.log(e);
  }
};

// Call Button Response
exports.callBtnResponse = function(text, title, payload) {
  let response;

  // Get time for UTC +6.0 timezone in 24 hour format
  let hour = (function calcTime(offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + 3600000 * offset);

    // return time as a string
    return nd.getHours();
  })("+6.0");

  let workTime = hour >= 11 && hour <= 19 ? true : false;

  if (workTime) {
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
  } else {
    response = {
      text: `Our office is currently closed but you can drop your number here and we'll get back to you when it resumes.`
    };
  }

  return response;
};

// List of button response(goes to postback in handlers)
exports.btnListResponse = function(type) {
  let response, elements;

  // get the static list from service module
  const {
    portfolioBtnList,
    servicesBtnList,
    boomerangBtnList
  } = require("../../services/services.js");

  if (type === "services") {
    elements = servicesBtnList;
  } else if (type === "portfolio") {
    elements = portfolioBtnList;
  } else if (type === "boomerang") {
    elements = boomerangBtnList;
  }

  response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements
      }
    }
  };

  return response;
};
