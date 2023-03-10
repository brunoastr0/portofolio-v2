/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import Image from "next/image";
import { Layout } from "../components/Layout";

const Home: NextPage = () => {
  const dayOfTheWeek = (): string => {
    const date = new Date().toLocaleString("default", { weekday: "long" });
    return date;
  };
  return (
    <Layout>
      <p className="text-2xl top-0 left-0 m-10" id="dayOfTheWeek">
        Happy {dayOfTheWeek()}!!
      </p>

      <svg
        id="polyg"
        width="350"
        height="350"
        viewBox="0 0 118 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M59 126.388L2.5 95.3893V33.6107L59 2.61227L115.5 33.6107V95.3893L59 126.388ZM58.612 126.601C58.6128 126.6 58.6135 126.6 58.6143 126.599L58.6133 126.6L58.612 126.601ZM59.3857 126.599C59.3864 126.6 59.3872 126.6 59.388 126.601L59.3866 126.6L59.3857 126.599Z"
          stroke="white"
          stroke-width="5"
        />
      </svg>

      <div className="flex flex-col w-[500px] md:w-[1200px] md:m-20">
        <svg
          id="astro"
          viewBox="0 0 1941 382"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="brackets">
            <path
              id="brackets1"
              d="M1532.17 381.956H1561.83L1686.15 79.1556H1656.49L1532.17 381.956Z"
              fill="#FFD700"
            />
            <path
              d="M1703.77 119.143V159.368L1857.75 230.727L1703.77 302.086V342.312L1940.33 230.542L1703.77 119.143Z"
              fill="#FFD700"
            />
          </g>
          <path
            id="brackets1"
            d="M236.946 119.143L0 230.727L236.946 342.285V302.086L82.993 230.727L236.946 159.368V119.143Z"
            fill="#FFD700"
          />

          <g id="stro">
            <path
              d="M633.975 84.4415H738.07L715.644 138.595H633.975C626.298 138.595 619.787 141.767 614.4 148.11C609.012 154.453 606.318 162.091 606.318 170.997C606.318 179.904 609.012 187.568 614.4 193.964C619.787 200.36 626.32 203.558 633.975 203.558H640.081V257.553H633.683C620.394 257.447 608.114 253.536 596.845 245.818C585.576 238.101 576.663 227.635 570.063 214.368C563.464 201.127 560.164 186.67 560.164 170.997C560.164 155.351 563.464 140.894 570.063 127.627C576.663 114.386 585.62 103.867 596.935 96.0968C608.226 88.3266 620.573 84.4415 633.975 84.4415ZM664.685 257.897H658.579V203.558L664.685 203.743C677.975 203.743 690.276 207.602 701.591 215.319C712.905 223.036 721.839 233.555 728.439 246.849C735.039 260.17 738.339 274.706 738.339 290.458C738.339 302.113 736.364 313.292 732.435 323.97C728.507 334.647 723.254 343.818 716.721 351.483C710.166 359.147 702.332 365.252 693.217 369.825C684.103 374.397 674.585 376.67 664.685 376.67H583.016L560.882 322.86H664.685C672.25 322.86 678.76 319.688 684.193 313.345C689.625 307.002 692.342 299.364 692.342 290.458C692.342 281.445 689.625 273.754 684.193 267.411C678.76 261.068 672.25 257.897 664.685 257.897Z"
              fill="#009ACE"
            />
            <path
              d="M878.846 84.4415V376.67H832.848V138.595H759.329L766.467 120.782L768.51 115.972L769.229 114.597L781.463 84.4415H855.993H878.846ZM897.186 84.4415H952.657V138.595H897.186V84.4415Z"
              fill="#009ACE"
            />
            <path
              d="M1177.57 170.839C1177.57 190.026 1172.74 207.232 1163.09 222.429C1153.44 237.625 1141.02 247.959 1125.89 253.457L1176.4 376.696H1125.15L1054.1 203.241H1104.03C1111.59 203.241 1118.1 200.069 1123.54 193.726C1128.97 187.383 1131.69 179.745 1131.69 170.839C1131.69 161.932 1128.97 154.268 1123.54 147.872C1118.1 141.476 1111.59 138.278 1104.03 138.278H1035.74V250.021V376.696H989.743V84.0979H1104.03C1113.93 84.0979 1123.42 86.4237 1132.49 91.0488C1141.56 95.6739 1149.4 101.858 1156 109.549C1162.6 117.267 1167.83 126.49 1171.71 137.221C1175.64 147.977 1177.57 159.183 1177.57 170.839Z"
              fill="#009ACE"
            />
            <path
              d="M1341.78 322.516C1359.74 322.516 1375.91 315.882 1390.27 302.641L1422.89 341.202C1411.73 352.408 1399.21 361.103 1385.33 367.34C1371.46 373.578 1356.94 376.67 1341.81 376.67C1324.92 376.67 1308.83 372.811 1293.54 365.094C1278.25 357.376 1265.05 346.99 1253.94 333.907C1242.83 320.825 1234.01 305.284 1227.45 287.286C1220.9 269.288 1217.62 250.338 1217.62 230.463C1217.62 212.65 1220.27 195.55 1225.54 179.217C1230.84 162.884 1238.23 148.136 1247.75 135.001L1280.5 173.746C1269.23 190.317 1263.62 209.214 1263.62 230.49C1263.62 247.166 1267.12 262.575 1274.1 276.688C1281.08 290.801 1290.58 301.981 1302.57 310.2C1314.55 318.393 1327.62 322.516 1341.78 322.516ZM1341.78 84.0979C1355.28 84.0979 1368.36 86.5558 1381.02 91.4717C1393.69 96.3875 1405.11 103.365 1415.3 112.377C1425.5 121.416 1434.43 131.908 1442.08 143.907C1449.74 155.906 1455.67 169.359 1459.84 184.265C1464.02 199.171 1466.11 214.579 1466.11 230.463C1466.11 266.222 1456.07 297.99 1435.98 325.767L1403.23 287.365C1414.5 270.451 1420.11 251.474 1420.11 230.463C1420.11 213.786 1416.61 198.352 1409.62 184.185C1402.64 170.019 1393.12 158.813 1381.09 150.594C1369.06 142.374 1355.95 138.251 1341.78 138.251C1323.74 138.251 1307.66 144.885 1293.59 158.126L1260.86 119.592C1284.43 95.9382 1311.41 84.0979 1341.78 84.0979Z"
              fill="#009ACE"
            />
          </g>

          <g id="A">
            <path
              d="M416.514 127.178L377.229 225.917H338.819L428.614 0L518.544 225.917H392.606L409.196 183.974H463.432L428.614 96.7575L416.514 127.178Z"
              fill="#009ACE"
            />
            <path
              d="M463.881 305.998C452.073 305.998 441.881 314.217 437.212 326.058C434.518 324.868 431.577 324.208 428.524 324.208C424.73 324.208 421.161 325.212 417.951 326.983C413.484 314.64 403.067 305.971 390.945 305.971C377.364 305.971 365.915 316.834 362.57 331.608C361.358 331.476 360.145 331.423 358.911 331.423C339.492 331.423 323.06 346.408 317.493 367.102C316.662 370.168 316.078 373.366 315.764 376.643H323.936C324.34 373.313 325.08 370.115 326.113 367.102C331.321 351.773 344.05 340.964 358.933 340.964C359.831 340.964 360.729 341.017 361.605 341.07C364.298 341.307 366.925 341.889 369.417 342.814C369.349 342.074 369.327 341.307 369.327 340.541C369.327 337.977 369.641 335.519 370.247 333.194C372.919 322.728 381.18 315.09 390.967 315.09C400.463 315.09 408.522 322.278 411.441 332.295C412.204 334.885 412.608 337.66 412.608 340.541C412.608 341.995 412.496 343.422 412.294 344.822C413.888 340.673 416.581 337.211 419.949 335.017C422.508 333.352 425.426 332.401 428.547 332.401C430.859 332.401 433.059 332.903 435.079 333.854C437.908 335.149 440.355 337.29 442.263 339.986C442.33 336.629 442.936 333.431 443.991 330.524C447.291 321.433 454.969 315.037 463.903 315.037C473.04 315.037 480.852 321.697 484.018 331.106C485.005 334.013 485.544 337.184 485.544 340.488C485.544 340.515 485.544 340.567 485.544 340.594C487.991 339.484 490.55 338.691 493.222 338.242C494.86 337.977 496.544 337.819 498.25 337.819C514.099 337.819 527.523 350.108 531.99 367.023C532.799 370.062 533.315 373.26 533.495 376.564H541.599C541.441 373.287 541.037 370.089 540.386 367.023C535.672 344.77 518.589 328.278 498.228 328.278C495.96 328.278 493.738 328.489 491.56 328.886C487.497 315.592 476.654 305.998 463.881 305.998Z"
              fill="#FFD700"
            />
            <path
              d="M411.306 239.238C409.173 239.238 407.422 241.273 407.422 243.81V274.256C407.422 276.767 409.151 278.829 411.306 278.829C413.439 278.829 415.19 276.794 415.19 274.256V243.81C415.19 241.273 413.461 239.238 411.306 239.238ZM446.034 239.238C443.902 239.238 442.151 241.273 442.151 243.81V274.256C442.151 276.767 443.879 278.829 446.034 278.829C448.167 278.829 449.918 276.794 449.918 274.256V243.81C449.918 241.273 448.167 239.238 446.034 239.238ZM428.771 255.65C426.639 255.65 424.887 257.685 424.887 260.222V296.748C424.887 299.258 426.616 301.32 428.771 301.32C430.904 301.32 432.655 299.285 432.655 296.748V260.222C432.655 257.685 430.904 255.65 428.771 255.65Z"
              fill="#FFD700"
            />
          </g>
        </svg>
      </div>

      <div className="text-gray-400 text-center text-3xl">
        <p>Building</p>
        <p>Almost Done...</p>
      </div>
    </Layout>
  );
};

export default Home;
