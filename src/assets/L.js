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
        viewBox="0 0 461.032 1451.339"
        xmlSpace="preserve"
      >
        <Path
          fill={props.color}
          d="M461.032 1451.339H0v-28.348c46.9-8.406 79.457-24.84 97.67-49.359 17.49-23.794 26.253-65.107 26.253-123.921V235.24c0-59.5-8.763-101.507-26.253-126.027C80.157 84.72 47.607 68.967 0 61.96V38.853L338.158 0v1249.711c0 58.813 8.747 100.127 26.254 123.921 16.8 24.52 49 40.953 96.62 49.359v28.348zm-356.011-46.201h210.038l-25.207-18.906c-2.1-2.1-3.514-3.146-4.2-3.146l-13.653-10.507c-9.106-9.087-14.36-22.4-15.753-39.907V44.106L84.017 63.013l40.953 29.4c.693 0 2.107 1.054 4.204 3.147l13.653 10.506c6.99 4.907 11.55 11.914 13.65 21 2.1 9.107 3.15 25.914 3.15 50.414v1123.684c0 29.407-1.41 47.261-4.197 53.561-2.807 7.007-11.21 16.46-25.207 28.36l-1.05 1.047-2.097 2.1-22.055 18.906z"
        />
      </Svg>
    </SvgWrapper>
  );
};

SvgComponent.displayName = 'L';

SvgComponent.propTypes = {
  color: PropTypes.string.isRequired,
};

export default React.memo(SvgComponent);
