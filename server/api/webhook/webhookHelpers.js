"use strict";
exports.portfolio = {
  digiMarketing: [
    {
      title: "Disruption at launch, leading to a comprehensive brand presence",
      subTitle:
        "Disruption at launch, leading to a comprehensive brand presence",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-krispy-kreme-bangladesh/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/2016/11/image_project_featured_digital_marketing_krispy_kreme.jpg"
    },
    {
      title: "DIGITAL MARKETING FOR GREEN DELTA INSURANCE COMPANY",
      subTitle:
        "Effective online campaign development and strategies to enhance brand awareness",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-green-delta-insurance-company/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/image_project_featured_digital_marketing_green_delta.jpg"
    },
    {
      title: "DIGITAL MARKETING FOR AMAZE POWER",
      subTitle: "Digital branding and enhancement of awareness on social media",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-amaze-power/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/2017/03/image_project_thumbnail_digitalMarketing_amazePower.jpg"
    }
  ],
  vidPhotography: [
    {
      title: "Disruption at launch, leading to a comprehensive brand presence",
      subTitle:
        "Disruption at launch, leading to a comprehensive brand presence",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-krispy-kreme-bangladesh/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/2016/11/image_project_featured_digital_marketing_krispy_kreme.jpg"
    },
    {
      title: "DIGITAL MARKETING FOR GREEN DELTA INSURANCE COMPANY",
      subTitle:
        "Effective online campaign development and strategies to enhance brand awareness",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-green-delta-insurance-company/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/image_project_featured_digital_marketing_green_delta.jpg"
    },
    {
      title: "DIGITAL MARKETING FOR AMAZE POWER",
      subTitle: "Digital branding and enhancement of awareness on social media",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-amaze-power/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/2017/03/image_project_thumbnail_digitalMarketing_amazePower.jpg"
    }
  ],
  webMobile: [
    {
      title: "Disruption at launch, leading to a comprehensive brand presence",
      subTitle:
        "Disruption at launch, leading to a comprehensive brand presence",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-krispy-kreme-bangladesh/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/2016/11/image_project_featured_digital_marketing_krispy_kreme.jpg"
    },
    {
      title: "DIGITAL MARKETING FOR GREEN DELTA INSURANCE COMPANY",
      subTitle:
        "Effective online campaign development and strategies to enhance brand awareness",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-green-delta-insurance-company/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/image_project_featured_digital_marketing_green_delta.jpg"
    },
    {
      title: "DIGITAL MARKETING FOR AMAZE POWER",
      subTitle: "Digital branding and enhancement of awareness on social media",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-amaze-power/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/2017/03/image_project_thumbnail_digitalMarketing_amazePower.jpg"
    }
  ],
  brandPrint: [
    {
      title: "Disruption at launch, leading to a comprehensive brand presence",
      subTitle:
        "Disruption at launch, leading to a comprehensive brand presence",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-krispy-kreme-bangladesh/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/2016/11/image_project_featured_digital_marketing_krispy_kreme.jpg"
    },
    {
      title: "DIGITAL MARKETING FOR GREEN DELTA INSURANCE COMPANY",
      subTitle:
        "Effective online campaign development and strategies to enhance brand awareness",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-green-delta-insurance-company/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/image_project_featured_digital_marketing_green_delta.jpg"
    },
    {
      title: "DIGITAL MARKETING FOR AMAZE POWER",
      subTitle: "Digital branding and enhancement of awareness on social media",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-amaze-power/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/2017/03/image_project_thumbnail_digitalMarketing_amazePower.jpg"
    }
  ],
  caseStudies: [
    {
      title: "Disruption at launch, leading to a comprehensive brand presence",
      subTitle:
        "Disruption at launch, leading to a comprehensive brand presence",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-krispy-kreme-bangladesh/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/2016/11/image_project_featured_digital_marketing_krispy_kreme.jpg"
    },
    {
      title: "DIGITAL MARKETING FOR GREEN DELTA INSURANCE COMPANY",
      subTitle:
        "Effective online campaign development and strategies to enhance brand awareness",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-green-delta-insurance-company/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/image_project_featured_digital_marketing_green_delta.jpg"
    },
    {
      title: "DIGITAL MARKETING FOR AMAZE POWER",
      subTitle: "Digital branding and enhancement of awareness on social media",
      url:
        "https://www.boomerangbd.com/our-work/digital-marketing/digital-marketing-amaze-power/",
      imgUrl:
        "https://www.boomerangbd.com/wp-content/uploads/2017/03/image_project_thumbnail_digitalMarketing_amazePower.jpg"
    }
  ]
};

exports.sliderMaker = function(category) {
  let arr = this[category].digiMarketing.map(el => {
    return {
      title: el.title,
      image_url: el.imgUrl,
      subtitle: el.title,
      default_action: {
        type: "web_url",
        url: el.url
      },
      buttons: [
        {
          type: "web_url",
          url: el.url,
          title: "View Full In Our Website"
        }
      ]
    };
  });

  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",

        elements: arr
      }
    }
  };

  return response;
};

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
    response = this.urlButtonResponse();
  } else if (type === "job") {
    response = {
      text: `We currently have these vacancies available, visit out site to know more.`
    };
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
    response = this.sliderResponse(type);
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

exports.imgResponse = function() {
  let response;

  response = {
    text: `Please send a text message instead of an image`
  };
  return response;
};

exports.urlButtonResponse = function() {
  let response;

  response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text:
          "Thank you for getting in touch with us! We will get back to you soon, in the meantime you can stalk us on our Instagram",
        buttons: [
          {
            type: "web_url",
            url: "https://www.instagram.com/helloboomerang",
            title: "Boomerang Instagram"
          }
        ]
      }
    }
  };

  return response;
};

// Slider or Carousel response in Messenger
exports.sliderResponse = function(type) {
  let response;

  if (type === "portfolio") {
    response = this.sliderMaker(type);
  } else if (type === "clients") {
    response = this.sliderMaker(type);
  }

  return response;
};

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
  }

  return response;
};
