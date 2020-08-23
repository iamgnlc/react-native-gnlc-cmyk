import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';

import { SvgWrapper } from '../styles/Styles';

const SvgComponent = (props) => {
  return (
    <SvgWrapper>
      <Svg
        x="0px"
        y="0px"
        height="100%"
        width="100%"
        viewBox="0 0 1316.828 1451.339"
        xmlSpace="preserve"
      >
        <Path
          fill={props.color}
          d="M1191.274 1101.584l125.554 46.347c-22.934 30.887-48.833 60.787-77.72 89.68C1097.6 1380.119 926.2 1451.34 724.925 1451.34c-199.3 0-369.935-70.994-511.928-212.981C71.004 1096.351 0 925.21 0 724.922s71.004-371.175 212.998-512.689C354.991 70.767 525.625 0 724.926 0c201.274 0 372.675 70.767 514.183 212.233 28.887 28.927 54.786 58.82 77.72 89.688l-125.554 46.347c-12.967-15.934-26.906-31.88-41.854-47.84-117.587-116.581-259.087-174.881-424.495-174.881-164.407 0-305.167 58.554-422.248 175.627-117.094 117.1-175.627 258.347-175.627 423.748 0 165.42 58.533 306.674 175.627 423.749 117.081 117.1 257.841 175.627 422.248 175.627 165.408 0 306.908-58.794 424.495-176.367 14.947-14.948 28.887-30.387 41.853-46.347z"
        />
      </Svg>
    </SvgWrapper>
  );
};

SvgComponent.displayName = 'C';

SvgComponent.propTypes = {
  color: PropTypes.number.isRequired,
};

export default React.memo(SvgComponent);
