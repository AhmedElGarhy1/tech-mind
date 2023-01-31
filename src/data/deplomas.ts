export const deplomasData: DeplomasType[] = [
  {
    id: "data-science-and-ai-deploma",
    name: { EN: "Data Science and AI", AR: "علوم البيانات و الذكاء الاصطناعى" },
    description: {
      EN: "The course is based on practical application and building real projects and machine learning models and applications",
      AR: "تعتمد الدورة على التطبيق العملي وبناء مشاريع حقيقية ونماذج وتطبيقات التعلم الآلي",
    },
    href: "/",
    duration: 145,
    lectures: 217,
    workshops: 20,
    real_projects: 36,
    main_img: "/",
    price: 3000,
    overview: {
      EN: [
        "Complete Data Science Diploma: Mathematics, Statistics, Python, Advanced Statistics in Python, Machine & Deep Learning.",
        "Are you ready to start your path to becoming a Data Scientist!",
        "This comprehensive course will be your guide to learning how to use the power of Python to analyze data, create beautiful visualizations, and use powerful machine learning algorithms!",
        "The course is based on practical application and building real projects and machine learning models and applications. In addition to learning the basics, you will learn how to build real applications using python and how to analyze data and understand patterns to predict and get useful insights.",
      ],
      AR: [
        "دبلوم علوم البيانات الكامل: الرياضيات ، الإحصاء ، بايثون ، الإحصاء المتقدم في بايثون ، الآلة والتعلم العميق.",
        "هل أنت مستعد لبدء طريقك لتصبح عالم بيانات!",
        "ستكون هذه الدورة التدريبية الشاملة دليلك لتعلم كيفية استخدام قوة Python لتحليل البيانات وإنشاء تصورات جميلة واستخدام خوارزميات قوية للتعلم الآلي!",
        "تعتمد الدورة على التطبيق العملي وبناء مشاريع حقيقية ونماذج وتطبيقات التعلم الآلي. بالإضافة إلى تعلم الأساسيات ، ستتعلم كيفية إنشاء تطبيقات حقيقية باستخدام Python وكيفية تحليل البيانات وفهم الأنماط للتنبؤ والحصول على رؤى مفيدة.",
      ],
    },
  },
];

export interface DeplomasType {
  id: string;
  name: {
    EN: string;
    AR: string;
  };
  description: {
    EN: string;
    AR: string;
  };
  href: string;
  duration: number;
  lectures: number;
  workshops: number;
  real_projects: number;
  main_img: string;
  price: number;
  overview: {
    AR: string[];
    EN: string[];
  };
}
