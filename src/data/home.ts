import building from "../assets/home_icons/building.png";
import certificate from "../assets/home_icons/certificate.png";
import project from "../assets/home_icons/group.png";
import laptopMoney from "../assets/home_icons/laptop-money.png";
import profiles from "../assets/home_icons/profiles.png";
import time from "../assets/home_icons/time.png";

export const homeData = {
  name: {
    AR: "",
    EN: "The Future belongs to you",
  },
  description: {
    AR: "Tech Mind هي أكاديمية لتدريس مجالات علوم الكمبيوتر ، وتهدف إلى مساعدة الطلاب من خلال توفير محتوى عالي الجودة وقيِّم. بالإضافة إلى تنمية مهاراتهم الشخصية لإنتاج جيل واعي بمتطلبات سوق العمل.",
    EN: "Tech Mind an academic for teaching computer science fields.It aims to help students by providing high quality and valuable content. In addition to developing their personal skills to produce a generation that is aware of the requirements of the labor market.",
  },
  main_img: "",
  grow_your_skills: [
    { AR: "دبلومات في تخصصات مختلفة", EN: "Diplomas in different Specialties" },
    {
      AR: "الوصول مدى الحياة إلى محتويات الدورة",
      EN: "Lifetime access to course contents",
    },
    { AR: "مشاريع عملية حقيقية", EN: "Real Practical Projects" },
    {
      AR: "التدريب دون اتصال بالإنترنت والتدريب عبر الإنترنت",
      EN: "Offline traning & Online training",
    },
    { AR: "تحديثات مجانية مستمرة", EN: "Free continuous updates" },
    {
      AR: "المهارات الشخصية والتدريب على المهارات الصعبة",
      EN: "Soft Skills and hard Skills Training",
    },
  ],
  why_choose_us: [
    {
      AR: "الوصول مدى الحياة إلى محتويات الدورة",
      EN: "Lifetime access to course contents",
      img: profiles,
    },
    {
      AR: "التوجيه أثناء البحث عن وظيفة",
      EN: "Guidance during your job search",
      img: building,
    },
    { AR: "مشاريع عملية حقيقية", EN: "Real Practical Projects", img: project },
    {
      AR: "شهادة معتمدة من أكاديمية تيك مايند",
      EN: "Accredited certificate from Tech Mind Academy",
      img: certificate,
    },
    { AR: "تحديثات مجانية مستمرة", EN: "Free continuous updates", img: time },
    {
      AR: "مشاريع جاهزة للعرض في ال portfolio",
      EN: "Projects ready to be showcased in portfolio",
      img: laptopMoney,
    },
  ],
};

export default homeData;
