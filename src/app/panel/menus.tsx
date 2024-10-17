import IconifyComp from "@/components/shared/IconifyComp";

export const mainPanelList = [
  {
    key: "1",
    icon: <IconifyComp icon="clipBoard" size="xl" className="!min-w-5 !min-h-5 !mx-aut1o !p-0 menuIcon-iconify" />,
    label: "اطلاع رسانی",
    children: [
      {
        key: "sub3",
        icon: <IconifyComp icon="document2" size="xl" className="!min-w-5 !min-h-5 !mx-aut1o !p-0 menuIcon-iconify" />,
        label: "اخبار",
        href: `/`,
      },
      {
        key: "sub1",
        icon: <IconifyComp icon="clipBoardList" size="xl" className="!min-w-5 !min-h-5 !mx-aut1o !p-0 menuIcon-iconify" />,
        label: "RSS",
        href: `/rss`,
      },
      {
        key: "sub2",
        icon: <IconifyComp icon="ssrLink" size="xl" className="!min-w-5 !min-h-5 !mx-aut1o !p-0 menuIcon-iconify" />,
        label: "لینک RSS",
        href: `/rss-link`,
      },
      {
        key: "sub4",
        icon: <IconifyComp icon="gallery" size="xl" className="!min-w-5 !min-h-5 !mx-aut1o !p-0 menuIcon-iconify" />,
        label: "اسلایدر",
        href: `/slider`,
      },
    ],
  },
  {
    key: "6",
    icon: <IconifyComp icon="book" size="xl" className="!min-w-5 !min-h-5 !mx-aut1o !p-0 menuIcon-iconify" />,
    label: "کتاب",
    href: `/book`,
  },
  {
    key: "2",
    icon: <IconifyComp icon="star" size="xl" className="!min-w-5 !min-h-5 !mx-aut1o !p-0 menuIcon-iconify" />,
    label: "نظرسنجی",
    href: `/survey`,
  },
  {
    key: "3",
    icon: <IconifyComp icon="group" size="xl" className="!min-w-5 !min-h-5 !mx-aut1o !p-0 menuIcon-iconify" />,
    label: "دعوت به همکاری",
    href: `/invite-to-work`,
  },
  {
    key: "4",
    icon: <IconifyComp icon="setting" size="xl" className="!min-w-5 !min-h-5 !mx-aut1o !p-0 menuIcon-iconify" />,
    label: "تنظیمات",
    href: `/setting`,
  },
];

