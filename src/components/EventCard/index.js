import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
  <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`}
    {...props}
  >
    <div className="EventCard__imageContainer">
      {imageSrc && imageAlt && (
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      )}
      {label && (
        <div className="EventCard__label">{label}</div>
      )}
    </div>
    <div className="EventCard__descriptionContainer">
      {title && (
        <div className="EventCard__title">{title}</div>
      )}
      {getMonth(date) && (
        <div className="EventCard__month">{getMonth(date)}</div>
      )}
    </div>
  </div>
);

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string,
  small: PropTypes.bool,
  label: PropTypes.string,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
  title: "", 
  label: "", 
};

export default EventCard;
