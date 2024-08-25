import React from "react";
import { useState, useEffect } from "react";

const DidYouKnow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    {
      id: 1,
      content:
        "الانتخابات النيابية الأردنية تُجرى كل أربع سنوات لاختيار أعضاء مجلس النواب.",
    },
    {
      id: 2,
      content: "الأردن يعتمد نظام التمثيل النسبي في الانتخابات النيابية.",
    },
    {
      id: 3,
      content:
        "الهيئة المستقلة للانتخاب هي الجهة المسؤولة عن إدارة وتنظيم الانتخابات في الأردن.",
    },
    {
      id: 4,
      content:
        "الانتخابات المحلية تُجرى لاختيار رؤساء وأعضاء المجالس البلدية والمحلية.",
    },
    {
      id: 5,
      content:
        "يتم تخصيص مقاعد للنساء في البرلمان الأردني لضمان التمثيل النسائي.",
    },
    {
      id: 6,
      content:
        "يشارك المواطنون الأردنيون في الانتخابات عبر الإدلاء بأصواتهم في مراكز الاقتراع.",
    },
    {
      id: 7,
      content:
        "تُعتبر الانتخابات النيابية في الأردن جزءًا من العملية الديمقراطية في البلاد.",
    },
    {
      id: 8,
      content:
        "يتم تحديد الفائزين في الانتخابات بناءً على عدد الأصوات التي يحصلون عليها في دوائرهم الانتخابية.",
    },
    {
      id: 9,
      content: "يحق لكل مواطن أردني بلغ 18 عامًا التصويت في الانتخابات.",
    },
    { id: 10, content: "شهدت الانتخابات الأردنية الأخيرة نسبة مشاركة مرتفعة." },
    // Add more cards as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (cards.length - 2));
    }, 2800); // Change card every 2.8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="wrapper flex flex-col lg:flex-row gap-4 mb-10 px-10">
        <div className="border-2 border-red-500 rounded-lg p-4 w-full lg:w-96 h-[25rem] overflow-hidden">
          <h2 className="text-red-500 font-bold text-xl mb-6 text-center">
            هل كنت تعلم{" "}
          </h2>
          <div className="relative h-[calc(100%)]">
            {cards.slice(currentIndex, currentIndex + 3).map((card, index) => (
              <div
                key={card.id}
                className={`absolute w-full transition-all duration-500 ease-in-out ${
                  index === 0
                    ? "opacity-100"
                    : index === 1
                    ? "opacity-85"
                    : "opacity-70"
                }`}
                style={{
                  top: `${index * 33.33}%`,
                }}
              >
                <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 h-28 mx-2">
                  <p className="text-base sm:text-lg md:text-xl text-center">
                    {card.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <section className="w-full lg:w-9/12">
          <blockquote className="text-wrap text-left text-base sm:text-lg md:text-2xl leading-8 h-fit ">
            تأسست الهيئة المستقلة للانتخاب عام 2012 كجهة مستقلة تعنى بإدارة
            العملية الانتخابية والإشراف عليها دون تدخل أو تأثير من أي جهة, وتعد
            الهيئة إحدى ثمرات الإصلاح السياسي في المملكة الأردنية الهاشمية
            بقيادة جلالة الملك عبدالله الثاني ابن الحسين، وتعبر عن استجابة
            المؤسسة الرسمية للمطالب الشعبية. تأسست الهيئة بهدف ضمان إجراء
            انتخابات نيابية تتوافق مع المعايير الدولية، وبما يكفل إعادة ثقة
            المواطن بالعملية الانتخابية ومخرجاتها، ومعالجة تراكمات الماضي
            السلبية والبناء على ما تم تحقيقه من إنجازات وخطواتٍ إصلاحية. باشرت
            الهيئة عملها في شهر أيار من العام 2012 وتمكنت خلال فترة قياسية من
            العمل على بناء هيكلها المؤسسي وتوفير ضمانات استدامته، والإعداد
            لإجراء انتخابات مجلس النواب الأردني السابع عشر التي جرت مطلع العام
            2013 كأول انتخابات تديرها الهيئة بعد إنشائها. في عام 2014، وبموجب
            التعديلات الدستورية، تم توسيع دور ومسؤوليّات الهيئة المستقلة
            للانتخاب، لتشمل إدارة الانتخابات البلدية وأي انتخاباتٍ عامة، إضافة
            إلى ما تكلفها به الحكومة من إدارة وإشراف على أية انتخاباتٍ أخرى،
            وبما يضمن أعلى مستويات الشفافية والنزاهة والحياد في إدارة العمليات
            الانتخابية المختلفة. أشرفت الهيئة بعد ذلك على عدد من الانتخابات
            الفرعية، وانتخابات المجالس البلدية ومجلس أمانة عمان الكبرى والتي
            نفذتها الحكومة في شهر آب 2013. قانون الهيئة المستقلة للانتخاب رقم
            (11) لسنة (2012).
          </blockquote>
        </section>
      </div>
    </>
  );
};

export default DidYouKnow;
