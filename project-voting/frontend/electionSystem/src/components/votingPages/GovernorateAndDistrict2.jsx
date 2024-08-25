import Image from "../../assets/distrect/1.svg";
import Image2 from "../../assets/distrect/2.svg";
import Image3 from "../../assets/distrect/3.svg";
import Image4 from "../../assets/distrect/4.svg";
import Image5 from "../../assets/distrect/5.svg";
import Image6 from "../../assets/distrect/6.svg";
import Image7 from "../../assets/distrect/7.svg";
import Image8 from "../../assets/distrect/8.svg";
import Image9 from "../../assets/distrect/9.svg";
import Image10 from "../../assets/distrect/10.svg";
import Image11 from "../../assets/distrect/11.svg";
import Image12 from "../../assets/distrect/12.svg";
import Image13 from "../../assets/distrect/13.svg";
import Image14 from "../../assets/distrect/14.svg";
import Image15 from "../../assets/distrect/15.svg";
import Image16 from "../../assets/distrect/16.svg";
import Image17 from "../../assets/distrect/17.svg";
import Image18 from "../../assets/distrect/18.svg";
import HeaderM from "../HeaderM";
import FooterM from "../Footer";

import { Link } from "react-router-dom";
function GovernorateAndDistrict() {
  return (
    <>
      <HeaderM />
      <div className="flex justify-around mt-16">
        <div className="avatar ">
          <div className="w-40 rounded-full ">
            <img src={Image} />
          </div>
        </div>
        <div className="avatar online">
          <div className="w-40 border-2 border-solid rounded-full ">
            <Link
              to="/components/votingPages/LocalListing2 "
              className="bg-contain"
            >
              <img src={Image3} />
            </Link>
          </div>
        </div>
        <div className="avatar ">
          <div className="w-40 rounded-full ">
            <img src={Image2} />
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-16">
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image4} />
          </div>
        </div>
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image5} />
          </div>
        </div>
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image6} />
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-16">
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image7} />
          </div>
        </div>
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image8} />
          </div>
        </div>
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image9} />
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-16">
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image10} />
          </div>
        </div>
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image11} />
          </div>
        </div>
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image12} />
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-16">
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image13} />
          </div>
        </div>
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image14} />
          </div>
        </div>
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image15} />
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-16">
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image16} />
          </div>
        </div>
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image17} />
          </div>
        </div>
        <div className="avatar ">
          <div className="w-40 rounded-full">
            <img src={Image18} />
          </div>
        </div>
      </div>
      <FooterM />
    </>
  );
}
export default GovernorateAndDistrict;
