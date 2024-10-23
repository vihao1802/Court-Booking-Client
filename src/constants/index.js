export const navItems = [
  {
    name: "Trang chủ",
    url: "/",
  },
  {
    name: "Khám phá",
    url: "/explore",
  },
  {
    name: "Đặt sân",
    url: "/court",
  },
];

export const exploreCategoriesTabs = [
  {
    value: "1",
    label: "Cầu lông",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
      >
        <g clipPath="url(#clip0_12805_145716)">
          <path
            d="M6.26302 17.8255C5.71506 18.3361 4.9903 18.6141 4.24143 18.6009C3.49256 18.5877 2.77805 18.2843 2.24844 17.7547C1.71883 17.2251 1.41546 16.5106 1.40224 15.7617C1.38903 15.0128 1.66701 14.2881 2.17761 13.7401L2.58692 13.3315L6.67234 17.417L6.26302 17.8255Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M4.21905 11.6929L8.30701 15.7809L6.67182 17.4161L2.58386 13.3281L4.21905 11.6929Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M8.30417 15.7813L17.9396 12.0219C18.1566 11.9371 18.343 11.7886 18.4742 11.5961C18.6054 11.4035 18.6754 11.1758 18.675 10.9427V9.42188C18.675 9.11522 18.5531 8.82112 18.3363 8.60429C18.1195 8.38745 17.8254 8.26563 17.5187 8.26563H15.2062V5.95313C15.2062 5.64647 15.0844 5.35237 14.8676 5.13554C14.6507 4.9187 14.3566 4.79688 14.05 4.79688H11.7375V2.48438C11.7375 2.17772 11.6156 1.88362 11.3988 1.66678C11.182 1.44995 10.8879 1.32813 10.5812 1.32813H9.05573C8.8227 1.32768 8.59496 1.39765 8.40239 1.52888C8.20982 1.6601 8.06139 1.84645 7.97656 2.0635L4.21875 11.6958L8.30417 15.7813Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M11.7344 4.79688L5.55768 13.0325"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M15.2031 8.26562L6.96753 14.4423"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_12805_145716">
            <rect width="20" height="20" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    value: "2",
    label: "Bóng bàn",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
      >
        <path
          d="M18.6491 7.6C18.7603 7.49334 18.8486 7.36669 18.9088 7.22729C18.969 7.08789 19 6.93847 19 6.78758C19 6.63668 18.969 6.48727 18.9088 6.34787C18.8486 6.20847 18.7603 6.08182 18.6491 5.97515L13.6121 1.33667C13.5009 1.22994 13.3689 1.14527 13.2236 1.0875C13.0783 1.02973 12.9226 1 12.7653 1C12.608 1 12.4522 1.02973 12.3069 1.0875C12.1616 1.14527 12.0296 1.22994 11.9184 1.33667L4.7229 8.23805L5.43034 12.1656L1.15315 16.0386C0.928548 16.2541 0.802368 16.5463 0.802368 16.8511C0.802368 17.1558 0.928548 17.448 1.15315 17.6635C1.37775 17.879 1.68237 18 2.00001 18C2.31764 18 2.62227 17.879 2.84687 17.6635L7.12406 13.7905L11.4552 14.5037L18.6491 7.6Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M5.8324 8.17834L11.7231 13.3772"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M2.22223 2.98608C2.22223 3.23231 2.27073 3.47613 2.36495 3.70362C2.45918 3.9311 2.59729 4.1378 2.7714 4.31191C2.94551 4.48602 3.15221 4.62413 3.3797 4.71836C3.60718 4.81259 3.851 4.86108 4.09723 4.86108C4.34346 4.86108 4.58727 4.81259 4.81476 4.71836C5.04225 4.62413 5.24894 4.48602 5.42305 4.31191C5.59716 4.1378 5.73528 3.9311 5.8295 3.70362C5.92373 3.47613 5.97223 3.23231 5.97223 2.98608C5.97223 2.73986 5.92373 2.49604 5.8295 2.26855C5.73528 2.04107 5.59716 1.83437 5.42305 1.66026C5.24894 1.48615 5.04225 1.34804 4.81476 1.25381C4.58727 1.15958 4.34346 1.11108 4.09723 1.11108C3.851 1.11108 3.60718 1.15958 3.3797 1.25381C3.15221 1.34804 2.94551 1.48615 2.7714 1.66026C2.59729 1.83437 2.45918 2.04107 2.36495 2.26855C2.27073 2.49604 2.22223 2.73986 2.22223 2.98608V2.98608Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  },
  {
    value: "3",
    label: "Futsal",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
      >
        <g clipPath="url(#clip0_12811_98680)">
          <path
            d="M10 0.625C8.1458 0.625 6.33324 1.17483 4.79153 2.20497C3.24982 3.23511 2.04821 4.69929 1.33863 6.41234C0.629062 8.1254 0.443406 10.0104 0.805142 11.829C1.16688 13.6475 2.05976 15.318 3.37088 16.6291C4.682 17.9402 6.35246 18.8331 8.17103 19.1949C9.9896 19.5566 11.8746 19.3709 13.5877 18.6614C15.3007 17.9518 16.7649 16.7502 17.795 15.2085C18.8252 13.6668 19.375 11.8542 19.375 10C19.375 8.76886 19.1325 7.54977 18.6614 6.41234C18.1902 5.27492 17.4997 4.24142 16.6291 3.37087C15.7586 2.50032 14.7251 1.80977 13.5877 1.33863C12.4502 0.867492 11.2311 0.625 10 0.625V0.625Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7.41253 13.9617L5.82086 9.04505L10 6.00671L14.1792 9.04505L12.5875 13.9617H7.41253Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M13.5842 1.33411L10 3.74994L6.41583 1.33411"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12.1658 19.1233L13.9483 15.485L18.0183 14.86"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M19.345 10.7575L16.4891 7.91336L17.1016 3.88086"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M10 3.75V6.00667"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M14.1791 9.045L16.4891 7.91333"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M0.655029 10.7575L3.51086 7.91336L2.89836 3.88086"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M5.8208 9.045L3.5108 7.91333"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12.5875 13.9617L13.9484 15.485"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7.83419 19.1233L6.05169 15.485L1.98169 14.86"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7.41247 13.9617L6.05164 15.485"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_12811_98680">
            <rect width="20" height="20" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    value: "4",
    label: "Bóng chuyền",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
      >
        <g clipPath="url(#clip0_12811_98706)">
          <path
            d="M0.625 10C0.625 12.4864 1.61272 14.871 3.37087 16.6291C5.12903 18.3873 7.5136 19.375 10 19.375C12.4864 19.375 14.871 18.3873 16.6291 16.6291C18.3873 14.871 19.375 12.4864 19.375 10C19.375 7.5136 18.3873 5.12903 16.6291 3.37087C14.871 1.61272 12.4864 0.625 10 0.625C7.5136 0.625 5.12903 1.61272 3.37087 3.37087C1.61272 5.12903 0.625 7.5136 0.625 10V10Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M17.1758 16.0333C16.6085 14.49 15.6481 13.1215 14.3895 12.0633C13.1309 11.0051 11.6178 10.2939 10 10"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M1.13751 13.0658C2.75391 13.3858 4.4263 13.2706 5.98352 12.7319C7.54075 12.1932 8.92687 11.2504 10 10"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M11.5742 0.756714C10.517 2.02017 9.81428 3.54162 9.53771 5.16561C9.26114 6.7896 9.42067 8.4579 10 10"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M4.11835 13.1667C3.11006 11.8167 2.48407 10.2201 2.30619 8.54458C2.12832 6.86906 2.40513 5.17657 3.10752 3.64502"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7.2558 12.1808C6.0814 10.5336 5.47119 8.55084 5.51624 6.5284C5.5613 4.50596 6.25921 2.55232 7.5058 0.959106"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M10.0625 3.29583C11.7006 3.05601 13.373 3.25404 14.9099 3.86979C16.4467 4.48555 17.7932 5.49709 18.8125 6.80166"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M9.41669 6.55085C11.3993 6.28553 13.4149 6.65764 15.1721 7.61339C16.9293 8.56914 18.337 10.059 19.1917 11.8675"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M15.6925 13.3959C15.0589 14.9536 14.0184 16.3124 12.6798 17.3303C11.3412 18.3481 9.75369 18.9875 8.08331 19.1817"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M13.2091 11.2175C12.4116 13.0609 11.0432 14.5994 9.30549 15.6065C7.56776 16.6136 5.55254 17.0361 3.55664 16.8117"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_12811_98706">
            <rect width="20" height="20" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    value: "5",
    label: "Bóng đá",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
      >
        <g clipPath="url(#clip0_12811_98680)">
          <path
            d="M10 0.625C8.1458 0.625 6.33324 1.17483 4.79153 2.20497C3.24982 3.23511 2.04821 4.69929 1.33863 6.41234C0.629062 8.1254 0.443406 10.0104 0.805142 11.829C1.16688 13.6475 2.05976 15.318 3.37088 16.6291C4.682 17.9402 6.35246 18.8331 8.17103 19.1949C9.9896 19.5566 11.8746 19.3709 13.5877 18.6614C15.3007 17.9518 16.7649 16.7502 17.795 15.2085C18.8252 13.6668 19.375 11.8542 19.375 10C19.375 8.76886 19.1325 7.54977 18.6614 6.41234C18.1902 5.27492 17.4997 4.24142 16.6291 3.37087C15.7586 2.50032 14.7251 1.80977 13.5877 1.33863C12.4502 0.867492 11.2311 0.625 10 0.625V0.625Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7.41253 13.9617L5.82086 9.04505L10 6.00671L14.1792 9.04505L12.5875 13.9617H7.41253Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M13.5842 1.33411L10 3.74994L6.41583 1.33411"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12.1658 19.1233L13.9483 15.485L18.0183 14.86"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M19.345 10.7575L16.4891 7.91336L17.1016 3.88086"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M10 3.75V6.00667"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M14.1791 9.045L16.4891 7.91333"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M0.655029 10.7575L3.51086 7.91336L2.89836 3.88086"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M5.8208 9.045L3.5108 7.91333"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12.5875 13.9617L13.9484 15.485"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7.83419 19.1233L6.05169 15.485L1.98169 14.86"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7.41247 13.9617L6.05164 15.485"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_12811_98680">
            <rect width="20" height="20" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    value: "6",
    label: "Tennis",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
      >
        <g clipPath="url(#clip0_5200_117808)">
          <path
            d="M0.625 10C0.625 12.4864 1.61272 14.871 3.37087 16.6291C5.12903 18.3873 7.5136 19.375 10 19.375C12.4864 19.375 14.871 18.3873 16.6291 16.6291C18.3873 14.871 19.375 12.4864 19.375 10C19.375 7.5136 18.3873 5.12903 16.6291 3.37087C14.871 1.61272 12.4864 0.625 10 0.625C7.5136 0.625 5.12903 1.61272 3.37087 3.37087C1.61272 5.12903 0.625 7.5136 0.625 10V10Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M5 5.00586C5.27294 5.49664 5.50861 6.00725 5.705 6.53336"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M6.27085 8.85083C6.35449 9.57125 6.34525 10.2994 6.24335 11.0175"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M5.60834 13.3192C5.36292 13.9059 5.06358 14.4686 4.71417 15"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M15 5.00586C14.7273 5.49667 14.492 6.00727 14.2958 6.53336"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M13.7292 8.85083C13.6455 9.57125 13.6548 10.2994 13.7567 11.0175"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M14.3917 13.3192C14.637 13.9061 14.9367 14.4688 15.2867 15"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_5200_117808">
            <rect width="20" height="20" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    value: "7",
    label: "Bóng rổ",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
      >
        <g clipPath="url(#clip0_5200_117972)">
          <path
            d="M0.625 10C0.625 12.4864 1.61272 14.871 3.37087 16.6291C5.12903 18.3873 7.5136 19.375 10 19.375C12.4864 19.375 14.871 18.3873 16.6291 16.6291C18.3873 14.871 19.375 12.4864 19.375 10C19.375 7.5136 18.3873 5.12903 16.6291 3.37087C14.871 1.61272 12.4864 0.625 10 0.625C7.5136 0.625 5.12903 1.61272 3.37087 3.37087C1.61272 5.12903 0.625 7.5136 0.625 10V10Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M3.14502 16.3958C4.28752 12.9316 7.78252 5.4033 16.9167 3.67163"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M3 3.76672C6.73667 5.12756 13.7267 8.83339 15.1925 17.8167"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M8.76999 0.704956C8.81802 1.72468 8.64019 2.74243 8.24922 3.68545C7.85825 4.62847 7.26378 5.47348 6.50831 6.16008C5.75285 6.84668 4.85503 7.35792 3.87905 7.65725C2.90306 7.95658 1.873 8.03661 0.862488 7.89162"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M9.82583 19.3733C5.93416 13.1317 13.225 5.975 19.3733 9.82583"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_5200_117972">
            <rect width="20" height="20" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  },
];
