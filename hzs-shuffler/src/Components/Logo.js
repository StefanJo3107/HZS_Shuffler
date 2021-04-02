import logo from "./Img/hzs-sporedni-mali-removebg-preview.png";
import "./Logo.css";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

export default function Logo(props) {
    return (
        <div className="flex-item">
            <img className="logo" src={logo} />
            <GiPerspectiveDiceSixFacesRandom className="dice" />
        </div>
    );
}
